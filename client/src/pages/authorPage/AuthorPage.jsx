import { Fragment, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"

import useFetchData from "../../utils/hooks/useFetchData.js"

import SearchPaginList from "../../components/main/searchPagination/searchPaginList.jsx"
import PhotoSlider from "../../components/main/photoSlider/PhotoSlider.jsx"
import NoPageData from "../../components/noPageData/NoPageData.jsx"
import DotsLoader from "../../components/loading/dotsLoader/DotsLoader.jsx"
import { 
  SubTitleSkeleton, TitleSkeleton, ParagrahSkeleton, HeaderSkeleton, CardSkeleton, TextSkeleton, OneLineSkeleton
} from "../../components/loading/SkeletonLoaders/Skeleton.jsx"
import "./AuthorPage.css"

const IDsLinks = {
  amazon: { title: "Amazon ID", url: `https://www.amazon.com/-/e/LINK_ID` },
  goodreads: { title: "GoodReads", url: `https://www.goodreads.com/author/show/LINK_ID` },
  isni: { title: "ISNI", url: `https://isni.org/isni/LINK_ID` },
  librarything: { title: "LibraryThing", url: `https://www.librarything.com/author/LINK_ID` },
  storygraph: { title: "Storygraph", url: `https://app.thestorygraph.com/authors/LINK_ID` },
  viaf: { title: "VIAF", url: `https://viaf.org/viaf/LINK_ID` },
  wikidata: { title: "Wikidata", url: `https://www.wikidata.org/wiki/LINK_ID` },
}


const AuthorPage = () => {

  const { pathname } = useLocation()

  // tip: comment temporarily while developping
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  
  const { data: authorData, isFetchComplete, isFetchError } 
    = useFetchData({ end: 'a_authorByKey', dep: pathname, pathname })

  let birth_date = authorData?.birth_date || ''
  let death_date = authorData?.death_date
  let lifeSpan = birth_date + (death_date ? (' - ' + death_date) : '') 

  let ids = authorData?.remote_ids
  let photos = authorData?.photos
  let bio = authorData?.bio?.value ?? authorData?.bio
  

  const { data: authorInfo, isFetchComplete: isInfoFetched, isFetchError: isInfoError } 
    = useFetchData({ end: 'a_authorByName', dep: authorData, pathname })
  const info = authorInfo?.docs?.[0]
  

  // authorData fetching failed
  if (isFetchComplete && isFetchError)  return <NoPageData />


  return (
    <div className="author-page">

      { (authorData?.name || !isFetchComplete) && (
          <div className="content-head ta-c">
            <h1 className="h1 mb-1">
              {authorData?.name || <TitleSkeleton />}
            </h1>
            <h4 className="fs-1 fw-4">
              {lifeSpan?.length ? `(${lifeSpan})` : <SubTitleSkeleton />}
            </h4>
          </div>
        )
      }

      <div className="content-body relative">

        <div className="contentTwothird">
          
          { (bio || !isFetchComplete) && (
              <section className="description">
                { !isFetchComplete && <ParagrahSkeleton hasIndent={true} /> }
                { bio && bio?.split('\n').map((par, i) => <p key={i}>{par}</p>) }
              </section>
            )
          }

          { (info?.work_count || !isInfoFetched) && (
              <section className="search-pagin-container">
                { info?.work_count && (
                  <>
                    <h2 className="h2 fs-1-3 fw-7">{info.work_count} works</h2>
                    <SearchPaginList 
                      authorKey={pathname} 
                      totalWorks={info?.work_count} 
                    />
                  </>
                )} 
                { (!isInfoFetched ) && (
                    <>
                      <h2><HeaderSkeleton /></h2>
                      <OneLineSkeleton />
                      <OneLineSkeleton />
                      {Array(3).fill(0).map((card, i) => <CardSkeleton key={i} />)}
                    </>
                  )
                }
              </section>
            )
          }

        </div>
        
        <div className="contentOnethird">

          { (photos || !isFetchComplete) && (
              <section className="author_photo">
                { photos ? (
                    <PhotoSlider 
                      pathname={pathname}
                      ids={photos.slice(0, 5).filter(val => val != -1)}
                      height="280px"
                    />
                  ) : <DotsLoader />
                }
              </section>
            ) 
          }

          { (!isFetchComplete || info?.top_subjects?.length > 0) && (
              <section className="top_subjects">
                { info?.top_subjects?.length > 0 ? (
                    <>
                      <h2>Top subjects:</h2>
                      { info.top_subjects.map((subject, i) => (
                          <Fragment key={i}>
                            <Link 
                              to={'/browse/subjects/' + subject.toLowerCase()} 
                              className="a"
                            >{subject}</Link>
                            {", "}
                          </Fragment>
                        )) 
                      }
                    </>
                  ) : (
                    <>
                      <h2><HeaderSkeleton /></h2>
                      <ParagrahSkeleton nLines={5} />
                    </>
                  )
                }
              </section>
            ) 
          }

          { (authorData?.alternate_names?.length > 0) && (
              <section className="alternate_names">
                <h2>Alternate names:</h2>
                <ul>
                  { authorData.alternate_names.map((name, i) => 
                      <li key={i}>{name}</li>) 
                  }
                </ul>
              </section>
            ) 
          }

          { (authorData?.links?.length > 0) && (
              <section className="links">
                <h2>Links:</h2>
                <ul>
                  { authorData.links.map((link, i) => 
                      <li key={i}>
                        <Link className="a" to={link.url}>{link.title}</Link>  
                      </li>) 
                  }
                </ul>
              </section>
            ) 
          }

          { (typeof ids == 'object' && Object.keys(ids).length > 0) && (
              <section className="id_numbers">
                <h2>ID Numbers:</h2>
                <ul>
                  { Object.keys(ids).map((key, i) => (
                      <li key={i}>
                        <span>{IDsLinks[key]?.title}: </span>
                        <Link
                          className="a" 
                          to={IDsLinks[key]?.url?.replace('LINK_ID', ids[key])}
                        >{ids[key]}</Link>
                      </li>
                    )) 
                  }
                </ul>
              </section>
            ) 
          }

        </div>

      </div>

    </div>
  )
}
export default AuthorPage