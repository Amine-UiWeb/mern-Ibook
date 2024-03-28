import { useState, useEffect } from "react"
import axios from "axios"

import { GENRES } from "../../utils/constants"

import BooksCarousel from "../../components/main/booksCarousel/BooksCarousel.jsx"
import NoPageData from "../../components/noPageData/NoPageData.jsx"
import { ChevronRight } from "../../components/svgs/ChevronRight"
import "./LandingPage.css"
import { Link } from "react-router-dom"


const LandingPage = () => {

  const [books, setBooks] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [fetchError, setFetchError] = useState(false)


  useEffect(() => {

    setFetchError(false)
    setIsLoading(true)

    // fetch books for each specified subject
    Object.keys(GENRES).forEach(genre => {
      const BASE_URL = `https://openlibrary.org/subjects/${GENRES[genre]}.json?`
      const fields = `fields=key,cover_i,ratings_average`
      const group_and_sort = 'limit=20&page=1' + '&sort=already_read'
      const fetchUrl = `${BASE_URL}${fields}${group_and_sort}`
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

      <div className="landing-banner">
        <img src="" alt="" />
      </div>
      
      {
        Object.keys(books).map(key => (
          <section key={key} className="carousel-section">
            
            <div className="carousel-section-header flex-row ai-c jc-sb p-1">
              <h3 className="h3 fw-4">
                <Link to={'browse' + books?.[key]?.key} className="cap">
                  <span className="mr-0-5">{key}</span>
                  <ChevronRight />
                </Link>
              </h3>
              <span className="fw-7 fs-0-85 underline">
                - {books[key]?.work_count} Books -
              </span>
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
