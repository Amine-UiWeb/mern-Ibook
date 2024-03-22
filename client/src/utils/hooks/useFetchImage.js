import { useEffect, useState } from "react"

let BASE_URL = 'https://covers.openlibrary.org'


const useFetchImage = ({ end, dep, pathname, imageSize }) => {
  
  const [image, setImage] = useState(null)
  const [isImageLoading, setIsImageLoading] = useState(false)
  const [isFetchError, setIsFetchError] = useState(false)
  
  useEffect(() => {
    if (dep !== pathname && !dep) setIsImageLoading(true) 

    else {
      setIsImageLoading(prev => true)
      setIsFetchError(prev => false)

      let url

      // landing page (carousel card)
      if (end == 'carousel_cover') {
        url = `${BASE_URL}/b/id/${dep?.cover_id || dep?.cover_i}-${imageSize}.jpg`
      }

      // Work page
      else if (end == 'b_cover')
        url = `${BASE_URL}/b/id/${dep?.covers?.[0]}-${imageSize}.jpg`
    
      else if (end == 'b_photo') {
        let authorKey = dep?.authors?.[0]?.author?.key || dep?.author?.key
        let olid = authorKey?.split('/authors/')[1]
        url = `${BASE_URL}/a/olid/${olid}-${imageSize}.jpg`
      } 

      // Author page
      else if (end == 'a_photo' || end == 'a_cover')
        url = `${BASE_URL}/b/id/${dep}-${imageSize}.jpg`

      else if (end == 'edition_cover')
        url = `https://archive.org/services/img/${dep}`
    

      // todo: use setTimeout only in development
      // setTimeout(() => {
        fetch(url, { cache: "force-cache" })
          .then(res => res.blob())
          .then(blob => {
            let reader = new FileReader()  
            reader.onload = function () { 
              setImage(this.result) 
              setIsImageLoading(prev => false)
            }
            reader.readAsDataURL(blob)
          })
          .catch(err => {
            setIsFetchError(true)
            setImage(prev => null)
            setIsImageLoading(prev => false)
          })
      // }, 300000);

    }
  }, [dep, pathname])

  return { image, isImageLoading ,isFetchError }
}

export default useFetchImage