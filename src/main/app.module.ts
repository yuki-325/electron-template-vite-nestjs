// 必要なモジュールのインポート
import { join } from 'node:path' // ファイルパスを結合するためのNode.jsのパスモジュール
import { Module } from '@nestjs/common' // NestJSのモジュールデコレーター
import { ElectronModule } from '@doubleshot/nest-electron' // ElectronとNestJSを統合するためのモジュール
import { BrowserWindow, app } from 'electron' // ElectronのBrowserWindowとappモジュール
import { AppController } from './app.controller' // アプリケーションのコントローラ
import { AppService } from './app.service' // アプリケーションのサービス
import { Config } from 'src/config/config'
import { existsSync, mkdirSync, copyFileSync } from 'fs'
import { ensureConfigFile, loadConfig } from 'src/util/configuration-reader'
import { initializeLogger } from 'src/config/log-config'
/**
 * アプリケーションモジュール
 */
@Module({
  // 他のモジュールをインポート
  imports: [
    ElectronModule.registerAsync({
      // 非同期にElectronモジュールを設定
      useFactory: async () => {
        // 開発モードかどうかを判定
        const isDev = !app.isPackaged;

        // 設定ファイルを読み込む
        const configFilePath: string = ensureConfigFile("config.json");
        const config: Config = loadConfig(configFilePath);

        // loggerの初期化
        const logConfigFilePath: string = ensureConfigFile("log-config.json");
        initializeLogger(logConfigFilePath);

        // 新しいブラウザウィンドウを作成
        const win = new BrowserWindow({
          width: config.window.width, // ウィンドウの幅
          height: config.window.height, // ウィンドウの高さ
          autoHideMenuBar: true, // メニューバーを自動で隠す
          webPreferences: {
            contextIsolation: true, // コンテキストの分離を有効にする
            preload: join(__dirname, '../preload/index.js'), // プリロードスクリプトのパス
          },
        });

        // ウィンドウが閉じられた時の処理
        win.on('closed', () => {
          win.destroy(); // ウィンドウを破棄
        });

        // 開発モードと本番モードで異なるURLをロード
        const URL = isDev
          ? process.env.DS_RENDERER_URL // 開発モードでは環境変数からURLを取得
          : `file://${join(app.getAppPath(), 'dist/render/index.html')}`; // 本番モードではローカルのHTMLファイルを指定

        win.loadURL(URL); // ウィンドウにURLをロード

        return { win }; // ウィンドウオブジェクトを返す
      },
    }),
  ],
  controllers: [AppController], // モジュールのコントローラー
  providers: [AppService], // モジュールのサービス
})
export class AppModule { }