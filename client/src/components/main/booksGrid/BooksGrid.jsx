import { useState, useEffect, useMemo } from "react"
import { useSelector } from "react-redux"

import useAutoScrollTo from "../../../utils/hooks/useAutoScrollTo.js"
import { selectFavorites } from '../../../features/auth/authSlice'
import { toggleFavorite } from "../../../features/auth/authSlice"
import { toggleFavRequest } from '../../../api/userApi.js'

import GridCard from "./GridCard"
import { Draggable } from "../../draggable/DraggableX.jsx"
import { Pagination } from "../../pagination/Pagination.jsx"
import './BooksGrid.css'


const BooksGrid = () => {

  const userWorks = useSelector(selectFavorites)
  const totalWorks = userWorks?.length
  
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(5)
  const [isGridDisplay, setIsGridDisplay] = useState(false)
  
  
  useEffect(() => setCurrentPage(1), [perPage])
  useAutoScrollTo('.user-page', 16, currentPage, '.pagin-bar')
  

  const handleDisplayGrid = () => setIsGridDisplay(prev => true)
  const handleDisplayList = () => setIsGridDisplay(prev => false)

  const handlePerPage = (e) => setPerPage(prev => e.target.value)
  
  const handleSortBy = () => {}
  const handleSortOrder = () => {}
  const handleToggleFav = ({ workData }) => {
    console.log('ran')
  }


  // memoized loading section: show while fetching books details
  const loading = useMemo(() => (
    <div className="infin-loading">
      <img 
        src="https://s.gr-assets.com/assets/loading-trans-ced157046184c3bc7c180ffbfc6825a4.gif" 
        alt="Spining gif" 
      />
      Loading...
    </div>
  ))


  // books container
  let start = (currentPage - 1) * perPage
  let end = currentPage * perPage

  let booksContainer = (
    <div className="books-container m-bl-2">
      <div className={"books-wrapper mb-0-3" + (isGridDisplay ? ' grid' : ' list')}>
        
        <div className="book fw-7 fs-0-95 uppercase ta-c">
          <div className="order-num"></div>
          <div className="rem-fav"></div>
          <div>cover</div>
          <div>title</div>
          <div>author</div>
          <div className="fs-0-85">rating</div>
          <div className="fs-0-85">publish year</div>
          <div className="fs-0-85">N° ratings</div>
          <div className="fs-0-85">N° pages</div>
        </div>
        
        { totalWorks > 0 && 
            userWorks
              .slice(start, end) 
              .map((workId, i) => (
                <GridCard 
                  key={i} 
                  workId={workId} 
                  isGrid={isGridDisplay} 
                  num={perPage * (currentPage - 1) + (i + 1)}
                  handleToggleFav={handleToggleFav}
                />
              ))
        }

      </div>
    </div>
  )

  return (
    <div className="user-books pt-1">

      {/* sort bar */}
      <div className="sort-bar flex ai-c gap-1 wrap mb-2">

        <div className="display-mode">
          
          <button 
            className={"btn" + (isGridDisplay ? '' : ' active')}
            onClick={handleDisplayList}
          >List</button>
          
          <button 
            className={"btn" + (isGridDisplay ? ' active' : '')}
            onClick={handleDisplayGrid}
          >Grid</button>

        </div>

        <form id="perPageForm" name="perPageForm">          
          
          <label htmlFor="per_page">per page</label>
          
          <select id="per_page" defaultValue={5} onChange={handlePerPage}>
            <option value="1">1</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        
        </form>

        <form id="sortForm" name="sortForm">

          <div className="form-group">
            
            <label htmlFor="sort" className="greyText">sort</label>
            
            <select name="sort" id="sort" onChange={handleSortBy}>
              <option value="author">Author</option>
              <option value="avg_rating">Avg rating</option>
              <option defaultValue value="date_added">Date added</option>
              <option value="date_pub">Date pub</option>
              <option value="num_pages">Num pages</option>
              <option value="num_ratings">Num ratings</option>
              <option value="read_count">Read count</option>
              <option value="title">Title</option>
            </select>

          </div>

          <div className="form-group childs-pointer">
            
            <label htmlFor="order_a">
              <input 
                type="radio" 
                name="order" 
                id="order_a" 
                value="a" 
                defaultChecked
                onClick={handleSortOrder} 
              />
              asc.
            </label>

            <label htmlFor="order_d">
              <input 
                type="radio" 
                name="order" 
                id="order_d" 
                value="d" 
                onClick={handleSortOrder} 
              />
              desc.
            </label>
            
          </div>

        </form>

      </div>


      <Pagination
        totalCount={totalWorks}
        currentPage={currentPage}
        pageSize={perPage}
        siblingCoun={3}
        onPageChange={setCurrentPage}
        className="pagin-bar"
        isMultiPagination={true}
      >
        <Draggable>
          {booksContainer}  
        </Draggable>
      </Pagination>      

    </div>
  )
}

export default BooksGrid
