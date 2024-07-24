<script setup lang="ts">
import { useRouter, RouterView, RouterLink } from 'vue-router';
import LoadingSpinner from '@/components/LoadingPage.vue';
import { useLoadingStore } from '@/stores/loading';
import {chooseListMenu} from '@/utils';
import { authStore } from '@/stores/auth';
import { userStore } from '@/stores/user';
import { permStore} from '@/stores/perm';
import {ref, onMounted, watchEffect} from 'vue';
import {
  QDrawer, 
  QLayout, 
  QIcon, 
  QScrollArea, 
  QList, 
  QItem, 
  QItemSection, 
  QSeparator, 
  QPageContainer, 
  QPage, 
  QHeader, 
  QToolbar,
  QBtn, 
  QToolbarTitle,
  QMenu
} from 'quasar';

const auth = authStore();
const user = userStore();
const perm = permStore();
const loadingStore = useLoadingStore();
//Variaveis
const isLoading = ref(false);
const isLoadingDash = ref(false);
let drawer = ref(false);
let userLocal = ref<any>(null);
let listLaboratory = ref<any>(null);
let selectedLaboratory = ref<any>(null);
let permUserLab = ref<any>(null);
let listMenu = ref<any>(null);
let openForPermition = ref<Number>();

//Navegação
const router = useRouter();

//function
onMounted(()=> {
  getInitComponent();
});

watchEffect(() => {
  isLoading.value = loadingStore.isLoading;
});

function handleRouter() {
  router.push('/pageAcess');
}

function clearAcess(){
  auth.logout();
  user.clearUser();
  handleRouter();
}

async function handlePermLab(value: any, id_user: string){
  let permList = await perm.getPermissionsLab();
  let permLab = value.filter((item: any)=> item.id_user === id_user);
  let selectedPerm = permList.filter((item: any) => item.id === permLab.perm_id);

  return selectedPerm.title;
}

function getInitComponent() {
  isLoadingDash.value = false;
  userLocal.value = user.getUser;
  listLaboratory.value = user.getlaboratorys;
  selectedLaboratory.value = user.getlaboratory;

  let userAux = userLocal.value;
  let listLaboratoryAux = listLaboratory.value;
  let selectedLaboratoryAux = selectedLaboratory.value;

  if (userAux.permissoes[0].title === 'Admin'){
    openForPermition.value = 2;
    listMenu.value = chooseListMenu(openForPermition.value);
  } else {
    if( listLaboratoryAux !== null){
      if(selectedLaboratoryAux.coordenador_id === userAux.id){
        openForPermition.value = 1;
        listMenu.value = chooseListMenu(openForPermition.value);
      }else {
        permUserLab.value = handlePermLab(selectedLaboratoryAux.lista_perm, userAux.id);
        switch (permUserLab.value) {
        case ('Supervisor'):
          openForPermition.value = 2;
          listMenu.value = chooseListMenu(openForPermition.value);
          break;
        case ('Membro'):
          openForPermition.value = 0;
          listMenu.value = chooseListMenu(openForPermition.value);
          break;
        case ('Coolaborador'):
          openForPermition.value = 3;
          listMenu.value = chooseListMenu(openForPermition.value);
          break;
        default:
          openForPermition.value = 0;
          listMenu.value = chooseListMenu(openForPermition.value);
        }
      }
    }else{
      switch (userAux.permissoes[0].title) {
      case ('Coordenador'):
        openForPermition.value = 1;
        listMenu.value = chooseListMenu(openForPermition.value);
        break;
      case ('Membro'):
        openForPermition.value = 0;
        listMenu.value = chooseListMenu(openForPermition.value);
        break;
      case ('Colaborador'):
        openForPermition.value = 3;
        listMenu.value = chooseListMenu(openForPermition.value);
        break;
      default:
        openForPermition.value = 0;
        listMenu.value = chooseListMenu(openForPermition.value);
      }
    }
  }
  
}

</script>

<template>
  <QLayout
    view="hHh Lpr lff"
    container
    class="shadow-2 rounded-borders"
  >
    <q-header
      elevated
      class="top-bar"
    >
      <q-toolbar>
        <QBtn
          @click="drawer = !drawer"
          class="button-layout"
        >
          <QIcon
            name="menu"
            size="1.6rem"
          />
        </QBtn>
        <q-toolbar-title>
          <button
            class="button-bar"
          > 
            <span>Gestor<strong>Lab</strong></span>
            <q-menu fit>
              <q-list style="min-width: 300px; background-color: #1F2026">
                <q-item clickable>
                  <q-item-section>New tab</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </button>
        </q-toolbar-title>
        
        <QBtn
          @click.prevent="clearAcess()"
          class="button-layout"
        >
          <QIcon
            name="logout"
            size="1.4rem"
          />
        </QBtn>
      </q-toolbar>
    </q-header>
    <QDrawer
      v-model="drawer"
      show-if-above
      :width="300"
      :breakpoint="500"
      style="background-color: #1F2026; border: 1px #333335 solid;"
    >
      <QScrollArea class="fit">
        <QItem
          class="q-item"
          clickable
          @click="()=>{}"
        >
          <QItemSection avatar>
            <img
              class="img-avatar"
              v-if="userLocal && userLocal.image"
              :src="`${userLocal?.image}`"
              alt="Imagem do Usuário"
            >
          </QItemSection>
          <QItemSection>
            <p class="nameUser">
              {{ userLocal?.primeiro_nome + ' ' + userLocal?.segundo_nome }}
            </p>
          </QItemSection>
        </QItem>
        <QSeparator
          style="background-color: #333335;"
        />
        <QList>
          <template
            v-for="(menuItem, index) in listMenu"
            :key="index"
          >
            <router-link
              class="router-link"
              :to="{name: menuItem.link}"
            >
              <QItem
                clickable
                :active="menuItem.label === 'Outbox'"
              >
                <QItemSection avatar>
                  <QIcon :name="menuItem.icon" />
                </QItemSection>
                <QItemSection>
                  {{ menuItem.label }}
                </QItemSection>
              </QItem>
            </router-link>
            
            <QSeparator
              style="background-color: #333335;"
              :key="'sep' + index"
              v-if="menuItem.separator"
            />
          </template>
        </QList>
      </QScrollArea>
    </QDrawer>

    <q-page-container>
      <q-page
        style="padding: 40px;"
        padding
      >
        <router-view v-if="!isLoading" />
        <loading-spinner v-else />
      </q-page>
    </q-page-container>
  </QLayout>
</template>

<style lang="scss" scoped>
  .top-bar{
    width: 100%;
    position: fixed;
    background-color: #1F2026;
    border-bottom: 1px solid #333335;
    padding: 20px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .button-layout{
    text-transform: none;
    color: #fff;
    cursor: pointer;
    background-color: #1C1D21;
    border-radius: 10px;
    padding: 10px 16px;
    box-shadow: 0px 4px 4px 0px #1F2026;
  }

  .button-bar {
    color: #fff;
    cursor: pointer;
    background-color: transparent;
    border-radius: 10px;
    padding: 8px;
  }

  .nameUser{
    margin: 0px;
    font-size: 1rem;
    font-weight: 600;
  }

  .q-item {
    display: flex; 
    align-items: center; 
    padding: 20px;
  }

  .img-avatar {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }

  strong {
    font-weight: 700;
    color: $secondary;
  }
</style>