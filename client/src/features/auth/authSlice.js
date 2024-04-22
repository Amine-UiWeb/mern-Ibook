import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  email: null,
  username: null,
  token: null,
  favorite_books: []
}

const getPayloadData = ({ 
  email, username, token, favorite_books, ...rest
}) => ({ email, username, token, favorite_books }) 


export const authSlice = createSlice({
  name: 'auth', 
  initialState, 
  reducers: {
    register: (state, action) => getPayloadData(action.payload),
    
    login: (state, action) => getPayloadData(action.payload),
    
    refresh: (state, action) => ({ ...state, token: action.payload.aT }),
    
    logout: (state) => initialState,
    
    toggleFavorite: (state, action) => {
      let { workId, toggle } = action.payload
      let index = state.favorite_books.indexOf(workId)
      
      if (toggle == 'add') state.favorite_books.push(workId)
      if (toggle == 'remove') state.favorite_books.splice(index, 1)  
      
      return state
    }
  }
})


export const selectIsToken = (state) => state.auth.token ? true : false
export const selectToken = (state) => state.auth.token
export const selectUsername = (state) => state.auth.username

export const selectFavorites = (state) => state.auth.favorite_books
export const selectIsFavorite = (state, workId) => 
  state.auth.favorite_books.some(id => id == workId)


export const { register, login, refresh, logout, toggleFavorite } = authSlice.actions

export default authSlice.reducer
