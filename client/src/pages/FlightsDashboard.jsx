// /src/pages/FlightsDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, SlidersHorizontal, X, Plane, MapPin,
  Calendar, Users, Briefcase, Clock, Star,
  Filter, ChevronDown, ChevronUp, Loader,
  DollarSign, Wifi, Coffee, Film, Battery
} from 'lucide-react';
import { FLIGHTS_DATA, getUniqueAirlines, getUniqueCities } from '../data/flightsData';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Skeleton from '../ui/Skeleton';

const FlightsDashboard = () => {
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Search state
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: '',
    travelers: 1,
    class: 'Economy'
  });

  // Filter state
  const [filters, setFilters] = useState({
    priceRange: 'all',
    airlines: [],
    stops: 'all',
    departureTime: 'all'
  });

  // Sort state
  const [sortBy, setSortBy] = useState('price-asc');

  // Suggestions for autocomplete
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const cities = getUniqueCities();
  const airlines = getUniqueAirlines();

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setFlights(FLIGHTS_DATA);
      setFilteredFlights(FLIGHTS_DATA);
      setLoading(false);
    }, 1000);
  }, []);

  // Handle search input changes with suggestions
  const handleFromChange = (value) => {
    setSearchParams({ ...searchParams, from: value });
    if (value.length > 1) {
      const filtered = cities.filter(city => 
        city.toLowerCase().includes(value.toLowerCase())
      );
      setFromSuggestions(filtered);
    } else {
      setFromSuggestions([]);
    }
  };

  const handleToChange = (value) => {
    setSearchParams({ ...searchParams, to: value });
    if (value.length > 1) {
      const filtered = cities.filter(city => 
        city.toLowerCase().includes(value.toLowerCase())
      );
      setToSuggestions(filtered);
    } else {
      setToSuggestions([]);
    }
  };

  // Handle search
  const handleSearch = () => {
    setLoading(true);
    setSearchPerformed(true);
    
    setTimeout(() => {
      let results = flights;

      // Filter by route
      if (searchParams.from && searchParams.to) {
        results = results.filter(flight => 
          flight.from.city.toLowerCase().includes(searchParams.from.toLowerCase()) &&
          flight.to.city.toLowerCase().includes(searchParams.to.toLowerCase())
        );
      } else if (searchParams.from) {
        results = results.filter(flight => 
          flight.from.city.toLowerCase().includes(searchParams.from.toLowerCase())
        );
      } else if (searchParams.to) {
        results = results.filter(flight => 
          flight.to.city.toLowerCase().includes(searchParams.to.toLowerCase())
        );
      }

      // Apply all filters
      results = applyFilters(results);
      
      // Apply sorting
      results = applySorting(results);
      
      setFilteredFlights(results);
      setLoading(false);
      setShowFilters(false);
    }, 500);
  };

  // Apply filters
  const applyFilters = (flightList) => {
    let filtered = [...flightList];

    // Price range filter
    if (filters.priceRange !== 'all') {
      filtered = filtered.filter(flight => {
        if (filters.priceRange === '0-300') return flight.price < 300;
        if (filters.priceRange === '300-600') return flight.price >= 300 && flight.price < 600;
        if (filters.priceRange === '600+') return flight.price >= 600;
        return true;
      });
    }

    // Airlines filter
    if (filters.airlines.length > 0) {
      filtered = filtered.filter(flight => 
        filters.airlines.includes(flight.airline)
      );
    }

    // Stops filter
    if (filters.stops !== 'all') {
      filtered = filtered.filter(flight => {
        if (filters.stops === 'non-stop') return flight.stops === 'Non-stop';
        if (filters.stops === '1-stop') return flight.stops.includes('1 stop');
        if (filters.stops === '2+') return flight.stops.includes('2+');
        return true;
      });
    }

    // Departure time filter
    if (filters.departureTime !== 'all') {
      filtered = filtered.filter(flight => {
        const hour = parseInt(flight.from.time.split(':')[0]);
        if (filters.departureTime === 'morning') return hour >= 5 && hour < 12;
        if (filters.departureTime === 'afternoon') return hour >= 12 && hour < 17;
        if (filters.departureTime === 'evening') return hour >= 17 && hour < 21;
        if (filters.departureTime === 'night') return hour >= 21 || hour < 5;
        return true;
      });
    }

    return filtered;
  };

  // Apply sorting
  const applySorting = (flightList) => {
    const sorted = [...flightList];
    
    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'duration':
        return sorted.sort((a, b) => {
          const getMinutes = (duration) => {
            const [hours, mins] = duration.split('h').map(d => parseInt(d));
            return hours * 60 + (mins || 0);
          };
          return getMinutes(a.duration) - getMinutes(b.duration);
        });
      case 'departure-early':
        return sorted.sort((a, b) => {
          const timeA = a.from.time.split(':')[0];
          const timeB = b.from.time.split(':')[0];
          return parseInt(timeA) - parseInt(timeB);
        });
      case 'departure-late':
        return sorted.sort((a, b) => {
          const timeA = a.from.time.split(':')[0];
          const timeB = b.from.time.split(':')[0];
          return parseInt(timeB) - parseInt(timeA);
        });
      default:
        return sorted;
    }
  };

  // Handle filter changes
  const handleFilterChange = (type, value) => {
    setFilters(prev => {
      if (type === 'airlines') {
        const updated = prev.airlines.includes(value)
          ? prev.airlines.filter(a => a !== value)
          : [...prev.airlines, value];
        return { ...prev, airlines: updated };
      }
      return { ...prev, [type]: value };
    });
  };

  // Apply filters and sorting when they change
  useEffect(() => {
    if (!loading) {
      const filtered = applyFilters(flights);
      const sorted = applySorting(filtered);
      setFilteredFlights(sorted);
    }
  }, [filters, sortBy]);

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      priceRange: 'all',
      airlines: [],
      stops: 'all',
      departureTime: 'all'
    });
    setSortBy('price-asc');
  };

  // Format price
  const formatPrice = (price) => `$${price}`;

  // Get time of day icon
  const getTimeIcon = (time) => {
    const hour = parseInt(time.split(':')[0]);
    if (hour >= 5 && hour < 12) return '🌅';
    if (hour >= 12 && hour < 17) return '☀️';
    if (hour >= 17 && hour < 21) return '🌆';
    return '🌙';
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Book Your Flight</h1>
          <p className="text-gray-600 mt-2">Find the best deals on flights worldwide</p>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* From */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Departure City"
                    value={searchParams.from}
                    onChange={(e) => handleFromChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                {fromSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                    {fromSuggestions.map(city => (
                      <div
                        key={city}
                        className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          setSearchParams({ ...searchParams, from: city });
                          setFromSuggestions([]);
                        }}
                      >
                        {city}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* To */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Destination City"
                    value={searchParams.to}
                    onChange={(e) => handleToChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                {toSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                    {toSuggestions.map(city => (
                      <div
                        key={city}
                        className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          setSearchParams({ ...searchParams, to: city });
                          setToSuggestions([]);
                        }}
                      >
                        {city}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Departure Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="date"
                    value={searchParams.date}
                    onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Travelers */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Travelers</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    value={searchParams.travelers}
                    onChange={(e) => setSearchParams({ ...searchParams, travelers: parseInt(e.target.value) })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Traveler' : 'Travelers'}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Class */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    value={searchParams.class}
                    onChange={(e) => setSearchParams({ ...searchParams, class: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Economy">Economy</option>
                    <option value="Business">Business</option>
                    <option value="First">First Class</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <Button
                variant="primary"
                size="lg"
                onClick={handleSearch}
                className="flex-1"
              >
                <Search className="w-5 h-5 mr-2" />
                Search Flights
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowFilters(!showFilters)}
                className="sm:w-auto"
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
                        <option value="0-300">$0 - $300</option>
                        <option value="300-600">$300 - $600</option>
                        <option value="600+">$600+</option>
                      </select>
                    </div>

                    {/* Stops */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Stops</label>
                      <select
                        value={filters.stops}
                        onChange={(e) => handleFilterChange('stops', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="all">All</option>
                        <option value="non-stop">Non-stop</option>
                        <option value="1-stop">1 Stop</option>
                        <option value="2+">2+ Stops</option>
                      </select>
                    </div>

                    {/* Departure Time */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Departure Time</label>
                      <select
                        value={filters.departureTime}
                        onChange={(e) => handleFilterChange('departureTime', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="all">Any Time</option>
                        <option value="morning">Morning (5AM - 12PM)</option>
                        <option value="afternoon">Afternoon (12PM - 5PM)</option>
                        <option value="evening">Evening (5PM - 9PM)</option>
                        <option value="night">Night (9PM - 5AM)</option>
                      </select>
                    </div>

                    {/* Airlines */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Airlines</label>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {airlines.map(airline => (
                          <label key={airline} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={filters.airlines.includes(airline)}
                              onChange={() => handleFilterChange('airlines', airline)}
                              className="rounded text-blue-600"
                            />
                            <span className="text-sm">{airline}</span>
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
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="duration">Shortest Duration</option>
                        <option value="departure-early">Earliest Departure</option>
                        <option value="departure-late">Latest Departure</option>
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
              <span className="font-bold text-gray-900">{filteredFlights.length}</span> flights found
              {searchPerformed && (searchParams.from || searchParams.to) && (
                <> for {searchParams.from && searchParams.to 
                  ? `${searchParams.from} → ${searchParams.to}` 
                  : searchParams.from || searchParams.to}
                </>
              )}
            </p>
          </div>
        )}

        {/* Flights Grid */}
        {loading ? (
          <div className="grid grid-cols-1 gap-4">
            {[1, 2, 3, 4].map(i => (
              <Card key={i}>
                <div className="p-6">
                  <div className="flex items-center gap-4">
                    <Skeleton className="w-16 h-16 rounded-xl" />
                    <div className="flex-1">
                      <Skeleton className="h-6 w-48 mb-2" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : filteredFlights.length > 0 ? (
          <div className="space-y-4">
            {filteredFlights.map((flight, index) => (
              <motion.div
                key={flight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      {/* Airline Logo & Name */}
                      <div className="flex items-center gap-4 lg:w-48">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-2xl shadow-md">
                          {flight.logo}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{flight.airline}</p>
                          <p className="text-sm text-gray-500">{flight.flightNumber}</p>
                        </div>
                      </div>

                      {/* Flight Route */}
                      <div className="flex-1 flex items-center justify-between">
                        {/* Departure */}
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">{flight.from.time}</p>
                          <p className="font-medium text-gray-700">{flight.from.code}</p>
                          <p className="text-sm text-gray-500">{flight.from.city}</p>
                        </div>

                        {/* Flight Path */}
                        <div className="flex-1 px-4">
                          <div className="relative">
                            <div className="border-t-2 border-gray-300 border-dashed"></div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-3 py-1 rounded-full shadow-sm">
                              <Plane className="w-4 h-4 text-blue-600 transform rotate-90" />
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-gray-500">{flight.duration}</span>
                            <Badge 
                              variant={flight.stops === 'Non-stop' ? 'success' : 'warning'} 
                              size="sm"
                            >
                              {flight.stops}
                            </Badge>
                          </div>
                        </div>

                        {/* Arrival */}
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">{flight.to.time}</p>
                          <p className="font-medium text-gray-700">{flight.to.code}</p>
                          <p className="text-sm text-gray-500">{flight.to.city}</p>
                        </div>
                      </div>

                      {/* Price & Actions */}
                      <div className="lg:w-48 text-right">
                        <div className="mb-2">
                          <span className="text-2xl font-bold text-blue-600">
                            {formatPrice(flight.price)}
                          </span>
                          <span className="text-sm text-gray-500 line-through ml-2">
                            {formatPrice(flight.originalPrice)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mb-3">{flight.seatsLeft} seats left</p>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/flight/${flight.id}`)}
                          >
                            View Details
                          </Button>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => {
                              // Handle book flight
                              navigate(`/flight/${flight.id}`);
                            }}
                          >
                            Book
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{getTimeIcon(flight.from.time)} {flight.from.time} departure</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        <span>{flight.baggage.checkIn}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{flight.rating} ({flight.reviews})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {flight.amenities.slice(0, 3).map((amenity, i) => (
                          <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                            {amenity.includes('Wi-Fi') && '📶'}
                            {amenity.includes('Meal') && '🍽️'}
                            {amenity.includes('Entertainment') && '🎬'}
                            {amenity.includes('USB') && '🔋'}
                            {!amenity.includes('Wi-Fi') && !amenity.includes('Meal') && 
                             !amenity.includes('Entertainment') && !amenity.includes('USB') && '✓'}
                          </span>
                        ))}
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
              <Plane className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Flights Found</h3>
            <p className="text-gray-600 mb-6">
              {searchPerformed 
                ? "No flights match your search. Try changing your destination or date."
                : "Try searching for flights to see results."}
            </p>
            {searchPerformed && (
              <Button variant="primary" onClick={clearFilters}>
                Clear Filters
              </Button>
            )}
          </Card>
        )}
      </div>
    </div>
  );
};

export default FlightsDashboard;