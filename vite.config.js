import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginSass from 'vite-plugin-sass'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vitePluginSass()],
})
