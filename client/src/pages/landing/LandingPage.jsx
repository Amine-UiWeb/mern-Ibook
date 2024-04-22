import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"

import { TOP_GENRES } from "../../utils/constants"

import BooksCarousel from "../../components/main/booksCarousel/BooksCarousel.jsx"
import NoPageData from "../../components/noPageData/NoPageData.jsx"
import { ChevronRight } from "../../components/svgs/ChevronRight"
import "./LandingPage.css"


const LandingPage = () => {

  const effectRan = useRef(false)
  const [books, setBooks] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [fetchError, setFetchError] = useState(false)

 
  useEffect(() => {

    // make sure useEffect runs only once (in strict mode in development)
    if (!effectRan.current && process.env.NODE_ENV == "development") {
      effectRan.current = true
    }

    else {
      setFetchError(false)
      setIsLoading(true)

      // fetch books for each specified subject
      Object.keys(TOP_GENRES).forEach(genre => {
        let BASE_URL = `https://openlibrary.org`
        let query = `search.json?subject=${genre}`
        let fields = `fields=availability,key,title,cover_i,ratings_average`
        let group_and_Sort = 'limit=20&page=1' + '&sort=already_read'

        let fetchUrl = `${BASE_URL}/${query}&${fields}&${group_and_Sort}`
        fetchBooks(fetchUrl, genre)
      })

      async function fetchBooks(url, genre) {
        fetch(url, { method: 'GET', cache: 'force-cache' })
          .then(res => res.json())
          .then(data => {
            setBooks(prev => ({ ...prev, [genre]: data }))
          })
          .catch((err) => setFetchError(err?.message || err))
          .finally(() => setIsLoading(false))
      }
    }

  }, [])


  if (!isLoading && fetchError) return <NoPageData error={fetchError} />
  

  return (
    <div className="landing-page">

      <div className="landing-banner">
        <img src="" alt="" />
      </div>
      
      {
        Object.keys(books).map(key => (
          <section key={key} className="carousel-section">
            
            <div 
              className="carousel-section-header flex-row ai-c jc-sb p-1"
              style={{ background: TOP_GENRES[key] }}
            >
              <h3 className="h3 fw-4">
                <Link to={'/browse/subjects/' + key}>
                  <span className="mr-0-5 cap">{key}</span>
                  <ChevronRight />
                </Link>
              </h3>
              <span className="fw-7 fs-0-85 underline">
                - {books[key]?.numFound || books[key]?.num_found} Books -
              </span>
            </div>

            <div className="books-carousel"
              style={{ borderBottom: `5px solid ${TOP_GENRES[key]}` }}
            >
              <BooksCarousel books={books[key]?.docs}
              />
            </div>

          </section>
        ))
      }  
    </div>
  )
}
export default LandingPage
