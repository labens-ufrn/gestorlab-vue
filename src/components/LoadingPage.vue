<script setup lang="ts">
import { QSpinnerDots } from 'quasar';
</script>

<template>
  <div>
    <QSpinnerDots
      size="30px"
      color="primary"
    />
  </div>
</template>

<style scoped>
  div {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>