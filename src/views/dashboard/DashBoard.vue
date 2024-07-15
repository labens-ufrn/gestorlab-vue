<script setup lang="ts">
import { useRouter } from 'vue-router';
import {ref} from 'vue';
import { QDrawer, QLayout, QIcon, QScrollArea, QList, QItem, QItemSection, QSeparator, QPageContainer, QPage, QHeader, QToolbar, QBtn, QToolbarTitle} from 'quasar';

//Variaveis
let drawer = ref(false);
let menuList = [
  {
    label: 'Imagem',
    icon: 'photo_camera',
    separator: true
  }
];

//Navegação
const router = useRouter();

//function
function handleRouter() {
  router.push('/signup');
}

function clearAcess(){
  window.document.cookie = 'null';
  handleRouter();
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
        <q-btn
          flat
          @click="drawer = !drawer"
          round
          dense
          icon="menu"
        />
        <q-toolbar-title>
          <img src="@/assets/imgs/GestorLAB (1).svg">
        </q-toolbar-title>
        
        <QBtn
          @click.prevent="clearAcess()"
          class="button-layout"
        >
          <QIcon
            name="logout"
            size="1.2rem"
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
        <QList>
          <template
            v-for="(menuItem, index) in menuList"
            :key="index"
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
        <p
          v-for="n in 15"
          :key="n"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias a adipisci, dolore vitae odit, quidem consequatur optio voluptates asperiores pariatur eos numquam rerum delectus commodi perferendis voluptate?
        </p>
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
    border: 0.5px solid #333335;
    box-shadow: 0px 4px 4px 0px #1F2026;
  }

  .box-menu{
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .icon {
    width: 26px;
    height: 26px;
  }
</style>