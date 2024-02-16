<script setup lang="ts">

</script>

<template>
  <section class="container-hero">
    <div class="container hero">
      <p>Conheça o Gestor<strong>LAB</strong>:sua ferramenta ideal para simplificar a gestão do seu laboratório acadêmico!</p>
      <img
        src="../assets/imgs/cientis.svg"
        alt="Imagem de cientista"
      >
    </div>
  </section>
  <section class="container-about">
    <div class="container about">
      <img
        src="../assets/imgs/studing.svg"
        alt="Menina utilizando um notebook"
      >
      <article>
        <p>
          O GestorLAB é uma inovadora ferramenta que visa aprimorar a gestão e organização de laboratórios acadêmicos. Desenvolvido sob a orientação do professor Taciano Silva de Morais, da UFRN campus Caicó, o projeto teve início como proposta de Trabalho de Conclusão de Curso (TCC) e está atualmente em fase de desenvolvimento beta.
        </p>
        <p>
          A principal proposta do GestorLAB é fornecer aos laboratórios acadêmicos um portfólio online gratuito, destacando seus projetos, membros e apoiadores. A ferramenta é flexível, permitindo sua utilização por qualquer laboratório. Essa adaptabilidade é alcançada por meio da personalização de cores, permitindo que cada laboratório ajuste a interface conforme suas preferências. Além disso, são disponibilizados templates de tela específicos para a criação de portfólios online, facilitando a configuração e apresentação das informações.
        </p>
      </article>
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

/* Section about */
.container-about {
  font-family: 'Roboto Slab', sans-serif;
  padding: 160px 120px;
  border-bottom: 1px solid #333335;
}

.about {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
}

.about article {
  max-width: 735px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  font-size: 28px;
  line-height: 32px;
  font-weight: 500;

}
</style>