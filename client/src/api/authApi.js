import axios from "axios"

export const authApi = axios.create({ 
  baseURL: 'http://localhost:5000',
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
  withCredentials: true
})


export const registerUser = async (newUser) => {
  try { return await authApi.post('/auth/register', newUser) }
  catch (err) { throw Error(err) }
}


export const loginUser = async (credentials) => {
  try { return await authApi.post('/auth/login', credentials) } 
  catch (err) { throw Error(err) }
}


export const refreshToken = async () => await authApi.get('/auth/refresh')


export const logoutUser = async () => {
  try { return await authApi.get('/auth/logout') } 
  catch (err) { throw Error(err) }
}

