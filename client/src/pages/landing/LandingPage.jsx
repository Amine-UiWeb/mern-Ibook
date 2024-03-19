import { useState, useEffect } from "react"
import axios from "axios"

import { GENRES } from "../../utils/constants"

import BooksCarousel from "../../components/main/booksCarousel/BooksCarousel.jsx"
import NoPageData from "../../components/noPageData/NoPageData.jsx"
import { ChevronRight } from "../../components/svgs/ChevronRight"
import "./LandingPage.css"

const BASE_URL = 'https://openlibrary.org/subjects'


const LandingPage = () => {

  const [books, setBooks] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [fetchError, setFetchError] = useState(false)

  // https://openlibrary.org/trending/monthly.json

  useEffect(() => {

    setFetchError(false)
    setIsLoading(true)

    // fetch books for each specified subject
    Object.keys(GENRES).forEach(genre => {
      const fields = `fields=key,cover_i,ratings_average`
      const params = 'limit=12&offset=12'
      const fetchUrl = `${BASE_URL}/${GENRES[genre]}.json?${fields}&${params}`

      fetchBooks(fetchUrl, genre)
    })

    function fetchBooks(url, genre) {
      fetch(url, { method: 'GET', cache: 'force-cache' })
        .then(res => res.json())
        .then(data => {
          setBooks(prev => ({ ...prev, [genre]: data }))
        })
        .catch((err) => setFetchError(err?.message || err))
        .finally(() => setIsLoading(false))
    }

  }, [])


  if (!isLoading && fetchError) {
    return <NoPageData error={fetchError} />
  }


  return (
    <div className="landing-page">

      {/* todo: add a landing banner (contains image and description) */}
      <div className="landing-banner">
        <img src="" alt="" />
      </div>
      
      { // pass each subject books to a BooksCarousel componenet
        Object.keys(books).map(key => (
          <section key={key} className="carousel-section">
            
            <div className="carousel-section-header ff-times m-1">
              <h3 className="h3 fw-4">
                <a href="#" className="cap">
                  <span className="mr-0-5">{key}</span>
                  <ChevronRight />
                </a>
              </h3>
              {/* display total work count (in far right, in gray color small size )  */}
              <span className="fw-7">- {books[key]?.work_count} Books -</span>
            </div>

            <div className="books-carousel">
              <BooksCarousel books={books[key].works} />
            </div>

          </section>
        ))
      }  
    </div>
  )
}
export default LandingPage
