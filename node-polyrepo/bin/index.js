#! /usr/bin/env node

'use strict'

const { program } = require('commander')
const chalk = require('chalk')

const pkg = require('../package.json')

if (pkg.private) {
  console.log(
    chalk.redBright(
      `This package ${pkg.name} has been marked as private, remove the 'private' field from the package.json to publish it.`
    )
  )
  process.exit(1)
}

program
  .version(pkg.version, '-v, --version', 'Output the current version')
  .option('-r, --registry <url>', 'Use specified npm registry when installing dependencies')

// add some useful info on help
program.on('--help', () => {
  console.log()
  console.log(`  Run ${chalk.cyan(`{{pkgName}} <command> --help`)} for detailed usage of given command.`)
  console.log()
})

program.commands.forEach(c => c.on('--help', () => console.log()))

enhanceErrorMessages('missingArgument', argName => {
  return `Missing required argument ${chalk.yellow(`<${argName}>`)}.`
})

enhanceErrorMessages('unknownOption', optionName => {
  return `Unknown option ${chalk.yellow(optionName)}.`
})

enhanceErrorMessages('optionMissingArgument', (option, flag) => {
  return (
    `Missing required argument for option ${chalk.yellow(option.flags)}` +
    (flag ? `, got ${chalk.yellow(flag)}` : ``)
  )
})

program.parse(process.argv)

require('../dist/{{pkgName}}.cjs')(program._optionValues)

function enhanceErrorMessages(methodName, log) {
  program.Command.prototype[methodName] = function (...args) {
    if (methodName === 'unknownOption' && this._allowUnknownOption) {
      return
    }

    this.outputHelp()

    console.log(`  ` + chalk.red(log(...args)))
    console.log()
    process.exit(1)
  }
}

