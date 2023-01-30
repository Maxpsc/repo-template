import { defineConfig } from 'father/dist'

export default defineConfig({
  platform: 'browser',
  esm: {
    input: 'src',
    transformer: 'babel',
    output: 'es',
  },
  cjs: {
    input: 'src',
    transformer: 'babel',
    output: 'lib',
  },
})
