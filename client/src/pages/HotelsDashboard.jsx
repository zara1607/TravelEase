import { Car } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Hotel, MapPin, Star, Wifi, Coffee, Users, 
  ArrowRight, Search, Filter, Bath, Sparkles,
  Dumbbell, Utensils, Waves, Wind, Clock,
  ChevronDown, Tv, Shield, Calendar, Award
} from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { getAllHotels } from '../features/hotels/hotels.api';

const HotelsDashboard = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const response = await getAllHotels();
      setHotels(response.data || []);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = (hotel) => {
    navigate('/booking', { state: { item: hotel, type: 'hotel' } });
  };

  const getFilteredHotels = () => {
    let filtered = [...hotels];
    
    if (searchQuery) {
      filtered = filtered.filter(h => 
        h.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.address?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedFilter === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (selectedFilter === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (selectedFilter === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (selectedFilter === 'popular') {
      filtered.sort((a, b) => b.reviews - a.reviews);
    }
    
    return filtered;
  };

  const filteredHotels = getFilteredHotels();

  const filters = [
    { id: 'all', label: 'All Hotels' },
    { id: 'popular', label: 'Most Popular' },
    { id: 'price-low', label: 'Price: Low to High' },
    { id: 'price-high', label: 'Price: High to Low' },
    { id: 'rating', label: 'Top Rated' }
  ];

  const stats = [
    { label: 'Hotels', value: hotels.length, icon: Hotel, color: 'blue' },
    { label: 'Cities', value: new Set(hotels.map(h => h.location)).size, icon: MapPin, color: 'green' },
    { label: 'Avg Rating', value: '4.6', icon: Star, color: 'yellow' },
    { label: '24/7 Support', value: 'Always', icon: Clock, color: 'purple' }
  ];

  const amenityIcons = {
    'Swimming Pool': <Waves className="w-3 h-3" />,
    'Spa': <Sparkles className="w-3 h-3" />,
    'Restaurant': <Utensils className="w-3 h-3" />,
    'Wi-Fi': <Wifi className="w-3 h-3" />,
    'Gym': <Dumbbell className="w-3 h-3" />,
    'Room Service': <Coffee className="w-3 h-3" />,
    'Bar': <Coffee className="w-3 h-3" />,
    'Business Center': <Tv className="w-3 h-3" />,
    'Airport Shuttle': <Car className="w-3 h-3" />,
    'Parking': <Car className="w-3 h-3" />
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading amazing hotels...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Find Your Perfect Stay
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Discover luxury hotels, boutique stays, and resorts worldwide
            </p>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto bg-white rounded-2xl p-2 shadow-2xl">
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 flex items-center px-4 border-b md:border-b-0 md:border-r border-gray-200">
                  <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Where are you going?"
                    className="w-full py-4 text-gray-900 placeholder-gray-400 focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center px-4 border-b md:border-b-0 md:border-r border-gray-200">
                  <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Check-in - Check-out"
                    className="w-full py-4 text-gray-900 placeholder-gray-400 focus:outline-none"
                    defaultValue="15 Mar - 20 Mar"
                  />
                </div>
                <div className="flex items-center px-4">
                  <Users className="w-5 h-5 text-gray-400 mr-2" />
                  <select className="w-full py-4 text-gray-900 focus:outline-none bg-transparent">
                    <option>2 Guests</option>
                    <option>3 Guests</option>
                    <option>4 Guests</option>
                    <option>5+ Guests</option>
                  </select>
                </div>
              </div>
              <div className="p-2 bg-gray-50 rounded-b-xl flex justify-end">
                <Button variant="primary" className="px-8">
                  <Search className="w-5 h-5 mr-2" />
                  Search Hotels
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
            >
              <div className={`inline-flex p-3 bg-${stat.color}-100 rounded-lg mb-3`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 sticky top-20 z-40">
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Filter className="w-5 h-5" />
              <span className="font-medium">Filters</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            <div className="h-6 w-px bg-gray-300"></div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                {filters.map(f => (
                  <option key={f.id} value={f.id}>{f.label}</option>
                ))}
              </select>
            </div>

            <div className="flex-1"></div>

            <p className="text-sm text-gray-600">
              <span className="font-bold text-gray-900">{filteredHotels.length}</span> hotels found
            </p>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="overflow-hidden"
            >
              <div className="border-t border-gray-200 mt-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Price Range */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Price Range</h3>
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      step="1000"
                      className="w-full accent-blue-600"
                    />
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-gray-600">₹0</span>
                      <span className="text-sm text-gray-600">₹50,000+</span>
                    </div>
                  </div>

                  {/* Property Type */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Property Type</h3>
                    <div className="space-y-2">
                      {['Hotel', 'Resort', 'Boutique', 'Apartment', 'Villa'].map(type => (
                        <label key={type} className="flex items-center gap-2">
                          <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                          <span className="text-sm text-gray-700">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Star Rating</h3>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map(rating => (
                        <label key={rating} className="flex items-center gap-2">
                          <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                          <span className="text-sm text-gray-700">{rating} ★</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Amenities */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Amenities</h3>
                    <div className="space-y-2">
                      {['Free WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym'].map(amenity => (
                        <label key={amenity} className="flex items-center gap-2">
                          <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                          <span className="text-sm text-gray-700">{amenity}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-200">
                  <Button variant="outline" size="sm">Reset</Button>
                  <Button variant="primary" size="sm">Apply Filters</Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel, index) => (
            <motion.div
              key={hotel.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group"
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full border-2 hover:border-blue-200">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-gray-900">{hotel.rating}</span>
                      <span className="text-xs text-gray-500">({hotel.reviews})</span>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge variant="primary" className="bg-blue-600 text-white border-0">
                      {hotel.propertyType || 'Hotel'}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {hotel.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1 text-gray-500 mb-3">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm truncate">{hotel.location}</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {hotel.description}
                  </p>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.amenities?.slice(0, 4).map((amenity, i) => (
                      <Badge key={i} variant="secondary" size="sm" className="bg-blue-50 text-blue-700 border-blue-100">
                        {amenityIcons[amenity] || <Sparkles className="w-3 h-3 mr-1" />}
                        <span className="text-xs">{amenity}</span>
                      </Badge>
                    ))}
                    {hotel.amenities?.length > 4 && (
                      <Badge variant="secondary" size="sm" className="bg-gray-100">
                        +{hotel.amenities.length - 4} more
                      </Badge>
                    )}
                  </div>

                  {/* Check-in/out */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>Check-in: {hotel.checkIn || '14:00'}</span>
                    <span>Check-out: {hotel.checkOut || '11:00'}</span>
                  </div>

                  {/* Price & Book */}
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Starting from</p>
                      <p className="text-3xl font-bold text-blue-600">
                        ₹{hotel.price?.toLocaleString('en-IN')}
                      </p>
                      <p className="text-xs text-gray-500">per night</p>
                    </div>
                    <Button
                      onClick={() => handleBookNow(hotel)}
                      variant="primary"
                      size="sm"
                      className="group"
                    >
                      Book Now
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>

                  {/* Rooms Available */}
                  <div className="flex items-center gap-1 mt-4 pt-3 border-t border-gray-100">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-600">{hotel.rooms} rooms available</span>
                    <Shield className="w-4 h-4 text-green-500 ml-auto" />
                    <span className="text-xs text-green-600">Free cancellation</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredHotels.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-md p-12 text-center"
          >
            <Hotel className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No hotels found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <Button 
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedFilter('all');
              }}
            >
              Clear All Filters
            </Button>
          </motion.div>
        )}

        {/* Load More */}
        {filteredHotels.length > 0 && (
          <div className="mt-8 text-center">
            <Button variant="outline" size="lg" className="px-12">
              Load More Hotels
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelsDashboard;