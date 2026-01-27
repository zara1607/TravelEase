import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plane, Shield, Clock, Award } from 'lucide-react'

const AuthLayout = () => {
  const features = [
    {
      icon: Shield,
      title: 'Secure Booking',
      description: 'Your data is protected with enterprise-grade security'
    },
    {
      icon: Clock,
      title: 'Instant Confirmation',
      description: 'Get booking confirmations in seconds'
    },
    {
      icon: Award,
      title: 'Best Prices',
      description: 'Guaranteed lowest prices or we refund the difference'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-blue-600 p-12 flex-col justify-between relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-white rounded-lg p-3 group-hover:scale-110 transition-transform">
              <Plane className="w-8 h-8 text-primary" />
            </div>
            <span className="text-2xl font-bold text-white">TravelEase</span>
          </Link>

          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-16"
          >
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
              Your Journey<br />Starts Here
            </h1>
            <p className="text-xl text-blue-100 mb-12 max-w-md">
              Book flights, hotels, and complete travel packages with confidence and ease.
            </p>

            {/* Features */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                    <p className="text-blue-100 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="relative z-10 grid grid-cols-3 gap-8"
        >
          <div>
            <div className="text-3xl font-bold text-white mb-1">10M+</div>
            <div className="text-blue-100 text-sm">Happy Travelers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">50K+</div>
            <div className="text-blue-100 text-sm">Destinations</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">4.9★</div>
            <div className="text-blue-100 text-sm">User Rating</div>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <Link to="/" className="flex lg:hidden items-center gap-2 mb-8 justify-center">
            <div className="bg-primary rounded-lg p-2">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">TravelEase</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout