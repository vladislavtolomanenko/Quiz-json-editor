import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: You must replace `<YOUR_REPOSITORY_NAME>` with the name of your GitHub repository.
  // For example, if your repository URL is `https://github.com/user/my-quiz-app`,
  // you should set `base` to `'/my-quiz-app/'`.
  base: '/Quiz-json-editor/',
})