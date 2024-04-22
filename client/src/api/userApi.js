import axios from "axios"


export const userApi = axios.create({ 
  baseURL: 'http://localhost:5000',
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
})

export const toggleFavRequest = async (workId) => 
  await userApi.post('/user/favorites/toggle', { workId })
