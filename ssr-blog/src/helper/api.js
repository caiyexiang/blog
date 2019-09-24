import ajax from './ajax'

const getCategoryList = () => ajax.get('category')

const getArticleList = params => ajax.get('article', params)

const getArticle = id => ajax.get(`article/${id}`)

const getCommentList = params => ajax.get('comment', params)

export default {
  getCategoryList,
  getArticleList,
  getArticle,
  getCommentList
}
