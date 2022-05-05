import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    name: 'config',
    path: '/config',
    component: () => import('@/views/config.vue')
  },
  {
    name: 'test',
    path: '/test',
    component: () => import('@/views/testproject.vue')
  },
  {
    name: 'editor',
    path: '/editor',
    component: () => import('@/views/editor/Index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
