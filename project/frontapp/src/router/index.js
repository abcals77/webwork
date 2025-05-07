import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'), // 늦게 로드
    },
    {
      path: '/boardList',
      name: 'boardList',
      component: () => import('../views/BoardList.vue')
    },
    {
      path: '/boardInfo',
      name: 'boardInfo',
      component: () => import('../views/BoardInfo.vue')
    },
    {
      path: '/boardForm',
      name: 'boardForm',
      component: () => import('../views/BoardForm.vue')
    },
    {
      path: '/customerList',
      name: 'customerList',
      component: () => import('../views/CustomerList.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/boardTable',
      name: 'boardTable',
      component: () => import('../views/BoardTable.vue')
    },
  ],
})

export default router
