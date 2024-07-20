<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

// functions
function handleRouter() {
  router.push('/pageAcess');
}
</script>

<template>
  <header>
    <div class="container header">
      <img src="@/assets/imgs/GestorLAB (1).svg">
      <button
        class="button-conect"
        @click="handleRouter()"
      >
        Venha experimentar
      </button>
    </div>
  </header>
  <main>
    <section class="container-hero">
      <div class="container hero">
        <p>
          Conheça o Gestor<strong>LAB</strong>:sua ferramenta ideal para simplificar a gestão do seu laboratório
          acadêmico!
        </p>
        <img
          src="@/assets/imgs/cientis.svg"
          alt="Imagem de cientista"
        >
      </div>
    </section>
    <section class="container-about">
      <div class="container about">
        <img
          src="@/assets/imgs/studing.svg"
          alt="Menina utilizando um notebook"
        >
        <article>
          <p>
            O GestorLAB é uma inovadora ferramenta que visa aprimorar a gestão e organização de laboratórios acadêmicos.
            Desenvolvido sob a orientação do professor Taciano Silva de Morais, da UFRN campus Caicó, o projeto teve
            início como proposta de Trabalho de Conclusão de Curso (TCC) e está atualmente em fase de desenvolvimento
            beta.
          </p>
          <p>
            A principal proposta do GestorLAB é fornecer aos laboratórios acadêmicos um portfólio online gratuito,
            destacando seus projetos, membros e apoiadores. A ferramenta é flexível, permitindo sua utilização por
            qualquer laboratório. Essa adaptabilidade é alcançada por meio da personalização de cores, permitindo que
            cada
            laboratório ajuste a interface conforme suas preferências. Além disso, são disponibilizados templates de
            tela
            específicos para a criação de portfólios online, facilitando a configuração e apresentação das informações.
          </p>
        </article>
      </div>
    </section>
    <section class="container-card">
      <div class="container info-card">
        <div class="card">
          <p>
            Crie seus projetos, adicione seus membros e apoiadores, monitore o desenvolvimento e produtividade de sua
            equipe de discentes.
          </p>
          <p>E divulgue facilmente seus resultados ou acões em seu portifólio na web!</p>
        </div>
        <img
          src="@/assets/imgs/functions.svg"
          alt="Imagem de computador com varias funções abertas"
        >
      </div>
    </section>
  </main>
  <footer class="contaner-footer">
    <div class="container footer-one">
      <img
        src="@/assets/imgs/logotipo_ufrn.svg"
        alt="Logo tipo da UFRN"
      >
      <div class="box-social">
        <a
          href="http://"
          target="_blank"
        ><img
          src="@/assets/imgs/Group 1.svg"
          alt=""
        ></a>
        <a
          href="http://"
          target="_blank"
        ><img
          src="@/assets/imgs/Group 2.svg"
          alt=""
        ></a>
        <a
          href="http://"
          target="_blank"
        ><img
          src="@/assets/imgs/Group 3.svg"
          alt=""
        ></a>
        <a
          href="http://"
          target="_blank"
        ><img
          src="@/assets/imgs/Group 4.svg"
          alt=""
        ></a>
      </div>
    </div>
    <hr
      class="container"
      style="width:100%;height: 1px;border: none; background-color: #333335;"
    >
    <div class="container rules">
      <p>Labens. Todos os direitos reservados.</p>
      <button @click="() => { }">
        voltar ao topo
      </button>
    </div>
  </footer>
</template>

<style scoped>
.container-hero {
  font-family: 'Roboto Slab', sans-serif;
  padding: 220px 120px;
  border-bottom: 1px solid #333335;
}

header {
  width: 100%;
  position: fixed;
  background-color: #1F2026;
  border-bottom: 1px solid #333335;
}

.header {
  padding: 20px 120px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.button-conect {
  padding: 10px 16px;
  border: solid #044FE0;
  border-radius: 10px;
  background-color: transparent;
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
}

.button-conect:hover {
  border: solid #044FE0;
  background-color: #044FE0;
  color: #fff;
}

.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
}

.hero p {
  max-width: 725px;
  font-size: 3.75rem;
  font-weight: 600;
  line-height: 60px;
}

.hero p strong {
  color: #044FE0;
}

/* Section about */
.container-about {
  font-family: 'Inter', sans-serif;
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

/* Footer */
.contaner-footer {
  padding: 100px 120px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.footer-one {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.box-social {
  display: flex;
  align-items: center;
  gap: 6px;
}

a {
  cursor: pointer;
}

.rules {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.rules p {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 300;
}

.rules button {
  padding: 10px;
  border-radius: 10px;
  border: 0.5px solid #fff;
  text-transform: uppercase;
  background-color: transparent;
  color: #fff;
}

/* Info card */
.container-card {
  font-family: 'Inter', sans-serif;
  padding: 160px 120px;
  border-bottom: 1px solid #333335;
}

.info-card {
  display: flex;
  align-items: center;
  gap: 32px;
  justify-content: space-between;
}

.card {
  padding: 40px 40px;
  border-radius: 18px;
  background-color: #1F2026;
  font-family: 'Inter', sans-serif;
  max-width: 576px;
  display: flex;
  flex-direction: column;
  color: white;
  font-size: 1.75rem;
  line-height: 32px;
  font-weight: bold;
  gap: 32px;
  box-shadow: 0px 4px 4px 0px #044FE0;
}
</style>