<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <header>
    <img
      src="./assets/imgs/GestorLAB (1).svg"
      alt="logo"
    >
  </header>
  <main>
    <router-view />
  </main>
</template>

<style scoped>
header {
  width: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 120px;
  background-color: #1F2026;
  border-bottom: 1px solid #333335;
}
</style>
