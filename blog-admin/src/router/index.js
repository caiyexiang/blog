import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import beforeEachHooks from './beforeEachHooks'
import routes from './routes'

Vue.use(Router)

const routerInstance = new Router({
  mode: 'history',
  routes: routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

Object.values(beforeEachHooks).forEach(hook => {
  routerInstance.beforeEach(hook)
})

routerInstance.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
routerInstance.afterEach(() => {
  NProgress.done()
})

export default routerInstance
