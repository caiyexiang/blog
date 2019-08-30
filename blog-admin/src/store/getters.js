export default {
  userInfo (state) {
    return state.userInfo
  },
  token (state) {
    return state.token
  },
  isLogin (state) {
    return !!state.token
  }
}
