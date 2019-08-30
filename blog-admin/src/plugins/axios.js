'use strict'

import Vue from 'vue'
import axios from 'axios'
const store = require('@/store').default
const router = require('@/router').default

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

/**
 *  主axios实例 /api开头 连接后端
 */
let config = {
  baseURL: process.env.baseURL || '/api',
  timeout: 6000 // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}
const _axios = axios.create(config)
_axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'
const handleRequest = config => {
  config.headers.common['Authorization'] = store.getters.token || ''
  return config
}
_axios.interceptors.request.use(handleRequest, error => Promise.reject(error))
const handleResponseError = error => {
  const { response = {} } = error
  switch (response.status) {
    case 401:
      break
    case 403:
      store.commit('deleteUser')
      router.replace({ name: 'Login' })
      Vue.prototype.$error('登陆信息过期或未登录')
      break
    case 400:
      Vue.prototype.$error('提交表单信息错误')
      break
    case 404:
      Vue.prototype.$error('未找到该资源')
      break
    case 500:
      Vue.prototype.$error('服务器错误')
      break
  }
  if (response.data && response.data.msg) {
    return Promise.reject(response.data.msg)
  } else {
    Vue.prototype.$error('未知错误, 请查看console信息')
    console.error(`[Ajax error] ${response.data}`)
  }
}
_axios.interceptors.response.use(response => response.data, handleResponseError)

/**
 *  图床axios实例 连接 https://sm.ms
 */
let imgConfig = {
  baseURL: '/img',
  timeout: 6000
}
const imgAxios = axios.create(imgConfig)
imgAxios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
const handleImgRequest = config => {
  config.headers.common['Authorization'] = process.env.VUE_APP_IMG_TOKEN
  return config
}
imgAxios.interceptors.request.use(handleImgRequest, error =>
  Promise.reject(error)
)
imgAxios.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
)

/**
 * axios 挂载区域
 */
Plugin.install = function (Vue, options) {
  Vue.axios = _axios
  window.axios = _axios
  window.$img = imgAxios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get () {
        return _axios
      }
    },
    $axios: {
      get () {
        return _axios
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin
