<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import VuetifyDialog from './components/VuetifyDialog.vue'
</script>

<template>
  <!-- <HelloWorld title="Vite + Electron & Esbuild" /> -->
  <VuetifyDialog></VuetifyDialog>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.logo {
  width: 400px;
  border-radius: 1rem;
  box-shadow:
    0 0 #0000,
    0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
</style>
