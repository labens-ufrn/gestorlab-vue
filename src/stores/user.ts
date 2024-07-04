import { defineStore } from 'pinia';
import API from '@/services/index';

export const userStore = defineStore('user', {
  state: () => ({
    user: null,
  }),

  actions: {
    async createUser(usuario: any) {
      try {
        const response = await API.post('/usuarios/signup', {
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
        this.user = response.data;
        return true;
      } catch (error) {
        return error;
      }
    }
  }
}); 