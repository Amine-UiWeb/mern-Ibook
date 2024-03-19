import { useNavigate } from "react-router-dom"

import "./NoPageData.css"


const NoPageData = ({ error }) => {

  const navigate = useNavigate()
  const goBack = () => navigate(-1)

  return (
    <div className="no-page-data">
      <p>
        <b className="fs-1-1 fw-5">Oppsss...</b> 
        there have been a problem loading data from the server.
      </p>

      {error && (
        <p className="fs-0-9 fw-5 mt-1">Error description: <span>({error})</span></p>
      )}
      
      <p className="mt-2 ta-c">
        <button className="a" onClick={goBack}>Go Back</button>
      </p>      
    </div>
  )
}
export default NoPageData
