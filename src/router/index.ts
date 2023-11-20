import { createRouter, createWebHistory } from 'vue-router'
import NewView from '../views/NewView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/new',
      name: 'new',
      component: NewView,
      meta: { requiresAuth: false },
    },
    {
      path: '/men',
      name: 'men',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/MenView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/women',
      name: 'women',
      component: () => import('../views/WomenView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/createAccount',
      name: 'createAccount',
      component: () => import('../views/CreateAccountView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/userAccount',
      name: 'userAccount',
      component: () => import('../views/UserAccountView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/product/:productId',
      name: 'product',
      component: () => import('../views/ProductView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/test',
      name: 'testProps',
      component: () => import('../views/testPropsView.vue'),
      meta: { requiresAuth: false },
    },
  ]
})

router.beforeEach((to, from, next) => {

  if(to.meta.requiresAuth && !localStorage.getItem("apollo-token")) {
    next ({
      path: '/new',
      name: 'new'
    })
  }
  else {
    next()
  }
   
})

export default router
