<script setup lang="ts">
import { QCard, QSeparator, QCardSection, useQuasar, QSpinnerDots} from 'quasar';
import {pendingStore} from '@/stores/pending';
import {permStore} from '@/stores/perm';
import {authStore} from '@/stores/auth';
import {onMounted, ref} from 'vue';

const pending = pendingStore();
const perm = permStore();
const auth = authStore();

let listPending = ref<Array<any>>();
let listPermissao = ref<Array<any>>();
let loading = ref<Boolean>(false);

// Quasar notificantion
const q = useQuasar();

onMounted(async ()=>{
  await initListPending();
  listPermissao.value = await perm.getPermissions();
});

const initListPending = async() => {
  let listaux = await pending.getPendingInSystem();
  listaux.forEach((element: any) => {
    element.perm = '';
  });
  listPending.value = listaux;
};

async function realeseAcess(item:any, index: any){
  loading.value = true;
  const object = {
    id: item.id,
    id_user: item.id_user,
    perm: item.perm.id
  };
  const token = auth.getToken;
  const response = await pending.releaseAcessUser(object, token);
  if(response){
    loading.value = false;
    listPending.value?.splice(index, 1);
    q.notify({
      message: 'Acesso liberado!',
      color: 'green'
    });
  }else {
    loading.value = false;
    q.notify({
      message: 'Não foi possível liberar o acesso, tente outra vez em alguns minutos!',
      color: 'red'
    });
  }
}

</script>
<template>
  <div class="box-pending">
    <span>Pedidos de acesso</span>
    <div class="row q-gutter-md">
      <q-card
        dark
        bordered
        class="my-card"
        v-for="(item,index) in listPending"
        :key="item.id"
      >
        <q-card-section>
          <div class="text-h6">
            {{ item.id_user }}
          </div>
        </q-card-section>

        <q-separator
          dark
        />

        <q-card-section class="card-section">
          <form @submit.prevent="realeseAcess(item, index)">
            <div class="content-card">
              {{ item.data_create }}
              <select
                id="genero"
                name="genero"
                required
                v-model="item.perm"
              >
                <option
                  v-for="permission in listPermissao"
                  :key="permission.id"
                  :value="permission"
                >
                  {{ permission.title }}
                </option>
              </select>
            </div>
            <button type="submit">
              <QSpinnerDots
                size="20px"
                color="dark"
                v-if="loading"
              />
              <template v-else>
                Liberar acesso
              </template>
            </button>
          </form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<style lang="scss">
  .box-pending{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
  }
  span {
    font-size: 2.2rem;
    font-weight: 600;
    color: $textColor;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  .my-card {
    border: 1px solid $contour;
    box-shadow: 0px 4px 4px 0px $dark;
    width: 400px;
    background-color: $dark;
  }

  .content-card {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .card-section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  button {
    border: none;
    cursor: pointer;
    border-radius: 10px;
    padding: 12px;
    font-size: 0.9rem;
    font-weight: 600;
    background-color: $secondary;
    color: $textColor;
  }

  select {
    flex: 1;
    color: $textColor;
    padding: 12px 16px;
    padding-left: 8px;
    background-color: $dark;
    border-radius: 10px;
    border: $contour solid 1px;
  }
</style>