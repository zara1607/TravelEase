import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Search, Plane } from 'lucide-react'
import Button from '../ui/Button'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* 404 Illustration */}
          <div className="mb-8">
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block"
            >
              <Plane className="w-32 h-32 text-primary mx-auto" />
            </motion.div>
          </div>

          {/* 404 Text */}
          <h1 className="text-9xl font-bold text-gray-900 mb-4">404</h1>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Oops! Page Not Found
          </h2>
          
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            Looks like this destination doesn't exist. The page you're looking for has taken a different flight path.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button size="lg" icon={<Home className="w-5 h-5" />}>
                Go Home
              </Button>
            </Link>
            <Link to="/search">
              <Button size="lg" variant="outline" icon={<Search className="w-5 h-5" />}>
                Search Trips
              </Button>
            </Link>
          </div>

          {/* Suggestions */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">You might want to check out:</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/search?type=flights" className="text-primary hover:underline text-sm">
                Flights
              </Link>
              <span className="text-gray-300">•</span>
              <Link to="/search?type=hotels" className="text-primary hover:underline text-sm">
                Hotels
              </Link>
              <span className="text-gray-300">•</span>
              <Link to="/search?type=packages" className="text-primary hover:underline text-sm">
                Packages
              </Link>
              <span className="text-gray-300">•</span>
              <Link to="/dashboard" className="text-primary hover:underline text-sm">
                Dashboard
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound