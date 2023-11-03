import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [vue()],
    server: {
      host: env.VITE_UI_HOST,
      port: parseInt(env.VITE_UI_PORT, 10),
    },
  });
};
