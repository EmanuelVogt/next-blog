import { defineConfig } from 'vite'
import { alias } from './alias'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias
  },
})