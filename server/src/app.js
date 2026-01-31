import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import config from './config/env.js'
import { errorHandler, notFound } from './middlewares/error.middleware.js'

// Import all route modules
import authRoutes from './routes/auth.routes.js'
import flightRoutes from './routes/flight.routes.js'
import hotelRoutes from './routes/hotel.routes.js'
import tourRoutes from './routes/tour.routes.js'
import bookingRoutes from './routes/booking.routes.js'  // ✅ Booking routes import
import adminRoutes from './routes/admin.routes.js'
import searchRoutes from './routes/search.routes.js'    // ✅ Add search routes if you have them
import packagesRoutes from './routes/packages.routes.js'  // ✅ ADDED PACKAGES ROUTES IMPORT

const app = express()

// Middleware
app.use(cors({
  origin: config.clientUrl,
  credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (config.nodeEnv === 'development') {
  app.use(morgan('dev'))
}

// Health check route
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
    database: config.dbConnected ? 'Connected' : 'Disconnected'
  })
})

// API Documentation route
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'TravelEase API Documentation',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      flights: '/api/flights',
      hotels: '/api/hotels',
      tours: '/api/tours',
      bookings: '/api/bookings',
      admin: '/api/admin',
      search: '/api/search',
      packages: '/api/packages'  // ✅ ADDED PACKAGES ENDPOINT
    },
    documentation: '/api-docs' // Optional: Add Swagger/OpenAPI docs
  })
})

// Register all routes
app.use('/api/auth', authRoutes)
app.use('/api/flights', flightRoutes)
app.use('/api/hotels', hotelRoutes)
app.use('/api/tours', tourRoutes)
app.use('/api/bookings', bookingRoutes)  // ✅ Booking routes registration
app.use('/api/admin', adminRoutes)
app.use('/api/search', searchRoutes)      // ✅ Search routes if you have them
app.use('/api/packages', packagesRoutes)  // ✅ ADDED PACKAGES ROUTES REGISTRATION

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to TravelEase API',
    version: '1.0.0',
    description: 'A comprehensive travel booking platform API',
    endpoints: {
      auth: '/api/auth',
      flights: '/api/flights',
      hotels: '/api/hotels',
      tours: '/api/tours',
      bookings: '/api/bookings',
      admin: '/api/admin',
      search: '/api/search',
      packages: '/api/packages'  // ✅ ADDED PACKAGES ENDPOINT
    },
    health: '/health',
    documentation: '/api'
  })
})

// Error handling middleware (should be last)
app.use(notFound)
app.use(errorHandler)

export default app