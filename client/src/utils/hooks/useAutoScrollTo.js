import { useEffect, useMemo } from "react"

const useAutoScrollTo = (scroll_to_elem, extraSpace = 0, dep, scroll_on_elem) => {
  
  // scroll_to_elem: css selector for the element, to which position to scroll
  // extraSpace: an optional value(in px) to modify the scrolling position
  // dep: the state uppon which change to rerun the useEffect 
  // scroll_on_elem: css selector for the element from which position to enable scrolling

  let toElem = document.querySelector(scroll_to_elem)
  let onElem = document.querySelector(scroll_on_elem)
  let header = document.querySelector('.header')
  
  useEffect(() => {
    if (window.scrollY > (onElem?.offsetTop - header?.clientHeight)) {
      let top = toElem?.offsetTop - header?.clientHeight - extraSpace
      window.scrollTo({ top, behavior: 'smooth' });
    } 
  }, [dep])

}

export default useAutoScrollTo
