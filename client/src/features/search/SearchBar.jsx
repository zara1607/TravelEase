import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, MapPin, Calendar, Users, X } from 'lucide-react'
import Button from '../../ui/Button'
import { motion } from 'framer-motion'

const SearchBar = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState({
    destination: searchParams.get('destination') || '',
    from: searchParams.get('from') || '',
    to: searchParams.get('to') || '',
    checkIn: searchParams.get('checkIn') || '',
    checkOut: searchParams.get('checkOut') || '',
    guests: searchParams.get('guests') || '1',
    type: searchParams.get('type') || 'flights'
  })

  const handleInputChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }))
  }

  const handleSearch = () => {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })
    setSearchParams(params)
    if (onSearch) onSearch(filters)
  }

  const clearFilter = (field) => {
    handleInputChange(field, '')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 mb-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Destination/From Field */}
        {filters.type === 'flights' ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={filters.from}
                onChange={(e) => handleInputChange('from', e.target.value)}
                placeholder="Departure city"
                className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
              {filters.from && (
                <button
                  onClick={() => clearFilter('from')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={filters.destination}
                onChange={(e) => handleInputChange('destination', e.target.value)}
                placeholder="Where to?"
                className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
              {filters.destination && (
                <button
                  onClick={() => clearFilter('destination')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* To Field (Only for flights) */}
        {filters.type === 'flights' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={filters.to}
                onChange={(e) => handleInputChange('to', e.target.value)}
                placeholder="Arrival city"
                className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
              {filters.to && (
                <button
                  onClick={() => clearFilter('to')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Check-in Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {filters.type === 'flights' ? 'Departure' : 'Check-in'}
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={filters.checkIn}
              onChange={(e) => handleInputChange('checkIn', e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Check-out Date (Only for hotels) */}
        {filters.type === 'hotels' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={filters.checkOut}
                onChange={(e) => handleInputChange('checkOut', e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
          </div>
        )}

        {/* Guests */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {filters.type === 'flights' ? 'Travelers' : 'Guests'}
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filters.guests}
              onChange={(e) => handleInputChange('guests', e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none appearance-none"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <option key={num} value={num}>
                  {num} {num === 1 ? (filters.type === 'flights' ? 'Traveler' : 'Guest') : (filters.type === 'flights' ? 'Travelers' : 'Guests')}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Search Button */}
      <Button
        onClick={handleSearch}
        size="lg"
        fullWidth
        icon={<Search className="w-5 h-5" />}
      >
        Update Search
      </Button>
    </motion.div>
  )
}

export default SearchBar