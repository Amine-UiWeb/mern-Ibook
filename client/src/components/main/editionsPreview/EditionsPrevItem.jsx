import useFetchImage from "../../../utils/hooks/useFetchImage"
import { Link } from "react-router-dom"

const EditionsPrevItem = ({ ia }) => {

  const { image, isImageLoading, isFetchError } = useFetchImage({
    end: 'edition_cover', dep: ia, pathname: null, imageSize: 'S'
  }) 
  
  
  return (
    <Link 
      to="#" 
      className="d-din" 
      style={{ display: isFetchError ? 'none' : 'inline' }} 
    >
      <img src={image} />
    </Link>
  )
}
export default EditionsPrevItem