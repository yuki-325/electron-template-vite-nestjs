import { Controller } from '@nestjs/common';
import { IpcHandle, Window } from '@doubleshot/nest-electron';
import { Payload } from '@nestjs/microservices';
import { type Observable, of } from 'rxjs';
import type { BrowserWindow } from 'electron';
import { AppService } from './app.service';

/**
 * アプリケーションのコントローラクラス
 */
@Controller()
export class AppController {
  /**
   * コンストラクタ
   * @param {AppService} appService - アプリケーションサービスのインスタンス
   * @param {BrowserWindow} mainWin - メインウィンドウのインスタンス
   */
  constructor(
    private readonly appService: AppService,
    @Window() private readonly mainWin: BrowserWindow,
  ) {}

  /**
   * 'msg'チャネルのIPCハンドラ
   * @param {string} msg - 受信したメッセージ
   * @returns {Observable<string>} - レスポンスメッセージを含むObservable
   */
  @IpcHandle('msg')
  public handleSendMsg(@Payload() msg: string): Observable<string> {
    // メインウィンドウのwebContentsを取得
    const { webContents } = this.mainWin;
    // webContents.sendを使用して、レンダラプロセスにメッセージを送信
    webContents.send('reply-msg', 'this is msg from webContents.send');
    // 受信したメッセージに対するレスポンスを生成し、Observableとして返す
    return of(`The main process received your message: ${msg} at time: ${this.appService.getTime()}`);
  }
}
