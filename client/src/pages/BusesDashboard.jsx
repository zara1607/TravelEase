import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Bus, Clock, MapPin, ArrowRight, Search, Filter, 
  Calendar, Users, Wifi, Coffee, Battery, AlertCircle,
  ChevronDown, Star, Luggage, Tv, Wind, Droplets
} from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Card from '../ui/Card';

const BusesDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  const buses = [
    {
      id: 'BS001',
      name: 'VRL Travels',
      type: 'Volvo AC Sleeper',
      from: { city: 'Bangalore', time: '21:30', depot: 'Madiwala', code: 'BLR' },
      to: { city: 'Mumbai', time: '16:30', depot: 'Dadar', code: 'BOM' },
      duration: '19h 00m',
      price: 1250,
      rating: 4.5,
      reviews: 2345,
      seats: 24,
      totalSeats: 36,
      amenities: ['Charging Point', 'Blanket', 'Water Bottle', 'Reading Light', 'Entertainment'],
      operator: 'VRL',
      typeClass: 'AC Sleeper',
      popular: true
    },
    {
      id: 'BS002',
      name: 'SRS Travels',
      type: 'Volvo AC Seater',
      from: { city: 'Hyderabad', time: '22:00', depot: 'JBS', code: 'HYD' },
      to: { city: 'Chennai', time: '08:30', depot: 'Koyambedu', code: 'MAA' },
      duration: '10h 30m',
      price: 950,
      rating: 4.3,
      reviews: 1876,
      seats: 32,
      totalSeats: 42,
      amenities: ['Charging Point', 'Water Bottle', 'Entertainment', 'Snacks'],
      operator: 'SRS',
      typeClass: 'AC Seater'
    },
    {
      id: 'BS003',
      name: 'Orange Travels',
      type: 'Bharat Benz AC Sleeper',
      from: { city: 'Pune', time: '23:00', depot: 'Swargate', code: 'PNQ' },
      to: { city: 'Goa', time: '09:00', depot: 'Panjim', code: 'GOI' },
      duration: '10h 00m',
      price: 1100,
      rating: 4.4,
      reviews: 1543,
      seats: 18,
      totalSeats: 30,
      amenities: ['Charging Point', 'Blanket', 'Water Bottle', 'Reading Light', 'Wi-Fi'],
      operator: 'Orange',
      typeClass: 'AC Sleeper',
      popular: true
    },
    {
      id: 'BS004',
      name: 'Kallada Travels',
      type: 'Non-AC Sleeper',
      from: { city: 'Chennai', time: '20:00', depot: 'Koyambedu', code: 'MAA' },
      to: { city: 'Bangalore', time: '04:30', depot: 'Madiwala', code: 'BLR' },
      duration: '8h 30m',
      price: 650,
      rating: 4.0,
      reviews: 987,
      seats: 28,
      totalSeats: 40,
      amenities: ['Charging Point', 'Water Bottle'],
      operator: 'Kallada',
      typeClass: 'Non-AC Sleeper'
    },
    {
      id: 'BS005',
      name: 'Neeta Travels',
      type: 'Volvo AC Seater',
      from: { city: 'Mumbai', time: '22:30', depot: 'Dadar', code: 'BOM' },
      to: { city: 'Pune', time: '02:30', depot: 'Swargate', code: 'PNQ' },
      duration: '4h 00m',
      price: 450,
      rating: 4.2,
      reviews: 2134,
      seats: 42,
      totalSeats: 48,
      amenities: ['Charging Point', 'Water Bottle', 'Entertainment', 'Snacks'],
      operator: 'Neeta',
      typeClass: 'AC Seater'
    },
    {
      id: 'BS006',
      name: 'Raj Express',
      type: 'Volvo Multi-Axle Sleeper',
      from: { city: 'Delhi', time: '20:00', depot: 'ISBT Kashmiri Gate', code: 'DEL' },
      to: { city: 'Jaipur', time: '04:00', depot: 'Sindhi Camp', code: 'JAI' },
      duration: '8h 00m',
      price: 850,
      rating: 4.6,
      reviews: 3122,
      seats: 22,
      totalSeats: 32,
      amenities: ['Charging Point', 'Blanket', 'Water Bottle', 'Reading Light', 'Wi-Fi', 'Entertainment'],
      operator: 'Raj Express',
      typeClass: 'AC Sleeper',
      popular: true
    }
  ];

  const popularRoutes = [
    { from: 'Bangalore', to: 'Mumbai', price: '₹1,250', duration: '19h', buses: 12 },
    { from: 'Hyderabad', to: 'Chennai', price: '₹950', duration: '10h', buses: 8 },
    { from: 'Pune', to: 'Goa', price: '₹1,100', duration: '10h', buses: 6 },
    { from: 'Delhi', to: 'Jaipur', price: '₹850', duration: '8h', buses: 15 }
  ];

  const stats = [
    { label: 'Daily Buses', value: '500+', icon: Bus, color: 'orange' },
    { label: 'Routes', value: '300+', icon: MapPin, color: 'blue' },
    { label: 'Operators', value: '45+', icon: Users, color: 'purple' },
    { label: 'Cities', value: '120+', icon: Clock, color: 'green' }
  ];

  const filters = [
    { id: 'all', label: 'All Buses' },
    { id: 'price-low', label: 'Price: Low to High' },
    { id: 'price-high', label: 'Price: High to Low' },
    { id: 'duration', label: 'Fastest First' },
    { id: 'rating', label: 'Top Rated' }
  ];

  const busTypes = ['AC Sleeper', 'AC Seater', 'Non-AC Sleeper', 'Non-AC Seater'];

  const handleBookNow = (bus) => {
    navigate('/booking', { state: { item: bus, type: 'bus' } });
  };

  const getFilteredBuses = () => {
    let filtered = [...buses];
    
    if (searchQuery) {
      filtered = filtered.filter(b => 
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.from.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.to.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.operator.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedFilter === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (selectedFilter === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (selectedFilter === 'duration') {
      filtered.sort((a, b) => {
        const getHours = (d) => parseInt(d.split('h')[0]) * 60 + parseInt(d.split('h')[1]?.replace('m', '') || 0);
        return getHours(a.duration) - getHours(b.duration);
      });
    } else if (selectedFilter === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }
    
    return filtered;
  };

  const filteredBuses = getFilteredBuses();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-700 via-orange-600 to-amber-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80")',
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
              Book Bus Tickets
            </h1>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Travel comfortably with our premium bus partners across India
            </p>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto bg-white rounded-2xl p-2 shadow-2xl">
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 flex items-center px-4 border-b md:border-b-0 md:border-r border-gray-200">
                  <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="From (City)"
                    className="w-full py-4 text-gray-900 placeholder-gray-400 focus:outline-none"
                  />
                </div>
                <div className="flex-1 flex items-center px-4 border-b md:border-b-0 md:border-r border-gray-200">
                  <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="To (City)"
                    className="w-full py-4 text-gray-900 placeholder-gray-400 focus:outline-none"
                  />
                </div>
                <div className="flex items-center px-4 border-b md:border-b-0 md:border-r border-gray-200">
                  <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Date"
                    className="w-full py-4 text-gray-900 placeholder-gray-400 focus:outline-none"
                    defaultValue="15 Mar 2025"
                  />
                </div>
                <div className="flex items-center px-4">
                  <Bus className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Search by bus or operator"
                    className="w-full py-4 text-gray-900 placeholder-gray-400 focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="p-2 bg-gray-50 rounded-b-xl flex justify-end">
                <Button variant="primary" className="bg-orange-600 hover:bg-orange-700 px-8">
                  <Search className="w-5 h-5 mr-2" />
                  Search Buses
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Popular Bus Routes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularRoutes.map((route, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl shadow-md p-4 border border-gray-100 cursor-pointer hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">{route.from} → {route.to}</span>
                  <Badge variant="primary" className="bg-orange-100 text-orange-700 border-orange-200">
                    {route.price}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{route.buses} buses daily</span>
                  <span className="text-gray-600">{route.duration}</span>
                </div>
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
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
              >
                {filters.map(f => (
                  <option key={f.id} value={f.id}>{f.label}</option>
                ))}
              </select>
            </div>

            <div className="flex-1"></div>

            <p className="text-sm text-gray-600">
              <span className="font-bold text-gray-900">{filteredBuses.length}</span> buses found
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
                  {/* Bus Type Filter */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Bus Type</h3>
                    <div className="space-y-2">
                      {busTypes.map(type => (
                        <label key={type} className="flex items-center gap-2">
                          <input type="checkbox" className="rounded text-orange-600 focus:ring-orange-500" />
                          <span className="text-sm text-gray-700">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Departure Time */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Departure Time</h3>
                    <div className="space-y-2">
                      {['Early Morning (12am-6am)', 'Morning (6am-12pm)', 'Afternoon (12pm-6pm)', 'Evening (6pm-12am)'].map(time => (
                        <label key={time} className="flex items-center gap-2">
                          <input type="checkbox" className="rounded text-orange-600 focus:ring-orange-500" />
                          <span className="text-sm text-gray-700">{time}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Amenities */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Amenities</h3>
                    <div className="space-y-2">
                      {['Wi-Fi', 'Charging Point', 'Blanket', 'Water Bottle', 'Entertainment'].map(amenity => (
                        <label key={amenity} className="flex items-center gap-2">
                          <input type="checkbox" className="rounded text-orange-600 focus:ring-orange-500" />
                          <span className="text-sm text-gray-700">{amenity}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Max Price</h3>
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      step="50"
                      className="w-full accent-orange-600"
                    />
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-gray-600">₹0</span>
                      <span className="text-sm text-gray-600">₹2,000+</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-200">
                  <Button variant="outline" size="sm">Reset</Button>
                  <Button variant="primary" size="sm" className="bg-orange-600 hover:bg-orange-700">Apply Filters</Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Bus Cards */}
        <div className="space-y-4">
          {filteredBuses.map((bus, index) => (
            <motion.div
              key={bus.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-orange-200">
                <div className="p-6">
                  {/* Top Row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Bus className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{bus.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-sm text-gray-600">{bus.operator} • {bus.typeClass}</p>
                          {bus.popular && (
                            <Badge variant="primary" className="bg-orange-100 text-orange-700 border-orange-200">
                              🔥 Popular
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-orange-50 px-3 py-1.5 rounded-full">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-gray-900">{bus.rating}</span>
                        <span className="text-xs text-gray-500">({bus.reviews})</span>
                      </div>
                    </div>
                  </div>

                  {/* Journey Details */}
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        {/* Departure */}
                        <div className="text-center">
                          <p className="text-3xl font-bold text-gray-900">{bus.from.time}</p>
                          <p className="text-lg font-semibold text-gray-700">{bus.from.code}</p>
                          <p className="text-sm text-gray-500">{bus.from.city}</p>
                          <p className="text-xs text-gray-400 mt-1">{bus.from.depot}</p>
                        </div>
                        
                        {/* Journey Path */}
                        <div className="flex-1 px-4">
                          <div className="relative">
                            <div className="border-t-2 border-gray-300 border-dashed"></div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-3 py-1 rounded-full shadow-md">
                              <Bus className="w-5 h-5 text-orange-600" />
                            </div>
                          </div>
                          <div className="text-center mt-2">
                            <p className="text-sm font-semibold text-gray-700">{bus.duration}</p>
                            <p className="text-xs text-gray-500">Direct Bus</p>
                          </div>
                        </div>
                        
                        {/* Arrival */}
                        <div className="text-center">
                          <p className="text-3xl font-bold text-gray-900">{bus.to.time}</p>
                          <p className="text-lg font-semibold text-gray-700">{bus.to.code}</p>
                          <p className="text-sm text-gray-500">{bus.to.city}</p>
                          <p className="text-xs text-gray-400 mt-1">{bus.to.depot}</p>
                        </div>
                      </div>

                      {/* Amenities */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {bus.amenities.map((amenity, i) => (
                          <Badge key={i} variant="secondary" size="sm" className="bg-orange-50 text-orange-700 border-orange-100">
                            {amenity === 'Charging Point' && <Battery className="w-3 h-3 mr-1" />}
                            {amenity === 'Wi-Fi' && <Wifi className="w-3 h-3 mr-1" />}
                            {amenity === 'Blanket' && <Wind className="w-3 h-3 mr-1" />}
                            {amenity === 'Water Bottle' && <Droplets className="w-3 h-3 mr-1" />}
                            {amenity === 'Entertainment' && <Tv className="w-3 h-3 mr-1" />}
                            {amenity === 'Reading Light' && <Luggage className="w-3 h-3 mr-1" />}
                            {amenity === 'Snacks' && <Coffee className="w-3 h-3 mr-1" />}
                            <span>{amenity}</span>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Price & Book */}
                    <div className="lg:w-64 text-center lg:text-right border-t lg:border-t-0 pt-4 lg:pt-0">
                      <p className="text-sm text-gray-500 mb-1">Starting from</p>
                      <p className="text-4xl font-bold text-orange-600 mb-1">
                        ₹{bus.price.toLocaleString('en-IN')}
                      </p>
                      <p className="text-xs text-gray-500 mb-3">per person</p>
                      <div className="flex items-center justify-center lg:justify-end gap-2 mb-3">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{bus.seats} seats left</span>
                      </div>
                      <Button
                        onClick={() => handleBookNow(bus)}
                        variant="primary"
                        className="w-full bg-orange-600 hover:bg-orange-700 group"
                        size="lg"
                      >
                        Book Now
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-6 py-3 border-t border-orange-100">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <span className="text-gray-600 flex items-center gap-1">
                        <Clock className="w-4 h-4 text-orange-600" />
                        Boarding time: {bus.from.time}
                      </span>
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-600 flex items-center gap-1">
                        <Luggage className="w-4 h-4 text-orange-600" />
                        {bus.totalSeats} total seats
                      </span>
                    </div>
                    <button className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1">
                      View Details
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredBuses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-md p-12 text-center"
          >
            <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No buses found</h3>
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
        {filteredBuses.length > 0 && (
          <div className="mt-8 text-center">
            <Button variant="outline" size="lg" className="px-12">
              Load More Buses
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusesDashboard;