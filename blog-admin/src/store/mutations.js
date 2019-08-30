import { $storage } from '@/helper'

export default {
  setUserInfo (state, info) {
    state.userInfo = info
    $storage.setLocalStorage('userInfo', info)
  },
  setToken (state, token) {
    state.token = token
    $storage.setLocalStorage('token', token)
  },
  deleteUser (state) {
    state.userInfo = null
    state.token = ''
    $storage.removeLocalStorage('token')
    $storage.removeLocalStorage('userInfo')
  }
}
