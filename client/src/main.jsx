import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client'
import { Provider, useDispatch, useSelector } from 'react-redux'

import store from './app/store.js'
import { logout, refresh, selectToken } from './features/auth/authSlice.js';
import { logoutUser, refreshToken } from './api/authApi.js';
import { userApi } from './api/userApi.js';

import App from './App.jsx'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <AxiosInterceptor />
      <App />
    </Provider>
  </React.StrictMode>
)

function AxiosInterceptor() {
 
  const token = useSelector(selectToken)
  const dispatch = useDispatch()


  useEffect(() => {

    const reqInterceptorId = userApi.interceptors.request.use(
      config => {
        config.headers['Authorization'] = `Bearer ${token}`
        return config; 
      }
    );

    const resInterceptorId = userApi.interceptors.response.use(
      async (res) => res,
      async (err) => {
      
        if (err.response.status == 401) {

          let result = await refreshToken() 
          let aT = result?.data?.aT
          if (aT) dispatch(refresh({ aT }))

          // refresh failed, return the refresh error (403)
          if (result?.response?.status == 403) return Promise.reject(result)    
          
          // refresh successfull, return original error (401)
          else if (err?.response?.status == 401) return Promise.reject(err)            

        }

        // return any other kind of error
        else { return Promise.reject(err) }

      }
    );

    return () => {
      userApi.interceptors.request.eject(reqInterceptorId);
      userApi.interceptors.response.eject(resInterceptorId);
    };

  }, [token]);

  // No need to render anything here!
  return null;
}

