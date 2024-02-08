<script setup lang="ts">
import type { PersonInterface } from '@/types/Person';

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
  <h1>My list of users</h1>
  <ul>
    <li v-for="person in persons" :key="person.id">
      {{ person.name }}
    </li>
  </ul>
</template>

<style scoped>
</style>
