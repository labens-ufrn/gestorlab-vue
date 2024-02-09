<script setup lang="ts">
import type { PersonInterface } from '@/types/Person';
import type { PropType } from 'vue';

const props = defineProps({
    persons: {
        required: true,
        type: Array as PropType<PersonInterface[]>
    }
})

</script>

<template>
    <h1>My list of users</h1>
  <ul>
    <li v-for="person in props.persons" :key="person.id">
      {{ person.name }}
    </li>
  </ul>
</template>

<style scoped>

</style>