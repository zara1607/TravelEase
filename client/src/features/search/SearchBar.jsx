// client/src/features/search/SearchBar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaUsers } from 'react-icons/fa';
import Button from '../../ui/Button';

const SearchBar = ({ initialSearch = '' }) => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [travelers, setTravelers] = useState(2);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const popularDestinations = [
    'Paris, France',
    'Bali, Indonesia',
    'Dubai, UAE',
    'Maldives',
    'Switzerland',
    'Thailand',
    'Japan',
    'Italy',
    'Greece',
    'Morocco'
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    // Basic validation
    if (!destination.trim() && !searchTerm.trim()) {
      alert('Please enter a destination or search term');
      return;
    }

    // Build query parameters
    const params = new URLSearchParams();

    if (destination.trim()) {
      params.set('destination', destination.trim());
    }
    if (searchTerm.trim()) {
      params.set('keyword', searchTerm.trim());
    }
    if (date) {
      params.set('date', date);
    }
    if (travelers > 0) {
      params.set('travelers', travelers);
    }

    // Navigate to search results page with query params
    // You can change '/search' → '/packages' or '/results' if needed
    navigate(`/search?${params.toString()}`);
  };

  const selectDestination = (dest) => {
    setDestination(dest);
    setSearchTerm(dest);
    setIsDropdownOpen(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <form onSubmit={handleSearch}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Destination Search */}
          <div className="relative" ref={dropdownRef}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Destination
            </label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onFocus={() => setIsDropdownOpen(true)}
                placeholder="Where do you want to go?"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Popular Destinations Dropdown */}
            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                <div className="p-2">
                  <p className="text-xs font-semibold text-gray-500 px-3 py-2">
                    Popular Destinations
                  </p>
                  {popularDestinations.map((dest) => (
                    <button
                      key={dest}
                      type="button"
                      onClick={() => selectDestination(dest)}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <span className="text-sm">{dest}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Travel Date
            </label>
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Travelers */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Travelers
            </label>
            <div className="relative">
              <FaUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={travelers}
                onChange={(e) => setTravelers(parseInt(e.target.value))}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Traveler' : 'Travelers'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <Button
              type="submit"
              variant="primary"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 flex items-center justify-center gap-2"
            >
              <FaSearch />
              <span>Search Packages</span>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;