import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import AdminLoginView from '../views/AdminLoginView.vue'
import AdminProjectCreateView from '../views/AdminProjectCreateView.vue'
import ApplicationView from '../views/ApplicationView.vue'
import HomeView from '../views/HomeView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import ProjectView from '../views/ProjectView.vue'
import ServicesView from '../views/ServicesView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView,
    },
    {
      path: '/projects/:slug',
      name: 'project',
      component: ProjectView,
    },
    {
      path: '/services',
      name: 'services',
      component: ServicesView,
    },
    {
      path: '/application',
      name: 'application',
      component: ApplicationView,
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: AdminLoginView,
    },
    {
      path: '/admin/projects/new',
      name: 'admin-project-create',
      component: AdminProjectCreateView,
    },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    return { top: 0, left: 0, behavior: 'auto' }
  },
})

export default router
