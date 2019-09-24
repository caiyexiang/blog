import Vue from 'vue'
import './global.js'
import App from './App.vue'
import createStore from './store/store.js'
import createRouter from './router.js'
import { sync } from 'vuex-router-sync'
import titleMixin from './mixins/title'

Vue.mixin(titleMixin)

export const createApp = () => {
  const store = createStore()
  const router = createRouter()

  sync(store, router)

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return { app, store, router, App }
}
