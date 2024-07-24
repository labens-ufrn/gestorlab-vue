import { defineStore } from 'pinia';
import API from '@/services/index';
import { pendingStore } from '@/stores/pending';

export const userStore = defineStore('user', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || 'null') as Object | null,
    laboratorys: JSON.parse(localStorage.getItem('laboratorys') || 'null') as any | null,
    laboratory: JSON.parse(localStorage.getItem('laboratorys') || 'null') as any | null,
  }),

  getters: {
    getUser(state) {
      const data = {
        ...state.user
      };
      return data;
    },
    getlaboratorys(state) {
      const data = state.laboratorys;
      return data;
    },
    getlaboratory(state) {
      const data = { ...state.laboratory };
      return data;
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

        const usuario = await API.get(`/usuarios/${userData.id}`);

        const data = {
          ...usuario.data
        };
        localStorage.setItem('user', JSON.stringify(data));
        this.user = data;
        if (data.laboratorios.length === 0) {
          localStorage.setItem('laboratorys', JSON.stringify(null));
          this.laboratorys = null;
        } else {
          const listAux = [
            ...data.laboratorios
          ];
          localStorage.setItem('laboratorys', JSON.stringify(listAux));
          this.laboratorys = listAux;
          localStorage.setItem('laboratory', JSON.stringify(listAux[0]));
          this.laboratory = listAux[0];
        }
      }
      catch (err) {
        return err;
      }
    },
    async createUser(usuario: any) {
      const pending = pendingStore();
      try {
        const response = await API.post('/usuarios/signup', {
          primeiro_nome: usuario.primeiro_nome,
          segundo_nome: usuario.segundo_nome,
          data_nascimento: usuario.data_nascimento,
          genero: usuario.genero,
          email: usuario.email,
          image: usuario.image,
          matricula: usuario.matricula,
          tel: usuario.tel,
          senha: usuario.senha,
          list_permissoes: usuario.permissoes
        });
        const data = {
          ...response.data
        };
        await pending.setPending(data);
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