import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Train, Clock, MapPin, ArrowRight, Search, Filter, 
  Calendar, Users, Coffee, Wifi, Battery, AlertCircle,
  ChevronDown, Star, Luggage, Utensils, Bed, Zap
} from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Card from '../ui/Card';

const TrainsDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  const trains = [
    {
      id: 'TR001',
      name: 'Rajdhani Express',
      number: '12951',
      from: { code: 'NDLS', city: 'Delhi', time: '16:25', station: 'New Delhi Railway Station' },
      to: { code: 'MMCT', city: 'Mumbai', time: '08:15', station: 'Mumbai Central' },
      duration: '15h 50m',
      price: 2890,
      classes: ['1A', '2A', '3A', 'SL'],
      days: ['Mon', 'Wed', 'Fri'],
      rating: 4.7,
      reviews: 12453,
      availability: 45,
      amenities: ['Gourmet Meal', 'Bedding', 'Charging Point', 'Reading Light', 'Blanket'],
      type: 'Superfast',
      popular: true
    },
    {
      id: 'TR002',
      name: 'Shatabdi Express',
      number: '12009',
      from: { code: 'BCT', city: 'Mumbai', time: '06:00', station: 'Mumbai Central' },
      to: { code: 'ADI', city: 'Ahmedabad', time: '13:30', station: 'Ahmedabad Junction' },
      duration: '7h 30m',
      price: 1650,
      classes: ['CC', 'EC'],
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      rating: 4.5,
      reviews: 8765,
      availability: 78,
      amenities: ['Breakfast', 'Lunch', 'Wi-Fi', 'Charging Point', 'Magazines'],
      type: 'Shatabdi',
      popular: true
    },
    {
      id: 'TR003',
      name: 'Duronto Express',
      number: '12245',
      from: { code: 'SBC', city: 'Bangalore', time: '20:00', station: 'KSR Bengaluru' },
      to: { code: 'BBS', city: 'Bhubaneswar', time: '19:30', station: 'Bhubaneswar' },
      duration: '23h 30m',
      price: 2350,
      classes: ['2A', '3A', 'SL'],
      days: ['Tue', 'Thu', 'Sat'],
      rating: 4.3,
      reviews: 5432,
      availability: 32,
      amenities: ['Dinner', 'Bedding', 'Snacks'],
      type: 'Duronto'
    },
    {
      id: 'TR004',
      name: 'Tejas Express',
      number: '22119',
      from: { code: 'CSMT', city: 'Mumbai', time: '07:00', station: 'Chhatrapati Shivaji Terminus' },
      to: { code: 'KOP', city: 'Kolhapur', time: '14:45', station: 'Kolhapur' },
      duration: '7h 45m',
      price: 1250,
      classes: ['CC'],
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      rating: 4.4,
      reviews: 3210,
      availability: 56,
      amenities: ['Breakfast', 'Lunch', 'Wi-Fi', 'Entertainment', 'Snacks', 'Tea/Coffee'],
      type: 'Tejas',
      popular: true
    },
    {
      id: 'TR005',
      name: 'Garib Rath Express',
      number: '12909',
      from: { code: 'BDTS', city: 'Mumbai', time: '17:40', station: 'Bandra Terminus' },
      to: { code: 'NDLS', city: 'Delhi', time: '10:55', station: 'New Delhi' },
      duration: '17h 15m',
      price: 1850,
      classes: ['3A'],
      days: ['Mon', 'Thu', 'Sat'],
      rating: 4.1,
      reviews: 6789,
      availability: 89,
      amenities: ['Meal', 'Bedding', 'Water Bottle'],
      type: 'Garib Rath'
    },
    {
      id: 'TR006',
      name: 'Vande Bharat Express',
      number: '22435',
      from: { code: 'NDLS', city: 'Delhi', time: '06:00', station: 'New Delhi' },
      to: { code: 'VGLB', city: 'Varanasi', time: '14:00', station: 'Varanasi Junction' },
      duration: '8h 00m',
      price: 1890,
      classes: ['EC', 'CC'],
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      rating: 4.9,
      reviews: 15678,
      availability: 23,
      amenities: ['Gourmet Meal', 'Wi-Fi', 'Entertainment', 'USB Charging', 'Snacks', 'Coffee/Tea'],
      type: 'Vande Bharat',
      popular: true
    }
  ];

  const popularRoutes = [
    { from: 'Delhi', to: 'Mumbai', trains: 12, price: '₹2,890', duration: '16h' },
    { from: 'Mumbai', to: 'Goa', trains: 8, price: '₹950', duration: '8h' },
    { from: 'Bangalore', to: 'Chennai', trains: 15, price: '₹550', duration: '6h' },
    { from: 'Kolkata', to: 'Delhi', trains: 10, price: '₹2,450', duration: '18h' }
  ];

  const stats = [
    { label: 'Daily Trains', value: '350+', icon: Train, color: 'green' },
    { label: 'Routes Covered', value: '500+', icon: MapPin, color: 'blue' },
    { label: 'Daily Passengers', value: '2M+', icon: Users, color: 'purple' },
    { label: 'States Covered', value: '28', icon: Clock, color: 'orange' }
  ];

  const filters = [
    { id: 'all', label: 'All Trains' },
    { id: 'price-low', label: 'Price: Low to High' },
    { id: 'price-high', label: 'Price: High to Low' },
    { id: 'duration', label: 'Fastest First' },
    { id: 'rating', label: 'Top Rated' }
  ];

  const classTypes = ['1A', '2A', '3A', 'SL', 'CC', 'EC'];

  const handleBookNow = (train) => {
    navigate('/booking', { state: { item: train, type: 'train' } });
  };

  const getFilteredTrains = () => {
    let filtered = [...trains];
    
    if (searchQuery) {
      filtered = filtered.filter(t => 
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.from.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.to.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.number.includes(searchQuery) ||
        t.from.code.toLowerCase().includes(searchQuery.toLowerCase())
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

  const filteredTrains = getFilteredTrains();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-800 via-green-700 to-emerald-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1474487548417-781cb71495f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
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
              Book Train Tickets
            </h1>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Safe, comfortable, and affordable train travel across India
            </p>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto bg-white rounded-2xl p-2 shadow-2xl">
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 flex items-center px-4 border-b md:border-b-0 md:border-r border-gray-200">
                  <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="From (Station/City)"
                    className="w-full py-4 text-gray-900 placeholder-gray-400 focus:outline-none"
                  />
                </div>
                <div className="flex-1 flex items-center px-4 border-b md:border-b-0 md:border-r border-gray-200">
                  <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="To (Station/City)"
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
                  <Train className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Train name or number"
                    className="w-full py-4 text-gray-900 placeholder-gray-400 focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="p-2 bg-gray-50 rounded-b-xl flex justify-end">
                <Button variant="primary" className="bg-green-600 hover:bg-green-700 px-8">
                  <Search className="w-5 h-5 mr-2" />
                  Search Trains
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Popular Routes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularRoutes.map((route, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl shadow-md p-4 border border-gray-100 cursor-pointer hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">{route.from} → {route.to}</span>
                  <Badge variant="primary" className="bg-green-100 text-green-700 border-green-200">
                    {route.price}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{route.trains} trains daily</span>
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
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
              >
                {filters.map(f => (
                  <option key={f.id} value={f.id}>{f.label}</option>
                ))}
              </select>
            </div>

            <div className="flex-1"></div>

            <p className="text-sm text-gray-600">
              <span className="font-bold text-gray-900">{filteredTrains.length}</span> trains found
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
                  {/* Class Filter */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Travel Class</h3>
                    <div className="space-y-2">
                      {classTypes.map(cls => (
                        <label key={cls} className="flex items-center gap-2">
                          <input type="checkbox" className="rounded text-green-600 focus:ring-green-500" />
                          <span className="text-sm text-gray-700">{cls}</span>
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
                          <input type="checkbox" className="rounded text-green-600 focus:ring-green-500" />
                          <span className="text-sm text-gray-700">{time}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Amenities */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Amenities</h3>
                    <div className="space-y-2">
                      {['Wi-Fi', 'Meals Included', 'Bedding', 'Charging Point', 'Entertainment'].map(amenity => (
                        <label key={amenity} className="flex items-center gap-2">
                          <input type="checkbox" className="rounded text-green-600 focus:ring-green-500" />
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
                      max="5000"
                      step="100"
                      className="w-full accent-green-600"
                    />
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-gray-600">₹0</span>
                      <span className="text-sm text-gray-600">₹5,000+</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-200">
                  <Button variant="outline" size="sm">Reset</Button>
                  <Button variant="primary" size="sm" className="bg-green-600 hover:bg-green-700">Apply Filters</Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Train Cards */}
        <div className="space-y-4">
          {filteredTrains.map((train, index) => (
            <motion.div
              key={train.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-green-200">
                <div className="p-6">
                  {/* Top Row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Train className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{train.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-sm text-gray-600">{train.number} • {train.type}</p>
                          {train.popular && (
                            <Badge variant="primary" className="bg-orange-100 text-orange-700 border-orange-200">
                              🔥 Popular
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-green-50 px-3 py-1.5 rounded-full">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-gray-900">{train.rating}</span>
                        <span className="text-xs text-gray-500">({train.reviews})</span>
                      </div>
                    </div>
                  </div>

                  {/* Journey Details */}
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        {/* Departure */}
                        <div className="text-center">
                          <p className="text-3xl font-bold text-gray-900">{train.from.time}</p>
                          <p className="text-lg font-semibold text-gray-700">{train.from.code}</p>
                          <p className="text-sm text-gray-500">{train.from.city}</p>
                          <p className="text-xs text-gray-400 mt-1 line-clamp-1">{train.from.station}</p>
                        </div>
                        
                        {/* Journey Path */}
                        <div className="flex-1 px-4">
                          <div className="relative">
                            <div className="border-t-2 border-gray-300 border-dashed"></div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-3 py-1 rounded-full shadow-md">
                              <Train className="w-5 h-5 text-green-600" />
                            </div>
                          </div>
                          <div className="text-center mt-2">
                            <p className="text-sm font-semibold text-gray-700">{train.duration}</p>
                            <div className="flex flex-wrap items-center justify-center gap-1 mt-1">
                              {train.classes.map((cls, i) => (
                                <Badge key={i} variant="secondary" size="sm" className="bg-gray-100">
                                  {cls}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {/* Arrival */}
                        <div className="text-center">
                          <p className="text-3xl font-bold text-gray-900">{train.to.time}</p>
                          <p className="text-lg font-semibold text-gray-700">{train.to.code}</p>
                          <p className="text-sm text-gray-500">{train.to.city}</p>
                          <p className="text-xs text-gray-400 mt-1 line-clamp-1">{train.to.station}</p>
                        </div>
                      </div>

                      {/* Running Days */}
                      <div className="flex items-center gap-2 mt-4 text-sm">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Runs on:</span>
                        <div className="flex gap-1">
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                            <span
                              key={day}
                              className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-medium
                                ${train.days.includes(day) 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'text-gray-300'
                                }`}
                            >
                              {day.charAt(0)}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Amenities */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {train.amenities.map((amenity, i) => (
                          <Badge key={i} variant="secondary" size="sm" className="bg-green-50 text-green-700 border-green-100">
                            {amenity === 'Gourmet Meal' && <Utensils className="w-3 h-3 mr-1" />}
                            {amenity === 'Bedding' && <Bed className="w-3 h-3 mr-1" />}
                            {amenity === 'Charging Point' && <Battery className="w-3 h-3 mr-1" />}
                            {amenity === 'Wi-Fi' && <Wifi className="w-3 h-3 mr-1" />}
                            {amenity === 'Breakfast' && <Coffee className="w-3 h-3 mr-1" />}
                            {amenity === 'Snacks' && <Zap className="w-3 h-3 mr-1" />}
                            <span>{amenity}</span>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Price & Book */}
                    <div className="lg:w-64 text-center lg:text-right border-t lg:border-t-0 pt-4 lg:pt-0">
                      <p className="text-sm text-gray-500 mb-1">Starting from</p>
                      <p className="text-4xl font-bold text-green-600 mb-1">
                        ₹{train.price.toLocaleString('en-IN')}
                      </p>
                      <p className="text-xs text-gray-500 mb-3">per person</p>
                      <div className="flex items-center justify-center lg:justify-end gap-2 mb-3">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{train.availability} seats available</span>
                      </div>
                      <Button
                        onClick={() => handleBookNow(train)}
                        variant="primary"
                        className="w-full bg-green-600 hover:bg-green-700 group"
                        size="lg"
                      >
                        Book Now
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-3 border-t border-green-100">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <span className="text-gray-600 flex items-center gap-1">
                        <Zap className="w-4 h-4 text-green-600" />
                        Free cancellation available
                      </span>
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-600 flex items-center gap-1">
                        <Bed className="w-4 h-4 text-green-600" />
                        Pantry available
                      </span>
                    </div>
                    <button className="text-green-600 hover:text-green-700 font-semibold flex items-center gap-1">
                      View Schedule
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredTrains.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-md p-12 text-center"
          >
            <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No trains found</h3>
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
        {filteredTrains.length > 0 && (
          <div className="mt-8 text-center">
            <Button variant="outline" size="lg" className="px-12">
              Load More Trains
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainsDashboard;