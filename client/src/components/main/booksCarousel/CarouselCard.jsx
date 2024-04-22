import { memo } from "react"
import { Link, useNavigate } from "react-router-dom"

import useFetchImage from "../../../utils/hooks/useFetchImage"
import { useToggleFav } from "../../../utils/hooks/useToggleFav"

import DotsLoader from "../../loading/dotsLoader/DotsLoader"
import "./CarouselCard.css"


const CarouselCard = ({ workId, book, token, isFavorite }) => {

  const { toggleFav } = useToggleFav()


  const { image,  isFetchError } = useFetchImage({ 
    end: 'card_cover', dep: book?.cover_i, pathname: null, imageSize: 'M'
  })


  return (
    <div className="carousel-card">
      { image ? (
          <div className="cover relative">

            <Link to={`${book?.key}`}>
              <img src={image} loading="lazy" />
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
            
            { book?.title && (
                <p className="ta-c of-hidden fw-5 fs-0-8" title={book?.title}>
                  {book?.title}
                </p>
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
  prev.isFavorite == next.isFavorite && prev.workId == next.workId &&
  prev.token == next.token

export default memo(CarouselCard, arePropsEqual)

// export default CarouselCard