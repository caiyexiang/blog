import Vue, { PluginObject } from 'vue';
import axios from 'axios';

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config = {
  baseURL: process.env.baseURL || '/api',
  timeout: 6000
};

// tslint:disable-next-line: variable-name
const _axios = axios.create(config);
_axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
_axios.interceptors.request.use(cfg => cfg, err => Promise.reject(err));

// Add a response interceptor
_axios.interceptors.response.use(
  res => res.data,
  err => {
    const { response = {} } = err;
    switch (response.status) {
      case 404:
        Vue.prototype.$error('未找到该资源');
        break;
      case 500:
        Vue.prototype.$error('服务器错误');
        break;
    }
    if (response.data && response.data.msg) {
      return Promise.reject(response.data.msg);
    } else {
      return Promise.reject(`Ajax错误`);
    }
  }
);

const Plugin: PluginObject<any> = {
  // tslint:disable-next-line: no-shadowed-variable
  install: Vue => {
    Vue.$axios = _axios;
  }
};
// tslint:disable-next-line: no-shadowed-variable
Plugin.install = Vue => {
  Vue.$axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    $axios: {
      get() {
        return _axios;
      }
    }
  });
};

Vue.use(Plugin);

export default Plugin;
