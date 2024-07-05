<template>
  <div class="container-signup">
    <div class="signup">
      <div class="banner" />
      <div class="form-signup">
        <p v-if="option">
          Acesse sua conta
        </p>
        <p v-else>
          Cadastre-se gratuitamente
        </p>
        <FormLogin
          v-if="option"
          @event="receiveEvent"
        />
        <FormSignup
          @event="receiveEvent"
          v-else
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import FormLogin from './components/FormLogin.vue';
import FormSignup from './components/FormSignup.vue';
import { authStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

// Gerencia de estado
const auth = authStore();

// Navegação
const router = useRouter();

// variables
let option = ref(true);

// definição de eventos
defineEmits(['event']);

//function
onBeforeMount(async()=> {
  let token = window.document.cookie;
  if (token && token !== 'null') {
    const response:Boolean = await auth.authAutenticate(token);
    if(response){
      handleRouter();
    }else {
      return;
    }
  }
});

function handleRouter() {
  router.push('/dashboard');
}

async function receiveEvent(data: boolean){
  option.value = data;
}
</script>

<style scoped>
.container-signup{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.signup{
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-between;
}

.banner {
    background-image: url('./assets/img-logo-tipo.svg');
    flex: 3;
    background-size: cover;
    background-position: center; /* Centraliza a imagem de fundo */
    background-repeat: no-repeat; /* Garante que a imagem de fundo não se repita */
}
.form-signup {
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 40px;
    color: #fff;
    background-color: transparent;
    flex: 1;
}

.form-signup p {
    color: #fff;
    font-size: 1.2rem;
    font-family: 'Roboto', sans-serif;
    font-weight: 600;
}

@media (max-width: 1400px) {
  .banner {
    flex: 2;
  }
}

@media (max-width: 1150px) {
  .banner {
    display: none;
  }
}
</style>