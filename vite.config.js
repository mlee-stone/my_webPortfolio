import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const repository = process.env.GITHUB_REPOSITORY
const base = repository
  ? repository.endsWith('.github.io')
    ? '/'
    : `/${repository.split('/')[1]}/`
  : '/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
})
