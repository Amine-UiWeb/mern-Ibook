import { Link, useLocation } from "react-router-dom"

import useFetchImage from "../../utils/hooks/useFetchImage.js"
import useFetchData from "../../utils/hooks/useFetchData.js"

import BooksCarousel from "../../components/main/booksCarousel/BooksCarousel.jsx"
import NoPageData from "../../components/noPageData/NoPageData.jsx"
import DotsLoader from "../../components/loading/dotsLoader/DotsLoader.jsx"
import { TitleSkeleton, ParagrahSkeleton, TextSkeleton } 
  from "../../components/loading/SkeletonLoaders/Skeleton.jsx"
import "./WorkPage.css"
import ReadMore from "../../components/readMore/ReadMore.jsx"


const WorkPage = () => {

  const { pathname } = useLocation() // pathname is structured as: /works/<workId>
  const workId = pathname?.split('/works/')?.[1]

  // tip: comment temporarily while developping
  // useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  

  /* ------------ */
  // book details 
  /* ------------ */

  // fetch book info using search endpoint:
  const { data, isFetchComplete: searchFetchComplete, isFetchError: isSearchFetchError } = 
    useFetchData({ end: 'b_searchWork', dep: pathname, pathname: pathname }) 
  const searchData = data?.docs?.[0]

  let title = searchData?.title
  let authorKey = searchData?.author_key?.[0] || searchData?.author_key
  let authorName = searchData?.author_name?.[0] 
  let rating = searchData?.ratings_average?.toFixed(2)
  let ratingsCount = searchData?.ratings_count
  let numOfPages = searchData?.number_of_pages_median
  let publishDate = searchData?.first_publish_year
  let subjects = searchData?.subject
  let firstSentence = searchData?.first_sentence


  // fetch book dscription using works endpoint:
  const { data: workData, isFetchComplete: workFetchComplete } 
    = useFetchData({ end: 'b_work', dep: pathname, pathname: pathname })
  let description = workData?.description?.value || workData?.description


  // Fetch book cover:
  const { image: bookCover } = useFetchImage({ 
    end: 'b_cover', dep: workData, pathname: pathname, imageSize: 'L'
  })

  
  /* -------------- */
  // author details
  /* -------------- */

  // Fetch author photo:
  const { image: authorPhoto } = useFetchImage({ 
    end: 'b_photo', dep: workData, pathname: pathname, imageSize: 'M'
  })

  // fetch author info using author key:
  const { data: authorKeyData } 
    = useFetchData({ end: 'b_authorByKey', dep: searchData, pathname: pathname })
  let birthDate = authorKeyData?.birth_date || ''
  let deathDate = authorKeyData?.death_date || ''
  let lifeSpan = (birthDate || '') + (deathDate ? (' - ' + deathDate) : '')
    
  // fetch additional author info using author name:
  const { data: authorNameData } 
    = useFetchData({ end: 'b_authorByName', dep: searchData, pathname: pathname })
  let authorSearchData = authorNameData?.docs?.[0]
  let totalWorks = authorSearchData?.work_count
  let topWork = authorSearchData?.top_work
  let topSubjects = authorSearchData?.top_subjects

  
  /* ------------ */
  // author works
  /* ------------ */

  // Fetch author works 
  const { data: authorWorks } = 
    useFetchData({ end: 'b_authorworks', dep: searchData, pathname: pathname })
  // console.log(authorWorks)
  

  // work search by workId failed
  if (isSearchFetchError) return <NoPageData error={isSearchFetchError} />
  

  return (
    <div className="book-details">
      
      <h1 className="h1 title ta-c">{ title || <TitleSkeleton /> }</h1>


      {/* details */}
      <section className="details-grid">

        <div className="cover">
          { bookCover ? <img src={bookCover} alt="book-cover" /> : <DotsLoader /> }
        </div>
        
        <div className="info">

          { (!searchFetchComplete || authorName) && (
              <h3 className="h4"> 
                { !authorName ? <TextSkeleton /> : (
                    <b>
                      Author:{' '}
                      <Link className="fs-1-1" to={`/authors/${authorKey}`}>{authorName}</Link>
                    </b>
                  )
                } 
              </h3>
            )
          }

          { (!searchFetchComplete || rating) && (
              <h3 className="h4">
                { !rating ? <TextSkeleton /> : (
                    <span>
                      <b>Rating: </b>{rating}<small> ({ratingsCount || '?'})</small>
                    </span> 
                  )
                }
              </h3> 
            )
          }

          { (!searchFetchComplete || numOfPages) && (
              <h3 className="h4">
                { !numOfPages ? <TextSkeleton /> : (
                    <>
                      <b>N° of pages: </b><span>{numOfPages}</span>
                    </> 
                  )
                }
              </h3> 
            )
          }
            
          { (!searchFetchComplete || publishDate) && (
              <h3 className="h4"> 
                { !publishDate ? <TextSkeleton />
                  : <><b>First Published: </b><span>{publishDate}</span></>
                }
              </h3>
            )
          }
  
          { (!searchFetchComplete || subjects) && (
              <h3 className="h4 subjects">
                {
                  !searchFetchComplete ? <ParagrahSkeleton nLines={3} />
                  : subjects.length > 0 ? (
                    <>
                      <b>Subjects:{' '}</b>   
                      {    
                        subjects?.slice(0, 16)?.map((subject, i) => ( 
                          <span key={i}>
                            <Link to="#">{subject}</Link>
                            {"; "}
                          </span>)
                        )
                      }..
                    </>
                  ) 
                    : null
                }
                </h3>
            )
          }

          { (!workFetchComplete || firstSentence) && (
              <h3 className="h4">
                {
                  !workFetchComplete ? <ParagrahSkeleton nLines={3} />
                  : firstSentence.length > 0 ? (
                    <>
                      <b>First sentence:{' '}</b>
                      <ReadMore text={firstSentence} />
                    </>
                  ) 
                    : null
                }
                </h3>
            )
          }

        </div>

        { (!workFetchComplete || description) && (
            <div className="description">
              {
                !workFetchComplete ? <ParagrahSkeleton hasTitle={true} /> : 
                  <>
                    <b>Description: </b>
                    <div>
                      {description?.split('\n').map((par, i) => 
                        <p key={i} className="mt-0-5">{par}</p>
                      )}
                    </div>
                  </>
              }
            </div>
          )
        }

      </section>
      

      {/* author */}
      { authorSearchData && (
          <section className="author-brief">
            
            <h2 className="h4 gray-800">Author overview: </h2>
            
            <div className="flex-row ai-fs gap-2 flex-wrap mt-1">

              <div className="min-w-fit ta-c">
                <Link to={`/authors/${authorKey}`}>
                  <img className="m-auto mb-1" src={authorPhoto} alt="author-photo" />
                </Link>
                <h3 className="h6 fs-1-1 mb-0-25" title="View all details">
                  <Link to={`/authors/${authorKey}`}>{authorName}</Link>
                </h3>
                { lifeSpan.length > 0 && 
                    <span className="fs-0-75 fw-4 d-bl">({lifeSpan})</span>
                }
              </div>

              <div className="content"> 
                
                { totalWorks && (
                    <div>
                      <h3 className="h4">Total works: </h3>
                      <span> {totalWorks}</span>
                    </div>
                  )
                }

                { topWork && (
                    <div>
                      <h3 className="h4">Most popular work: </h3>
                      <span>{topWork}</span>
                    </div>
                  )
                }
                
                { topSubjects?.length > 0 && (
                    <div className="subjects">
                      <h3 className="h4 ">Top subjects: </h3>
                      { topSubjects?.filter(subj => (
                            !subj.includes('collectionid'))
                          )
                          .map((subj, i) => (
                            <span key={i}>
                              <Link key={i}>{subj}</Link>
                              {'; '}
                            </span>
                          ))
                      }
                    </div>
                  )
                }

              </div>

            </div>
          </section>
        )
      }


      {/* reviews */}
      {/* <section className="reviews">
        reviews
      </section> */}


      {/* other works by the author */}
      { (!workFetchComplete || authorWorks?.docs?.length > 0) && (
          authorWorks?.docs?.length > 0 && 
          <section className="author-works">
            <h2 className="h3 mb-0-5">Other works by the author:</h2>

            <BooksCarousel books={authorWorks?.docs} />
          </section> 
        )
      }


      {/* similar works */}
      {/* <section className="similar-books">
        similar works you might like
      </section> */}


    </div>
  )
}
export default WorkPage