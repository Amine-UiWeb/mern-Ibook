import { useEffect, useRef, useState } from "react"


const useFetchData = ({ end, dep, pathname }) => {

  const effectRan = useRef(false)
  const [data, setData] = useState(null)
  const [isFetchComplete, setIsFetchComplete] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isFetchError, setIsFetchError] = useState(false)


  useEffect(() => {

    // make sure useEffect runs only once (in strict mode)
    if (!effectRan.current && process.env.NODE_ENV == "development") {
      effectRan.current = true
    }

    // when workdata is still fetching
    else if (!dep) setIsFetchComplete(false)
    
    else {
      setIsLoading(true)
      setIsFetchError(false)

      let url

      /* Work page */

      if (end == 'b_work') {
        url = `https://openlibrary.org/works/${dep}.json`
      }

      else if (end == 'b_searchWork') {
        let fields = 
          'fields=title,author_name,first_publish_year,number_of_pages_median,cover_i,' + 
          'first_sentence,ratings_average,ratings_count,author_key,subject'
        url = `https://openlibrary.org/search.json?q=${dep}&${fields}`
      } 

      else if (end == 'b_authorByKey') {
        let authorKey = dep?.author_key?.[0] || dep?.author_key
        url = `https://openlibrary.org/authors/${authorKey}.json`
      }

      else if (end == 'b_authorByName') {
        let authorName = dep?.author_name?.[0]
        let uriEncAuthor = encodeURIComponent(authorName)
        url = `https://openlibrary.org/search/authors.json?q=${uriEncAuthor}&limit=1`
      }

      else if (end == 'b_authorworks') {
        let BASE_URL = 'https://openlibrary.org/search.json'
        let fields = `fields=key,title,ratings_average,cover_i,cover_id`
        let authorName = dep?.author_name?.[0]
        let uriEncAuthor = encodeURIComponent(authorName)
        url = `${BASE_URL}?author=${uriEncAuthor}&${fields}&limit=20`
      } 


      /* Author page */

      else if (end == 'a_authorByKey') {
        url = `https://openlibrary.org${dep}.json`
      }

      else if (end == 'a_authorByName') {
        let uriEncAuthor = encodeURIComponent(dep?.name)
        url = `https://openlibrary.org/search/authors.json?q=${uriEncAuthor}&limit=1`
      }
      

      // note: use setTimeout only in development
      setTimeout(() => {          
        fetch(url, { cache: 'force-cache' })
          .then(res => res.json())
          .then(data => setData(prev => data))
          .catch(err => setIsFetchError(prev => err?.message || err )) 
          .finally(() => setIsFetchComplete(prev => true))
      }, 500)
      
    }
  }, [dep, pathname])

  return { data, isFetchComplete, isFetchError }
}

export default useFetchData
