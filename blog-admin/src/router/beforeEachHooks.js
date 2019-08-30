import { $auth } from '@/helper'

export default {
  checkVisitAuth (to, from, next) {
    if (to.meta.isNotNeedLogin) {
      next()
    } else if ($auth.checkLogin()) {
      return next()
    } else {
      return next({ path: '/' })
    }
  }
}
