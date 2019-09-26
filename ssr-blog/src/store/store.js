import Vue from 'vue'
import Vuex from 'vuex'
const { api } = require('@/helper').default

Vue.use(Vuex)

function createStore() {
  const store = new Vuex.Store({
    state: {
      articleList: [],
      categoryList: [],
      articleDetail: {},
      totalPage: 0
    },
    mutations: {
      SET_ARTICLE_LIST(state, data) {
        state.articleList = data
      },
      SET_TOTAL_PAGE(state, page) {
        state.totalPage = page
      },
      SET_CATEGORY_LIST(state, data) {
        state.categoryList = data
      },
      SET_ARTICLE_DETAIL(state, data) {
        state.articleDetail = data
      }
    },
    actions: {
      async fetchArticleList({ commit }, { query }) {
        try {
          const params = {
            keyword: query.keyword,
            page: query.page,
            category: query.category
          }
          const res = await api.getArticleList(params)
          const data = res.data.data
          const page = res.data.meta.total
          data.forEach(item => {
            item.time = item.meta.updatedAt.split('T')[0]
          })
          commit('SET_ARTICLE_LIST', data)
          commit('SET_TOTAL_PAGE', page)
        } catch (err) {
          console.error(err)
        }
      },
      async fetchCategory({ commit }) {
        try {
          const res = await api.getCategoryList()
          const data = res.data
          commit('SET_CATEGORY_LIST', data)
        } catch (err) {
          console.log(err)
        }
      },
      async fetchArticleDetail({ commit }, { params }) {
        try {
          const id = params.id || ''
          const res = await api.getArticle(id)
          const data = res.data
          data.time = data.meta.updatedAt.split('T')[0]
          data.author = data.author.name
          commit('SET_ARTICLE_DETAIL', data)
        } catch (err) {
          console.log(err)
        }
      }
    }
  })
  /**
   * 此代码仅在纯浏览器下进行，将INITSTATE数据替换进store
   */
  if (typeof window !== 'undefined' && window.__INITIAL_STATE__) {
    console.log('window.__INITIAL_STATE__', window.__INITIAL_STATE__)
    store.replaceState(window.__INITIAL_STATE__)
  }
  return store
}

export default createStore
