import { Link } from "react-router-dom"

import useFetchImage from "../../../utils/hooks/useFetchImage"

import DotsLoader from "../../loading/dotsLoader/DotsLoader"
import EditionsPrev from "../editionsPreview/EditionsPrev"

/* 
##important fields (to include in the search query if needed):

-included: key, title, first_publish_year, cover_i, author_name, author_key, 
ia, edition_count, language, 
number_of_pages_median, ratings_average, ratings_count, 

-no included: edition_key, cover_edition_key, first_sentence
*/

const SearchPaginItem = ({ work, pathname }) => {

  const { 
    key, title, first_publish_year, cover_i, author_name, 
    number_of_pages_median, ratings_average, ratings_count,
    edition_count, edition_key, language, ia, 
  } = work


  let edi = edition_count + ' edition' + (edition_count > 1 ? 's' : '')
  
  let langCount = language?.length 
  let lang = langCount > 1 ? ' in ' + langCount + ' languages'
    : langCount == 1 ? ' in ' + language?.[0] : ''
  
  let prev = ia?.length > 0 ? ' - ' + ia?.length + ' previewable' : ''

  
  const { image, isImageLoading, isFetchError } = useFetchImage({ 
    end: 'a_cover', dep: cover_i, pathname, imageSize: 'L'
  })
  

  return (
    <li className="works-pagin-item flex">

      <div className="cover ta-c m-bl-0-5">
        { isImageLoading ? <DotsLoader /> 
          : image ? (
              <Link className="d-inbl" to={key}>
                <img src={image} />
              </Link>
            )
            : null
        }
      </div>

      <div className="content relative fs-0-85 p-0-5">

        <div className="flex-row ai-fs jc-sb gap-1">
          <div>
            <h3><Link className="d-inbl fs-1-2 fw-6" to={key}>{title}</Link></h3>
            <span>
              by{' '}
              <Link className="d-in fw-4" to={pathname}>{author_name?.[0]}</Link>
            </span>
          </div>

          <div className="extra-info fs-1 fw-6 ta-c">
            {ratings_average && (
              <div className="rating">
                {ratings_average?.toFixed(2)}{' '}
                <sub className="fs-0-7">({ratings_count})</sub>
              </div>
            )}
            {number_of_pages_median && (
              <div className="n-pages fs-0-75 fw-6">{number_of_pages_median}{' '}pages</div>
            )}
          </div>
        </div>

        <span className="publish-details d-bl ff-lucida mt-1">

          <span className="d-bl">First published in {first_publish_year}</span>
          
          <span className="editions-details">
            <Link className="a" to={`${key}/editions`}>{edi}</Link>
            {lang}{prev}
          </span>
          
          {/* <EditionsPrev ia={ia?.slice(0, 9)} height="45px" /> */}
          <EditionsPrev edition_key={edition_key?.slice(0, 9)} height="45px" />

        </span>
      
      </div>

    </li>
  )
}
export default SearchPaginItem