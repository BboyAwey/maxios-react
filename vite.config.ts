import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import react from '@vitejs/plugin-react'
import { name } from './package.json'

export default defineConfig({
  plugins: [
    react(),
    dts()
  ],
  build: {
    outDir: 'lib',
    minify: false,
    lib: {
      entry: resolve(__dirname, './src/maxios-react/index.ts'),
      name: name,
      formats: ['es', 'umd', 'cjs'],
      fileName: 'maxios-react'
    },
    rollupOptions: {
      external: [
        'react',
        '@awey/maxios',
        'react-dom'
      ],
      output: {
        globals: {
          react: 'React',
          '@awey/maxios': 'Maxios',
          'react-dom': 'ReactDOM'
        }
      }
    }
  },
  server: {
    port: 3210,
    proxy: {
      '/api': 'http://localhost:3211'
    }
  },
})
