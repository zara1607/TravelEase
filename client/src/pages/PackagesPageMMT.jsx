import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Search, MapPin, Calendar, Users, Star, Heart, 
  TrendingUp, Award, Shield, ChevronRight, Filter,
  X, Check, Clock, Sparkles, Tag, Phone
} from 'lucide-react';
import axios from 'axios';

// Fix: Define API_URL directly instead of using process.env
const API_URL = 'http://localhost:5000/api';

const PackagesPageMMT = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // State
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
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

  // Fetch packages
  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-');
        params.minPrice = min;
        params.maxPrice = max;
      }
      if (filters.category) params.category = filters.category;
      if (filters.rating) params.minRating = filters.rating;
      if (searchForm.destination) params.destination = searchForm.destination;

      const response = await axios.get(`${API_URL}/packages`, { params });
      
      if (response.data.success) {
        setPackages(response.data.data.packages || []);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
      setPackages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchPackages();
  };

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
        'luxury': 'Luxury'
      },
      rating: {
        '4': '4★ & above',
        '4.5': '4.5★ & above'
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

  useEffect(() => {
    fetchPackages();
  }, [filters]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Search Bar - MakeMyTrip Style */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-white rounded-lg shadow-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Destination */}
              <div className="relative">
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  Enter City / Package Name
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="e.g. Goa, Dubai, Maldives"
                    value={searchForm.destination}
                    onChange={(e) => setSearchForm({ ...searchForm, destination: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-md focus:border-blue-500 focus:outline-none text-gray-900 font-medium"
                  />
                </div>
              </div>

              {/* Month */}
              <div className="relative">
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  Month of Travel
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={searchForm.month}
                    onChange={(e) => setSearchForm({ ...searchForm, month: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-md focus:border-blue-500 focus:outline-none text-gray-900 font-medium appearance-none cursor-pointer"
                  >
                    <option value="">Select Month</option>
                    <option value="Feb 2026">Feb 2026</option>
                    <option value="Mar 2026">Mar 2026</option>
                    <option value="Apr 2026">Apr 2026</option>
                    <option value="May 2026">May 2026</option>
                    <option value="Jun 2026">Jun 2026</option>
                  </select>
                </div>
              </div>

              {/* No. of Nights */}
              <div className="relative">
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  No. of Nights
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={searchForm.nights}
                    onChange={(e) => setSearchForm({ ...searchForm, nights: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-md focus:border-blue-500 focus:outline-none text-gray-900 font-medium appearance-none cursor-pointer"
                  >
                    <option value="">Select</option>
                    <option value="3">3 Nights</option>
                    <option value="4">4 Nights</option>
                    <option value="5">5 Nights</option>
                    <option value="7">7 Nights</option>
                  </select>
                </div>
              </div>

              {/* Travelers */}
              <div className="relative">
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  No. of Travelers
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={searchForm.travelers}
                    onChange={(e) => setSearchForm({ ...searchForm, travelers: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-md focus:border-blue-500 focus:outline-none text-gray-900 font-medium appearance-none cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Traveler' : 'Travelers'}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="mt-6">
              <button
                onClick={handleSearch}
                className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-12 py-3.5 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                SEARCH PACKAGES
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges - MakeMyTrip Style */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-green-600" />
              <div>
                <div className="font-bold text-gray-900">100% Safe</div>
                <div className="text-xs text-gray-600">Secure Payments</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-blue-600" />
              <div>
                <div className="font-bold text-gray-900">Best Price</div>
                <div className="text-xs text-gray-600">Guaranteed</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-8 h-8 text-orange-600" />
              <div>
                <div className="font-bold text-gray-900">24/7 Support</div>
                <div className="text-xs text-gray-600">Travel Experts</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-purple-600" />
              <div>
                <div className="font-bold text-gray-900">Customizable</div>
                <div className="text-xs text-gray-600">Flexible Packages</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm sticky top-4">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </h3>
                {activeFilters.length > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="p-4 space-y-6">
                {/* Price Range */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Price Per Person</h4>
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

                {/* Theme */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Holiday Theme</h4>
                  <div className="space-y-2">
                    {[
                      { label: '🏖️ Beach', value: 'beach' },
                      { label: '🏔️ Adventure', value: 'adventure' },
                      { label: '💑 Honeymoon', value: 'honeymoon' },
                      { label: '👨‍👩‍👧‍👦 Family', value: 'family' },
                      { label: '💎 Luxury', value: 'luxury' }
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
                  <h4 className="font-semibold text-gray-900 mb-3">User Rating</h4>
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
            </div>
          </div>

          {/* Package Listings */}
          <div className="flex-1">
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

            {/* Results Header */}
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {packages.length} Holiday Packages Found
              </h2>
              <p className="text-gray-600 mt-1">
                Explore handpicked packages curated by travel experts
              </p>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
                    <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : packages.length === 0 ? (
              /* Empty State */
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="text-6xl mb-4">✈️</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No Packages Found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search criteria
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              /* Package Grid - MakeMyTrip Card Style */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {packages.map((pkg) => (
                  <PackageCardMMT
                    key={pkg._id || pkg.packageId}
                    package={pkg}
                    onClick={() => navigate(`/package/${pkg._id || pkg.packageId}`)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Button */}
      <button
        onClick={() => setShowMobileFilters(true)}
        className="lg:hidden fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg z-40"
      >
        <Filter className="w-6 h-6" />
      </button>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h3 className="font-bold text-lg">Filters</h3>
              <button onClick={() => setShowMobileFilters(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4">
              {/* Mobile filter content - same as sidebar */}
            </div>
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex gap-2">
              <button
                onClick={() => {
                  clearFilters();
                  setShowMobileFilters(false);
                }}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// MakeMyTrip-Style Package Card Component
const PackageCardMMT = ({ package: pkg, onClick }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discount = pkg.pricing.discount || Math.round(
    ((pkg.pricing.originalPrice - pkg.pricing.discountedPrice) / pkg.pricing.originalPrice) * 100
  );

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-200 hover:border-blue-500 group"
    >
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={pkg.images?.[0]?.url || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800'}
          alt={pkg.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-3 right-3 bg-white hover:bg-gray-100 p-2 rounded-full shadow-lg transition-all z-10"
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </button>

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full font-bold text-sm shadow-lg flex items-center gap-1">
            <Tag className="w-4 h-4" />
            {discount}% OFF
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-white/95 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow">
            {pkg.category}
          </span>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
          <Clock className="w-4 h-4" />
          {pkg.duration.days}D/{pkg.duration.nights}N
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title & Location */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {pkg.title}
          </h3>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="line-clamp-1">{pkg.destination.city}, {pkg.destination.country}</span>
          </div>
        </div>

        {/* Highlights */}
        {pkg.highlights && pkg.highlights.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1.5">
              {pkg.highlights.slice(0, 2).map((highlight, index) => (
                <span
                  key={index}
                  className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded font-medium flex items-center gap-1"
                >
                  <Check className="w-3 h-3" />
                  {highlight.length > 25 ? highlight.substring(0, 25) + '...' : highlight}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Rating */}
        {pkg.rating && pkg.rating.average > 0 && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center bg-green-600 text-white px-2 py-1 rounded font-bold text-sm gap-1">
              <Star className="w-3.5 h-3.5 fill-white" />
              {pkg.rating.average.toFixed(1)}
            </div>
            <span className="text-sm text-gray-600">
              ({pkg.rating.count} reviews)
            </span>
            <div className="ml-auto text-xs text-gray-500">
              {pkg.bestSeason && `Best: ${pkg.bestSeason.split(' ')[0]}`}
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-gray-200 my-3"></div>

        {/* Price & CTA */}
        <div className="flex items-end justify-between">
          <div>
            {pkg.pricing.originalPrice !== pkg.pricing.discountedPrice && (
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm text-gray-500 line-through">
                  ₹{pkg.pricing.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded font-semibold">
                  SAVE ₹{(pkg.pricing.originalPrice - pkg.pricing.discountedPrice).toLocaleString('en-IN')}
                </span>
              </div>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-blue-600">
                ₹{pkg.pricing.discountedPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-sm text-gray-600">per person</span>
            </div>
          </div>

          <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-1 shadow-md hover:shadow-lg transition-all">
            VIEW DETAILS
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Inclusions Preview */}
        {pkg.inclusions && pkg.inclusions.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="text-xs text-gray-600 font-semibold mb-1.5">Package Includes:</div>
            <div className="flex flex-wrap gap-2">
              {pkg.inclusions.slice(0, 3).map((item, index) => (
                <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                  {item.length > 20 ? item.substring(0, 20) + '...' : item}
                </span>
              ))}
              {pkg.inclusions.length > 3 && (
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded font-semibold">
                  +{pkg.inclusions.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackagesPageMMT;