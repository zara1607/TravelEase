import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpDown } from 'lucide-react'
import { SkeletonCard } from '../../ui/Skeleton'
import FlightCard from '../flights/FlightCard'
import HotelCard from '../hotels/HotelCard'
import { SORT_OPTIONS } from '../../lib/constants'

const SearchResults = ({ results, loading, type }) => {
  const [sortBy, setSortBy] = useState('price_low')

  // Ensure results is always an array - this is the critical fix
  const safeResults = React.useMemo(() => {
    if (!results) return []
    if (Array.isArray(results)) return results
    if (results.data && Array.isArray(results.data)) return results.data
    return []
  }, [results])

  const sortResults = (items) => {
    if (!items || items.length === 0) return []
    
    const sorted = [...items]
    
    switch (sortBy) {
      case 'price_low':
        return sorted.sort((a, b) => {
          const priceA = a.price || a.pricePerNight || 0
          const priceB = b.price || b.pricePerNight || 0
          return priceA - priceB
        })
      case 'price_high':
        return sorted.sort((a, b) => {
          const priceA = a.price || a.pricePerNight || 0
          const priceB = b.price || b.pricePerNight || 0
          return priceB - priceA
        })
      case 'rating':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0))
      case 'duration':
        return sorted.sort((a, b) => (a.duration || 0) - (b.duration || 0))
      default:
        return sorted
    }
  }

  const sortedResults = sortResults(safeResults)

  return (
    <div>
      {/* Header with Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {loading ? 'Searching...' : `${sortedResults.length} Results Found`}
          </h2>
          <p className="text-gray-600 mt-1">
            {type === 'flights' && 'Find the best flights for your journey'}
            {type === 'hotels' && 'Discover comfortable stays at great prices'}
            {type === 'packages' && 'Explore amazing holiday packages'}
          </p>
        </div>

        {/* Sort Dropdown */}
        {!loading && sortedResults.length > 0 && (
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-5 h-5 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="space-y-4">
        {loading ? (
          // Loading Skeletons
          [...Array(5)].map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : sortedResults.length === 0 ? (
          // No Results
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">✈️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Results Found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              We couldn't find any {type} matching your criteria. Try adjusting your filters or search parameters.
            </p>
          </motion.div>
        ) : (
          // Results List
          sortedResults.map((item, index) => (
            <motion.div
              key={item._id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {type === 'flights' && <FlightCard flight={item} />}
              {type === 'hotels' && <HotelCard hotel={item} />}
              {type === 'packages' && <HotelCard hotel={item} isPackage />}
            </motion.div>
          ))
        )}
      </div>

      {/* Load More (if needed) */}
      {!loading && sortedResults.length > 0 && sortedResults.length >= 20 && (
        <div className="text-center mt-8">
          <button className="px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors font-semibold">
            Load More Results
          </button>
        </div>
      )}
    </div>
  )
}

export default SearchResults