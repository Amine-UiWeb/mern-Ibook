import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  email: null,
  username: null,
  token: null,
  favoriteBooks: []
}

const getPayloadData = ({ 
  email, username, token, favorite_books, ...rest
}) => ({ email, username, token, favorite_books }) 


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register: (state, action) => {
      return getPayloadData(action.payload)
    },
    login: (state, action) => {
      return getPayloadData(action.payload)
    },
    refresh: (state, action) => {
      return getPayloadData(action.payload) 
    },
    logout: (state) => {
      return initialState
    }
  }
})

export const selectToken = (state) => state.auth.token

export const { register, login, logout } = authSlice.actions

export default authSlice.reducer
