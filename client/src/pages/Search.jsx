import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import SearchBar from '../features/search/SearchBar'
import Filters from '../features/search/Filters'
import SearchResults from '../features/search/SearchResults'
import { search } from '../features/search/search.api'

const Search = () => {
  const [searchParams] = useSearchParams()
  const [filters, setFilters] = useState({})
  const type = searchParams.get('type') || 'flights'

  const searchQuery = {
    type,
    from: searchParams.get('from'),
    to: searchParams.get('to'),
    destination: searchParams.get('destination'),
    checkIn: searchParams.get('checkIn'),
    checkOut: searchParams.get('checkOut'),
    guests: searchParams.get('guests'),
    ...filters
  }

  const { data: results = [], isLoading } = useQuery({
    queryKey: ['search', type, searchQuery],
    queryFn: () => search(type, searchQuery),
    enabled: !!(searchQuery.from || searchQuery.destination || searchQuery.to)
  })

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        {/* Search Bar */}
        <SearchBar />

        {/* Results Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Filters onFilterChange={handleFilterChange} activeFilters={filters} />
          </div>

          {/* Search Results */}
          <div className="lg:col-span-3">
            <SearchResults results={results} loading={isLoading} type={type} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search