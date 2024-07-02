<script setup lang="ts">
const emit = defineEmits(['event']);

//functions
function handleClickEmit(){
  const data = false;
  emit('event', data);
}
</script>

<template>
  <form action="">
    <div class="form-group">
      <label for="username">E-mail</label>
      <input
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
        placeholder="digite sua senha"
        type="text"
        id="username"
        name="username"
        required
      >
    </div>
    <a href="">Esqueceu sua senha?</a>
    <button
      @click="()=>{}"
      class="button-login"
    >
      <p>Entrar</p>
    </button>
    <button
      @click.prevent="handleClickEmit()"
      class="button-card"
    >
      <p>Cadastre-se gratuitamente!</p>
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
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 16px;
  font-size: 0.8rem;
  font-weight: 600;
  background-color: #18191C;
  color: #fff;
}
</style>