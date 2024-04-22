import { useLocation, useParams } from "react-router-dom"
import "./Browse.css"


const Browse = () => {

  const { pathname } = useLocation()
  const location = pathname?.split('/browse')[1]

  let query = useParams()
  console.log(query)

  return (
    <div>
      <h1 className="h3">Browse: {location}</h1>

      <div className="browse-container">
        
        <div className="side-menu">
          <ul>

            <li>
              a
            </li>

            <li>
              b
            </li>

            <li>c</li>
            <li>d</li>
            <li>e</li>

          </ul>
        </div>

        <div className="content">

        </div>

      </div>
    </div>
  )
}
export default Browse