/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
  directories: {
    output: 'dist/electron',
  },
  publish: null,
  npmRebuild: false,
  files: [
    'dist/main/**/*',
    'dist/preload/**/*',
    'dist/render/**/*',
  ],
  extraResources: [
    {
      from: 'config/', // プロジェクトのルートディレクトリからconfigディレクトリをコピー
      to: 'config/',   // ビルド成果物のルートに配置
      filter: ['**/*']
    }
  ],
};

module.exports = config;
