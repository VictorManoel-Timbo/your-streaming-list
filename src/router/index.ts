import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home.vue')
    },
    {
      path: '/details',
      name: 'details',
      component: () => import('@/views/details.vue')
    },
    {
      path: '/movies',
      name: 'movies',
      component: () => import('@/views/movies.vue')
    },
    {
      path: '/series',
      name: 'series',
      component: () => import('@/views/series.vue')
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: () => import('@/views/favorite.vue')
    },
  ]
})

export default router
