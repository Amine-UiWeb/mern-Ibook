import { useEffect, useState } from "react"

import useFetchImage from "../../../utils/hooks/useFetchImage"
import DotsLoader from "../../../components/loading/dotsLoader/DotsLoader.jsx"
import { ChevronLeft } from "../../svgs/ChevronLeft.jsx"
import { ChevronRight } from "../../svgs/ChevronRight.jsx"
import "./PhotoSlider.css"


const PhotoSlider = ({ pathname, ids, height }) => {

  const [currentSlide, setCurrentSlide] = useState(1)
  const [currentId, setCurrentImageId] = useState(null)
  

  useEffect(() => setCurrentImageId(ids[currentSlide - 1]), [currentSlide])
  
  const { image: authorPhoto, isImageLoading, isFetchError } = useFetchImage({ 
    end: 'a_photo', dep: currentId, pathname, imageSize: 'L' 
  })

  
  const prevSlide = () => (currentSlide > 1) && setCurrentSlide(prev => prev - 1)
  const nextSlide = () => (currentSlide < ids.length) && setCurrentSlide(prev => prev + 1)
  

  return (
    <div className="photo-slider slider-container relative" style={{ height }}>

      { ids?.length > 1 && (
          <>
            <button 
              className="slider-arrow slider-prev-arrow" 
              onClick={prevSlide} disabled={currentSlide <= 1}
            ><ChevronLeft /></button>
            <button 
              className="slider-arrow slider-next-arrow" 
              onClick={nextSlide} disabled={currentSlide >= ids.length}
            ><ChevronRight /></button>
          </>
        )
      }
    
      <div className="slide-wrapper">
        { <img src={authorPhoto} style={{ height: height }}/> }
      </div>
      
    </div>
  )
}
export default PhotoSlider