import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plane, Filter, Clock, Calendar, Users, Star, 
  ArrowRight, Search, MapPin, Wifi, Coffee, Briefcase,
  TrendingUp, Award, Shield, ChevronDown, Heart,
  X, Sliders, Luggage, AlertCircle
} from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Card from '../ui/Card';

const FlightsDashboard = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('recommended');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [sortBy, setSortBy] = useState('price');

  // Comprehensive flight data
  const flights = [
    {
      id: 'FL001',
      airline: 'Air India',
      airlineCode: 'AI',
      flightNumber: 'AI 860',
      logo: '🇮🇳',
      from: { 
        code: 'DEL', 
        city: 'Delhi', 
        airport: 'Indira Gandhi International', 
        terminal: 'T3',
        time: '06:00'
      },
      to: { 
        code: 'BOM', 
        city: 'Mumbai', 
        airport: 'Chhatrapati Shivaji', 
        terminal: 'T2',
        time: '08:15'
      },
      duration: '2h 15m',
      price: 4999,
      originalPrice: 8499,
      discount: '41% off',
      class: 'Economy',
      stops: 'Non-stop',
      date: '2025-03-20',
      seatsLeft: 12,
      totalSeats: 180,
      rating: 4.5,
      reviews: 2345,
      amenities: ['Hot Meal', 'Wi-Fi', 'USB Port', 'Entertainment'],
      baggage: { cabin: '7kg', checkIn: '25kg' },
      aircraft: 'Boeing 787-8 Dreamliner',
      refundable: true,
      popular: true
    },
    {
      id: 'FL002',
      airline: 'IndiGo',
      airlineCode: '6E',
      flightNumber: '6E 345',
      logo: '🟡',
      from: { 
        code: 'BOM', 
        city: 'Mumbai', 
        airport: 'Chhatrapati Shivaji', 
        terminal: 'T1',
        time: '09:30'
      },
      to: { 
        code: 'BLR', 
        city: 'Bangalore', 
        airport: 'Kempegowda', 
        terminal: 'T2',
        time: '11:45'
      },
      duration: '2h 15m',
      price: 3299,
      originalPrice: 5299,
      discount: '38% off',
      class: 'Economy',
      stops: 'Non-stop',
      date: '2025-03-20',
      seatsLeft: 8,
      totalSeats: 186,
      rating: 4.3,
      reviews: 1876,
      amenities: ['Snacks', 'USB Port'],
      baggage: { cabin: '7kg', checkIn: '15kg' },
      aircraft: 'Airbus A320neo',
      refundable: false,
      popular: false
    },
    {
      id: 'FL003',
      airline: 'Vistara',
      airlineCode: 'UK',
      flightNumber: 'UK 955',
      logo: '🔴',
      from: { 
        code: 'DEL', 
        city: 'Delhi', 
        airport: 'Indira Gandhi International', 
        terminal: 'T3',
        time: '14:00'
      },
      to: { 
        code: 'GOI', 
        city: 'Goa', 
        airport: 'Dabolim', 
        terminal: 'T1',
        time: '16:30'
      },
      duration: '2h 30m',
      price: 6599,
      originalPrice: 9899,
      discount: '33% off',
      class: 'Premium Economy',
      stops: 'Non-stop',
      date: '2025-03-20',
      seatsLeft: 15,
      totalSeats: 132,
      rating: 4.7,
      reviews: 3122,
      amenities: ['Premium Meal', 'Wi-Fi', 'Entertainment', 'Extra Legroom', 'USB Port'],
      baggage: { cabin: '7kg', checkIn: '30kg' },
      aircraft: 'Airbus A321neo',
      refundable: true,
      popular: true
    },
    {
      id: 'FL004',
      airline: 'SpiceJet',
      airlineCode: 'SG',
      flightNumber: 'SG 234',
      logo: '🟠',
      from: { 
        code: 'BLR', 
        city: 'Bangalore', 
        airport: 'Kempegowda', 
        terminal: 'T1',
        time: '07:45'
      },
      to: { 
        code: 'MAA', 
        city: 'Chennai', 
        airport: 'Chennai International', 
        terminal: 'T4',
        time: '08:45'
      },
      duration: '1h 00m',
      price: 2499,
      originalPrice: 3899,
      discount: '36% off',
      class: 'Economy',
      stops: 'Non-stop',
      date: '2025-03-20',
      seatsLeft: 20,
      totalSeats: 78,
      rating: 4.1,
      reviews: 1543,
      amenities: ['Snacks'],
      baggage: { cabin: '7kg', checkIn: '15kg' },
      aircraft: 'Bombardier Q400',
      refundable: false,
      popular: false
    },
    {
      id: 'FL005',
      airline: 'Air India Express',
      airlineCode: 'IX',
      flightNumber: 'IX 678',
      logo: '🇮🇳',
      from: { 
        code: 'CCU', 
        city: 'Kolkata', 
        airport: 'Netaji Subhash', 
        terminal: 'T2',
        time: '23:30'
      },
      to: { 
        code: 'DXB', 
        city: 'Dubai', 
        airport: 'Dubai International', 
        terminal: 'T1',
        time: '02:45'
      },
      duration: '4h 45m',
      price: 12999,
      originalPrice: 18999,
      discount: '32% off',
      class: 'Economy',
      stops: 'Non-stop',
      date: '2025-03-21',
      seatsLeft: 6,
      totalSeats: 186,
      rating: 4.4,
      reviews: 987,
      amenities: ['Meal', 'Entertainment'],
      baggage: { cabin: '7kg', checkIn: '20kg' },
      aircraft: 'Boeing 737-800',
      refundable: true,
      popular: false
    },
    {
      id: 'FL006',
      airline: 'Akasa Air',
      airlineCode: 'QP',
      flightNumber: 'QP 150',
      logo: '🪁',
      from: { 
        code: 'HYD', 
        city: 'Hyderabad', 
        airport: 'Rajiv Gandhi', 
        terminal: 'T1',
        time: '17:00'
      },
      to: { 
        code: 'DEL', 
        city: 'Delhi', 
        airport: 'Indira Gandhi International', 
        terminal: 'T3',
        time: '19:30'
      },
      duration: '2h 30m',
      price: 4299,
      originalPrice: 6399,
      discount: '33% off',
      class: 'Economy',
      stops: 'Non-stop',
      date: '2025-03-20',
      seatsLeft: 10,
      totalSeats: 162,
      rating: 4.2,
      reviews: 765,
      amenities: ['Snacks', 'USB Port', 'Entertainment'],
      baggage: { cabin: '7kg', checkIn: '15kg' },
      aircraft: 'Boeing 737 MAX 8',
      refundable: true,
      popular: false
    },
    {
      id: 'FL007',
      airline: 'Emirates',
      airlineCode: 'EK',
      flightNumber: 'EK 513',
      logo: '🇦🇪',
      from: { 
        code: 'DEL', 
        city: 'Delhi', 
        airport: 'Indira Gandhi International', 
        terminal: 'T3',
        time: '04:25'
      },
      to: { 
        code: 'DXB', 
        city: 'Dubai', 
        airport: 'Dubai International', 
        terminal: 'T3',
        time: '06:35'
      },
      duration: '3h 10m',
      price: 18999,
      originalPrice: 25999,
      discount: '27% off',
      class: 'Business',
      stops: 'Non-stop',
      date: '2025-03-20',
      seatsLeft: 4,
      totalSeats: 42,
      rating: 4.9,
      reviews: 5678,
      amenities: ['Gourmet Meal', 'Lounge Access', 'Wi-Fi', 'Entertainment', 'Flat Bed', 'Chauffeur'],
      baggage: { cabin: '14kg', checkIn: '40kg' },
      aircraft: 'Airbus A380',
      refundable: true,
      popular: true
    },
    {
      id: 'FL008',
      airline: 'Singapore Airlines',
      airlineCode: 'SQ',
      flightNumber: 'SQ 405',
      logo: '🇸🇬',
      from: { 
        code: 'BOM', 
        city: 'Mumbai', 
        airport: 'Chhatrapati Shivaji', 
        terminal: 'T2',
        time: '23:55'
      },
      to: { 
        code: 'SIN', 
        city: 'Singapore', 
        airport: 'Changi', 
        terminal: 'T3',
        time: '08:15'
      },
      duration: '5h 50m',
      price: 24999,
      originalPrice: 32999,
      discount: '24% off',
      class: 'Economy',
      stops: 'Non-stop',
      date: '2025-03-20',
      seatsLeft: 9,
      totalSeats: 264,
      rating: 4.8,
      reviews: 4123,
      amenities: ['Meal', 'Wi-Fi', 'Entertainment', 'USB Port', 'Blanket'],
      baggage: { cabin: '7kg', checkIn: '30kg' },
      aircraft: 'Airbus A350-900',
      refundable: true,
      popular: false
    }
  ];

  const popularRoutes = [
    { from: 'Delhi', to: 'Mumbai', price: '₹4,999', time: '2h 15m' },
    { from: 'Mumbai', to: 'Bangalore', price: '₹3,299', time: '1h 45m' },
    { from: 'Delhi', to: 'Goa', price: '₹6,599', time: '2h 30m' },
    { from: 'Bangalore', to: 'Chennai', price: '₹2,499', time: '1h 00m' }
  ];

  const filterOptions = [
    { id: 'stops', label: 'Stops', options: ['Non-stop', '1 Stop', '2+ Stops'] },
    { id: 'price', label: 'Price Range', min: 0, max: 50000 },
    { id: 'airlines', label: 'Airlines', options: ['Air India', 'IndiGo', 'Vistara', 'SpiceJet', 'Emirates'] },
    { id: 'departure', label: 'Departure Time', options: ['Morning', 'Afternoon', 'Evening', 'Night'] },
    { id: 'class', label: 'Travel Class', options: ['Economy', 'Premium Economy', 'Business', 'First'] }
  ];

  const handleBookNow = (flight) => {
    navigate('/booking', { state: { item: flight, type: 'flight' } });
  };

  const getFilteredFlights = () => {
    let filtered = [...flights];
    
    if (searchQuery) {
      filtered = filtered.filter(f => 
        f.airline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.from.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.to.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.from.code.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply sorting
    if (sortBy === 'price') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'duration') {
      filtered.sort((a, b) => {
        const getMinutes = (d) => {
          const parts = d.split('h');
          return parseInt(parts[0]) * 60 + parseInt(parts[1]?.replace('m', '') || 0);
        };
        return getMinutes(a.duration) - getMinutes(b.duration);
      });
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'recommended') {
      filtered.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    }
    
    return filtered;
  };

  const filteredFlights = getFilteredFlights();

  const quickStats = [
    { label: 'Today\'s Deals', value: '23 flights', icon: TrendingUp, color: 'blue' },
    { label: 'Price Drop', value: 'avg 35%', icon: ArrowRight, color: 'green' },
    { label: 'Direct Flights', value: '156', icon: Plane, color: 'purple' },
    { label: 'Destinations', value: '78', icon: MapPin, color: 'orange' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Where will you <span className="text-yellow-300">fly</span> today?
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Discover the best flight deals to destinations around the world
            </p>

            {/* Search Bar */}
            <div className="max-w-4xl mx-auto bg-white rounded-2xl p-2 shadow-2xl">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 flex items-center px-4 border-b md:border-b-0 md:border-r border-gray-200">
                  <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="From? (City or Airport)"
                    className="w-full py-4 text-gray-900 placeholder-gray-400 focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex-1 flex items-center px-4 border-b md:border-b-0 md:border-r border-gray-200">
                  <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="To?"
                    className="w-full py-4 text-gray-900 placeholder-gray-400 focus:outline-none"
                  />
                </div>
                <div className="flex items-center px-4 border-b md:border-b-0 md:border-r border-gray-200">
                  <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Departure"
                    className="w-full py-4 text-gray-900 placeholder-gray-400 focus:outline-none"
                    defaultValue="20 Mar 2025"
                  />
                </div>
                <div className="flex items-center px-4">
                  <Users className="w-5 h-5 text-gray-400 mr-2" />
                  <select className="w-full py-4 text-gray-900 focus:outline-none bg-transparent">
                    <option>1 Passenger</option>
                    <option>2 Passengers</option>
                    <option>3 Passengers</option>
                    <option>4+ Passengers</option>
                  </select>
                </div>
              </div>
              <div className="p-2 bg-gray-50 rounded-b-xl flex justify-end">
                <Button variant="primary" className="px-8">
                  <Search className="w-5 h-5 mr-2" />
                  Search Flights
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => (
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Popular Routes */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Popular Routes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularRoutes.map((route, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl shadow-md p-4 border border-gray-100 cursor-pointer hover:shadow-xl transition-all"
                onClick={() => setSearchQuery(route.from)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Plane className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-gray-900">{route.from} → {route.to}</span>
                  </div>
                  <Badge variant="primary" size="sm">{route.price}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{route.time}</span>
                  <span className="text-green-600 font-medium">Direct flight</span>
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
              <Sliders className="w-5 h-5" />
              <span className="font-medium">Filters</span>
            </button>

            <div className="h-6 w-px bg-gray-300"></div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="recommended">Recommended</option>
                <option value="price">Price: Low to High</option>
                <option value="duration">Duration: Shortest</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            <div className="flex-1"></div>

            <p className="text-sm text-gray-600">
              <span className="font-bold text-gray-900">{filteredFlights.length}</span> flights found
            </p>
          </div>

          {/* Expanded Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="border-t border-gray-200 mt-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Stops Filter */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Stops</h3>
                      <div className="space-y-2">
                        {['Non-stop', '1 Stop', '2+ Stops'].map(option => (
                          <label key={option} className="flex items-center gap-2">
                            <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                            <span className="text-sm text-gray-700">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Airlines Filter */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Airlines</h3>
                      <div className="space-y-2">
                        {['Air India', 'IndiGo', 'Vistara', 'SpiceJet', 'Emirates'].map(option => (
                          <label key={option} className="flex items-center gap-2">
                            <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                            <span className="text-sm text-gray-700">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Departure Time */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Departure Time</h3>
                      <div className="space-y-2">
                        {['Morning (6AM-12PM)', 'Afternoon (12PM-6PM)', 'Evening (6PM-12AM)', 'Night (12AM-6AM)'].map(option => (
                          <label key={option} className="flex items-center gap-2">
                            <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                            <span className="text-sm text-gray-700">{option}</span>
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
                        max="50000"
                        step="1000"
                        className="w-full accent-blue-600"
                      />
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-gray-600">₹0</span>
                        <span className="text-sm text-gray-600">₹50,000+</span>
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
          </AnimatePresence>
        </div>

        {/* Flight Cards */}
        <div className="space-y-4">
          {filteredFlights.map((flight, index) => (
            <motion.div
              key={flight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group"
              onMouseEnter={() => setSelectedFlight(flight.id)}
              onMouseLeave={() => setSelectedFlight(null)}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200">
                <div className="p-6">
                  {/* Top Row - Airline & Tags */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-2xl shadow-md">
                        {flight.logo}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{flight.airline}</h3>
                        <p className="text-sm text-gray-600">{flight.flightNumber} • {flight.aircraft}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {flight.popular && (
                        <Badge variant="primary" className="bg-orange-100 text-orange-700 border-orange-200">
                          🔥 Popular
                        </Badge>
                      )}
                      {flight.refundable && (
                        <Badge variant="success" className="bg-green-100 text-green-700 border-green-200">
                          Free Cancellation
                        </Badge>
                      )}
                      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <Heart className={`w-5 h-5 ${selectedFlight === flight.id ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                      </button>
                    </div>
                  </div>

                  {/* Flight Route */}
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    {/* Times & Airports */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        {/* Departure */}
                        <div className="text-center">
                          <p className="text-3xl font-bold text-gray-900">{flight.from.time}</p>
                          <p className="text-lg font-semibold text-gray-700">{flight.from.code}</p>
                          <p className="text-sm text-gray-500">{flight.from.city}</p>
                          <p className="text-xs text-gray-400 mt-1">Terminal {flight.from.terminal}</p>
                        </div>
                        
                        {/* Flight Path */}
                        <div className="flex-1 px-4">
                          <div className="relative">
                            <div className="border-t-2 border-gray-300 border-dashed"></div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-3 py-1 rounded-full shadow-md">
                              <Plane className="w-5 h-5 text-blue-600 transform rotate-90" />
                            </div>
                          </div>
                          <div className="text-center mt-2">
                            <p className="text-sm font-semibold text-gray-700">{flight.duration}</p>
                            <Badge variant="success" size="sm" className="mt-1">
                              {flight.stops}
                            </Badge>
                          </div>
                        </div>
                        
                        {/* Arrival */}
                        <div className="text-center">
                          <p className="text-3xl font-bold text-gray-900">{flight.to.time}</p>
                          <p className="text-lg font-semibold text-gray-700">{flight.to.code}</p>
                          <p className="text-sm text-gray-500">{flight.to.city}</p>
                          <p className="text-xs text-gray-400 mt-1">Terminal {flight.to.terminal}</p>
                        </div>
                      </div>

                      {/* Flight Details Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500">Date</p>
                            <p className="text-sm font-medium">
                              {new Date(flight.date).toLocaleDateString('en-IN', { 
                                day: 'numeric', 
                                month: 'short'
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500">Seats</p>
                            <p className="text-sm font-medium">
                              <span className="text-orange-600 font-bold">{flight.seatsLeft}</span> left
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Luggage className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500">Baggage</p>
                            <p className="text-sm font-medium">{flight.baggage.checkIn}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500">Class</p>
                            <p className="text-sm font-medium">{flight.class}</p>
                          </div>
                        </div>
                      </div>

                      {/* Amenities */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {flight.amenities.map((amenity, i) => (
                          <Badge key={i} variant="secondary" size="sm" className="bg-blue-50 text-blue-700 border-blue-100">
                            {amenity === 'Hot Meal' && '🍽️'}
                            {amenity === 'Wi-Fi' && '📶'}
                            {amenity === 'USB Port' && '🔌'}
                            {amenity === 'Entertainment' && '🎬'}
                            {amenity === 'Snacks' && '🍪'}
                            {amenity === 'Premium Meal' && '🍝'}
                            {amenity === 'Extra Legroom' && '📏'}
                            {amenity === 'Lounge Access' && '🛋️'}
                            {amenity === 'Flat Bed' && '🛏️'}
                            {amenity === 'Gourmet Meal' && '🍷'}
                            {amenity === 'Chauffeur' && '🚗'}
                            {amenity === 'Blanket' && '🛏️'}
                            <span className="ml-1">{amenity}</span>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Price & Book */}
                    <div className="lg:w-64 text-center lg:text-right border-t lg:border-t-0 pt-4 lg:pt-0">
                      <div className="mb-2">
                        <span className="text-sm text-gray-500 line-through mr-2">
                          ₹{flight.originalPrice.toLocaleString('en-IN')}
                        </span>
                        <Badge variant="danger" size="sm" className="bg-red-100 text-red-700">
                          {flight.discount}
                        </Badge>
                      </div>
                      <p className="text-4xl font-bold text-blue-600 mb-1">
                        ₹{flight.price.toLocaleString('en-IN')}
                      </p>
                      <p className="text-xs text-gray-500 mb-4">per adult • taxes included</p>
                      
                      <Button
                        onClick={() => handleBookNow(flight)}
                        variant="primary"
                        className="w-full group relative overflow-hidden"
                        size="lg"
                      >
                        <span className="relative z-10 flex items-center justify-center">
                          Book Now
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 transform translate-y-full group-hover:translate-y-0 transition-transform"></div>
                      </Button>
                      
                      <div className="flex items-center justify-center lg:justify-end gap-4 mt-3 text-xs">
                        <div className="flex items-center text-gray-500">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="font-medium">{flight.rating}</span>
                          <span className="text-gray-400 ml-1">({flight.reviews})</span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <Shield className="w-4 h-4 text-green-500 mr-1" />
                          <span>Secure</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-3 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-600">
                        ✈️ {flight.stops} • {flight.aircraft}
                      </span>
                      <span className="text-gray-400">|</span>
                      <span className="text-green-600 font-medium">
                        {flight.seatsLeft} seats left at this price
                      </span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1">
                      Flight Details
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredFlights.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-md p-12 text-center"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No flights found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or search for different dates</p>
            <Button 
              variant="primary"
              onClick={() => {
                setSearchQuery('');
                setSortBy('recommended');
              }}
            >
              Clear Search
            </Button>
          </motion.div>
        )}

        {/* Load More */}
        {filteredFlights.length > 0 && (
          <div className="mt-8 text-center">
            <Button variant="outline" size="lg" className="px-12">
              Load More Flights
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightsDashboard;