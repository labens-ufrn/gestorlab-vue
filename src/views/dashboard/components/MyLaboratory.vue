<script setup lang="ts">
import {userStore} from '@/stores/user';
import {ref, onMounted} from 'vue';
import { QCard,  QInput } from 'quasar';

// State
const user = userStore();

//variables
let lab = ref<any>();
let title = ref<any>();

//function
onMounted(() => {
  lab.value = user.getlaboratory;
  console.log(lab.value);
});
</script>
<template>
  <div
    class="info-container"
    v-if="lab === null || lab === 'null'"
  >
    <p>Você não faz parte de nenhum laboratório!</p>
  </div>
  <div
    class="lab-container"
    v-else
  >
    <section class="profile-lab">
      <img
        class="img-avatar"
        v-if="lab && lab.image"
        :src="`${lab?.image}`"
        alt="Imagem do Laboratorio"
      >
      <q-input
        outlined
        color="grey"
        class="q-input"
        v-model="title"
        label="Nome do laboratorio"
      />
    </section>
    <section class="list-acess">
      <ul>
        <QCard />
      </ul>
    </section>
  </div>
</template>
<style scoped lang="scss">
  .lab-container{
    padding: 4rem;
    display: flex;
    gap: 2rem;
    align-items: flex-start;
  }

  .img-avatar {
    width: 12rem;
    height: 12rem;
    border-radius: 50%;
  }

  .info-container{
    min-height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    font-weight: 700;
    color: $textColor;
  }
  .q-input {
    width: 100%;
    color: yellow;
    background-color: $dark;
    border-color: $contour;
  }

  section{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .profile-lab{
    flex:2;
    align-items: center;
  }

  .list-acess{
    flex:1;
  }

  ul {
    background-color: $dark;
    width: 100%;
    height: 40rem;
    border-radius: 1rem;
    border: 1px solid $contour;
  }
</style>