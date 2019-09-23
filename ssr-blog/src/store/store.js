import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const fetchBar = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('bar 组件 ajax 返回数据')
    }, 2000)
  })

function createStore() {
  const store = new Vuex.Store({
    state: {
      bar: ''
    },
    mutations: {
      SET_BAR(state, data) {
        state.bar = data
      }
    },
    actions: {
      async fetchBar({ commit }) {
        try {
          const res = await fetchBar()
          commit('SET_BAR', res)
        } catch (err) {
          console.error(err)
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
