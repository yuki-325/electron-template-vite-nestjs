import { contextBridge, ipcRenderer } from 'electron';

/**
 * Electronのメインプロセスとレンダラープロセス間の通信を安全に行うためのAPIをメインワールドに公開する
 */
contextBridge.exposeInMainWorld(
  'electron',
  {
    /**
     * メッセージを送信し、結果をPromiseとして返すメソッド
     * @param {string} msg - 送信するメッセージ
     * @returns {Promise<string>} - メインプロセスからの応答メッセージを含むPromise
     */
    sendMsg: (msg: string): Promise<string> => ipcRenderer.invoke('msg', msg),

    /**
     * コールバック関数を登録し、メッセージを受け取るメソッド
     * @param {(msg: string) => any} cb - 受信したメッセージを処理するコールバック関数
     */
    onReplyMsg: (cb: (msg: string) => any) => ipcRenderer.on('reply-msg', (e, msg: string) => {
      cb(msg);
    }),
  },
);
