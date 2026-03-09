import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProjectView from '../views/ProjectView.vue'

let isInitialNavigation = true

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/projects/:slug',
      name: 'project',
      component: ProjectView,
    },
  ],
  scrollBehavior(to, _from, savedPosition) {
    const isFirstNavigation = isInitialNavigation
    isInitialNavigation = false

    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      if (isFirstNavigation) {
        const url = new URL(window.location.href)
        url.hash = ''
        window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}`)

        return { top: 0, left: 0, behavior: 'auto' }
      }

      return {
        el: to.hash,
        top: 88,
        behavior: 'smooth',
      }
    }

    if (to.path === '/') {
      return { top: 0, left: 0, behavior: 'auto' }
    }

    return { top: 0, left: 0, behavior: 'auto' }
  },
})

export default router
