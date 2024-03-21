import { useEffect, useState } from "react"


const useFetchData = ({ end, dep, pathname }) => {

  const [data, setData] = useState(null)
  const [isFetchComplete, setIsFetchComplete] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isFetchError, setIsFetchError] = useState(false)

    useEffect(() => {
      // when workdata is still fetching 
      if (!dep) setIsFetchComplete(false)
      
      else {
        setIsLoading(true)

        let url

        // Work page

        // replace with search query (similar to search works in author page)
        if (end == 'b_workdata') url = `https://openlibrary.org${pathname}.json`

        else if (end == 'b_rating') {
          const olWork = pathname?.split('/works/')[1]
          url = `https://openlibrary.org/works/${olWork}/ratings.json`
        } 

        else if (end == 'b_bookdata') {
          const searchURL = 'https://openlibrary.org/search.json'
          const encodedTitle = encodeURIComponent(dep?.title)
          const urlParams = `?q=${encodedTitle}&fields=author_name,first_publish_year&limit=1`
          url = searchURL + urlParams
        } 

        else if (end == 'b_authordata') {
          const authorKey = dep?.authors?.[0]?.author?.key || dep?.author?.key
          url = `https://openlibrary.org${authorKey}.json`
        }

        else if (end == 'b_authorworks') {
          const authorName = dep?.docs?.[0]?.author_name?.[0]
          const uriAuthor = encodeURIComponent(authorName)
          url = `https://openlibrary.org/search.json?author=${uriAuthor}`
        } 


        // Author page

        else if (end == 'a_authordata') url = `https://openlibrary.org${dep}.json`

        else if (end == 'a_authorinfo') {
          const encodedAuthor = encodeURIComponent(dep?.name)
          url = `https://openlibrary.org/search/authors.json?q=${encodedAuthor}&limit=1`
        }
        

        // todo: use this only while developping
        setTimeout(() => {          
          fetch(url, { cache: 'force-cache' })
            .then(res => res.json())
            .then(data => setData(prev => data))
            .catch(err => setIsFetchError(prev => err?.message || err )) 
            .finally(() => setIsFetchComplete(prev => true))
        }, 1000);
      }
    }, [dep, pathname])

  return { data, isFetchComplete, isFetchError }
}

export default useFetchData
