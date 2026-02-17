import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Car, Clock, MapPin, ArrowRight, Search, Filter, 
  Calendar, Users, Wifi, Droplets, Snowflake, AlertCircle,
  ChevronDown, Star, Luggage, Battery, Wind, Coffee,
  Shield, Fuel
} from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Card from '../ui/Card';

const CabsDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  const cabs = [
    {
      id: 'CB001',
      type: 'Hatchback',
      model: 'Maruti Suzuki Swift',
      capacity: 4,
      price: 12,
      priceUnit: 'per km',
      rating: 4.4,
      reviews: 1234,
      amenities: ['AC', 'Music System', 'Bottle Water', 'USB Charging'],
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['Power Windows', 'Power Steering', 'ABS'],
      fuelType: 'Petrol',
      transmission: 'Manual',
      popular: true
    },
    {
      id: 'CB002',
      type: 'Sedan',
      model: 'Honda City',
      capacity: 4,
      price: 16,
      priceUnit: 'per km',
      rating: 4.6,
      reviews: 2345,
      amenities: ['AC', 'Premium Music', 'Bottle Water', 'USB Charging', 'Bluetooth'],
      image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['Sunroof', 'Leather Seats', 'Cruise Control'],
      fuelType: 'Diesel',
      transmission: 'Automatic',
      popular: true
    },
    {
      id: 'CB003',
      type: 'SUV',
      model: 'Toyota Innova Crysta',
      capacity: 7,
      price: 22,
      priceUnit: 'per km',
      rating: 4.8,
      reviews: 3456,
      amenities: ['AC', 'Premium Sound System', 'Bottle Water', 'USB Charging', 'Bluetooth', 'Rear AC'],
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['Captain Seats', 'Push Button Start', 'Reverse Camera'],
      fuelType: 'Diesel',
      transmission: 'Automatic',
      popular: true
    },
    {
      id: 'CB004',
      type: 'Premium Sedan',
      model: 'Mercedes-Benz C-Class',
      capacity: 4,
      price: 35,
      priceUnit: 'per km',
      rating: 4.9,
      reviews: 987,
      amenities: ['AC', 'Premium Sound System', 'Bottle Water', 'USB Charging', 'Bluetooth', 'Ambient Lighting'],
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['Panoramic Sunroof', 'Ventilated Seats', 'Wireless Charging'],
      fuelType: 'Petrol',
      transmission: 'Automatic'
    },
    {
      id: 'CB005',
      type: 'SUV',
      model: 'Mahindra XUV700',
      capacity: 7,
      price: 19,
      priceUnit: 'per km',
      rating: 4.5,
      reviews: 1876,
      amenities: ['AC', 'Music System', 'Bottle Water', 'USB Charging', 'Bluetooth'],
      image: 'https://images.unsplash.com/photo-1539706934247-da0ef6e1dafc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['Sunroof', 'Digital Cluster', 'ADAS'],
      fuelType: 'Diesel',
      transmission: 'Manual'
    },
    {
      id: 'CB006',
      type: 'Electric',
      model: 'Tata Nexon EV',
      capacity: 4,
      price: 14,
      priceUnit: 'per km',
      rating: 4.3,
      reviews: 654,
      amenities: ['AC', 'Music System', 'USB Charging', 'Fast Charging'],
      image: 'https://images.unsplash.com/photo-1674047597454-1c104bf3ec1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['Electric', 'Touchscreen', 'Connected Car'],
      fuelType: 'Electric',
      transmission: 'Automatic'
    }
  ];

  const popularLocations = [
    { from: 'Airport', to: 'City Center', price: '₹450', time: '45 mins' },
    { from: 'Railway Station', to: 'Hotel', price: '₹250', time: '20 mins' },
    { from: 'City', to: 'Airport', price: '₹450', time: '45 mins' },
    { from: 'Local', to: 'Local', price: '₹12/km', time: 'Flexible' }
  ];

  const stats = [
    { label: 'Available Cabs', value: '250+', icon: Car, color: 'yellow' },
    { label: 'Cities', value: '45+', icon: MapPin, color: 'blue' },
    { label: 'Happy Riders', value: '50K+', icon: Users, color: 'purple' },
    { label: '24/7 Support', value: 'Always', icon: Clock, color: 'green' }
  ];

  const filters = [
    { id: 'all', label: 'All Cabs' },
    { id: 'price-low', label: 'Price: Low to High' },
    { id: 'price-high', label: 'Price: High to Low' },
    { id: 'rating', label: 'Top Rated' }
  ];

  const cabTypes = ['Hatchback', 'Sedan', 'SUV', 'Premium Sedan', 'Electric'];
  const capacities = [4, 5, 6, 7];

  const handleBookNow = (cab) => {
    navigate('/booking', { state: { item: cab, type: 'cab' } });
  };

  const getFilteredCabs = () => {
    let filtered = [...cabs];
    
    if (searchQuery) {
      filtered = filtered.filter(c => 
        c.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedFilter === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (selectedFilter === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (selectedFilter === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }
    
    return filtered;
  };

  const filteredCabs = getFilteredCabs();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-yellow-600 via-yellow-500 to-amber-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
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
              Book Cabs Instantly
            </h1>
            <p className="text-xl text-yellow-100 mb-8 max-w-2xl mx-auto">
              City rides, outstation trips, and airport transfers at your fingertips
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto bg-white rounded-2xl p-2 shadow-2xl">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-gray-400 ml-3" />
                <input
                  type="text"
                  placeholder="Enter pickup location"
                  className="flex-1 py-4 px-3 text-gray-900 placeholder-gray-400 focus:outline-none"
                />
                <div className="h-8 w-px bg-gray-300"></div>
                <input
                  type="text"
                  placeholder="Enter drop location"
                  className="flex-1 py-4 px-3 text-gray-900 placeholder-gray-400 focus:outline-none"
                />
                <Button variant="primary" className="mr-2 bg-yellow-600 hover:bg-yellow-700">
                  <Search className="w-5 h-5 mr-2" />
                  Search
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
        {/* Popular Routes */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Popular Trips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularLocations.map((route, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl shadow-md p-4 border border-gray-100 cursor-pointer hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">{route.from} → {route.to}</span>
                  <Badge variant="primary" className="bg-yellow-100 text-yellow-700 border-yellow-200">
                    {route.price}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{route.time}</p>
              </motion.div>
            ))}
          </div>
        </div>

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
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
              >
                {filters.map(f => (
                  <option key={f.id} value={f.id}>{f.label}</option>
                ))}
              </select>
            </div>

            <div className="flex-1"></div>

            <p className="text-sm text-gray-600">
              <span className="font-bold text-gray-900">{filteredCabs.length}</span> cabs available
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
                  {/* Cab Type Filter */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Cab Type</h3>
                    <div className="space-y-2">
                      {cabTypes.map(type => (
                        <label key={type} className="flex items-center gap-2">
                          <input type="checkbox" className="rounded text-yellow-600 focus:ring-yellow-500" />
                          <span className="text-sm text-gray-700">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Capacity Filter */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Capacity</h3>
                    <div className="space-y-2">
                      {capacities.map(cap => (
                        <label key={cap} className="flex items-center gap-2">
                          <input type="checkbox" className="rounded text-yellow-600 focus:ring-yellow-500" />
                          <span className="text-sm text-gray-700">{cap} Seats</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Fuel Type */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Fuel Type</h3>
                    <div className="space-y-2">
                      {['Petrol', 'Diesel', 'Electric'].map(fuel => (
                        <label key={fuel} className="flex items-center gap-2">
                          <input type="checkbox" className="rounded text-yellow-600 focus:ring-yellow-500" />
                          <span className="text-sm text-gray-700">{fuel}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Max Price/km</h3>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      step="1"
                      className="w-full accent-yellow-600"
                    />
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-gray-600">₹0</span>
                      <span className="text-sm text-gray-600">₹50+</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-200">
                  <Button variant="outline" size="sm">Reset</Button>
                  <Button variant="primary" size="sm" className="bg-yellow-600 hover:bg-yellow-700">Apply Filters</Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Cab Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCabs.map((cab, index) => (
            <motion.div
              key={cab.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full border-2 hover:border-yellow-200">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={cab.image}
                    alt={cab.model}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {cab.popular && (
                    <div className="absolute top-4 right-4">
                      <Badge variant="primary" className="bg-yellow-400 text-yellow-900 border-yellow-400">
                        🔥 Popular
                      </Badge>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 flex gap-1">
                    <Badge variant="secondary" className="bg-black/70 text-white border-0">
                      {cab.fuelType}
                    </Badge>
                    <Badge variant="secondary" className="bg-black/70 text-white border-0">
                      {cab.transmission}
                    </Badge>
                  </div>
                </div>

                <div className="p-6">
                  {/* Title & Rating */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{cab.model}</h3>
                      <p className="text-sm text-gray-600">{cab.type} • {cab.capacity} Seats</p>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-gray-900">{cab.rating}</span>
                      <span className="text-xs text-gray-500">({cab.reviews})</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {cab.features.slice(0, 3).map((feature, i) => (
                      <Badge key={i} variant="secondary" size="sm" className="bg-gray-100">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {cab.amenities.map((amenity, i) => (
                      <Badge key={i} variant="secondary" size="sm" className="bg-yellow-50 text-yellow-700 border-yellow-100">
                        {amenity === 'AC' && <Snowflake className="w-3 h-3 mr-1" />}
                        {amenity === 'Music System' && <Wind className="w-3 h-3 mr-1" />}
                        {amenity === 'Bottle Water' && <Droplets className="w-3 h-3 mr-1" />}
                        {amenity === 'USB Charging' && <Battery className="w-3 h-3 mr-1" />}
                        {amenity === 'Bluetooth' && <Wifi className="w-3 h-3 mr-1" />}
                        {amenity === 'Premium Sound System' && <Wind className="w-3 h-3 mr-1" />}
                        <span className="text-xs">{amenity}</span>
                      </Badge>
                    ))}
                  </div>

                  {/* Price & Book */}
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-bold text-yellow-600">
                        ₹{cab.price}
                      </p>
                      <p className="text-xs text-gray-500">{cab.priceUnit}</p>
                    </div>
                    <Button
                      onClick={() => handleBookNow(cab)}
                      variant="primary"
                      size="sm"
                      className="bg-yellow-600 hover:bg-yellow-700 group"
                    >
                      Book Now
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>

                  {/* Safety Badge */}
                  <div className="flex items-center gap-1 mt-4 pt-3 border-t border-gray-100">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-xs text-gray-600">Sanitized cab • Trained driver</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredCabs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-md p-12 text-center"
          >
            <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No cabs available</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters</p>
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
        {filteredCabs.length > 0 && (
          <div className="mt-8 text-center">
            <Button variant="outline" size="lg" className="px-12">
              Load More Cabs
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CabsDashboard;