export default {
  _debounce (fn, delay) {
    delay = delay || 600
    let timer
    return function () {
      let ctx = this
      let args = arguments
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        timer = null
        fn.apply(ctx, args)
      }, delay)
    }
  },
  _throttle (fn, interval) {
    let last
    let timer
    interval = interval || 600
    return function () {
      let ctx = this
      let args = arguments
      let now = new Date()
      if (last && now - last < interval) {
        clearTimeout(timer)
        timer = setTimeout(function () {
          last = now
          fn.apply(ctx, args)
        }, interval)
      } else {
        last = now
        fn.apply(ctx, args)
      }
    }
  }
}
