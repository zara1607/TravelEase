// src/pages/Packages.jsx
// Packages listing page with search and filters

import { useState, useEffect } from 'react';
import PackageCard from '../features/packages/PackageCard';
import { samplePackages, filterPackages, searchPackages } from '../data/samplePackages';

const Packages = () => {
  const [packages, setPackages] = useState(samplePackages);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    destination: '',
    checkIn: '',
    guests: 1,
  });
  const [appliedFilters, setAppliedFilters] = useState({
    priceRange: '',
    rating: '',
    category: '',
  });

  // Handle search
  const handleSearch = () => {
    let filtered = [...samplePackages];

    // Apply search query
    if (searchQuery.trim()) {
      filtered = searchPackages(searchQuery);
    }

    // Apply destination filter
    if (filters.destination.trim()) {
      filtered = filterPackages({ 
        ...appliedFilters,
        destination: filters.destination 
      });
    }

    // Apply other filters
    if (appliedFilters.priceRange) {
      const ranges = {
        '0-10000': { minPrice: 0, maxPrice: 10000 },
        '10000-25000': { minPrice: 10000, maxPrice: 25000 },
        '25000-50000': { minPrice: 25000, maxPrice: 50000 },
        '50000-100000': { minPrice: 50000, maxPrice: 100000 },
        '100000+': { minPrice: 100000, maxPrice: Infinity },
      };
      const range = ranges[appliedFilters.priceRange];
      if (range) {
        filtered = filtered.filter(pkg => 
          pkg.price >= range.minPrice && pkg.price < range.maxPrice
        );
      }
    }

    if (appliedFilters.rating) {
      const minRating = parseFloat(appliedFilters.rating);
      filtered = filtered.filter(pkg => pkg.rating >= minRating);
    }

    if (appliedFilters.category) {
      filtered = filtered.filter(pkg => 
        pkg.categories.includes(appliedFilters.category.toLowerCase())
      );
    }

    setPackages(filtered);
  };

  // Auto-search on filter change
  useEffect(() => {
    handleSearch();
  }, [appliedFilters]);

  const handleFilterChange = (filterType, value) => {
    setAppliedFilters(prev => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFilters({ destination: '', checkIn: '', guests: 1 });
    setAppliedFilters({ priceRange: '', rating: '', category: '' });
    setPackages(samplePackages);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Section */}
      <div className="bg-white shadow-sm py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Holiday Packages
          </h1>
          
          {/* Search Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination
              </label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <input
                  type="text"
                  value={filters.destination}
                  onChange={(e) => setFilters({ ...filters, destination: e.target.value })}
                  placeholder="Where to?"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Check-in
              </label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <input
                  type="date"
                  value={filters.checkIn}
                  onChange={(e) => setFilters({ ...filters, checkIn: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Guests
              </label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <input
                  type="number"
                  value={filters.guests}
                  onChange={(e) => setFilters({ ...filters, guests: parseInt(e.target.value) || 1 })}
                  min="1"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  Filters
                </h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Clear all
                </button>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Price Range</h4>
                <div className="space-y-2">
                  {[
                    { value: '0-10000', label: 'Under ₹10,000' },
                    { value: '10000-25000', label: '₹10,000 - ₹25,000' },
                    { value: '25000-50000', label: '₹25,000 - ₹50,000' },
                    { value: '50000-100000', label: '₹50,000 - ₹1,00,000' },
                    { value: '100000+', label: 'Above ₹1,00,000' },
                  ].map((range) => (
                    <label key={range.value} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="priceRange"
                        value={range.value}
                        checked={appliedFilters.priceRange === range.value}
                        onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Rating</h4>
                <div className="space-y-2">
                  {[
                    { value: '4.5', label: '4.5 & above' },
                    { value: '4.0', label: '4.0 & above' },
                    { value: '3.5', label: '3.5 & above' },
                  ].map((rating) => (
                    <label key={rating.value} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        value={rating.value}
                        checked={appliedFilters.rating === rating.value}
                        onChange={(e) => handleFilterChange('rating', e.target.value)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 flex items-center">
                        <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {rating.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Category</h4>
                <div className="space-y-2">
                  {[
                    { value: 'beach', label: 'Beach' },
                    { value: 'adventure', label: 'Adventure' },
                    { value: 'luxury', label: 'Luxury' },
                    { value: 'culture', label: 'Culture' },
                    { value: 'romantic', label: 'Romantic' },
                  ].map((category) => (
                    <label key={category.value} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category.value}
                        checked={appliedFilters.category === category.value}
                        onChange={(e) => handleFilterChange('category', e.target.value)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{category.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Packages Grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {packages.length} {packages.length === 1 ? 'Package' : 'Packages'} Found
                </h2>
                <p className="text-gray-600 mt-1">
                  Explore amazing holiday packages
                </p>
              </div>
            </div>

            {packages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {packages.map((pkg) => (
                  <PackageCard key={pkg.id} package={pkg} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="inline-block p-8 bg-gray-100 rounded-full mb-6">
                  <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  No Packages Found
                </h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any packages matching your criteria.
                  <br />
                  Try adjusting your filters or search parameters.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packages;