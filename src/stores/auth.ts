import { defineStore } from 'pinia';
import API from '@/services/index';

export const authStore = defineStore('auth', {
  state: () => ({
    token: '',
  }),
  actions: {
    async authLogin(formData: FormData) {
      try {
        const response = await API.post('/usuarios/login', formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
        const token = response.data.access_token;
        window.document.cookie = token;
        return true;
      } catch (err) {
        return false;
      }
    },
    async authAutenticate(token: string) {
      try {
        await API.get('/usuarios/auth', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return true;
      } catch (error) {
        return true;
      }
    }
  }
});
