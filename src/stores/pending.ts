import { defineStore } from 'pinia';
import API from '@/services/index';

export const pendingStore = defineStore('pending', {
  actions: {
    async releaseAcessUser(object: any, token: string) {
      try {
        await API.post('/pendentes/pendingAccepted', {
          id: object.id,
          id_user: object.id_user,
          list_permissoes: [object.perm]
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return true;
      } catch (e) {
        return false;
      }
    },
    async getPendingInSystem() {
      try {
        const response = await API.get('/pendentes');
        const data = response.data;
        return data;
      } catch (e) {
        return e;
      }
    },
    async setPending(object: any) {
      try {
        await API.post('/pendentes', {
          id_user: object.id,
          matricula_user: object.matricula
        });
      } catch (e) {
        return e;
      }
    }
  }
});