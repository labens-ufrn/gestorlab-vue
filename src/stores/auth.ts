import { defineStore } from 'pinia';
import API from '@/services/index';

export const authStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token'), // Recupera o token do localStorage
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
        this.token = token;
        localStorage.setItem('token', token);
        return true;
      } catch (err) {
        return false;
      }
    },
    async authAutenticate() {
      try {
        await API.get('/usuarios/auth', {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        return true;
      } catch (error) {
        return false;
      }
    },
    logout() {
      this.token = null;
      localStorage.removeItem('token'); // Remove o token do localStorage ao fazer logout
    }
  }
});
