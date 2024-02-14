<script setup lang="ts">

</script>

<template>
  <section class="container-hero">
    <div class="container hero">
      <p>Conheça o Gestor<strong>LAB</strong>:sua ferramenta ideal para simplificar a gestão do seu laboratório acadêmico!</p>
      <img
        src="../assets/imgs/cientista.svg"
        alt="Imagem de cientista"
      >
    </div>
  </section>
</template>

<style scoped>
.container-hero {
  font-family: 'Roboto Slab', sans-serif;
  padding: 220px 120px;
  border-bottom: 1px solid #333335;
}
.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
}

.hero p {
  max-width: 725px;
  font-size:3.75rem;
  font-weight: 600;
  line-height: 60px;
}

.hero p strong{
  color: #5621EF;
}
</style>