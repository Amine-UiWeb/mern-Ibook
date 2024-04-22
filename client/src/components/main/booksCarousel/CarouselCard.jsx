import { memo } from "react"
import { Link } from "react-router-dom"

import useFetchImage from "../../../utils/hooks/useFetchImage"

import DotsLoader from "../../loading/dotsLoader/DotsLoader"
import "./CarouselCard.css"


const CarouselCard = ({ workId, book, token, isFavorite, toggleFav }) => {

  const { image,  isFetchError } = useFetchImage({ 
    end: 'card_cover', dep: book?.cover_i, pathname: null, imageSize: 'M'
  })


  return (
    <div className="carousel-card">
      { image ? (
          <div className="cover relative">

            <Link to={`${book?.key}`} title={book?.title}>
              <img src={image} loading="lazy" />
              { book?.title && (
                  <p className="ta-c of-x-hidden fw-5 fs-0-8">
                    {book?.title}
                  </p>
                )
              }
            </Link>

            { (workId && token) && (
                <span 
                  className={'bookmark' + (isFavorite ? ' remove' : ' add')}
                  onClick={() => toggleFav(workId, isFavorite)}
                ></span> 
              )
            } 

            { book?.ratings_average && (
                <span className="rating">{book?.ratings_average?.toFixed(2)}</span> 
              )
            }
            
          </div>
        )
        : isFetchError ? null : <DotsLoader /> 
      }

    </div>
  )
}

const arePropsEqual = (prev, next) => 
  prev.isFavorite == next.isFavorite && 
  prev.workId == next.workId &&
  prev.token == next.token

export default memo(CarouselCard, arePropsEqual)
