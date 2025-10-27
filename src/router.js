import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from './views/LandingPage.vue';
import LoginPage from './views/LoginPage.vue';
import SignupPage from './views/SignupPage.vue';
import Dashboard from './views/Dashboard.vue';
import TicketManagement from './views/TicketManagement.vue';
import { toast } from 'vue3-toastify';

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage,
  },
  {
    path: '/auth/login',
    name: 'LoginPage',
    component: LoginPage,
  },
  {
    path: '/auth/signup',
    name: 'SignupPage',
    component: SignupPage,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/tickets',
    name: 'TicketManagement',
    component: TicketManagement,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const token = localStorage.getItem('ticketapp_session');
  if (to.meta.requiresAuth && !token) {
    toast.error('Your session has expired — please log in again.');
    return { path: '/auth/login' };
  }
});

export default router;