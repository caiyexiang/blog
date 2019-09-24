import Vue from 'vue'

export default {
  post: function(url, data) {
    return Vue.axios({ url, method: 'post', data })
  },
  get: function(url, params) {
    return Vue.axios({ url, method: 'get', params })
  },
  put: function(url, data) {
    return Vue.axios({ url, method: 'put', data })
  },
  patch: function(url, data) {
    return Vue.axios({ url, method: 'patch', data })
  },
  delete: function(url) {
    return Vue.axios({ url, method: 'delete' })
  }
}
