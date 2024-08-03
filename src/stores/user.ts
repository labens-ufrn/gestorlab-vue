import { defineStore } from 'pinia';
import API from '@/services/index';
import { pendingStore } from '@/stores/pending';
import { toRaw } from 'vue';

export const userStore = defineStore('user', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || 'null') as Object | null,
    laboratorys: JSON.parse(localStorage.getItem('laboratorys') || 'null') as any | null,
    laboratory: JSON.parse(localStorage.getItem('laboratory') || 'null') as any | null,
  }),

  getters: {
    getUser(state) {
      return toRaw(state.user);
    },
    getlaboratorys(state) {
      return toRaw(state.laboratorys);
    },
    getlaboratory(state) {
      return toRaw(state.laboratory);
    }
  },

  actions: {
    changeLabInState(lab: any, index: number) {
      this.laboratorys.forEach((item: any) => {
        if (item.id !== lab.id) {
          item.check = false;
        }
      });
      this.laboratorys[index].check = true;
      localStorage.setItem('laboratory', JSON.stringify(lab));
      this.laboratory = lab;
    },
    async setUser(token: string) {
      try {
        if (this.laboratory === null) {
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
            listAux.forEach((item) => {
              item.check = false;
            });
            localStorage.setItem('laboratorys', JSON.stringify(listAux));
            this.laboratorys = listAux;
            listAux[0].check = true;
            localStorage.setItem('laboratory', JSON.stringify(listAux[0]));
            this.laboratory = listAux[0];
          }
        } else {
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
            listAux.forEach((item) => {
              item.check = false;
            });
            listAux.forEach((item) => {
              if (item.id === this.laboratory.id) {
                item.check = true;
              }
            });
            localStorage.setItem('laboratorys', JSON.stringify(listAux));
            this.laboratorys = listAux;
            this.laboratory.check = true;
            localStorage.setItem('laboratory', JSON.stringify(this.laboratory));
          }
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
    },
    async sendEmailPasswordRecovery(email: string) {
      try {
        await API.post('/usuarios/sendEmail', {
          email: email
        });
        return true;
      } catch (error: any) {
        return false;
      }
    }
  },
}); 