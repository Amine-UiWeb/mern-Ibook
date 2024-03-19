import { Fragment } from "react"
import { Link, useLocation } from "react-router-dom"

import useFetchData from "../../utils/hooks/useFetchData.js"

import SearchPaginList from "../../components/main/searchPagination/searchPaginList.jsx"
import PhotoSlider from "../../components/main/photoSlider/PhotoSlider.jsx"
import NoPageData from "../../components/noPageData/NoPageData.jsx"
import { NoSectionData } from "../../components/npSectionData/NoSectionData.jsx"
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

  const { data: authorData, isFetched, isFetchError } 
    = useFetchData({ end: 'a_authordata', dep: pathname, pathname })
  let ids = authorData?.remote_ids
  let photos = authorData?.photos
  let bio = authorData?.bio?.value ?? authorData?.bio
  
  const { data: authorInfo, isFetched: isInfoFetched, isFetchError: isInfoError } 
    = useFetchData({ end: 'a_authorinfo', dep: authorData, pathname })
  const info = authorInfo?.docs?.[0]
  

  // authorData fetching failed
  if (isFetched && isFetchError)  return <NoPageData />


  return (
    <div className="author-page">

      { authorData?.name && (
          <div className="content-head mt-1 mb-2">
            <h1 className="h2 mb-1 fw-500">{authorData?.name}</h1>

            { authorData?.birth_date && (
                <p className="ta-c fs-1">(
                  { 
                    authorData?.birth_date + 
                    (authorData?.death_date ? (' - ' + authorData?.death_date) : '') 
                  }
                )</p>
              ) 
            }
          </div>
        )
      }

      <div className="content-body relative">

        <div className="contentTwothird">
          
          { bio && (
              <section className="description">
                {bio?.split('\n').map((par, i) => 
                  <p key={i}>{par}</p>
                )}
              </section>
            )
          }

          { info?.work_count && (
              <section className="search-pagin-container">
                <h2 className="m-bl-1 fs-1-3 fw-7">{info.work_count} works</h2>
                <SearchPaginList authorKey={pathname} totalWorks={info?.work_count} />
              </section>
            )
          }

        </div>
        
        <div className="contentOnethird">

          { photos && (
              <section className="author_photo">
                <PhotoSlider 
                  pathname={pathname}
                  ids={photos.slice(0, 5).filter(val => val != -1)}
                  height="280px"
                />
              </section>
            ) 
          }

          { (info?.top_subjects?.length > 0) && (
              <section className="top_subjects">
                <h6>Top subjects:</h6>
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
              </section>
            ) 
          }

          { (authorData?.alternate_names?.length > 0) && (
              <section className="alternate_names">
                <h3>Alternate names:</h3>
                <ul>
                  { authorData.alternate_names.map((name, i) => <li key={i}>{name}</li>) }
                </ul>
              </section>
            ) 
          }

          { (authorData?.links?.length > 0) && (
              <section className="links">
                <h3>Links:</h3>
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
                <h3>ID Numbers:</h3>
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