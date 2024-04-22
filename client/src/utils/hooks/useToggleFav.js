import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { logout, selectToken, toggleFavorite } from "../../features/auth/authSlice"
import { toggleFavRequest } from "../../api/userApi"


export const useToggleFav = () => {

  const token = useSelector(selectToken)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  

  const toggleFav = async (workId, isFavorite) => {
  
    let toggle = isFavorite ? 'remove' : 'add'

    try { 
      let res = await toggleFavRequest(workId) 
      if (res.status == 200) dispatch(toggleFavorite({ workId, toggle }))
    }
    catch (err) {
      // refresh failed(expired refresh token): logout and navigate to login page
      if (err.response?.status == 403) {
        dispatch(logout())
        navigate('/login');
      }

      // refresh successfull: retry the request
      if (err.response?.status == 401) {
        let res = await toggleFavRequest(workId)
        if (res.status == 200) dispatch(toggleFavorite({ workId, toggle }))
      }
    }
  }

  return { toggleFav }

}
