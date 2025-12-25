import { createRouter, createWebHistory } from 'vue-router'
import FormsPage from '@/views/FormsPage.vue'

const routes = [
  {
    path: '/',
    component: FormsPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
