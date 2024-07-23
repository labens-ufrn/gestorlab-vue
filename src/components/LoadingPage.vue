<script setup lang="ts">
import { QSpinnerDots } from 'quasar';
</script>

<template>
  <div class="loading-page">
    <QSpinnerDots
      size="30px"
      color="primary"
    />
  </div>
</template>

<style scoped>
  .loading-page {
    width: 100%;
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>