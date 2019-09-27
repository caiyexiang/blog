import Vue from 'vue'
import './plugins/axios.js'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Button, Pagination, Input, Message } from 'element-ui'

Vue.use(Button)
Vue.use(Pagination)
Vue.use(Input)

Vue.prototype.$message = Message
Vue.prototype.$error = msg => {
  Vue.prototype.$message({ message: msg, type: 'error' })
}
Vue.prototype.$warning = msg => {
  Vue.prototype.$message({ message: msg, type: 'warning' })
}
Vue.prototype.$success = msg => {
  if (!msg) {
    Vue.prototype.$message({ message: '成功', type: 'success' })
  } else {
    Vue.prototype.$message({ message: msg, type: 'success' })
  }
}

NProgress.configure({
  easing: 'ease',
  speed: 400,
  showSpinner: false
})
