import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App.vue'

Vue.use(Router)

function createRouter() {
  const routes = [
    {
      path: '/bar',
      component: () => import('./components/Bar.vue')
    },
    {
      path: '/foo',
      component: () => import('./components/Foo.vue')
    }
  ]

  const router = new Router({
    mode: 'history',
    routes
  })

  return router
}

export default createRouter
