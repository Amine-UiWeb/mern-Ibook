import useFetchImage from "../../../utils/hooks/useFetchImage"
import { Link } from "react-router-dom"

const EditionsPrevItem = ({ ia }) => {

  const { image, isFetchError } = useFetchImage({
    end: 'edition_cover', dep: ia, pathname: null, imageSize: 'S'
  }) 
  
  
  return (
    <Link 
      to="#" 
      className="a"
      style={{ display: isFetchError ? 'none' : 'inline-block' }} 
    >
      <img src={image} />
    </Link>
  )
}
export default EditionsPrevItem