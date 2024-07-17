import { defineStore } from 'pinia';
import API from '@/services/index';

export const userStore = defineStore('user', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || 'null') as Object | null,
  }),

  getters: {
    getUser(state) {
      return state.user;
    }
  },

  actions: {
    async setUser(token: string) {
      try {
        const response = await API.get('/usuarios/logado', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = response.data;
        const data = {
          ...userData
        };
        localStorage.setItem('user', JSON.stringify(data));
        this.user = data;
      }
      catch (err) {
        return err;
      }
    },
    async createUser(usuario: any) {
      try {
        await API.post('/usuarios/signup', {
          primeiro_nome: usuario.primeiro_nome,
          segundo_nome: usuario.segundo_nome,
          data_nascimento: usuario.data_nascimento,
          genero: usuario.genero,
          email: usuario.email,
          matricula: usuario.matricula,
          tel: usuario.tel,
          senha: usuario.senha,
          list_permissoes: usuario.permissoes
        });
        return true;
      } catch (error) {
        return error;
      }
    },
    clearUser() {
      localStorage.removeItem('user');
    }
  },
}); 