<script setup lang="ts">
import { QSpinner } from 'quasar';
</script>

<template>
  <div class="loading-page">
    <QSpinner
      size="30px"
      color="primary"
    />
  </div>
</template>

<style scoped>
  .loading-page {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>