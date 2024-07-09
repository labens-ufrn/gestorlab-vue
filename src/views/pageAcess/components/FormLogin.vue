<script setup lang="ts">
import {ref} from 'vue';
import { ArrowRightCircleIcon, EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/solid';
import { authStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

// Gerencia de estado
const auth = authStore();

//Router
const router = useRouter();

//Variaveis
let username = ref<string>();
let password = ref<string>();
let visible = ref<boolean>(true);

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
  const formData = new FormData();
  formData.append('username', username.value || '');
  formData.append('password', password.value || '');

  const response: boolean = await auth.authLogin(formData);
  
  if (response){
    handleRouter();
  } else {
    alert('Senha ou E-mail invalidos!');
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
      <label for="password">Senha</label>
      <div class="password-input">
        <input
          v-model="password"
          class="password"
          :type="visible ? 'password' : 'text'"
          placeholder="senha"
          id="senha"
          name="senha"
          required
        >
        <span
          class="eye"
          @click="visible=!visible"
        >
          <EyeSlashIcon
            v-if="visible"
            class="icon-password"
          />
          <EyeIcon
            v-else
            class="icon-password"
          />
        </span>
      </div>
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
p{
  margin: 0px;
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