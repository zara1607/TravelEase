import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { Plane, Filter, TrendingUp, Clock, MapPin } from 'lucide-react'
import { searchFlights } from '../features/flights/flights.api'
import FlightCard from '../features/flights/FlightCard'
import { SkeletonCard } from '../ui/Skeleton'
import { Card, CardContent } from '../ui/Card'
import Badge from '../ui/Badge'

const FlightsDashboard = () => {
  const [filter, setFilter] = useState('all')

  const { data, isLoading } = useQuery({
    queryKey: ['allFlights'],
    queryFn: () => searchFlights({ limit: 50 })
  })

  const flights = data?.data || []

  const popularRoutes = [
    { from: 'Delhi', to: 'Mumbai', count: flights.filter(f => f.departure.city === 'Delhi' && f.arrival.city === 'Mumbai').length },
    { from: 'Bangalore', to: 'Goa', count: flights.filter(f => f.departure.city === 'Bangalore' && f.arrival.city === 'Goa').length },
    { from: 'Mumbai', to: 'Dubai', count: flights.filter(f => f.departure.city === 'Mumbai' && f.arrival.city === 'Dubai').length },
    { from: 'Delhi', to: 'Singapore', count: flights.filter(f => f.departure.city === 'Delhi' && f.arrival.city === 'Singapore').length }
  ]

  const stats = [
    { label: 'Total Flights', value: flights.length, icon: Plane, color: 'bg-blue-500' },
    { label: 'Destinations', value: new Set(flights.map(f => f.arrival.city)).size, icon: MapPin, color: 'bg-green-500' },
    { label: 'Airlines', value: new Set(flights.map(f => f.airline)).size, icon: TrendingUp, color: 'bg-purple-500' },
    { label: 'Avg Price', value: `₹${Math.round(flights.reduce((acc, f) => acc + f.price, 0) / flights.length || 0).toLocaleString()}`, icon: Clock, color: 'bg-orange-500' }
  ]

  const filteredFlights = filter === 'all' 
    ? flights 
    : filter === 'domestic' 
    ? flights.filter(f => f.price < 20000)
    : flights.filter(f => f.price >= 20000)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Plane className="w-10 h-10" />
              <h1 className="text-4xl font-bold">Flights Dashboard</h1>
            </div>
            <p className="text-xl text-blue-100">
              Browse all available flights and find the perfect route for your journey
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Popular Routes */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Popular Routes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {popularRoutes.map((route, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{route.from} → {route.to}</p>
                    <p className="text-sm text-gray-600">{route.count} flights available</p>
                  </div>
                  <Badge variant="primary">{route.count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <Filter className="w-5 h-5 text-gray-600" />
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all' ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Flights ({flights.length})
            </button>
            <button
              onClick={() => setFilter('domestic')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'domestic' ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Domestic
            </button>
            <button
              onClick={() => setFilter('international')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'international' ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              International
            </button>
          </div>
        </div>

        {/* Flights List */}
        <div className="space-y-4">
          {isLoading ? (
            [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
          ) : (
            filteredFlights.map((flight, index) => (
              <motion.div
                key={flight._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <FlightCard flight={flight} />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default FlightsDashboard