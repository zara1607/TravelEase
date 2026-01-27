import axios from 'axios'

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle different error scenarios
    if (error.response) {
      const { status } = error.response

      // For 401, clear auth and redirect
      if (status === 401) {
        const currentPath = window.location.pathname
        // Only clear and redirect if not on auth pages
        if (!currentPath.includes('/login') && !currentPath.includes('/register')) {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          window.location.href = '/login'
        }
      }
    }

    return Promise.reject(error)
  }
)

export default api