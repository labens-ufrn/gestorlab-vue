import { createRouter, createWebHistory } from 'vue-router';
import HomeViewVue from '@/views/home/HomeView.vue';
import PageAcess from '@/views/pageAcess/PageAcess.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: HomeViewVue
    },
    {
      path: '/signup',
      name: 'signup',
      component: PageAcess
    },
  ]
});

export default router;
