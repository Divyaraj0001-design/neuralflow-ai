import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/neuralflow-ai/', // GitHub Pages: https://<username>.github.io/neuralflow-ai/
})
