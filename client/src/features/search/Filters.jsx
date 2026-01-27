import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { SlidersHorizontal, Star, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card'
import Button from '../../ui/Button'
import Badge from '../../ui/Badge'
import { PRICE_RANGES, AIRLINES } from '../../lib/constants'

const Filters = ({ onFilterChange, activeFilters = {} }) => {
  const [localFilters, setLocalFilters] = useState({
    priceRange: activeFilters.priceRange || null,
    rating: activeFilters.rating || null,
    airlines: activeFilters.airlines || [],
    stops: activeFilters.stops || null,
    amenities: activeFilters.amenities || []
  })

  const handlePriceChange = (range) => {
    const newFilters = { ...localFilters, priceRange: range }
    setLocalFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleRatingChange = (rating) => {
    const newFilters = { ...localFilters, rating }
    setLocalFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleAirlineToggle = (airline) => {
    const airlines = localFilters.airlines.includes(airline)
      ? localFilters.airlines.filter(a => a !== airline)
      : [...localFilters.airlines, airline]
    const newFilters = { ...localFilters, airlines }
    setLocalFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleStopsChange = (stops) => {
    const newFilters = { ...localFilters, stops }
    setLocalFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearAllFilters = () => {
    const resetFilters = {
      priceRange: null,
      rating: null,
      airlines: [],
      stops: null,
      amenities: []
    }
    setLocalFilters(resetFilters)
    onFilterChange(resetFilters)
  }

  const hasActiveFilters = Object.values(localFilters).some(value => 
    Array.isArray(value) ? value.length > 0 : value !== null
  )

  return (
    <Card className="sticky top-24">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-primary" />
          <CardTitle>Filters</CardTitle>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            Clear All
          </Button>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Price Range */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
          <div className="space-y-2">
            {PRICE_RANGES.map((range, index) => (
              <label
                key={index}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="priceRange"
                  checked={localFilters.priceRange?.label === range.label}
                  onChange={() => handlePriceChange(range)}
                  className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  {range.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Rating</h3>
          <div className="space-y-2">
            {[5, 4, 3].map((rating) => (
              <label
                key={rating}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="rating"
                  checked={localFilters.rating === rating}
                  onChange={() => handleRatingChange(rating)}
                  className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                />
                <div className="flex items-center gap-1">
                  {[...Array(rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-700 ml-1 group-hover:text-gray-900">
                    & above
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Stops (For Flights) */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Stops</h3>
          <div className="space-y-2">
            {['Non-stop', '1 Stop', '2+ Stops'].map((stop, index) => (
              <label
                key={index}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="stops"
                  checked={localFilters.stops === stop}
                  onChange={() => handleStopsChange(stop)}
                  className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  {stop}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Airlines */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Airlines</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-hide">
            {AIRLINES.map((airline) => (
              <label
                key={airline.code}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={localFilters.airlines.includes(airline.code)}
                  onChange={() => handleAirlineToggle(airline.code)}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  {airline.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="pt-4 border-t border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">Active Filters</h3>
            <div className="flex flex-wrap gap-2">
              {localFilters.priceRange && (
                <Badge variant="primary">
                  {localFilters.priceRange.label}
                </Badge>
              )}
              {localFilters.rating && (
                <Badge variant="primary">
                  {localFilters.rating}★ & above
                </Badge>
              )}
              {localFilters.stops && (
                <Badge variant="primary">
                  {localFilters.stops}
                </Badge>
              )}
              {localFilters.airlines.length > 0 && (
                <Badge variant="primary">
                  {localFilters.airlines.length} Airlines
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default Filters