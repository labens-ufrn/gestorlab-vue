<template>
  <div class="container-signup">
    <div class="signup">
      <div class="banner" />
      <div class="form-signup">
        <p v-show="option">
          Cadastre-se gratuitamente
        </p>
        <p v-show="!option">
          Acesse sua conta
        </p>
        <FormSignup v-show="option" />
        <FormLogin v-show="!option" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FormLogin from './components/FormLogin.vue';
import FormSignup from './components/FormSignup.vue';
// variables
const option: boolean = false;
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
    height: 100%;
    flex: 3;
    background-image: url('./assets/img-logo-tipo.svg');
    background-size: cover;
}
.form-signup {
    padding: 70px;
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
</style>