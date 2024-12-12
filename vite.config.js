import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { getVarEnv } from "./src/helpers/getVarEnv";

const { TARGET_SOCKET_URL } = getVarEnv();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/socket.io": {
        target: TARGET_SOCKET_URL,
        ws: true,
      },
    },
  },
});
