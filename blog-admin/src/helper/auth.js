import { $storage } from '.'

export default {
  checkLogin () {
    return $storage.getLocalStorage('token') || false
  }
}
