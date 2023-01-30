import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import pkg from './package.json'

export default defineConfig(({ command }) => {
  if (command === 'build') {
    return {
      plugins: [react()],
      build: {
        lib: {
          entry: path.resolve(__dirname, 'src/index.ts'),
          formats: ['es', 'cjs', 'umd'],
          name: '{{name}}',
          fileName: '{{name}}',
        },
        rollupOptions: {
          output: { exports: 'named' },
        },
      },
    }
  } else {
    return {
      plugins: [react()],
      server: {
        port: 3000,
      },
      root: path.resolve(__dirname, 'demo'),
      resolve: {
        alias: {
          '{{name}}': path.resolve(__dirname, 'src'),
        },
      },
    }
  }
})
