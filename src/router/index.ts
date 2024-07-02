/* eslint-disable @typescript-eslint/no-unused-vars */
import { createRouter, createWebHistory } from 'vue-router';
import API from '@/services/index';
import HomeViewVue from '@/views/home/HomeView.vue';
import PageAcess from '@/views/pageAcess/PageAcess.vue';
import DashBoard from '@/views/dashboard/DashBoard.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeViewVue
  },
  {
    path: '/signup',
    name: 'signup',
    component: PageAcess
  },
  // Exemplo de rota que requer autenticação
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashBoard,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach(async (to, from, next) => {
  // Verificar se a rota requer autenticação
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = window.document.cookie;

    if (!token || token === '') {
      next('/signup');
    } else {
      try {
        // Substitua pela sua chamada de verificação de token
        await API.get('/usuarios/logado', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        next();
      } catch (error) {
        // Token inválido ou expirado
        window.document.cookie = '';
        next('/signup');
      }
    }
  } else {
    next();
  }
});

export default router;
