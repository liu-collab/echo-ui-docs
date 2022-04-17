// yarn build 用到的vite配置

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';
/**
 * @type {import('vite').UserConfig}
 */
export default {
  optimizeDeps: {
    include: [],
    exclude: [],
  },
  plugins: [vue(), vueJsx()],
  build: {
    minify: true,
    base: './',
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
};
