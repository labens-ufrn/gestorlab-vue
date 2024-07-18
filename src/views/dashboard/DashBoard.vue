<script setup lang="ts">
import { useRouter, RouterView, RouterLink } from 'vue-router';
import { authStore } from '@/stores/auth';
import { userStore } from '@/stores/user';
import {ref, onMounted} from 'vue';
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
  QToolbarTitle
} from 'quasar';

const auth = authStore();
const user = userStore();
//Variaveis
let drawer = ref(false);
let userLocal = ref<any>(null);
let menuList = [
  {
    label: 'Imagem',
    icon: 'photo_camera',
    separator: true,
    link: 'update-image'
  }
];

//Navegação
const router = useRouter();

//function
function handleRouter() {
  router.push('/pageAcess');
}


function clearAcess(){
  auth.logout();
  user.clearUser();
  handleRouter();
}


onMounted(()=> {
  userLocal.value = user.getUser;
});

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
          <img src="@/assets/imgs/GestorLAB (1).svg">
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
          v-ripple
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
            v-for="(menuItem, index) in menuList"
            :key="index"
          >
            <router-link
              class="router-link"
              :to="{name: menuItem.link}"
            >
              <QItem
                clickable
                :active="menuItem.label === 'Outbox'"
                v-ripple
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
      <q-page padding>
        <RouterView />
      </q-page>
    </q-page-container>
  </QLayout>
</template>

<style scoped>
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
    cursor: pointer;
    background-color: #1C1D21;
    border-radius: 10px;
    padding: 10px 16px;
    box-shadow: 0px 4px 4px 0px #1F2026;
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
</style>