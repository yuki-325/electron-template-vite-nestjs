import { join, resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePluginDoubleshot } from 'vite-plugin-doubleshot'
import { copyFileSync, existsSync, mkdirSync } from 'fs'


// Viteプラグインとしてファイルをコピーする関数
function copyConfigFile() {
  return {
    name: 'copy-config-file',
    buildStart() {
      const fileName = "config.json";
      const srcPath = resolve(__dirname, "config", fileName);
      const destDir = resolve(__dirname, 'dist', "config");
      const destPath = resolve(destDir, fileName);

      if (!existsSync(destDir)) {
        mkdirSync(destDir, { recursive: true })
      }

      copyFileSync(srcPath, destPath);
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
