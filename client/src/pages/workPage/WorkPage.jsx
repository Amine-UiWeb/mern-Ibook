import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

import useFetchImage from "../../utils/hooks/useFetchImage.js"
import useFetchData from "../../utils/hooks/useFetchData.js"

import BooksCarousel from "../../components/main/booksCarousel/BooksCarousel.jsx"
import NoPageData from "../../components/noPageData/NoPageData.jsx"
import DotsLoader from "../../components/loading/dotsLoader/DotsLoader.jsx"
import { 
  TitleSkeleton, ParagrahSkeleton, TextSkeleton 
} from "../../components/loading/SkeletonLoaders/Skeleton.jsx"
import "./WorkPage.css"


const WorkPage = () => {

  const { pathname } = useLocation() // pathname is structured as: /works/<workId>

  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  

  // Fetch book info (using workId)
  /* ------------------------------ */
  let { data: workData, isFetchComplete: workFetcheComplete, isFetchError: isWorkFetchError } 
    = useFetchData({ end: 'b_workdata', dep: pathname, pathname: pathname })
  
  let title = workData?.title
  let authorKey = workData?.authors?.[0]?.author?.key || workData?.author?.key
  let subjects = workData?.subjects
  let description = workData?.description?.value || workData?.description


  // Fetch book cover, ratings, author name
  /* -------------------------------------- */
  let { image: bookCover } = useFetchImage({ 
    end: 'b_cover', dep: workData, pathname: pathname, imageSize: 'L'
  })

  
  let { data: ratings, isFetchComplete: ratingFetched } = 
    useFetchData({ end: 'b_rating', dep: workData, pathname: pathname }) 
  let rating = ratings?.summary?.average?.toFixed(2)


  // todo: replace with search query using author key (as in author page)
  // and grab rating, number_of_pages_median, authorname, publishdate from that data instead
  let { data: bookData, isFetchComplete: bookFetched } = 
    useFetchData({ end: 'b_bookdata', dep: workData, pathname: pathname }) 
  let authorName = bookData?.docs?.[0]?.author_name?.[0] 
  let publishDate = bookData?.docs?.[0]?.first_publish_year

  
  // Fetch author photo and info
  /* --------------------------- */
  let { image: authorPhoto } = useFetchImage({ 
    end: 'b_photo', dep: workData, pathname: pathname, imageSize: 'M'
  })

  // let { data: authorData } 
  //   = useFetchData({ end: 'b_authordata', dep: bookData, pathname: pathname })
  // let authorInfo = authorData?.[0]
  /* todo: display brief author informations */


  // Fetch author works 
  /* ------------------ */
  let { data: authorWorks } = 
    useFetchData({ end: 'b_authorworks', dep: bookData, pathname: pathname })


  // todo: try to implement a deep book content search using search/inside.json endpoint


  // fetching workdata failed
  if (isWorkFetchError && !workData) return <NoPageData error={isWorkFetchError} />
  

  return (
    <div className="book-details">
      
      <h3 className="h3 title">{ title || <TitleSkeleton /> }</h3>


      {/* details */}
      <section className="details-grid">

        <div className="cover">
          { bookCover ? <img src={bookCover} alt="book-cover" /> : <DotsLoader /> }
        </div>
        
        <div className="info">

          { (!bookFetched || authorName) && (
              <h5 className="h5 author"> 
                { !authorName ? <TextSkeleton />  
                  : <><b>Author: </b><Link to={authorKey}>{authorName}</Link></>
                } 
              </h5>
            )
          }

          { (!ratingFetched || rating) && (
              <h5 className="h5">
                { !rating ? <TextSkeleton /> : <><b>Rating: </b>{rating}</> }
              </h5> 
            )
          }
            
          { (!bookFetched || publishDate) && (
              <h5 className="h5"> 
                { !publishDate ? <TextSkeleton />
                  : <><b>First Published:</b> {publishDate}</>
                }
              </h5>
            )
          }
  
          { (!workFetcheComplete || subjects) && (
              <h5 className="h5 subjects">
                {
                  !workFetcheComplete ? <ParagrahSkeleton nLines={3} />
                  : subjects.length > 0 ? (
                    <>
                      <b>Subjects:{' '}</b>   
                      {    
                        subjects?.slice(0, 6)?.map((subject, i) => ( 
                          <span key={i}>
                            {" "}<Link to="#">{subject}{","}</Link>{" "}
                          </span>)
                        )
                      }...
                    </>
                  ) 
                    : null
                }
                </h5>
            )
          }

        </div>

        { (!workFetcheComplete || description) && (
            <div className="description">
              {
                !workFetcheComplete ? <ParagrahSkeleton hasTitle={true} /> : 
                  <>
                    <b>Description: </b>
                    <div>
                      {description?.split('\n').map((par, i) => 
                        <p key={i} className="fs-0-85 mt-0-5">{par}</p>
                      )}
                    </div>
                  </>
              }
            </div>
          )
        }

      </section>
      

      {/* author */}
      { authorName && (
          <section className="author-brief">
            <h3 className="h5 mb-1">Brief overview on the author:</h3>
            
            <div className="author-flex">
              
              <div className="profile-wrapper">
                <img src={authorPhoto} alt="author profile" />
                <h5><Link to={authorKey}>{authorName}</Link></h5>
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
      { (!workFetcheComplete || authorWorks?.docs?.length > 0) && (
          authorWorks?.docs?.length > 0 && 
          <section className="author-books">
            <h4 className="h4 mb-1">Other works by the author:</h4>

            <BooksCarousel books={authorWorks?.docs.splice(0, 20)} />
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