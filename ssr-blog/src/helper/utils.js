function debounce(fn, delay) {
  delay = delay || 600
  let timer
  return function() {
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
}

export default {
  debounce
}
