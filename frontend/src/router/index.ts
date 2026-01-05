import { createRouter, createWebHistory } from 'vue-router'

// 1. IMPORTAMOS CON EL NOMBRE EXACTO QUE PUSISTE EN EL PASO 1
import Login from '../views/Login.vue'
import RecordsView from '../views/RecordsView.vue' 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/records',
      name: 'records',
      component: RecordsView
    }
  ]
})

export default router