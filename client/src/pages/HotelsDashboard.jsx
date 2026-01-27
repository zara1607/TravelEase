import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { Hotel, Filter, MapPin, Star, TrendingUp, DollarSign } from 'lucide-react'
import { getAllHotels } from '../features/hotels/hotels.api'
import HotelCard from '../features/hotels/HotelCard'
import { SkeletonCard } from '../ui/Skeleton'
import { Card, CardContent } from '../ui/Card'

const HotelsDashboard = () => {
  const [filter, setFilter] = useState('all')

  const { data, isLoading } = useQuery({
    queryKey: ['allHotels'],
    queryFn: () => getAllHotels({ limit: 50 })
  })

  const hotels = data?.data || []

  const cities = [...new Set(hotels.map(h => h.city))].slice(0, 6)

  const stats = [
    { label: 'Total Hotels', value: hotels.length, icon: Hotel, color: 'bg-blue-500' },
    { label: 'Cities', value: new Set(hotels.map(h => h.city)).size, icon: MapPin, color: 'bg-green-500' },
    { label: 'Avg Rating', value: (hotels.reduce((acc, h) => acc + h.rating, 0) / hotels.length || 0).toFixed(1), icon: Star, color: 'bg-yellow-500' },
    { label: 'Avg Price', value: `₹${Math.round(hotels.reduce((acc, h) => acc + h.pricePerNight, 0) / hotels.length || 0).toLocaleString()}`, icon: DollarSign, color: 'bg-purple-500' }
  ]

  const filteredHotels = filter === 'all' 
    ? hotels 
    : filter === 'featured'
    ? hotels.filter(h => h.featured)
    : filter === 'budget'
    ? hotels.filter(h => h.pricePerNight < 15000)
    : hotels.filter(h => h.pricePerNight >= 15000)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Hotel className="w-10 h-10" />
              <h1 className="text-4xl font-bold">Hotels Dashboard</h1>
            </div>
            <p className="text-xl text-purple-100">
              Discover luxury stays and comfortable accommodations across India
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

        {/* Popular Cities */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Hotels by City</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {cities.map((city, index) => (
                <div key={index} className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                  <MapPin className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="font-semibold text-gray-900">{city}</p>
                  <p className="text-sm text-gray-600">{hotels.filter(h => h.city === city).length} hotels</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <Filter className="w-5 h-5 text-gray-600" />
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all' ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Hotels ({hotels.length})
            </button>
            <button
              onClick={() => setFilter('featured')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'featured' ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Featured
            </button>
            <button
              onClick={() => setFilter('budget')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'budget' ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Budget Friendly
            </button>
            <button
              onClick={() => setFilter('luxury')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'luxury' ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Luxury
            </button>
          </div>
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            [...Array(9)].map((_, i) => <SkeletonCard key={i} />)
          ) : (
            filteredHotels.map((hotel, index) => (
              <motion.div
                key={hotel._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <HotelCard hotel={hotel} />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default HotelsDashboard