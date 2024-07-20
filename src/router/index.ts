import { createRouter, createWebHistory } from 'vue-router';
import { authStore } from '@/stores/auth';
import HomeViewVue from '@/views/home/HomeView.vue';
import PageAcess from '@/views/pageAcess/PageAcess.vue';
import DashBoard from '@/views/dashboard/DashBoard.vue';
import UpdateImage from '@/views/dashboard/components/UpdateImage.vue';
import Profile from '@/views/dashboard/components/MyProfile.vue';
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeViewVue
  },
  {
    path: '/pageAcess',
    name: 'page-acess',
    component: PageAcess,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashBoard,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'updateImage',
        name: 'update-image',
        component: UpdateImage,
      },
      {
        path: 'profile',
        name: 'profile',
        component: Profile,
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach(async (to, from, next) => {
  const auth = authStore();
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const response = await auth.authAutenticate();
    if (response === false) {
      next('/pageAcess');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;