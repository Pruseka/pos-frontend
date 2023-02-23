import axios from 'axios'
import { Router } from 'react-router-dom'
import useMessage from '../lib/store/useMessage'

const apiClient = axios.create({
   baseURL: `http://localhost:5000/api`,
})

const setErrorMessage = useMessage.getState().setErrorMessage

apiClient.interceptors.request.use(
   (request) => {
      request.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
      return request
   },
   (error) => {
      return Promise.reject(error)
   }
)

apiClient.interceptors.response.use(
   (response) => response,
   (error) => {
      if (error.response) {
         setErrorMessage(error.response.data.message)
         if (error.response.data.message === 'Unauthorized access') {
            window.location.replace('/login')
         }
      }
   }
)

export default apiClient
