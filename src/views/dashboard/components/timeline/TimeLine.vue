<script setup lang="ts">
import MyCard from '@/components/MyCard.vue';
</script>

<template>
  <div class="timeline">
    <section>
      <div>
        <h2>Faça parte de um laboratório!!</h2>
      </div>
      <ul>
        <MyCard
          title="Labican"
          v-for="item in 10"
          :key="item"
        />
      </ul>
    </section>
  </div>
</template>

<style scoped lang="scss">
  .timeline {
    font-family: 'Inter';
    display: flex;
    align-items: flex-start;
    gap: 2rem;
    padding: 1.2rem 2.5rem;
  }

  ul {
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 38rem;
    gap: 1rem;
  }

  h2{
    font-size: 1.6rem;
    color:$textColor;
    font-weight: bolder;
  }

  section{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.4rem;
  }
</style>