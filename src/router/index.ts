import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:page?',
      name: 'home',
      component: () => import('@/views/home.vue')
    },
    {
      path: '/details/:media/:id',
      name: 'details',
      component: () => import('@/views/details.vue')
    },
    {
      path: '/movies/:page',
      name: 'movies',
      component: () => import('@/views/movies.vue')
    },
    {
      path: '/series/:page',
      name: 'series',
      component: () => import('@/views/series.vue')
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: () => import('@/views/Favorite/favorite.vue')
    },
  ]
})

export default router
