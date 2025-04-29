import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
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
  ],
})

export default router
