import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import mpa from '../../src/index'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), mpa()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
