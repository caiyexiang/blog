import ajax from './ajax';

type ApiFunc = (data?: any) => Promise<any>;

const getCategoryList: ApiFunc = () => ajax.get('category');

const getArticleList: ApiFunc = params => ajax.get('article', params);

const getArticle: ApiFunc = id => ajax.get(`article/${id}`);

const getCommentList: ApiFunc = params => ajax.get('comment', params);

export interface Api {
  [propName: string]: ApiFunc;
}

export default {
  getCategoryList,
  getArticleList,
  getArticle,
  getCommentList
};
