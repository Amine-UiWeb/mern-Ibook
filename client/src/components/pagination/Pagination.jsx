import { usePagination, DOTS } from '../../utils/hooks/usePagination';
import './Pagination.css'


export const Pagination = (props, children) => {

  const {
    totalCount, siblingCount = 1, currentPage, pageSize, 
    onPageChange, className, isMultiPagination
  } = props;

  const paginationRange = usePagination({
    totalCount, siblingCount, currentPage, pageSize
  });


  // If there are less than 2 times in pagination range: won't render the component
  if (paginationRange.length < 2) return props?.children


  const onNext = () => onPageChange(currentPage + 1);
  const onPrevious = () => onPageChange(currentPage - 1);
  
  let lastPage = paginationRange[paginationRange.length - 1];
  

  let pagination = (
    <ul className={className}>
      
      {/* Left navigation arrow */}
      <li
        data-arrow
        className={'pagin-item arrow' + (currentPage === 1 ? ' disabled' : '')}
        onClick={onPrevious}
      ></li>
      
      {paginationRange.map((pageNumber, i) => {
         
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) 
          return <li key={'dots' + i} className="pagin-item dots">&#8230;</li>;
        
        // Render our Page Pills
        return (
          <li
            key={i}
            className={'pagin-item' + (pageNumber === currentPage ? ' selected' : '')}
            onClick={() => onPageChange(pageNumber)}
          >{pageNumber}</li>
        )

      })}
      
      {/*  Right Navigation arrow */}
      <li
        data-arrow
        className={'pagin-item arrow' + (currentPage === lastPage ? ' disabled' : '') }
        onClick={onNext}
      ></li>

    </ul>
  );

  if (isMultiPagination) return <>{pagination}{props?.children}{pagination}</>
  else return pagination

};
