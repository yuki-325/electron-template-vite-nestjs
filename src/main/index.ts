import { NestFactory } from '@nestjs/core';
import { app } from 'electron';
import type { MicroserviceOptions } from '@nestjs/microservices';
import { ElectronIpcTransport } from '@doubleshot/nest-electron';
import { AppModule } from './app.module';

// Electronのセキュリティ警告を無効化
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

/**
 * Electronアプリケーションの初期化関数
 * @returns {Promise<void>} - 初期化が完了するPromise
 */
async function electronAppInit(): Promise<void> {
  const isDev = !app.isPackaged; // 開発モードかどうかを判定

  // すべてのウィンドウが閉じられたときの処理
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') // macOSではない場合にアプリを終了
      app.quit();
  });

  // 開発モードでの特定のプラットフォーム処理
  if (isDev) {
    if (process.platform === 'win32') { // Windowsプラットフォームの処理
      process.on('message', (data) => {
        if (data === 'graceful-exit')
          app.quit();
      });
    } else { // macOSおよび他のプラットフォームの処理
      process.on('SIGTERM', () => {
        app.quit();
      });
    }
  }

  await app.whenReady(); // Electronアプリケーションが準備完了するのを待つ
}

/**
 * NestJSアプリケーションのブートストラップ関数
 * @returns {Promise<void>} - ブートストラップが完了するPromise
 */
async function bootstrap(): Promise<void> {
  try {
    await electronAppInit(); // Electronアプリケーションの初期化

    // NestJSのマイクロサービスを作成
    const nestApp = await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      {
        strategy: new ElectronIpcTransport('IpcTransport'), // Electron IPCトランスポートを設定
      },
    );

    await nestApp.listen(); // マイクロサービスのリスニングを開始
  } catch (error) {
    console.log(error); // エラーログを出力
    app.quit(); // エラーが発生した場合、アプリケーションを終了
  }
}

// ブートストラップ関数の実行
bootstrap();
