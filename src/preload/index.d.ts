/**
 * グローバルスコープの拡張を宣言
 */
declare global {
  /**
   * Windowインターフェースの拡張
   */
  interface Window {
    electron: {
      /**
       * メッセージを送信し、結果をPromiseとして返すメソッド
       * @param {string} msg - 送信するメッセージ
       * @returns {Promise<string>} - メインプロセスからの応答メッセージを含むPromise
       */
      sendMsg: (msg: string) => Promise<string>;

      /**
       * コールバック関数を登録し、メッセージを受け取るメソッド
       * @param {(msg: string) => any} cb - 受信したメッセージを処理するコールバック関数
       */
      onReplyMsg: (cb: (msg: string) => any) => void;
    }
  }
}

export { }
