import ajax from './ajax'
export default {
  login (data) {
    return ajax.post('user/login', data)
  },
  getUserInfo () {
    return ajax.get('user/info')
  },
  getCategoryList () {
    return ajax.get('category')
  },
  addCategory (data) {
    return ajax.post('category', data)
  },
  deleteCategory (id) {
    return ajax.delete(`category/${id}`)
  },
  getArticleList (params) {
    return ajax.get('article', params)
  },
  getArticle (id) {
    return ajax.get(`article/${id}`)
  },
  updateArticle (id) {
    return data => ajax.patch(`article/${id}`, data)
  },
  addArticle (data) {
    return ajax.post('article', data)
  },
  deleteArticle (id) {
    return ajax.delete(`article/${id}`)
  },
  getCommentList (params) {
    return ajax.get('comment', params)
  },
  deleteComment (id) {
    return ajax.delete(`comment/${id}`)
  },
  addComment (data) {
    return ajax.post('comment', data)
  },
  uploadImg (file) {
    return window.$img({
      url: '/upload',
      method: 'post',
      data: file
    })
  },
  deleteImg (hash) {
    return window.$img({
      url: `/delete/${hash}`,
      method: 'get'
    })
  }
}
