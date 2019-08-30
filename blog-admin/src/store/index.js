import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import { $storage } from '@/helper'

Vue.use(Vuex)

const state = {
  token: $storage.getLocalStorage('token') || '',
  userInfo: $storage.getLocalStorage('userInfo') || {}
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
