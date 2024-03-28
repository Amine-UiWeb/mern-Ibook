import { Link } from "react-router-dom"

import DotsLoader from "../../loading/dotsLoader/DotsLoader"
import "./CarouselCard.css"
import useFetchImage from "../../../utils/hooks/useFetchImage"


const CarouselCard = ({ book }) => {

  const { image, isFetchError } = useFetchImage({ 
    end: 'carousel_cover', dep: book, pathname: null, imageSize: 'L' 
  })

  
  return (
    <div className="carousel-card">
      { image ? <Link to={`${book?.key}`}><img src={image}/></Link>
        : isFetchError ? null
          : <DotsLoader /> 
      }
    </div>
  )
}

export default CarouselCard
