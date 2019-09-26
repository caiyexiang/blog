'use strict'

import Vue from 'vue'
import axios from 'axios'

const isServer = process.env.VUE_ENV === 'server'

const config = {
  baseURL: isServer ? 'http://localhost:3000/api' : '/api',
  timeout: 6000
}

const _axios = axios.create(config)
_axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'
_axios.interceptors.request.use(cfg => cfg, err => Promise.reject(err))

// Add a response interceptor
_axios.interceptors.response.use(
  res => res.data,
  err => {
    const { response = {} } = err
    switch (response.status) {
      case 404:
        return Promise.resolve('未找到资源')
      case 500:
        return Promise.reject('服务器错误')
    }
    if (response.data && response.data.msg) {
      return Promise.reject(response.data.msg)
    } else {
      return Promise.reject(`Ajax错误`)
    }
  }
)

Vue.axios = _axios
Vue.prototype.axios = _axios
Vue.prototype.$axios = _axios
