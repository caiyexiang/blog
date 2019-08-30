import Vue from 'vue';
import { Button, Pagination, Input, Message } from 'element-ui';

Vue.use(Button);
Vue.use(Pagination);
Vue.use(Input);

Vue.prototype.$message = Message;
Vue.prototype.$error = (msg: string) => {
  Vue.prototype.$message({ message: msg, type: 'error' });
};
Vue.prototype.$warning = (msg: string) => {
  Vue.prototype.$message({ message: msg, type: 'warning' });
};
Vue.prototype.$success = (msg?: string) => {
  if (!msg) {
    Vue.prototype.$message({ message: '成功', type: 'success' });
  } else {
    Vue.prototype.$message({ message: msg, type: 'success' });
  }
};
