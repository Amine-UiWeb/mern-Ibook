import { useSelector } from 'react-redux'
import { selectFavorites, selectToken } from '../../../features/auth/authSlice'
import './UserSettings.css'


const UserSettings = () => {

  const userWorks = useSelector(selectFavorites)

  
  return (
    <div className='user-settings'>
      UserSettings

      <form>
        <div className='form-group'>
          <label htmlFor="change-un">username</label>
          <input id='change-un' type="radio" /> 
        </div>

        <div className='form-group'>
          <label htmlFor="change-pw">password</label>
          <input id='change-pw' type="radio" /> 
        </div>

        <div className='form-group'>
          <label htmlFor="change-profile">profile image</label>
          <input id='change-profile' type="radio" /> 
        </div>
      </form>
    </div>
  )
}

export default UserSettings