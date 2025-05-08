import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/bookList',
      name: 'bookList',
      component: () => import('../views/product/BookListView.vue'),
    },
    {
      path: '/bookInfo',
      name: 'bookInfo',
      component: () => import('../views/product/BookInfoView.vue'),
    },
    {
      path: '/bookUpdateForm',
      name: 'bookUpdateForm',
      component: () => import('../views/product/BookUpdateFormView.vue'),
    },
  ],
})

export default router
