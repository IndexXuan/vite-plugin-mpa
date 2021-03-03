import path from 'path'
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import mpa from '../../src/index'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), mpa()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
