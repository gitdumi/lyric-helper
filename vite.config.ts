import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    server: {open: 'https://62faa642a1fdf606fb1c193b--eclectic-maamoul-33b51b.netlify.app'},
    plugins: [react()]
})
