// yarn build 用到的vite配置

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
/**
 * @type {import('vite').UserConfig}
 */
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    plugins: [vue(), vueJsx()],
    resolve: {
      extensions: ['.js', '.mjs'],
    },
    base: env.VITE_APP_BASE_URL,
    build: {
      minify: true,
      base: env.VITE_APP_BASE_URL,
      lib: {
        entry: path.resolve(__dirname, './src/index.ts'),
        name: 'echo-ui-docs',
      },
      rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: ['vue'],
        output: {
          // Provide global variables to use in the UMD build
          // for externalized deps
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
  });
};
