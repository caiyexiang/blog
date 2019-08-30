type AjaxFunc = (url: string, data?: any) => Promise<any>;

const post: AjaxFunc = (url: string, data) => {
  return window.axios({ url, method: 'post', data });
};
const get: AjaxFunc = (url: string, params) => {
  return window.axios({ url, method: 'get', params });
};
const put: AjaxFunc = (url: string, data) => {
  return window.axios({ url, method: 'patch', data });
};
const patch: AjaxFunc = (url: string, data) => {
  return window.axios({ url, method: 'put', data });
};

export interface Ajax {
  post: AjaxFunc;
  get: AjaxFunc;
  put: AjaxFunc;
  patch: AjaxFunc;
}

export default {
  post,
  get,
  put,
  patch
};
