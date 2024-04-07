import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { getVarEnv } from './src/helpers/getVarEnv'

const { TARGET_SOCKET_URL } = getVarEnv()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/socket.io': {
        target: 'http://127.0.0.1:8080/',
        ws: true
      }
    }
  }
})
