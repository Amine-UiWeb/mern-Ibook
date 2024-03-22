
export const debounce = (fn, delay = 500) => {
  let timeout
  
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => { fn(...args) }, delay)
  }
}
