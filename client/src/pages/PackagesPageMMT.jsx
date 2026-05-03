import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, MapPin, Calendar, Users, Star, Heart, 
  TrendingUp, Award, Shield, ChevronRight, Filter,
  X, Check, Clock, Sparkles, Tag, Phone, Package,
  Plane, Hotel, Car, Sun, Umbrella, Mountain, 
  Compass, Coffee, Gift, Download, Globe, Camera
} from 'lucide-react';
import axios from 'axios';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { samplePackages, filterPackages, sortPackages } from '../data/samplePackages';

// Fix: Define API_URL directly instead of using process.env
const API_URL = 'http://localhost:5000/api';

const PackagesPageMMT = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // State
  const [packages, setPackages] = useState(samplePackages); // Use imported sample packages
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [usingSamples, setUsingSamples] = useState(true);
  
  const [searchForm, setSearchForm] = useState({
    destination: searchParams.get('destination') || '',
    month: '',
    nights: '',
    travelers: searchParams.get('guests') || '2'
  });

  const [filters, setFilters] = useState({
    priceRange: '',
    category: '',
    rating: '',
    duration: ''
  });

  const [activeFilters, setActiveFilters] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Try to fetch real packages, but keep samples if it fails
  useEffect(() => {
    const fetchRealPackages = async () => {
      try {
        const response = await axios.get(`${API_URL}/packages`);
        if (response.data.success && response.data.data.packages.length > 0) {
          setPackages(response.data.data.packages);
          setUsingSamples(false);
        }
      } catch (error) {
        console.log('Using sample packages - backend not connected');
        // Keep using sample packages
      }
    };

    fetchRealPackages();
  }, []);

  const handleSearch = () => {
    // Just filter the existing packages
    console.log('Searching for:', searchForm.destination);
  };

  const getFilteredPackages = () => {
    let filtered = [...packages];
    
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.destination?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.destination?.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.destination?.country?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedFilter === 'price-low') {
      filtered.sort((a, b) => {
        const priceA = a.price || a.pricing?.discountedPrice || 0;
        const priceB = b.price || b.pricing?.discountedPrice || 0;
        return priceA - priceB;
      });
    } else if (selectedFilter === 'price-high') {
      filtered.sort((a, b) => {
        const priceA = a.price || a.pricing?.discountedPrice || 0;
        const priceB = b.price || b.pricing?.discountedPrice || 0;
        return priceB - priceA;
      });
    } else if (selectedFilter === 'rating') {
      filtered.sort((a, b) => {
        const ratingA = a.rating || a.rating?.average || 0;
        const ratingB = b.rating || b.rating?.average || 0;
        return ratingB - ratingA;
      });
    } else if (selectedFilter === 'duration') {
      filtered.sort((a, b) => {
        const daysA = a.duration?.nights || parseInt((a.duration || '').split(' ')[0]) || 0;
        const daysB = b.duration?.nights || parseInt((b.duration || '').split(' ')[0]) || 0;
        return daysA - daysB;
      });
    } else if (selectedFilter === 'popular') {
      filtered.sort((a, b) => {
        const countA = a.reviews || a.rating?.count || 0;
        const countB = b.reviews || b.rating?.count || 0;
        return countB - countA;
      });
    }
    
    return filtered;
  };

  const filteredPackages = getFilteredPackages();

  const applyFilter = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType] === value ? '' : value
    }));

    // Update active filters
    const filterLabel = getFilterLabel(filterType, value);
    if (filters[filterType] === value) {
      setActiveFilters(prev => prev.filter(f => f.value !== value));
    } else {
      setActiveFilters(prev => [...prev.filter(f => f.type !== filterType), { type: filterType, value, label: filterLabel }]);
    }
  };

  const getFilterLabel = (type, value) => {
    const labels = {
      priceRange: {
        '0-15000': '₹0 - ₹15,000',
        '15000-30000': '₹15,000 - ₹30,000',
        '30000-50000': '₹30,000 - ₹50,000',
        '50000-100000': '₹50,000+',
      },
      category: {
        'beach': 'Beach',
        'adventure': 'Adventure',
        'honeymoon': 'Honeymoon',
        'family': 'Family',
        'luxury': 'Luxury',
        'cultural': 'Cultural',
        'wildlife': 'Wildlife'
      },
      rating: {
        '4': '4★ & above',
        '4.5': '4.5★ & above'
      },
      duration: {
        '1-3': '1-3 Nights',
        '4-6': '4-6 Nights',
        '7-9': '7-9 Nights',
        '10+': '10+ Nights'
      }
    };
    return labels[type]?.[value] || value;
  };

  const clearFilters = () => {
    setFilters({
      priceRange: '',
      category: '',
      rating: '',
      duration: ''
    });
    setActiveFilters([]);
  };

  const filtersList = [
    { id: 'all', label: 'All Packages' },
    { id: 'popular', label: 'Most Popular' },
    { id: 'price-low', label: 'Price: Low to High' },
    { id: 'price-high', label: 'Price: High to Low' },
    { id: 'rating', label: 'Top Rated' },
    { id: 'duration', label: 'Duration: Short to Long' }
  ];

  const stats = [
    { label: 'Packages', value: packages.length, icon: Package, color: 'blue' },
    { label: 'Destinations', value: 25, icon: Globe, color: 'green' },
    { label: 'Happy Travelers', value: '10K+', icon: Users, color: 'yellow' },
    { label: 'Best Price', value: 'Guaranteed', icon: Award, color: 'purple' }
  ];

  const categoryIcons = {
    'beach': <Umbrella className="w-5 h-5" />,
    'adventure': <Mountain className="w-5 h-5" />,
    'honeymoon': <Heart className="w-5 h-5" />,
    'family': <Users className="w-5 h-5" />,
    'luxury': <Sparkles className="w-5 h-5" />,
    'cultural': <Compass className="w-5 h-5" />,
    'wildlife': <Sun className="w-5 h-5" />
  };

  const inclusionIcons = {
    'Flight': <Plane className="w-3 h-3" />,
    'Hotel': <Hotel className="w-3 h-3" />,
    'Meals': <Coffee className="w-3 h-3" />,
    'Sightseeing': <Camera className="w-3 h-3" />,
    'Transfer': <Car className="w-3 h-3" />,
    'Visa': <Globe className="w-3 h-3" />,
    'Guide': <Users className="w-3 h-3" />,
    'Activities': <Gift className="w-3 h-3" />,
    'Ayurveda': <Sparkles className="w-3 h-3" />,
    'Safari': <Camera className="w-3 h-3" />
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Finding amazing travel packages...</p>
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
            backgroundImage: 'url("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
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
              Discover Your Dream Holiday
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {packages.length} curated travel packages for every budget and style
            </p>

            {/* Search Bar */}
            <div className="max-w-4xl mx-auto bg-white rounded-2xl p-2 shadow-2xl">
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 flex items-center px-4 border-b md:border-b-0 md:border-r border-gray-200">
                  <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Where do you want to go?"
                    className="w-full py-4 text-gray-900 placeholder-gray-400 focus:outline-none"
                    value={searchForm.destination}
                    onChange={(e) => setSearchForm({ ...searchForm, destination: e.target.value })}
                  />
                </div>
                <div className="flex items-center px-4 border-b md:border-b-0 md:border-r border-gray-200">
                  <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                  <select
                    value={searchForm.month}
                    onChange={(e) => setSearchForm({ ...searchForm, month: e.target.value })}
                    className="w-full py-4 text-gray-900 focus:outline-none bg-transparent"
                  >
                    <option value="">Select Month</option>
                    <option value="Feb 2026">Feb 2026</option>
                    <option value="Mar 2026">Mar 2026</option>
                    <option value="Apr 2026">Apr 2026</option>
                    <option value="May 2026">May 2026</option>
                    <option value="Jun 2026">Jun 2026</option>
                  </select>
                </div>
                <div className="flex items-center px-4 border-b md:border-b-0 md:border-r border-gray-200">
                  <Users className="w-5 h-5 text-gray-400 mr-2" />
                  <select
                    value={searchForm.travelers}
                    onChange={(e) => setSearchForm({ ...searchForm, travelers: e.target.value })}
                    className="w-full py-4 text-gray-900 focus:outline-none bg-transparent"
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Traveler' : 'Travelers'}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center px-4">
                  <Clock className="w-5 h-5 text-gray-400 mr-2" />
                  <select
                    value={searchForm.nights}
                    onChange={(e) => setSearchForm({ ...searchForm, nights: e.target.value })}
                    className="w-full py-4 text-gray-900 focus:outline-none bg-transparent"
                  >
                    <option value="">Nights</option>
                    <option value="3">3 Nights</option>
                    <option value="4">4 Nights</option>
                    <option value="5">5 Nights</option>
                    <option value="7">7 Nights</option>
                  </select>
                </div>
              </div>
              <div className="p-2 bg-gray-50 rounded-b-xl flex justify-end">
                <Button variant="primary" className="px-8" onClick={handleSearch}>
                  <Search className="w-5 h-5 mr-2" />
                  Search Packages
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Sample Packages Notice */}
        {usingSamples && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Package className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Travel Packages ({packages.length})</h2>
              <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium ml-3">
                Demo Mode
              </span>
            </div>
            <p className="text-gray-600">
              Browse our collection of {packages.length} hand-picked packages from around the world.
            </p>
          </div>
        )}

        {/* Filters Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 sticky top-20 z-40">
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Filter className="w-5 h-5" />
              <span className="font-medium">Filters</span>
              <ChevronRight className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-90' : ''}`} />
            </button>

            <div className="h-6 w-px bg-gray-300"></div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                {filtersList.map(f => (
                  <option key={f.id} value={f.id}>{f.label}</option>
                ))}
              </select>
            </div>

            <div className="flex-1"></div>

            <p className="text-sm text-gray-600">
              <span className="font-bold text-gray-900">{filteredPackages.length}</span> packages found
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
                    <h3 className="font-semibold text-gray-900 mb-2">Price Per Person</h3>
                    <div className="space-y-2">
                      {[
                        { label: 'Upto ₹15,000', value: '0-15000' },
                        { label: '₹15,000 - ₹30,000', value: '15000-30000' },
                        { label: '₹30,000 - ₹50,000', value: '30000-50000' },
                        { label: '₹50,000 & Above', value: '50000-100000' }
                      ].map((option) => (
                        <label key={option.value} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                          <input
                            type="checkbox"
                            checked={filters.priceRange === option.value}
                            onChange={() => applyFilter('priceRange', option.value)}
                            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Duration */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Duration</h3>
                    <div className="space-y-2">
                      {[
                        { label: '1-3 Nights', value: '1-3' },
                        { label: '4-6 Nights', value: '4-6' },
                        { label: '7-9 Nights', value: '7-9' },
                        { label: '10+ Nights', value: '10+' }
                      ].map((option) => (
                        <label key={option.value} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                          <input
                            type="checkbox"
                            checked={filters.duration === option.value}
                            onChange={() => applyFilter('duration', option.value)}
                            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Theme */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Holiday Theme</h3>
                    <div className="space-y-2">
                      {[
                        { label: '🏖️ Beach', value: 'beach' },
                        { label: '🏔️ Adventure', value: 'adventure' },
                        { label: '💑 Honeymoon', value: 'honeymoon' },
                        { label: '👨‍👩‍👧‍👦 Family', value: 'family' },
                        { label: '💎 Luxury', value: 'luxury' },
                        { label: '🏛️ Cultural', value: 'cultural' },
                        { label: '🦁 Wildlife', value: 'wildlife' }
                      ].map((option) => (
                        <label key={option.value} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                          <input
                            type="checkbox"
                            checked={filters.category === option.value}
                            onChange={() => applyFilter('category', option.value)}
                            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">User Rating</h3>
                    <div className="space-y-2">
                      {[
                        { label: '4.5★ & above', value: '4.5' },
                        { label: '4★ & above', value: '4' }
                      ].map((option) => (
                        <label key={option.value} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                          <input
                            type="checkbox"
                            checked={filters.rating === option.value}
                            onChange={() => applyFilter('rating', option.value)}
                            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-200">
                  <Button variant="outline" size="sm" onClick={clearFilters}>Reset</Button>
                  <Button variant="primary" size="sm" onClick={() => setShowFilters(false)}>Apply Filters</Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-gray-700">Applied Filters:</span>
              {activeFilters.map((filter, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {filter.label}
                  <button
                    onClick={() => applyFilter(filter.type, filter.value)}
                    className="hover:bg-blue-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <button
                onClick={clearFilters}
                className="text-sm text-red-600 hover:text-red-700 font-semibold ml-2"
              >
                Clear All
              </button>
            </div>
          </div>
        )}

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg, index) => (
            <motion.div
              key={pkg._id || pkg.packageId || pkg.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group"
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full border-2 hover:border-blue-200">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={pkg.images?.[0]?.url || pkg.image || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800'}
                    alt={pkg.title || pkg.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  {/* Wishlist */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setWishlist(prev => 
                        prev.includes(pkg._id || pkg.id) 
                          ? prev.filter(id => id !== (pkg._id || pkg.id))
                          : [...prev, pkg._id || pkg.id]
                      );
                    }}
                    className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm hover:bg-white p-2 rounded-full shadow-lg transition-all z-10"
                  >
                    <Heart className={`w-5 h-5 ${wishlist.includes(pkg._id || pkg.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                  </button>

                  {/* Discount Badge */}
                  {(pkg.discount || pkg.pricing?.discount) > 0 && (
                    <div className="absolute top-3 left-3">
                      <Badge variant="primary" className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                        <Tag className="w-3 h-3 mr-1" />
                        {pkg.discount || pkg.pricing?.discount}% OFF
                      </Badge>
                    </div>
                  )}

                  {/* Category Badge */}
                  {pkg.category && (
                    <div className="absolute bottom-3 left-3">
                      <Badge variant="secondary" className="bg-white/95 backdrop-blur-sm text-gray-900 border-0">
                        {categoryIcons[pkg.category] || <Package className="w-3 h-3 mr-1" />}
                        <span className="text-xs font-bold uppercase tracking-wide">{pkg.category}</span>
                      </Badge>
                    </div>
                  )}

                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3">
                    <Badge variant="primary" className="bg-blue-600 text-white border-0">
                      <Clock className="w-3 h-3 mr-1" />
                      {pkg.duration || (pkg.duration?.days ? `${pkg.duration.days}D/${pkg.duration.nights}N` : 'N/A')}
                    </Badge>
                  </div>

                  {/* Sample Badge */}
                  {pkg.isSample && (
                    <div className="absolute top-3 left-16">
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 border-yellow-200">
                        Sample
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title & Location */}
                  <div className="mb-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {pkg.title || pkg.name}
                    </h3>
                    <div className="flex items-center gap-1 text-gray-500 mt-1">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm truncate">
                        {pkg.destination?.city || pkg.destination || pkg.location || 'International'}
                        {pkg.destination?.country ? `, ${pkg.destination.country}` : ''}
                      </span>
                    </div>
                  </div>

                  {/* Highlights */}
                  {(pkg.highlights && pkg.highlights.length > 0) && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {pkg.highlights.slice(0, 2).map((highlight, i) => (
                        <Badge key={i} variant="secondary" size="sm" className="bg-green-50 text-green-700 border-green-100">
                          <Check className="w-3 h-3 mr-1" />
                          <span className="text-xs">{highlight.length > 20 ? highlight.substring(0, 20) + '...' : highlight}</span>
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Rating */}
                  {(pkg.rating || pkg.rating?.average) > 0 && (
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center bg-green-600 text-white px-2 py-1 rounded font-bold text-sm gap-1">
                        <Star className="w-3.5 h-3.5 fill-white" />
                        {(pkg.rating || pkg.rating?.average).toFixed(1)}
                      </div>
                      <span className="text-sm text-gray-600">
                        ({pkg.reviews || pkg.rating?.count || 0} reviews)
                      </span>
                      {pkg.bestSeason && (
                        <span className="text-xs text-gray-500 ml-auto">
                          Best: {pkg.bestSeason.split(' ')[0]}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Inclusions Preview */}
                  {(pkg.inclusions || pkg.includes) && (pkg.inclusions?.length > 0 || pkg.includes?.length > 0) && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {(pkg.inclusions || pkg.includes || []).slice(0, 3).map((item, i) => (
                        <Badge key={i} variant="secondary" size="sm" className="bg-blue-50 text-blue-700 border-blue-100">
                          {inclusionIcons[item] || <Package className="w-3 h-3 mr-1" />}
                          <span className="text-xs">{item.length > 15 ? item.substring(0, 15) + '...' : item}</span>
                        </Badge>
                      ))}
                      {(pkg.inclusions?.length > 3 || pkg.includes?.length > 3) && (
                        <Badge variant="secondary" size="sm" className="bg-gray-100">
                          +{(pkg.inclusions?.length || pkg.includes?.length) - 3}
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Price & CTA */}
                  <div className="flex items-end justify-between mt-4 pt-4 border-t border-gray-100">
                    <div>
                      {((pkg.originalPrice || pkg.pricing?.originalPrice) !== (pkg.price || pkg.pricing?.discountedPrice)) && (
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm text-gray-500 line-through">
                            ${(pkg.originalPrice || pkg.pricing?.originalPrice)?.toLocaleString()}
                          </span>
                          <Badge variant="primary" size="sm" className="bg-red-100 text-red-700 border-red-200">
                            Save ${((pkg.originalPrice || pkg.pricing?.originalPrice) - (pkg.price || pkg.pricing?.discountedPrice)).toLocaleString()}
                          </Badge>
                        </div>
                      )}
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-blue-600">
                          ${(pkg.price || pkg.pricing?.discountedPrice)?.toLocaleString() || '0'}
                        </span>
                        <span className="text-sm text-gray-600">per person</span>
                      </div>
                    </div>

                    <Button
                      onClick={() => navigate(`/package/${pkg._id || pkg.packageId || pkg.id}`)}
                      variant="primary"
                      size="sm"
                      className="group"
                    >
                      View Details
                      <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredPackages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-md p-12 text-center"
          >
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No packages found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <Button 
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedFilter('all');
                clearFilters();
              }}
            >
              Clear All Filters
            </Button>
          </motion.div>
        )}

        {/* Load More */}
        {filteredPackages.length > 0 && filteredPackages.length >= 6 && (
          <div className="mt-8 text-center">
            <Button variant="outline" size="lg" className="px-12">
              Load More Packages
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackagesPageMMT;