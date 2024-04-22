import { useSelector } from 'react-redux'
import { Outlet, NavLink } from 'react-router-dom'

import { selectFavorites, selectUsername } from '../../features/auth/authSlice'

import './UserPage.css'


const UserPage = () => {

  const username = useSelector(selectUsername)
  const userWorks = useSelector(selectFavorites)
  const totalWorks = userWorks?.length


  return (
    <div className='user-page p-in-1 pb-1'>

      <div className="user-top-nav mb-2 flex jc-sb gap-1 ai-c wrap">
        <div className="info">
          <span className='fs-1-2 fw-5 p-in-0-25 username'>{username}</span>{' '}
          <span className='fs-0-7 total-works'>
            (<span>{totalWorks} </span>shelved books)
          </span>
        </div>

        <div className="settings childs-hover-underline fs-1-4">
            <NavLink className="d-inbl mr-0-5" to='/user/collection'>collection</NavLink>
            <NavLink className="d-inbl" to='/user/settings'>user settings</NavLink>
        </div>
      </div>

      <Outlet />

    </div>
  )
}

export default UserPage
