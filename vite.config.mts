import { join, resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePluginDoubleshot } from 'vite-plugin-doubleshot'
import { existsSync, } from 'fs'
import fsExtra from 'fs-extra'


// Viteプラグインとしてファイルをコピーする関数
function copyConfigFile() {
  return {
    name: 'copy-config-file',
    buildStart() {
      const srcPath = resolve(__dirname, "config");
      const destPath = resolve(__dirname, 'dist', "config");
      if (!existsSync(srcPath)) {
        console.error(`Source config directory not found at ${srcPath}`);
        return;
      }

      try {
        fsExtra.copySync(srcPath, destPath);
      } catch (error) {
        console.error('Error copying config directory:', error);
      }
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  root: join(__dirname, 'src/render'),
  plugins: [
    vue(),
    copyConfigFile(),
    VitePluginDoubleshot({
      type: 'electron',
      main: 'dist/main/index.js',
      entry: 'src/main/index.ts',
      outDir: 'dist/main',
      external: ['electron'],
      electron: {
        build: {
          config: './electron-builder.config.js',
        },
        preload: {
          entry: 'src/preload/index.ts',
          outDir: 'dist/preload',
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': join(__dirname, 'src'),
      '@render': join(__dirname, 'src/render'),
      '@main': join(__dirname, 'src/main'),
    },
  },
  base: './',
  build: {
    outDir: join(__dirname, 'dist/render'),
    emptyOutDir: true,
  },
})
