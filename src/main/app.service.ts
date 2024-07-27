import { Injectable } from '@nestjs/common';

/**
 * アプリケーションサービスクラス
 * @@Injectable デコレータを使用してDIコンテナに登録する
 */
@Injectable()
export class AppService {
  /**
   * 現在のタイムスタンプを取得するメソッド
   * @returns {number} 現在のタイムスタンプをミリ秒単位で返す
   */
  public getTime(): number {
    return new Date().getTime(); // 現在のタイムスタンプをミリ秒単位で返す
  }
}
