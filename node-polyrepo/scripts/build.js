const fs = require('fs-extra')
const chalk = require('chalk')
const { logger } = require('og-toolkit')

const { resolveRoot, bin, run } = require('./utils')

const args = require('minimist')(process.argv.slice(2))
const formats = args.formats || args.f
const devOnly = args.devOnly || args.d
const prodOnly = !devOnly && (args.prodOnly || args.p)
const sourceMap = args.sourcemap || args.s
const isRelease = args.release
const buildTypes = args.t || args.types || isRelease

main()

async function main() {
  if (isRelease) {
    // remove build cache for release builds to avoid outdated enum values
    await fs.remove(resolveRoot('node_modules/.rts2_cache'))
  }

  const pkgJSONPath = resolveRoot('package.json')
  const pkg = require(pkgJSONPath)

  // if building a specific format, do not remove dist.
  if (!formats) {
    await fs.remove(resolveRoot('dist'))
  }

  const env = devOnly ? 'development' : 'production'

  logger.step(`Rolling up bundles for ${chalk.cyanBright.bold(pkg.name)}`)
  await run(bin('rollup'), [
    '-c',
    '--environment',
    [
      `NODE_ENV:${env}`,
      formats ? `FORMATS:${formats}` : ``,
      buildTypes ? `TYPES:true` : ``,
      prodOnly ? `PROD_ONLY:true` : ``,
      sourceMap ? `SOURCE_MAP:true` : ``,
    ]
      .filter(Boolean)
      .join(','),
  ])

  // build types
  if (buildTypes && pkg.types) {
    logger.step(`Rolling up type definitions for ${chalk.cyanBright.bold(pkg.name)}`)
    console.log()

    await fs.remove(resolveRoot('dist/src'))
  }

  console.log()
  logger.done(`Compiled ${chalk.cyanBright.bold(pkg.name)} successfully.`)
  console.log()
}
