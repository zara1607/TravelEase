import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import config from './config/env.js'
import { errorHandler, notFound } from './middlewares/error.middleware.js'

// Import routes
import authRoutes from './routes/auth.routes.js'
import flightRoutes from './routes/flight.routes.js'
import hotelRoutes from './routes/hotel.routes.js'
import tourRoutes from './routes/tour.routes.js'
import bookingRoutes from './routes/booking.routes.js'
import adminRoutes from './routes/admin.routes.js'

const app = express()

// Middleware
app.use(cors({
  origin: config.clientUrl,
  credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Logging
if (config.nodeEnv === 'development') {
  app.use(morgan('dev'))
}

// Health check route
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/flights', flightRoutes)
app.use('/api/hotels', hotelRoutes)
app.use('/api/tours', tourRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/admin', adminRoutes)

// Welcome route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to TravelEase API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      flights: '/api/flights',
      hotels: '/api/hotels',
      tours: '/api/tours',
      bookings: '/api/bookings',
      admin: '/api/admin'
    }
  })
})

// Error handling
app.use(notFound)
app.use(errorHandler)

export default app