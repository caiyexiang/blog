import { $api } from '@/helper'
export default {
  async getUserInfo ({ commit, state }) {
    if (state.token) {
      try {
        let userInfo = await $api.getUserInfo()
        commit('setUserInfo', userInfo.data)
      } catch (err) {
        console.error(err)
      }
    }
  }
}
