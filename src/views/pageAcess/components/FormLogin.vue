<script setup lang="ts">
import {ref} from 'vue';
import { ArrowRightCircleIcon } from '@heroicons/vue/24/solid';
import API from '@/services/index';
import { useRouter } from 'vue-router';
const router = useRouter();

//Variaveis
let username = ref<string>();
let password = ref<string>();

//Eventos
const emit = defineEmits(['event']);

//Functions
function handleClickEmit(){
  const data = false;
  emit('event', data);
}

function handleRouter() {
  router.push('/dashboard');
}

async function login() {
  try {
    const formData = new FormData();
    formData.append('username', username.value || '');
    formData.append('password', password.value || '');

    const response = await API.post('/usuarios/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const token = response.data.access_token;
    document.cookie = token;
    handleRouter();
  } catch (e) {
    console.error('Erro ao fazer login', e);
  }
}
</script>

<template>
  <form @submit.prevent="login()">
    <div class="form-group">
      <label for="username">E-mail</label>
      <input
        v-model="username"
        placeholder="digite seu e-email"
        type="text"
        id="username"
        name="username"
        required
      >
    </div>
    <div class="form-group">
      <label for="username">Senha</label>
      <input
        v-model="password"
        placeholder="digite sua senha"
        type="text"
        id="username"
        name="username"
        required
      >
    </div>
    <a href="">Esqueceu sua senha?</a>
    <button
      type="submit"
      class="button-login"
    >
      <p>Entrar</p>
    </button>
    <button
      @click.prevent="handleClickEmit()"
      class="button-card"
    >
      <p>Cadastre-se gratuitamente!</p>
      <ArrowRightCircleIcon class="icon" />
    </button>
  </form>
</template>

<style scoped>
  form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  font-size: 0.8rem;
  font-family: 'Inter', sans-serif;
  font-weight: 300;
}

a{
  color: #fff;
  cursor: pointer;
  font-size: 0.7rem;
  font-weight: 300;
  font-style: oblique;
}

a:hover {
  text-decoration: solid;
  color: #fff;
}

.form-group {
  display: flex;
  gap: 6px;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

input, select {
  width: 100%;
  color: #fff;
  padding: 12px 16px;
  background-color: #18191C;
  border-radius: 10px;
  border: #333335 solid 1px;
}

.button-login {
  cursor: pointer;
  border: none;
  padding: 12px 16px;
  color: #fff;
  font-size: 0.8rem;
  font-weight: 700;
  background-color: #044FE0;
  border-radius: 10px;
  width: 100%;
}

.button-card {
  width: 100%;
  border: none;
  cursor: pointer;
  justify-content: space-between;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 16px;
  font-size: 0.8rem;
  font-weight: 600;
  background-color: #18191C;
  color: #fff;
}

.icon {
  height: 20px;
  width: 20px;
  color: #fff;
}
</style>