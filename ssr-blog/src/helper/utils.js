function debounce(fn, delay) {
  let timeoutID
  return function(that, ...args) {
    clearTimeout(timeoutID)
    timeoutID = window.setTimeout(() => fn.apply(that, args), delay)
  }
}

export default {
  debounce
}
