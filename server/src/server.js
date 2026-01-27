import app from './app.js'
import config from './config/env.js'
import connectDB from './config/db.js'

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...')
  console.error(err.name, err.message)
  process.exit(1)
})

// Connect to database
connectDB()

// Start server
const server = app.listen(config.port, () => {
  console.log(`
  ╔═══════════════════════════════════════════════════════╗
  ║                                                       ║
  ║   🚀 TravelEase API Server                           ║
  ║                                                       ║
  ║   ✨ Server running on port ${config.port}                     ║
  ║   📝 Environment: ${config.nodeEnv}                    ║
  ║   🌐 URL: http://localhost:${config.port}                     ║
  ║   📚 API Docs: http://localhost:${config.port}/api            ║
  ║                                                       ║
  ╚═══════════════════════════════════════════════════════╝
  `)
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...')
  console.error(err.name, err.message)
  server.close(() => {
    process.exit(1)
  })
})

// Handle SIGTERM
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully')
  server.close(() => {
    console.log('💥 Process terminated!')
  })
})