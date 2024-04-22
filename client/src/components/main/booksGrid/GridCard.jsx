import { Link } from 'react-router-dom'

import useFetchData from '../../../utils/hooks/useFetchData'
import useFetchImage from '../../../utils/hooks/useFetchImage'

import DotsLoader from '../../loading/dotsLoader/DotsLoader.jsx'


const GridCard = ({ workId, num, isGrid }) => {

  const { data, isFetchError: isSearchFetchError } = 
    useFetchData({ end: 'b_searchWork', dep: workId, pathname: null }) 
  const searchData = data?.docs?.[0]

  let title = searchData?.title
  let authorKey = searchData?.author_key?.[0] || searchData?.author_key
  let cover_i = searchData?.cover_i
  let authorName = searchData?.author_name?.[0] 
  let rating = searchData?.ratings_average?.toFixed(2)
  let ratingsCount = searchData?.ratings_count
  let numOfPages = searchData?.number_of_pages_median
  let publishYear = searchData?.first_publish_year


  const { image, isImageLoading } = useFetchImage({ 
    end: 'b_cover', dep: cover_i, pathname: null, imageSize: 'M' 
  })


  if (isSearchFetchError) return null

  return (
    
    <div className='book fw-5' title={isGrid ? title : ''}>
      
      <h3 className='h4 order fs-0-9 fw-6 ta-c'>{num}.</h3>

      <h3 className='h4 rem-fav fs-0-9 fw-6 ta-c'>
        <button className='btn p-0-25 m-in-0-25 gray-4'>X</button>
      </h3>
      
      <div className="cover">
        { isImageLoading ? <DotsLoader /> : (
            <Link to={'/works/' + workId}>
              <img src={image} />
            </Link>
          )
        }
      </div>
      
      <h3 className='h4 title fs-1 fw-7'>
        <Link className='d-inbl p-in-0-5' to={'/works/' + workId}>{title}</Link>
      </h3>
      
      <h3 className='h4 author fs-0-95 ta-c'>
        <Link to={'/authors/' + authorKey}>{authorName}</Link>
      </h3>

      <h3 className='h4 number fs-0-8'>{rating}</h3>
    
      <h3 className='h4 number fs-0-8'>{publishYear}</h3>

      <h3 className='h4 number fs-0-8'>{ratingsCount}</h3>

      <h3 className='h4 number fs-0-8'>{numOfPages}</h3>

    </div>
  )
}

export default GridCard
