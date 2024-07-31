<script setup lang="ts">
import {ref, onMounted} from 'vue';
import { QCard, QSeparator, QCardSection, QSpinnerDots} from 'quasar';
import {userStore} from '@/stores/user';
import {authStore} from '@/stores/auth';

//state
const user = userStore();
const auth = authStore();
// props
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  idUser:{
    type: String,
    required:true,
  },
  idLab:{
    type: String,
    required:true,
  },
  title: {
    type: String,
    required: true,
    default: 'Title'
  },
  subTitle: {
    type: String,
    required: true,
    default: 'Coordenador'
   
  },
  summary: {
    type: String,
    required: true,
    default: 'Laboratório voltado para o desenvolvimento de software e banco de dados relacional!aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
  }
});

// variables 
let loading = ref<Boolean>(false);

// function
onMounted(async()=> {
  
});

async function changeRegistration(){
  loading.value = true;
  const object = {
    id_user: props.idUser,
    id_lab: props.idLab,
    token: auth.getToken
  };
  const response = await user.setInviteForLab(object);
  if(response === true){
    loading.value = false;
    alert('Pedido enviado!');
  } else {
    loading.value = false;
    alert(response);
  }
}

</script>
<template>
  <q-card
    dark
    bordered
    class="my-card"
  >
    <q-card-section>
      <article>
        <h1>{{ title }}</h1>
        <p>{{ subTitle }}</p>
      </article>
    </q-card-section>
    <q-separator
      dark
    />
    <q-card-section>
      <article>
        <span>{{ summary }}</span>
        <button @click="changeRegistration()">
          <QSpinnerDots
            size="20px"
            color="dark"
            v-if="loading"
          />
          <template v-else>
            Se candidatar
          </template>
        </button>
      </article>
    </q-card-section>
  </q-card>
</template>
<style scoped lang="scss">
  .my-card {
    border: 1px solid $contour;
    box-shadow: 0px 4px 4px 0px $dark;
    width: 20rem;
    height: 22rem;
    background-color: $dark;
  }
  article {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.2rem;
  }

  article h1 {
    line-height: 2rem;
    max-width: 20rem;
    max-height: 4rem;
    font-size: 1.3rem;
    font-weight: 700;
    color: $textColor;
  }

  article p {
    font-size: 1rem;
    max-height: 4rem;
    max-width: 20rem;
    font-weight: 500;
    font-style: normal;
    color: $textDisabled;
  }

  article span {
    max-width: 18rem;
    height: 6rem; 
    font-size: 0.9rem;
    font-weight: 500;
    font-style: italic;
    color: $textColor; 
    overflow: hidden; 
    text-overflow: ellipsis; 
    white-space: normal; 
  }

  button {
    width: 100%;
    border: none;
    cursor: pointer;
    border-radius: 10px;
    padding: 0.7rem;
    font-size: 0.9rem;
    font-weight: 600;
    background-color: $secondary;
    color: $textColor;
  }
</style>