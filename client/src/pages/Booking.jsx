import React from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import FlightDetails from '../features/flights/FlightDetails'
import HotelGallery from '../features/hotels/HotelGallery'
import BookingForm from '../features/bookings/BookingForm'
import PriceSummary from '../features/bookings/PriceSummary'
import { getFlightById } from '../features/flights/flights.api'
import { getHotelById } from '../features/hotels/hotels.api'
import { SkeletonCard } from '../ui/Skeleton'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import Badge from '../ui/Badge'
import { MapPin, Star, Wifi, Coffee, Dumbbell, Users } from 'lucide-react'

const Booking = () => {
  const { id } = useParams()
  const location = useLocation()
  const itemType = location.pathname.includes('flights') 
    ? 'flight' 
    : location.pathname.includes('hotels') 
    ? 'hotel' 
    : 'package'

  const { data: item, isLoading } = useQuery({
    queryKey: [itemType, id],
    queryFn: () => {
      if (itemType === 'flight') return getFlightById(id)
      if (itemType === 'hotel') return getHotelById(id)
      return getHotelById(id) // packages use same endpoint as hotels
    }
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container-custom">
          <SkeletonCard />
        </div>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Item not found</h2>
          <Link to="/" className="text-primary hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    )
  }

  const amenityIcons = {
    wifi: Wifi,
    breakfast: Coffee,
    gym: Dumbbell
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        {/* Back Button */}
        <Link
          to={`/search?type=${itemType}s`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to search results</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Flight Details */}
            {itemType === 'flight' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <FlightDetails flight={item} />
              </motion.div>
            )}

            {/* Hotel Details */}
            {(itemType === 'hotel' || itemType === 'package') && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Gallery */}
                <HotelGallery images={item.images} />

                {/* Hotel Info */}
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl mb-2">{item.name}</CardTitle>
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{item.location || item.city}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-primary text-white px-3 py-1 rounded-lg">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="font-semibold">{item.rating || 4.5}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-6">{item.description}</p>

                    {/* Amenities */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Amenities</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {(item.amenities || ['wifi', 'breakfast', 'gym']).map((amenity, index) => {
                          const IconComponent = amenityIcons[amenity.toLowerCase()] || Wifi
                          return (
                            <div key={index} className="flex items-center gap-2">
                              <IconComponent className="w-5 h-5 text-primary" />
                              <span className="text-gray-700 capitalize">{amenity}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Booking Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <BookingForm
                itemId={id}
                itemType={itemType}
                totalPrice={item.price || item.pricePerNight}
              />
            </motion.div>
          </div>

          {/* Sidebar - Price Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <PriceSummary
                basePrice={item.price || item.pricePerNight}
                guests={1}
                nights={itemType === 'hotel' ? 1 : 1}
                type={itemType}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Booking