import { createRouter, createWebHistory } from 'vue-router';
import { authStore } from '@/stores/auth';
import { useLoadingStore } from '@/stores/loading';
import { userStore } from '@/stores/user';

const HomeViewVue = () => import('@/views/home/HomeView.vue');
const PageAcess = () => import('@/views/pageAcess/PageAcess.vue');
const DashBoard = () => import('@/views/dashboard/DashBoard.vue');
const PedidosAcess = () => import('@/views/dashboard/components/PedidosAcess.vue');
const Profile = () => import('@/views/dashboard/components/MyProfile.vue');
const Timeline = () => import('@/views/dashboard/components/timeline/TimeLine.vue');
const Laboratory = () => import('@/views/dashboard/components/MyLaboratory.vue');
const CreateLab = () => import('@/views/createLab/CreateLab.vue');

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeViewVue
  },
  {
    path: '/createLab',
    name: 'createLab',
    component: CreateLab,
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
    redirect: '/dashboard/timeline',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'timeline',
        name: 'time-line',
        component: Timeline,
      },
      {
        path: 'pedidosAcess',
        name: 'pedidos-acess',
        component: PedidosAcess,
      },
      {
        path: 'profile',
        name: 'profile',
        component: Profile,
      },
      {
        path: 'laboratory',
        name: 'laboratory',
        component: Laboratory,
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
  const loadingStore = useLoadingStore();
  const user = userStore();
  function isCoordOrNot() {
    const usuario: any = user.getUser;
    if (usuario.permissoes[0].title === 'Coordenador') {
      if (usuario.primeiro_acesso === true) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    loadingStore.setLoading(true);
    const response = await auth.authAutenticate();
    loadingStore.setLoading(false);

    if (response === false) {
      next('/pageAcess');
      return;
    } else {
      if (isCoordOrNot()) {
        next('/createLab');
        return;
      } else {
        next();
      }
    }
  }
  next();

});

export default router;