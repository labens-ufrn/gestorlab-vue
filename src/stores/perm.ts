import { defineStore } from 'pinia';
import API from '@/services/index';

export const permStore = defineStore('perm', {
  actions: {
    async getPermissions() {
      try {
        const response: any = await API.get('/permissoes');
        const listPermissions = response.data;
        return listPermissions;
      } catch (e) {
        return e;
      }
    },
    async getPermissionsLab() {
      try {
        const response: any = await API.get('/permissoes/permLab');
        const listPermissions = response.data;
        return listPermissions;
      } catch (e) {
        return e;
      }
    }
  }
});