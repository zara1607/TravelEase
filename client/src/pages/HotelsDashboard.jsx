// /src/pages/HotelsDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, SlidersHorizontal, X, MapPin, Star,
  Calendar, Users, Wifi, Coffee, Dumbbell, Waves,
  Filter, ChevronDown, ChevronUp, Loader, DollarSign,
  Sparkles, ParkingCircle, Bath, Wind, Utensils
} from 'lucide-react';
import { HOTELS_DATA, getUniqueHotelCities, getUniqueAmenities } from '../data/hotelsData';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Skeleton from '../ui/Skeleton';

const HotelsDashboard = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Filter state
  const [filters, setFilters] = useState({
    priceRange: 'all',
    starRating: 'all',
    amenities: [],
    cities: []
  });

  // Sort state
  const [sortBy, setSortBy] = useState('popularity');

  // Get unique values for filters
  const cities = getUniqueHotelCities();
  const amenities = getUniqueAmenities();

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setHotels(HOTELS_DATA);
      setFilteredHotels(HOTELS_DATA);
      setLoading(false);
    }, 1000);
  }, []);

  // Handle search
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setSearchPerformed(true);

    let results = hotels;

    // Filter by search query
    if (query) {
      results = results.filter(hotel => 
        hotel.name.toLowerCase().includes(query) ||
        hotel.city.toLowerCase().includes(query) ||
        hotel.location.toLowerCase().includes(query)
      );
    }

    // Apply all filters
    results = applyFilters(results);
    
    // Apply sorting
    results = applySorting(results);
    
    setFilteredHotels(results);
  };

  // Apply filters
  const applyFilters = (hotelList) => {
    let filtered = [...hotelList];

    // Price range filter
    if (filters.priceRange !== 'all') {
      filtered = filtered.filter(hotel => {
        if (filters.priceRange === '0-100') return hotel.pricePerNight < 100;
        if (filters.priceRange === '100-300') return hotel.pricePerNight >= 100 && hotel.pricePerNight < 300;
        if (filters.priceRange === '300+') return hotel.pricePerNight >= 300;
        return true;
      });
    }

    // Star rating filter
    if (filters.starRating !== 'all') {
      filtered = filtered.filter(hotel => 
        hotel.starRating === parseInt(filters.starRating)
      );
    }

    // Amenities filter
    if (filters.amenities.length > 0) {
      filtered = filtered.filter(hotel => 
        filters.amenities.every(amenity => 
          hotel.amenities.includes(amenity)
        )
      );
    }

    // Cities filter
    if (filters.cities.length > 0) {
      filtered = filtered.filter(hotel => 
        filters.cities.includes(hotel.city)
      );
    }

    return filtered;
  };

  // Apply sorting
  const applySorting = (hotelList) => {
    const sorted = [...hotelList];
    
    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.pricePerNight - b.pricePerNight);
      case 'price-desc':
        return sorted.sort((a, b) => b.pricePerNight - a.pricePerNight);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'popularity':
        return sorted.sort((a, b) => b.reviews - a.reviews);
      default:
        return sorted;
    }
  };

  // Handle filter changes
  const handleFilterChange = (type, value) => {
    setFilters(prev => {
      if (type === 'amenities' || type === 'cities') {
        const updated = prev[type].includes(value)
          ? prev[type].filter(item => item !== value)
          : [...prev[type], value];
        return { ...prev, [type]: updated };
      }
      return { ...prev, [type]: value };
    });
  };

  // Apply filters and sorting when they change
  useEffect(() => {
    if (!loading) {
      let results = hotels;
      
      // Apply search filter
      if (searchQuery) {
        results = results.filter(hotel => 
          hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          hotel.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      // Apply other filters
      results = applyFilters(results);
      
      // Apply sorting
      results = applySorting(results);
      
      setFilteredHotels(results);
    }
  }, [filters, sortBy, loading]);

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      priceRange: 'all',
      starRating: 'all',
      amenities: [],
      cities: []
    });
    setSortBy('popularity');
    setSearchQuery('');
    setFilteredHotels(hotels);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Find Your Perfect Stay</h1>
          <p className="text-gray-600 mt-2">Discover amazing hotels worldwide</p>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by hotel name or destination..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="md:w-auto"
              >
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                Filters
                {showFilters ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          </div>
        </Card>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-6"
            >
              <Card>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Filters</h3>
                    <button
                      onClick={clearFilters}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Clear All
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Price Range */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                      <select
                        value={filters.priceRange}
                        onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="all">All Prices</option>
                        <option value="0-100">Under $100</option>
                        <option value="100-300">$100 - $300</option>
                        <option value="300+">$300+</option>
                      </select>
                    </div>

                    {/* Star Rating */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Star Rating</label>
                      <select
                        value={filters.starRating}
                        onChange={(e) => handleFilterChange('starRating', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="all">Any</option>
                        <option value="3">3 Star</option>
                        <option value="4">4 Star</option>
                        <option value="5">5 Star</option>
                      </select>
                    </div>

                    {/* Cities */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cities</label>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {cities.map(city => (
                          <label key={city} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={filters.cities.includes(city)}
                              onChange={() => handleFilterChange('cities', city)}
                              className="rounded text-blue-600"
                            />
                            <span className="text-sm">{city}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Amenities */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {amenities.slice(0, 10).map(amenity => (
                          <label key={amenity} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={filters.amenities.includes(amenity)}
                              onChange={() => handleFilterChange('amenities', amenity)}
                              className="rounded text-blue-600"
                            />
                            <span className="text-sm">{amenity}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sort By */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center gap-4">
                      <label className="text-sm font-medium text-gray-700">Sort by:</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="popularity">Popularity</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="rating">Rating</option>
                      </select>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Count */}
        {!loading && (
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600">
              <span className="font-bold text-gray-900">{filteredHotels.length}</span> hotels found
              {searchQuery && <> for "{searchQuery}"</>}
            </p>
          </div>
        )}

        {/* Hotels Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Card key={i}>
                <Skeleton className="h-48 w-full" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-4" />
                  <div className="flex justify-between">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : filteredHotels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHotels.map((hotel, index) => (
              <motion.div
                key={hotel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-300 group">
                  {/* Hotel Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={hotel.images[0]}
                      alt={hotel.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {hotel.popular && (
                      <div className="absolute top-4 right-4">
                        <Badge variant="warning" className="bg-orange-500 text-white border-0">
                          🔥 Popular
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Hotel Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{hotel.name}</h3>
                    
                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                      <MapPin className="w-3 h-3" />
                      <span>{hotel.city}</span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{hotel.rating}</span>
                      </div>
                      <span className="text-xs text-gray-500">({hotel.reviews} reviews)</span>
                      <Badge variant="primary" size="sm" className="ml-auto">
                        {hotel.starRating} ★
                      </Badge>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {hotel.description}
                    </p>

                    {/* Amenities Preview */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {hotel.amenities.slice(0, 3).map((amenity, i) => (
                        <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                          {amenity.includes('WiFi') && '📶'}
                          {amenity.includes('Pool') && '🏊'}
                          {amenity.includes('Spa') && '💆'}
                          {amenity.includes('Restaurant') && '🍽️'}
                          {amenity.includes('Gym') && '💪'}
                          {!amenity.includes('WiFi') && !amenity.includes('Pool') && 
                           !amenity.includes('Spa') && !amenity.includes('Restaurant') && 
                           !amenity.includes('Gym') && '✓'}
                        </span>
                      ))}
                      {hotel.amenities.length > 3 && (
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                          +{hotel.amenities.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Price & Actions */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Starting from</p>
                        <p className="text-xl font-bold text-blue-600">${hotel.pricePerNight}</p>
                        <p className="text-xs text-gray-500">per night</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/hotel/${hotel.id}`)}
                        >
                          View Details
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => navigate(`/hotel/${hotel.id}`)}
                        >
                          Book
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Hotels Found</h3>
            <p className="text-gray-600 mb-6">
              {searchPerformed 
                ? "No hotels match your search. Try adjusting your filters."
                : "Try searching for hotels to see results."}
            </p>
            <Button variant="primary" onClick={clearFilters}>
              Clear Filters
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default HotelsDashboard;