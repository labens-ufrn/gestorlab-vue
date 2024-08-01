<script setup lang="ts">
import { useRouter, RouterView, RouterLink } from 'vue-router';
import LoadingSpinner from '@/components/LoadingPage.vue';
import { useLoadingStore } from '@/stores/loading';
import {chooseListMenu} from '@/utils';
import { authStore } from '@/stores/auth';
import { userStore } from '@/stores/user';
import { permStore} from '@/stores/perm';
import {ref, onMounted, watchEffect, toRaw} from 'vue';
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
onMounted(async()=> {
  isLoadingDash.value = true;
  await user.setUser(auth.getToken);
  getInitComponent();
  isLoadingDash.value = false;
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

function changeLab(labID: any, index: number) {
  const labChoice = listLaboratory.value.find((item: any)=> item.id === labID);
  user.changeLabInState(toRaw(labChoice), index);
  getInitComponent();
}

async function handlePermLab(value: any, id_user: string){
  if (value.length !== 0 && value !== null){
    let permList = await perm.getPermissionsLab();
    let permLab = value.find((item: any) => item.id_user === id_user);
    let selectedPerm = permList.find((item: any) => item.id === permLab.perm_id);
    return selectedPerm.title;
  } else {
    return 'Membro';
  }
}

async function getInitComponent() {
  userLocal.value = user.getUser;
  listLaboratory.value = user.getlaboratorys;
  selectedLaboratory.value = user.getlaboratory;
  
  if (userLocal.value.permissoes[0].title === 'Admin'){
    openForPermition.value = 2;
    listMenu.value = chooseListMenu(openForPermition.value);
  } else {
    if( listLaboratory.value!== null){
      if(selectedLaboratory.value.coordenador_id === userLocal.value.id){
        openForPermition.value = 1;
        listMenu.value = chooseListMenu(openForPermition.value);
      }else {
        permUserLab.value = await handlePermLab(selectedLaboratory.value.lista_perm, userLocal.value.id);
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
      switch (userLocal.value.permissoes[0].title) {
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
  <LoadingSpinner v-show="isLoadingDash" />
  <QLayout
    v-show="!isLoadingDash"
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
            <div class="menu-button-content">
              <span>Gestor<strong>Lab</strong></span>
              <QIcon
                size="1.4rem"
                name="arrow_drop_down"
              />
            </div>
            <q-menu
              v-if="listLaboratory !== null && userLocal.permissoes[0].title !== 'Admin'"
            >
              <q-list style="min-width: 300px; background-color: #1F2026; border: 1px solid #333335">
                <div class="menu-header">
                  <span>{{ userLocal.email }}</span>
                </div>
                <q-item
                  class="q-item"
                  v-for="(lab, index) in listLaboratory"
                  :key="lab.id"
                  clickable
                  @click="changeLab(lab.id, index)"
                >
                  <div class="menu-lab-profile">
                    <QItemSection avatar>
                      <img
                        class="img-menu"
                        v-if="lab.image"
                        :src="`${lab?.image}`"
                        alt="Imagem do Laboratório"
                      >
                    </QItemSection>
                    <QItemSection>
                      <p class="nameUser">
                        {{ lab.nome }}
                      </p>
                    </QItemSection>
                  </div>
                  <QIcon
                    v-show="lab.check !== false"
                    name="check"
                    size="1.6rem"
                    color="primary"
                  />
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
    color: #fff;
    border: 1px solid $contour;
    cursor: pointer;
    background-color: transparent;
    border-radius: 10px;
    padding: 12.5px 20px;
  }

  .menu-button-content{
    font-family: 'Inter' sans-serif;
    font-weight: 500;
    font-size: 1.6rem;
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .button-bar {
    color: #fff;
    border: 1px solid $contour;
    cursor: pointer;
    background-color: transparent;
    border-radius: 10px;
    padding: 6px 20px;
  }

  .nameUser{
    margin: 0px;
    font-size: 1rem;
    font-weight: 600;
  }

  .menu-header {
    padding: 8px 12px;
    border-bottom: 1px solid $contour;
    width: 100%;
  }

  .menu-header span {
    font-size: 0.7rem;
  }

  .menu-lab-profile {
    display: flex;
    align-items: center;
  }

  .q-item {
    justify-content: space-between;
    display: flex; 
    align-items: center; 
    padding: 20px;
  }

  .img-menu{
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .img-avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  strong {
    font-weight: 700;
    color: $secondary;
  }
</style>