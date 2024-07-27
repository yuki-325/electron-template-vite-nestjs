<script setup lang="ts">
import { ref } from 'vue'

/**
 * コンポーネントのプロパティの型を定義
 */
const props = defineProps({
  title: {
    type: String,
    default: 'Vite + Electron & Esbuild',
  },
})

/**
 * Electronのメインプロセスと通信するための関数を取得
 */
const { sendMsg: sendMsgToMainProcess, onReplyMsg } = window.electron

const log = ref('') // ログを保持するリアクティブ変数
const msg = ref('') // 送信メッセージを保持するリアクティブ変数

/**
 * メッセージをメインプロセスに送信する非同期関数
 * @returns {Promise<void>} - 非同期処理が完了するPromise
 */
async function sendMsg(): Promise<void> {
  try {
    log.value += `[render]: ${msg.value} \n` // 送信メッセージをログに追加
    const data = await sendMsgToMainProcess(msg.value) // メインプロセスにメッセージを送信
    log.value += `[main]: ${data} \n` // メインプロセスからの応答をログに追加
  }
  catch (error) {
    console.error(error) // エラーログを出力
  }
}

/**
 * メインプロセスからの応答メッセージを受け取るコールバック関数を登録
 * @param {string} msg - メインプロセスからの応答メッセージ
 */
onReplyMsg((msg: string) => {
  log.value += `[main]: ${msg} \n` // 応答メッセージをログに追加
})
</script>

<template>
  <h1>{{ props.title }}</h1>

  <v-textarea v-model="log" cols="60" rows="10" variant="outlined" readonly />
  <div style="margin-top: 20px">
    <v-text-field v-model="msg" type="text" placeholder="send msg to main process" variant="outlined"/>
    <v-btn style="margin-left: 20px" @click="sendMsg">
      Send
    </v-btn>
  </div>
</template>

<style>
/* 必要に応じてスタイルを追加 */
</style>
