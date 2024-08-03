<script setup lang="ts">
import {userStore} from '@/stores/user';
import {ref} from 'vue';
import { QSpinnerDots } from 'quasar';

//state
const user = userStore();

//Variables
let email = ref<string>('');
let loading = ref<boolean>(false);

// function
async function sendEmail(){
  loading.value = true;
  const response = await user.sendEmailPasswordRecovery(email.value);
  alert(response);
  loading.value = false;
}
</script>
<template>
  <div>
    <form @submit.prevent="sendEmail()">
      <p>Escolha um e-mail para enviamos o link de refinição de senha.</p>
      <input
        placeholder="Digite seu email de usuário!"
        required
        v-model="email"
        type="text"
      >
      <button type="submit">
        <QSpinnerDots
          size="20px"
          color="dark"
          v-if="loading"
        />
        <template v-else>
          Enviar
        </template>
      </button>
    </form>
  </div>
</template>
<style scoped lang="scss">
  div{
    padding: 20rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  form{
    padding: 4rem;
    background-color: $dark;
    border: 1px solid $contour;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4rem;
  }

  p{
    font-size: 1.4rem;
    font-weight: 600;
    color: $textColor;
  }

  input{
    width: 50%;
    color: $textColor;
    padding: 12px 16px;
    padding-left: 8px;
    background-color: $dark;
    border-radius: 10px;
    border: $contour solid 1px;
  }

  button{
    border-radius: 0.8rem;
    border: none;
    color: $textColor;
    background-color: $secondary;
    padding: 0.6rem 1rem;
  }
</style>