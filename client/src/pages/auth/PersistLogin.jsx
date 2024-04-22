import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"

import usePersist from "../../utils/hooks/usePersist"
import { logoutUser, refreshToken } from "../../api/authApi"
import { login, logout } from "../../features/auth/authSlice"


const PersistLogin = ({ children }) => {

  const dispatch = useDispatch()
  const { persist } = usePersist()

  const effectRan = useRef(false)

  // adjusted to work with React.StrictMode
  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      if (persist) {
        (async () => {
          try {
            const { data } = await refreshToken() 
            dispatch(login({ ...data?.user, token: data?.aT }))
          }
          catch (err) { 
            // delete jwt cookie when expired
            await logoutUser()
          }
        })()
      }
    }

    return () => effectRan.current = true
  }, [])

  return children
}
export default PersistLogin