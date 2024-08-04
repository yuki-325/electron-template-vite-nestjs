<script setup lang="ts">
import { ref } from 'vue'
import log from 'electron-log/renderer';

/**
 * コンポーネントのプロパティの型を定義
 */
const props = defineProps()

const dialog = ref(false)

</script>

<template>
    <v-app>
      <v-container>
        <!-- ダイアログを開くボタン -->
        <v-btn color="primary" dark @click="dialog = true">Open Dialog</v-btn>
  
        <!-- ダイアログ -->
        <v-dialog v-model="dialog" max-width="500">
          <v-card>
            <v-card-title class="headline">ダイアログのタイトル</v-card-title>
            <v-card-text>
              ダイアログの内容
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" @click="dialog = false">閉じる</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-app>
  </template>
  

<style>
/* 必要に応じてスタイルを追加 */
</style>
