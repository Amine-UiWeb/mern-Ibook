import { useEffect, useRef, useState } from "react"

let BASE_URL = 'https://covers.openlibrary.org'


const useFetchImage = ({ end, dep, pathname, imageSize }) => {
  
  const effectRan = useRef(false)
  const [image, setImage] = useState(null)
  const [isImageLoading, setIsImageLoading] = useState(false)
  const [isFetchCompleted, setIsFetchCompleted] = useState(false)
  const [isFetchError, setIsFetchError] = useState(false)
  
  useEffect(() => {
    
    // make sure useEffect runs only once (in strict mode)
    if (!effectRan.current && process.env.NODE_ENV == "development") {
      effectRan.current = true
    }

    // exit when the dep is still null
    else if (!dep) setIsFetchCompleted(prev => false)

    else {
      setIsImageLoading(prev => true)
      setIsFetchCompleted(prev => false)
      setIsFetchError(prev => false)

      let url

      // landing page (carousel card)
      if (end == 'card_cover') {
        const phImg = '?default=https://openlibrary.org/images/icons/avatar_book.png'
        url = `${BASE_URL}/b/id/${dep}-${imageSize}.jpg${phImg}`
      }

      // Work page
      else if (end == 'b_cover') {
        url = `${BASE_URL}/b/id/${dep}-${imageSize}.jpg`
      }
    
      else if (end == 'b_photo') {
        let authorKey = dep?.authors?.[0]?.author?.key || dep?.author?.key
        let olid = authorKey?.split('/authors/')[1]
        url = `${BASE_URL}/a/olid/${olid}-${imageSize}.jpg`
      }

      // Author page
      else if (end == 'a_photo' || end == 'a_cover') {
        url = `${BASE_URL}/b/id/${dep}-${imageSize}.jpg`
      }

      else if (end == 'edition_cover') {
        url = BASE_URL + `/b/olid/${dep}-${imageSize}.jpg`
      }
    

      // note: use setTimeout only in development
      // setTimeout(() => {
        fetch(url, { method: 'GET', cache: 'force-cache' })
          .then(res => res.blob())
          .then(blob => {
            let reader = new FileReader()  
            reader.onload = function () { 
              setImage(prev => this.result) 
              setIsImageLoading(prev => false)
              setIsFetchCompleted(prev => true)
            }
            reader.readAsDataURL(blob)
          })
          .catch(err => {
            setIsFetchError(prev => true)
            setImage(prev => null)
            setIsImageLoading(prev => false)
            setIsFetchCompleted(prev => true)
          })
      // }, 0);

    }

  }, [dep, pathname])

  return { image, isImageLoading ,isFetchError, isFetchCompleted }
}

export default useFetchImage