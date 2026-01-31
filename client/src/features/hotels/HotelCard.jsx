// src/features/hotels/HotelCard.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Star, Wifi, Coffee, Dumbbell, Clock, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '../../ui/Card'
import Badge from '../../ui/Badge'
import Button from '../../ui/Button'
import { CURRENCY } from '../../lib/constants'

const HotelCard = ({ hotel, isPackage = false }) => {
  const navigate = useNavigate()

  // Ensure price consistency - use the same logic from your updated code
  const basePrice = hotel.pricePerNight || hotel.price || 0

  const handleBookNow = () => {
    const path = isPackage ? `/packages/${hotel._id}` : `/hotels/${hotel._id}`
    navigate(path, {
      state: { 
        item: {
          ...hotel,
          // Ensure price consistency across the app
          basePrice,
          pricePerNight: basePrice,
        }
      }
    })
  }

  const amenityIcons = {
    wifi: Wifi,
    breakfast: Coffee,
    gym: Dumbbell
  }

  const displayAmenities = hotel.amenities?.slice(0, 3) || []

  return (
    <Card hover className="cursor-pointer" onClick={handleBookNow}>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Hotel Image */}
          <div className="lg:col-span-4">
            <div className="relative h-64 lg:h-full rounded-lg overflow-hidden">
              <img
                src={hotel.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80'}
                alt={hotel.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {hotel.featured && (
                <div className="absolute top-4 left-4">
                  <Badge variant="warning">Featured</Badge>
                </div>
              )}
              {isPackage && (
                <div className="absolute top-4 right-4">
                  <Badge variant="info">Package</Badge>
                </div>
              )}
            </div>
          </div>

          {/* Hotel Details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {hotel.name}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{hotel.location || hotel.city}</span>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1 bg-primary text-white px-2 py-1 rounded">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-semibold">{hotel.rating || 4.5}</span>
                </div>
                <span className="text-sm text-gray-600">
                  ({hotel.reviews || 234} reviews)
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {hotel.description || 'Experience luxury and comfort in this beautiful property with world-class amenities and exceptional service.'}
              </p>

              {/* Amenities */}
              <div className="flex flex-wrap gap-2">
                {displayAmenities.map((amenity, index) => {
                  const IconComponent = amenityIcons[amenity.toLowerCase()] || Wifi
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full"
                    >
                      <IconComponent className="w-4 h-4 text-gray-600" />
                      <span className="text-xs text-gray-700 capitalize">{amenity}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Price & Action */}
          <div className="lg:col-span-3 flex flex-col justify-between items-end">
            <div className="text-right">
              {hotel.originalPrice && (
                <p className="text-sm text-gray-500 line-through mb-1">
                  {CURRENCY.symbol}{hotel.originalPrice.toLocaleString()}
                </p>
              )}
              <p className="text-sm text-gray-600 mb-1">
                {isPackage ? 'Package price from' : 'Starting from'}
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {CURRENCY.symbol}{basePrice.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {isPackage ? 'per person' : 'per night'}
              </p>

              {hotel.discount && (
                <div className="mt-2">
                  <Badge variant="success">{hotel.discount}% OFF</Badge>
                </div>
              )}
            </div>

            <div className="w-full space-y-2">
              {isPackage && hotel.duration && (
                <div className="flex items-center justify-end gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{hotel.duration}</span>
                </div>
              )}
              
              <Button
                size="lg"
                fullWidth
                onClick={(e) => {
                  e.stopPropagation()
                  handleBookNow()
                }}
              >
                {isPackage ? 'View Package' : 'Book Now'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default HotelCard
