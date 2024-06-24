<script setup lang="ts">

</script>

<template>
  <form
    action="/submit"
    method="post"
  >
    <div class="form-group">
      <label for="primeiro-nome">Primeiro nome</label>
      <input
        type="text"
        id="primeiro-nome"
        name="primeiro-nome"
        required
      >
    </div>
    <div class="form-group">
      <label for="segundo-nome">Segundo nome</label>
      <input
        type="text"
        id="segundo-nome"
        name="segundo-nome"
        required
      >
    </div>
    <div class="form-group">
      <label for="email">E-mail</label>
      <input
        type="email"
        id="email"
        name="email"
        required
      >
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="">Data de nascimento</label>
        <input
          type="date"
          id="date"
          name="date"
        >
      </div>
      <div class="form-group">
        <label for="genero">Gênero</label>
        <select
          id="genero"
          name="genero"
        >
          <option value="masculino">
            Masculino
          </option>
          <option value="feminino">
            Feminino
          </option>
          <option value="outro">
            Outro
          </option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="telefone">Telefone</label>
        <input
          type="tel"
          id="telefone"
          name="telefone"
          placeholder="00-00000-0000"
        >
      </div>
      <div class="form-group">
        <label for="cargo">Cargo</label>
        <select
          id="cargo"
          name="cargo"
        >
          <option value="admin">
            Admin
          </option>
          <option value="coordenador">
            Coordenador
          </option>
          <option value="membro">
            Membro
          </option>
        </select>
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="senha">Senha</label>
        <input
          type="password"
          id="senha"
          name="senha"
          required
        >
      </div>
      <div class="form-group">
        <label for="confirm-senha">Confirma senha</label>
        <input
          type="password"
          id="confirm-senha"
          name="confirm-senha"
          required
        >
      </div>
    </div>
    <button
      class="button-save"
      name="button-save"
      type="submit"
    >
      Cadastrar
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

.form-row {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;
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
.button-save {
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
</style>