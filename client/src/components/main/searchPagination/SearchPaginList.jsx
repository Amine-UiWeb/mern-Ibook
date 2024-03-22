import { useEffect, useState } from "react"

import useFetchWorksPagin from "../../../utils/hooks/useFetchWorksPagin"

import SearchPaginItem from "./SearchPaginItem"
import { Menu } from "../../svgs/Menu"
import { NoSectionData } from "../../npSectionData/NoSectionData"
import "./SearchPaginList.css"


const toggleActive = (target, parent, childs) => {
  target.closest(parent).querySelectorAll(childs)
    .forEach(child => child.classList.remove('active'))
  target.classList.toggle('active')
}


const SearchPaginList = ({ authorKey, totalWorks }) => {
  
  // todo (lastly): disable all sorting and pagination buttons on fetchLoading

  // limit: the the number of returned works in each batch (default: 20)
  // page: the starting point to fetch a batch of works (default: 1)

  const limit = 10
  const [page, setPage] = useState(1)
  const [sortBy, setSortedBy] = useState('most_editions')

  const { data, isLoading, fetchError } = useFetchWorksPagin({ 
    end: 'searchByAuthorKey', dep: authorKey, sortBy, page, limit 
  })
  const works = data?.docs
  const totalPages = Math.ceil(totalWorks / limit) || 0

  
  // reset current page (on selcting different author/sorting Key )
  useEffect(() => setPage(prev => 1), [authorKey, sortBy])
  

  const sort = (e, val) => {
    toggleActive(e.target, '.sort-menu', 'button')
    setSortedBy(prev => val)
  }

  // update page number
  const first = () => setPage(prev => 1)
  const last = () => setPage(prev => totalPages)
  const prev = (val) => setPage(prev => prev - val)
  const next = (val) => setPage(prev => prev + val)
  const setPageVal = (val) => setPage(prev => val)

  
  // UI content
  
  const sortingMenu = (
    <div className="sort-menu ff-lucida">
      <span><Menu />{' '}Sorted by:{' '}</span>
      <button className="active" onClick={(e) => sort(e, 'most_editions')}>
        Most Editions
      </button>{' | '}
      <button onClick={(e) => sort(e, 'old')}>First Published</button>{' | '}
      <button onClick={(e) => sort(e, 'new')}>Most Recent</button>{' | '}
      <button onClick={(e) => sort(e, 'rating')}>Top Rated</button>{' | '}
      <button onClick={(e) => sort(e, 'random')}>Random</button>
    </div>
  )

  const pagination = (
    <div className="works-pagin flex-row jc-sb ai-c wrap">
      
      <div className="pagin-side-btns">
        {(page >= 11) && <button onClick={() => prev(10)}>{'<<'}</button>}
        {(page > 1) && <button onClick={() => prev(1)}>{'< '}Prev</button>}
      </div>

      <div className="pagin-btns flex-row">

        {page > 3 && <button onClick={first}>{1}</button>}
        {page > 4 && <button>...</button>}

        {page > 2 && <button onClick={() => setPageVal(page-2)}>{page-2}</button>}
        {page > 1 && <button onClick={() => setPageVal(page-1)}>{page-1}</button>}
        
        <button className="active">{page}</button>
        
        {page < totalPages && 
          <button onClick={() => setPageVal(page + 1)}>{page +  1}</button>
        }
        {(page + 1) < totalPages && 
          <button onClick={() => setPageVal(page + 2)}>{page + 2}</button>
        }
        
        {(page + 3) < totalPages && <button>...</button>}
        {(page + 2) < totalPages && <button onClick={last}>{totalPages}</button>}
      
      </div>
      
      <div className="pagin-side-btns ta-r">
        {(page < totalPages) && <button onClick={() => next(1)}>Next{' >'}</button>}
        {(page <= totalPages - 10) && <button onClick={() => next(10)}>{'>>'}</button>}
      </div>
      
    </div>
  )

  const worksWrapper = (
    <>
      { (works?.length > 0 && !fetchError) &&
        <ul className="works-wrapper">
            { works.map((work, i) => 
                <SearchPaginItem key={i} work={work} />) 
            }
        </ul>
      }
      {fetchError && 
        <NoSectionData message="Network propblem. Unable to fetch author works." />
      }
    </>
  )

  return (
    <div 
      className={"works-list" + (isLoading ? " inactive" : '')} 
      style={{ marginBottom: isLoading ? '30rem' : '0' }}
    >
      {sortingMenu}
      {pagination}
      {worksWrapper}
      {works?.length && pagination} 
    </div>
  )
}
export default SearchPaginList