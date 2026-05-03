import React, { useState, useEffect } from 'react';
import { FaFilter, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Button from '../../ui/Button';

const Filters = ({ onFilterChange, initialFilters = {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [priceRange, setPriceRange] = useState({
    min: initialFilters.minPrice || 0,
    max: initialFilters.maxPrice || 5000
  });
  const [selectedRating, setSelectedRating] = useState(initialFilters.minRating || 0);
  const [selectedDuration, setSelectedDuration] = useState(initialFilters.duration || '');
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    rating: true,
    duration: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handlePriceChange = (type, value) => {
    const newRange = { ...priceRange, [type]: parseInt(value) };
    setPriceRange(newRange);
    onFilterChange({
      minPrice: newRange.min,
      maxPrice: newRange.max,
      minRating: selectedRating,
      duration: selectedDuration
    });
  };

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
    onFilterChange({
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      minRating: rating,
      duration: selectedDuration
    });
  };

  const handleDurationChange = (duration) => {
    setSelectedDuration(duration);
    onFilterChange({
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      minRating: selectedRating,
      duration: duration
    });
  };

  const clearFilters = () => {
    setPriceRange({ min: 0, max: 5000 });
    setSelectedRating(0);
    setSelectedDuration('');
    onFilterChange({
      minPrice: 0,
      maxPrice: 5000,
      minRating: 0,
      duration: ''
    });
  };

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        <FaFilter className="text-xl" />
      </button>

      {/* Filter Panel */}
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-50 w-80 bg-white shadow-xl lg:shadow-none
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:block overflow-y-auto max-h-screen
      `}>
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <FaFilter className="mr-2 text-blue-600" />
              Filters
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear All
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="mb-6 border-b pb-4">
            <button
              onClick={() => toggleSection('price')}
              className="flex justify-between items-center w-full mb-3"
            >
              <h3 className="font-semibold text-gray-700">Price Range</h3>
              {expandedSections.price ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            
            {expandedSections.price && (
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-xs text-gray-500">Min ($)</label>
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      value={priceRange.min}
                      onChange={(e) => handlePriceChange('min', e.target.value)}
                      className="w-full"
                    />
                    <div className="text-sm font-medium text-gray-700">${priceRange.min}</div>
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-gray-500">Max ($)</label>
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      value={priceRange.max}
                      onChange={(e) => handlePriceChange('max', e.target.value)}
                      className="w-full"
                    />
                    <div className="text-sm font-medium text-gray-700">${priceRange.max}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={priceRange.min}
                    onChange={(e) => handlePriceChange('min', e.target.value)}
                    className="w-1/2 px-3 py-2 border rounded-lg text-sm"
                    placeholder="Min"
                  />
                  <input
                    type="number"
                    value={priceRange.max}
                    onChange={(e) => handlePriceChange('max', e.target.value)}
                    className="w-1/2 px-3 py-2 border rounded-lg text-sm"
                    placeholder="Max"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Rating Filter */}
          <div className="mb-6 border-b pb-4">
            <button
              onClick={() => toggleSection('rating')}
              className="flex justify-between items-center w-full mb-3"
            >
              <h3 className="font-semibold text-gray-700">Rating</h3>
              {expandedSections.rating ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            
            {expandedSections.rating && (
              <div className="space-y-2">
                {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                  <label key={rating} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      checked={selectedRating === rating}
                      onChange={() => handleRatingChange(rating)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">{rating}+ stars</span>
                  </label>
                ))}
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    checked={selectedRating === 0}
                    onChange={() => handleRatingChange(0)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">All ratings</span>
                </label>
              </div>
            )}
          </div>

          {/* Duration Filter */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('duration')}
              className="flex justify-between items-center w-full mb-3"
            >
              <h3 className="font-semibold text-gray-700">Duration</h3>
              {expandedSections.duration ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            
            {expandedSections.duration && (
              <div className="space-y-2">
                {[
                  { value: 'short', label: 'Short (1-5 days)' },
                  { value: 'medium', label: 'Medium (6-8 days)' },
                  { value: 'long', label: 'Long (9+ days)' }
                ].map((option) => (
                  <label key={option.value} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="duration"
                      value={option.value}
                      checked={selectedDuration === option.value}
                      onChange={(e) => handleDurationChange(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="duration"
                    value=""
                    checked={selectedDuration === ''}
                    onChange={() => handleDurationChange('')}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">All durations</span>
                </label>
              </div>
            )}
          </div>

          {/* Apply Button for Mobile */}
          <Button
            variant="primary"
            className="w-full lg:hidden mt-4"
            onClick={() => setIsOpen(false)}
          >
            Apply Filters
          </Button>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Filters;