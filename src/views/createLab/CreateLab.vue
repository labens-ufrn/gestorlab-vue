<script setup lang="ts">
import {QIcon} from 'quasar';
import {ref} from 'vue';
import type { CreateLaboratory } from '@/types';

//Variables
let stepI = ref<Boolean>(true);
let stepII = ref<Boolean>(false);
let stepIII = ref<Boolean>(false);

let newLaboratory = ref<CreateLaboratory>({
  nome: '',
  sobre: '',
  template: 0,
  descricao: '',
  email: '',
  image: ''
});

//Functions

function nextStep(option: number){
  switch (option) {
  case 1:
    stepI.value = true;
    stepII.value = false;
    stepIII.value = false;
    break;
  case 2:
    stepI.value = false;
    stepII.value = true;
    stepIII.value = false;
    break;
  case 3:
    stepI.value = false;
    stepII.value = false;
    stepIII.value = true;
    break;
  default:
    stepI.value = true;
    stepII.value = false;
    stepIII.value = false;
    break;
  }
}

</script>
<template>
  <div class="createLab-container">
    <section> 
      <header>
        <QIcon
          class="icon"
          @click="()=>{}"
          name="undo"
          size="2rem"
          color="primary"
        />
        <div class="box-steps">
          <div
            :class="stepI ? 'button-step-active':'button-step-deactive'"
          />
          <div
            :class="stepII ? 'button-step-active':'button-step-deactive'"
          />
          <div
            :class="stepIII ? 'button-step-active':'button-step-deactive'"
          />
        </div>
      </header>
      <div
        v-show="stepI"
        class="step"
      >
        <button
          @click="()=>{}"
          class="button-img"
        >
          <QIcon
            v-if="newLaboratory.image === ''"
            name="add_a_photo"
            size="4rem"
            color="white"
            alt="Imagem para escolher"
          />
          <img
            v-else
            :src="newLaboratory.image"
            alt="Imagem que foi escolhida"
          >
        </button>
        <div class="content">
          <label>Laboratório:</label>
          <input
            type="text"
            placeholder="digite aqui a sígla do seu laboratório"
          >
        </div>
        <div class="footer">
          <div />
          <button @click="nextStep(2)">
            <span>Proximo</span>
            <QIcon
              name="chevron_right"
              size="1.2rem"
            />
          </button>
        </div>
      </div>
      <div
        v-show="stepII"
        class="step"
      />
      <div
        v-show="stepIII"
        class="step"
      />
    </section>
  </div>
</template>

<style scoped lang="scss">
  section{
    display: flex;
    flex-direction: column;
    gap: 5rem;
    height: 100%;
    background-color: $dark;
    width: 100%;
    border: 1px solid $contour;
    border-radius: 1rem;
    padding: 2rem;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }

  img{
    border-radius: 50%;
    border: 1px solid $contour;
    width: 20rem;
    height: 20rem;
  }

  input, select {
    width: 100%;
    color: $textColor;
    padding: 12px 16px;
    background-color: $dark;
    border-radius: 10px;
    border: $contour solid 1px;
  }

  .button-img{
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $primary;
    cursor: pointer;
    border-radius: 50%;
    border: 1px solid $contour;
    width: 20rem;
    height: 20rem;
  }

  .createLab-container {
    padding: 5rem 10rem;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .icon {
    cursor: pointer;
  }

  .box-steps{
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.8rem;
  }

  .button-step-active{
    border: 1px solid $secondary;
    background-color: $secondary;
    height: 1.6rem;
    width: 1.6rem;
    border-radius: 50%;
  }
  .button-step-deactive{
    border: 1px solid $secondary;
    background-color: transparent;
    height: 1.6rem;
    width: 1.6rem;
    border-radius: 50%;
  }

  .step {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap:4rem;
    align-items: center;
    justify-content: space-between;
  }

  .content{
    justify-content: center;
    align-items: center;
    display: flex;
    width: 50%;
    flex-direction: column;
    gap:0.2rem;
    align-items: flex-start;
    color: $textColor;
  }

  span{
    font-size: 1.2rem;
    font-weight: 700;
  }
  .footer {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap:0.2rem;
  }
  .footer button {
    background-color: $secondary;
    border-radius: 1rem;
    padding: 0.8rem 1rem;
    cursor: pointer;
    border: none;
    color: $textColor;
    display: flex;
    justify-content: center;
    align-items: center;
    gap:0.2rem;
  }
</style>