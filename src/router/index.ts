import { createRouter, createWebHashHistory } from 'vue-router'
import FormsPage from '@/views/FormsPage.vue'

const routes = [
  {
    path: '/',
    component: FormsPage,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
