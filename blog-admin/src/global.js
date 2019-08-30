import Vue from 'vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { $api, $storage, $auth, $validator } from '@/helper'
import './plugins/element.js'
import VueJsonp from 'vue-jsonp'

Vue.use(mavonEditor)
Vue.use(VueJsonp)

Vue.prototype.$api = $api
Vue.prototype.$auth = $auth
Vue.prototype.$storage = $storage
Vue.prototype.$validator = $validator

NProgress.configure({
  easing: 'ease',
  speed: 400,
  showSpinner: false
})
