import { createRouter, createWebHistory } from 'vue-router';
import HomeViewVue from '@/views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: HomeViewVue
    },
  ]
});

export default router;
