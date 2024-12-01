import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: {
        path: '/home/1'
      },
      name: 'home',
      children: [
        {
          path: '/home/:page',
          name: 'home-page',
          component: () => import('@/views/home.vue')
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

      ]
    },
    {
      path: '/details/:media/:id',
      name: 'details',
      component: () => import('@/views/Details/details.vue')
    },
    {
      path: '/favorite/:page',
      name: 'favorite',
      component: () => import('@/views/Favorite/favorite.vue')
    },
  ]
})

export default router
