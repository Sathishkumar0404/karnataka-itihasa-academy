import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    base: "/karnataka-itihasa-academy",
    define: {
      'process.env':{}
    },
    plugins: [react()]
 
})
