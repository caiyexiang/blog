import helper from './helper';
import Vue from 'vue';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import mavonEditor from 'mavon-editor';

Vue.prototype.$api = helper.api;
Vue.prototype.$ajax = helper.ajax;
Vue.prototype.$validators = helper.validators;
Vue.use(mavonEditor);

NProgress.configure({
  easing: 'ease',
  speed: 400,
  showSpinner: false
});
