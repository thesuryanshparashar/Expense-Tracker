import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: "5400"
  }
  // build: {
  //   rollupOptions: {
  //     output: {
  //       manualChunks(id) {
  //         if (id.includes('node_modules')) {
  //           if (id.includes('react')) {
  //             return 'react'; // React in its own chunk
  //           }
  //           if (id.includes('lodash')) {
  //             return 'lodash'; // Lodash in its own chunk
  //           }
  //           return 'vendor'; // Other node_modules in a vendor chunk
  //         }
  //       },
  //     },
  //   },
  // },
})
