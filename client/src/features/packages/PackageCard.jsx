// src/features/packages/PackageCard.jsx
// Reusable package card component

import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../lib/packages';

const PackageCard = ({ package: pkg, showDiscount = true }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    // Navigate to booking page with package data
    navigate(`/booking/package/${pkg.id}`, {
      state: { 
        item: {
          ...pkg,
          type: 'package',
          basePrice: pkg.price,
          pricePerNight: pkg.price,
          discount: pkg.discount || 0,
        }
      }
    });
  };

  const handleExplore = () => {
    // Can navigate to package details page or directly to booking
    handleBookNow();
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-56 overflow-hidden group">
        <img
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        
        {/* Discount Badge */}
        {showDiscount && pkg.discount > 0 && (
          <div className="absolute top-4 left-4">
            <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              {pkg.discount}% OFF
            </div>
          </div>
        )}

        {/* Featured Badge */}
        {pkg.featured && (
          <div className="absolute top-4 right-4">
            <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
              Featured
            </div>
          </div>
        )}

        {/* Country Tag */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {pkg.country}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
          {pkg.name}
        </h3>

        {/* Destination & Duration */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="line-clamp-1">{pkg.destination}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{pkg.duration}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {pkg.description}
        </p>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex items-center bg-blue-600 text-white px-2 py-1 rounded-md text-sm font-semibold">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {pkg.rating}
          </div>
          <span className="ml-2 text-sm text-gray-600">
            ({pkg.reviews?.toLocaleString()} reviews)
          </span>
        </div>

        {/* Highlights */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-700 mb-2">Highlights:</p>
          <div className="flex flex-wrap gap-1">
            {pkg.highlights.slice(0, 3).map((highlight, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
              >
                {highlight}
              </span>
            ))}
            {pkg.highlights.length > 3 && (
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                +{pkg.highlights.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div>
            <p className="text-xs text-gray-500">Starting from</p>
            <div className="flex items-baseline gap-2">
              {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(pkg.originalPrice)}
                </span>
              )}
              <span className="text-2xl font-bold text-blue-600">
                {formatPrice(pkg.price)}
              </span>
            </div>
            <p className="text-xs text-gray-500">per person</p>
          </div>
          <button
            onClick={handleBookNow}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;