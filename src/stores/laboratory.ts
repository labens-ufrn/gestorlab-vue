import { defineStore } from 'pinia';
import API from '@/services/index';

export const labStore = defineStore('lab', {
  actions: {
    async getLaboratorys(id: string) {
      try {
        const response = await API.get('/laboratorios');
        const list = response.data;
        console.log('Lista da chamada:', list);
        if (list.length !== 0) {
          console.log('Entrei no if');
          const listAux: Array<any> = [];
          list.forEach((element: any) => {
            const isContent = element.membros.some((membro: any) => membro.id === id);
            if (!isContent) {
              listAux.push(element);
            }
          });
          console.log(listAux);
          return listAux;
        } else {
          console.log('Entrei no else');
          return [];
        }
      } catch (error) {
        return error;
      }
    }
  }
});