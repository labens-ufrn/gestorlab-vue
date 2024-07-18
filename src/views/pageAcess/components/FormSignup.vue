<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import API from '@/services/index';
import type { Genero, Permission, Imagefile} from '@/types';
import {removerCaracter} from '@/utils';
import {userStore} from '@/stores/user';
import { QIcon } from 'quasar';

// gerencia de estado
const user = userStore();
// Variaveis
const listGeneros = ref<Array<Genero>>();
let selectGenero = ref<Genero>();
const listPermissions = ref<Array<Permission>>();
let selectPermission = ref<Permission>();
let matricula = ref<String>();
let tel = ref<String>();
let primeiro_nome = ref<String>();
let segundo_nome = ref<String>();
let email = ref<String>();
let data_nascimento = ref<String>();
let senha = ref<String>();
let confirmPassword = ref<String>();

let visible = ref<boolean>(true);
let confirmVisible = ref<boolean>(true);
let errorPassword = ref<boolean>(false);

//Variaveis da imagem 
const selectedImage = ref<Imagefile | null>(null);
const imageBase64 = ref<string | null>(null);

// Eventos
const emit = defineEmits(['event']);

watch(confirmPassword, (newPassword) => {
  if(senha.value !== '' && senha.value !== undefined && senha.value !== null){
    if(newPassword !== senha.value){
      errorPassword.value = true;
    } else {
      errorPassword.value = false;
    }
  }
 
});
//Functions
onMounted(()=> {
  getGeneros();
  getPermissions();
});

async function getGeneros(){
  try{
    const response: any = await API.get('/generos');
    listGeneros.value = response.data;
    selectGenero.value = response.data[0];
  }catch(e){
    return;
  }
}

function onImageChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file) return;

  selectedImage.value = file;

  const reader = new FileReader();
  reader.onload = (event) => {
    imageBase64.value = event.target?.result as string;
  };
  reader.readAsDataURL(file);
}

async function getPermissions(){
  try{
    const response: any = await API.get('/permissoes');
    listPermissions.value = response.data;
    selectPermission.value = response.data[0];
  }catch(e){
    return;
  }
}

function handleClickEmit(){
  const data = true;
  emit('event', data);
}

async function signup(){
  const object: any = {
    primeiro_nome: primeiro_nome.value,
    segundo_nome: segundo_nome.value,
    data_nascimento: data_nascimento.value,
    genero: selectGenero.value?.id,
    email: email.value,
    image: imageBase64.value,
    matricula: removerCaracter(matricula.value),
    tel: removerCaracter(tel.value),
    senha: senha.value,
    permissoes: [selectPermission.value?.id]
  };
  const response = await user.createUser(object);
  if(response === true){
    alert('Usuário criado com sucesso!');
    handleClickEmit();
  } else {
    alert(response);
  }
  
}
</script>

<template>
  <form @submit.prevent="signup()">
    <div class="form-group">
      <label for="image">Imagem de perfil</label>
      <input
        type="file"
        @change="onImageChange"
        accept="image/*"
        id="image"
        name="image"
        placeholder="escolha uma imagem"
      >
    </div>
    <div class="form-group">
      <label for="primeiro-nome">Primeiro nome</label>
      <input
        v-model="primeiro_nome"
        type="text"
        id="primeiro-nome"
        name="primeiro-nome"
        placeholder="digite seu primeiro nome"
        required
      >
    </div>
    <div class="form-group">
      <label for="segundo-nome">Segundo nome</label>
      <input
        v-model="segundo_nome"
        type="text"
        placeholder="digite seu segundo nome"
        id="segundo-nome"
        name="segundo-nome"
        required
      >
    </div>
    <div class="form-group">
      <label for="matricula">Matricula</label>
      <input
        v-model="matricula"
        v-mask="'###########'"
        placeholder="digite sua matricula"
        type="text"
        id="matricula"
        name="matricula"
        required
      >
    </div>
    <div class="form-group">
      <label for="email">E-mail</label>
      <input
        v-model="email"
        placeholder="digite seu e-mail"
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
          v-model="data_nascimento"
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
          v-model="selectGenero"
        >
          <option
            v-for="(item, index) in listGeneros"
            :key="index"
            :value="item"
          >
            {{ item.title }}
          </option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="telefone">Telefone</label>
        <input
          v-model="tel"
          v-mask="['(##) ####-####', '(##) #####-####']"
          required
          type="tel"
          id="telefone"
          name="telefone"
          placeholder="(00) 09939-0000"
        >
      </div>
      <div class="form-group">
        <label for="cargo">Cargo</label>
        <select
          id="cargo"
          name="cargo"
          v-model="selectPermission"
        >
          <option
            v-for="(item, index) in listPermissions"
            :key="index"
            :value="item"
          >
            {{ item.title }}
          </option>
        </select>
      </div>
    </div>

    <div class="form-colunm">
      <div class="form-row">
        <div class="form-group">
          <label for="senha">Senha</label>
          <div class="password-input">
            <input
              v-model="senha"
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
              <QIcon
                name="visibility_off"
                v-if="visible"
                size="1rem"
              />
              <QIcon
                v-else
                name="visibility"
                size="1rem"
              />
            </span>
          </div>
        </div>
        <div class="form-group">
          <label for="confirm-senha">Confirma senha</label>
          <div class="password-input">
            <input
              v-model="confirmPassword"
              class="password"
              :type="confirmVisible? 'password' : 'text'"
              placeholder="confirme sua senha"
              id="confirm-senha"
              name="confirm-senha"
              required
            >
            <span
              class="eye"
              @click="confirmVisible=!confirmVisible"
            >
              <QIcon
                name="visibility_off"
                v-if="confirmVisible"
                size="1rem"
              />
              <QIcon
                v-else
                name="visibility"
                size="1rem"
              />
            </span>
          </div>
        </div>
      </div>
      <span
        class="error"
        v-if="errorPassword"
      >As senhas não são iguais!</span>
    </div>
    <button
      :class="errorPassword ? 'button-save-disabled': 'button-save'"
      name="button-save"
      type="submit"
      :disabled="errorPassword ? true : false"
    >
      Cadastrar
    </button>
    <button
      @click.prevent="handleClickEmit()"
      class="button-card"
    >
      <p>Já tem cadastro?</p>
      <QIcon
        name="east"
        size="1rem"
      />
    </button>
  </form>
</template>

<style lang="scss" scoped>
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

p{
  margin: 0px;
}

.form-row {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;
}

.form-colunm {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4px;
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
  color: $textColor;
  padding: 12px 16px;
  padding-left: 8px;
  background-color: $dark;
  border-radius: 10px;
  border: $contour solid 1px;
}

.password {
  padding-right: 30px;
}

.button-save {
  cursor: pointer;
  border: none;
  padding: 12px 16px;
  color: $textColor;
  font-size: 0.8rem;
  font-weight: 700;
  background-color: $secondary;
  border-radius: 10px;
  width: 100%;
}

.button-save-disabled{
  border: none;
  padding: 12px 16px;
  color: $textDisabled;
  font-size: 0.8rem;
  font-weight: 700;
  background-color: $disabledButton;
  border-radius: 10px;
  width: 100%;
}
.button-card {
  width: 100%;
  justify-content: space-between;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 16px;
  font-size: 0.8rem;
  font-weight: 600;
  background-color: $dark;
  color: $textColor;
}

.icon {
  width: 20px;
  height: 20px;
  color: $textColor;
}

.error {
  width: 100%;
  font-size: 0.6rem;
  color: $error;
  font-weight: 800;
  font-style: italic;
}
</style>