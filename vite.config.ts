import path from 'path';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig(({ command }) => {
  return {
    plugins: [solidPlugin({ typescript: { onlyRemoveTypeImports: true } })],
    resolve: {
      alias: {
        '~app': path.resolve(__dirname, 'src/app/'),
        '~lib': path.resolve(__dirname, 'src/lib/'),
        '~extensions': path.resolve(__dirname, 'src/lib/common/extensions/'),
        '~directives': path.resolve(__dirname, 'src/lib/common/directives/'),
        '~components': path.resolve(__dirname, 'src/lib/common/components/')
      }
    },
    build: {
      target: 'esnext',
      polyfillDynamicImport: false
    },
    server: {
      open: true
    },
    css: {
      postcss:
        command === 'serve' ? './postcss.config.dev.js' : './postcss.config.js'
    }
  };
});
