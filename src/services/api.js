import axios from 'axios'

const api = axios.create({
  baseURL: 'https://localhost:8000/api',
})

api.interceptors.request.use((config) => {

  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(response => response, async error => {

    const originalRequest = error.config

    /* Token Expired */

    if (error.response?.status === 401 && !originalRequest._retry) {

      originalRequest._retry = true

      try {

        const refreshToken = localStorage.getItem('refresh_token')

        const response = await axios.post( 'https://localhost:8000/api/token/refresh', {
          refresh_token: refreshToken,
        })

        const newToken = response.data.token

        localStorage.setItem('token', newToken)

        originalRequest.headers.Authorization = `Bearer ${newToken}`

        return api(originalRequest)

      } catch {
        localStorage.removeItem('token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)

export default api