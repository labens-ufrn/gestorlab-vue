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
    component: PageAcess,
  },
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
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = window.document.cookie;

    if (!token || token === '') {
      next('/signup');
    } else {
      try {
        await API.get('/usuarios/auth', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        next();
      } catch (error) {
        window.document.cookie = '';
        next('/signup');
      }
    }
  } else {
    next();
  }
});

export default router;