import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function createRouter() {
  const routes = [
    {
      path: '/',
      name: 'Home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/article/:id',
      name: 'Article',
      component: () => import('./views/Article.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('./views/About.vue')
    }
  ]

  const router = new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes
  })

  return router
}

export default createRouter
