import { createRouter, createWebHistory } from 'vue-router'
import NewView from '../views/NewView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/new',
      name: 'new',
      component: NewView
    },
    {
      path: '/men',
      name: 'men',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/MenView.vue')
    },
    {
      path: '/women',
      name: 'women',
      component: () => import('../views/WomenView.vue')
    },
    {
      path: '/createAccount',
      name: 'createAccount',
      component: () => import('../views/CreateAccountView.vue')
    },
    {
      path: '/userAccount',
      name: 'userAccount',
      component: () => import('../views/UserAccountView.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue')
    },
    {
      path: '/product/:productId',
      name: 'product',
      component: () => import('../views/ProductView.vue'),
    },
  ]
})

export default router
