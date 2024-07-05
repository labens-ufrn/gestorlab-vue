<script setup lang="ts">
import { ArrowRightEndOnRectangleIcon } from '@heroicons/vue/24/solid';
import { useRouter } from 'vue-router';
//Navegação
const router = useRouter();

//function
function handleRouter() {
  router.push('/signup');
}

function clearAcess(){
  window.document.cookie = 'null';
  handleRouter();
}
</script>

<template>
  <header class="container top-bar">
    <img src="@/assets/imgs/GestorLAB (1).svg">
    <button
      @click.prevent="clearAcess()"
      class="button-layout"
    >
      <ArrowRightEndOnRectangleIcon class="icon" />
    </button>
  </header>
</template>

<style scoped>
  .top-bar{
    width: 100%;
    position: fixed;
    background-color: #1F2026;
    border-bottom: 1px solid #333335;
    padding: 20px 120px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .button-layout{
    color: #fff;
    cursor: pointer;
    background-color: #1C1D21;
    border-radius: 10px;
    padding: 10px 16px;
    border: 0.5px solid #333335;
    box-shadow: 0px 4px 4px 0px #1F2026;
  }

  .icon {
    width: 26px;
    height: 26px;
  }
</style>