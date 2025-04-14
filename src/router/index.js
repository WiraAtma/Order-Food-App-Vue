import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminView from '@/views/AdminView.vue'
import LoginView from '@/views/LoginView.vue'
import BookmarkView from '@/views/BookmarkView.vue';
import OrderView from '@/views/OrderView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/bookmark',
      name: 'bookmark',
      component: BookmarkView
    },
    {
      path: '/order',
      name: 'order',
      component: OrderView
    },
  ],
});

export default router
