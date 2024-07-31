import { defineStore } from 'pinia';
import API from '@/services/index';

export const labStore = defineStore('lab', {
  actions: {
    async getLaboratorys(id: string) {
      try {
        const response = await API.get('/laboratorios');
        const list = response.data;
        if (list.length !== 0) {
          const listAux: Array<any> = [];
          list.forEach((element: any) => {
            const isContent = element.membros.some((membro: any) => membro.id === id);
            if (!isContent) {
              listAux.push(element);
            }
          });
          return listAux;
        } else {
          return [];
        }
      } catch (error) {
        return error;
      }
    }
  }
});