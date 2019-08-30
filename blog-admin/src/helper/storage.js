import { STORAGE_PREFIX } from '@/config/constant.js'

const getStorageName = (name = '') => {
  return `${STORAGE_PREFIX}-${name}`
}

export default {
  /* -----------------------------localStorage------------------------------------ Start */
  /*
   * set localStorage
   */
  setLocalStorage (name, content) {
    if (!name) return
    if (typeof content !== 'string') {
      content = JSON.stringify(content)
    }
    window.localStorage.setItem(getStorageName(name), content)
  },

  /**
   * get localStorage
   */
  getLocalStorage (name) {
    if (!name) return false
    let item = window.localStorage.getItem(getStorageName(name))
    let result
    try {
      result = JSON.parse(item)
    } catch (e) {
      result = item
    }
    return result
  },

  /**
   * delete localStorage
   */
  removeLocalStorage (name) {
    if (!name) return false
    window.localStorage.removeItem(getStorageName(name))
  }
  /* -----------------------------localStorage------------------------------------ End */
}
