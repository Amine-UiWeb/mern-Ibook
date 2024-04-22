import { useState, useRef, useCallback, useEffect } from "react"
import { useSelector } from "react-redux"

import { selectFavorites, selectToken } from "../../../features/auth/authSlice"

import CarouselCard from "./CarouselCard"
import { ChevronLeft } from "../../svgs/ChevronLeft"
import { ChevronRight } from "../../svgs/ChevronRight"
import "./BooksCarousel.css"


const BooksCarousel = ({ books }) => {
  
  const [dispLeftArr, setDispLeftArr] = useState(false)
  const [dispRightArr, setDispRightArr] = useState(true)
  const myRef = useRef()

  const favorites = useSelector(selectFavorites)
  const token = useSelector(selectToken)

  
  // useEffect(() => {
  //   let elem = myRef.current
  //   console.log(elem.scrollLeft, elem.clientWidth + elem.scrollLeft)
  // }, [myRef?.current?.scrollLeft])

  const dispHideArrows = () => {
    if (myRef.current.scrollLeft <= 20) setDispLeftArr(false)
    else setDispLeftArr(true)

    let scrolled = myRef.current.scrollLeft + myRef.current.clientWidth
    if (scrolled < myRef.current.scrollWidth) setDispRightArr(true)
    else setDispRightArr(false)
  }

  const Scroll = () => {
    let t;
    return function() {
      clearTimeout(t)
      t = setTimeout(dispHideArrows, 100)
    }
  }
  let debouncedScroll = useCallback(Scroll())

  const handleArrowClick = (direction) => {
    if (direction === 'left') myRef.current.scrollLeft -= 350 
    if (direction === 'right') myRef.current.scrollLeft += 350
    dispHideArrows()
  }


  return (
    <div className="carousel-container">

      { dispLeftArr && 
        <div className="carousel-arrow" onClick={() => handleArrowClick('left')}>
          <ChevronLeft />
        </div>
      }
      
      <div className="carousel-wrapper" ref={myRef} onScroll={debouncedScroll}>
        { Array(books) && books?.length > 0 && books.map(
            (book, i) => 
              <CarouselCard 
                key={i}
                book={book}
                workId={book?.key?.split('/works/')[1]}
                isFavorite={favorites?.indexOf(book?.key?.split('/works/')[1]) != -1}
                token={token}
              />
          )
        }
      </div>
      
      { dispRightArr &&
        <div className="carousel-arrow" onClick={() => handleArrowClick('right')}>
          <ChevronRight />
        </div>
      }
    
    </div>
  )
}
export default BooksCarousel