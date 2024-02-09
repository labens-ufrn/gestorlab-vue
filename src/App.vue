<script setup lang="ts">
import type { PersonInterface } from '@/types/Person';
import PersonList from './components/PersonList.vue';
// import { RouterLink, RouterView } from 'vue-router'

let persons:Array<PersonInterface> = [
  {
    id: 1,
    name: 'Jose',
    age: 23
  },
  {
    id: 2,
    name: 'Maria',
    age: 41
  },
  {
    id: 3,
    name: 'Danyélica',
    age: 25
  },
];
</script>

<template>
  <PersonList :persons="persons" />
</template>

<style scoped>
</style>
