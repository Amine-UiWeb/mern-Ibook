import { useEffect, useState } from "react"


const useFetchWorksPagin = ({ end, dep, sortBy, page, limit }) => {

  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isFetched, setIsFetched] = useState(false)
  const [fetchError, setFetchError] = useState(false)

    useEffect(() => {
      
      setIsLoading(prev => true)
      setIsFetched(prev => false)
      setFetchError(prev => false)

      // Author page
      let url

      if (end == 'searchByAuthorKey') {  
        let authorKey = dep?.split('/authors/')[1]
        let baseUrl = 'https://openlibrary.org/search.json'
        let authorQ = `author_key=${authorKey}`

        let bookInfo = `key,title,cover_i,first_publish_year,author_name,`
        let statInfo = `number_of_pages_median,ratings_average,ratings_count,`
        let editionsInfo = `edition_count,ia,language`
        let fieldsQ = `fields=${bookInfo}${statInfo}${editionsInfo}`  
        let paginQ = `page=${page}&limit=${limit}`
        let sortQ = (sortBy == 'most_editions') ? '' : `sort=${sortBy}&`
        url = `${baseUrl}?${sortQ}${authorQ}&${fieldsQ}&${paginQ}`
      }

      /* todo: use setTimeout only in development */
      // setTimeout(() => {
        fetch(url, { cache: 'force-cache' })
          .then(res => res.json())
          .then(data => {
            setData(prev => data)
            setIsFetched(prev => true)
          })
          .catch(err => {
            setFetchError(prev => err?.message || err )
            setData(prev => null)
          }) 
          .finally(() => setIsLoading(prev => false))
      // }, 3000);

    }, [dep, sortBy, page])

  return { data, isFetched, isLoading, fetchError }
}

export default useFetchWorksPagin
