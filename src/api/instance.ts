import { showNotification } from '@mantine/notifications'
import axios from 'axios'

const apiClient = axios.create({
   baseURL: `http://localhost:5000/api`,
})

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
         console.log(error)
         showNotification({ title: error.code, message: error.response.data.message, color: 'red' })
         if (error.response.data.message === 'Unauthorized access') {
            window.location.replace('/login')
         }
         // if (error.response.data.message === 'Access Denied') {
         //    window.location.replace('/')
         // }
      }
   }
)

export default apiClient
