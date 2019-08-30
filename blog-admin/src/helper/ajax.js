export default {
  post: function (url, data) {
    return window.axios({ url, method: 'post', data })
  },
  get: function (url, params) {
    return window.axios({ url, method: 'get', params })
  },
  put: function (url, data) {
    return window.axios({ url, method: 'put', data })
  },
  patch: function (url, data) {
    return window.axios({ url, method: 'patch', data })
  },
  delete: function (url) {
    return window.axios({ url, method: 'delete' })
  }
}
