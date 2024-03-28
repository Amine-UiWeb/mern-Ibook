import useFetchImage from "../../../utils/hooks/useFetchImage"
import { Link } from "react-router-dom"

const EditionsPrevItem = ({ iaKey }) => {

  const { image, isImageLoading, isFetchError } = useFetchImage({
    end: 'edition_cover', dep: iaKey, pathname: null 
  }) 
  
  
  return (
    <Link className="d-in" to="#" >
      <img src={image} />
    </Link>
  )
}
export default EditionsPrevItem