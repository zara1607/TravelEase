import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaClock, FaHeart, FaRegHeart } from 'react-icons/fa';
import Button from '../../ui/Button';
import Badge from '../../ui/Badge';

const PackageCard = ({ package: pkg, onBookNow }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  // Handle different data structures
  const packageId = pkg.id || pkg._id || pkg.packageId;
  const packageName = pkg.name || pkg.title;
  const packageImage = pkg.image || pkg.images?.[0]?.url;
  const packageLocation = pkg.location || pkg.destination || 
    (pkg.destination?.city ? `${pkg.destination.city}, ${pkg.destination.country}` : 'International');
  const packageDuration = pkg.duration || 
    (pkg.duration?.days ? `${pkg.duration.days} Days / ${pkg.duration.nights} Nights` : '');
  const packageRating = pkg.rating || pkg.rating?.average || 0;
  const packageReviews = pkg.reviews || pkg.rating?.count || 0;
  const packagePrice = pkg.price || pkg.pricing?.discountedPrice || 0;
  const packageOriginalPrice = pkg.originalPrice || pkg.pricing?.originalPrice;
  const packageDiscount = pkg.discount || pkg.pricing?.discount;
  const packageDescription = pkg.shortDescription || pkg.description;

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={packageImage || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800'}
          alt={packageName}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        
        {/* Discount Badge */}
        {packageDiscount > 0 && (
          <Badge 
            variant="success" 
            className="absolute top-4 left-4 text-sm font-semibold px-3 py-1"
          >
            {packageDiscount}% OFF
          </Badge>
        )}
        
        {/* Wishlist Button */}
        <button
          onClick={toggleWishlist}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          {isWishlisted ? (
            <FaHeart className="text-red-500 text-xl" />
          ) : (
            <FaRegHeart className="text-gray-600 text-xl" />
          )}
        </button>
        
        {/* Rating Badge */}
        {packageRating > 0 && (
          <div className="absolute bottom-4 left-4 flex items-center bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg">
            <FaStar className="text-yellow-400 mr-1" />
            <span className="font-semibold text-gray-800">{packageRating}</span>
            <span className="text-gray-600 text-sm ml-1">({packageReviews})</span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-5">
        {/* Location */}
        <div className="flex items-center text-gray-600 mb-2">
          <FaMapMarkerAlt className="text-blue-500 mr-1 text-sm" />
          <span className="text-sm">{packageLocation}</span>
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
          {packageName}
        </h3>
        
        {/* Duration */}
        {packageDuration && (
          <div className="flex items-center text-gray-600 mb-3">
            <FaClock className="text-green-500 mr-1 text-sm" />
            <span className="text-sm">{packageDuration}</span>
          </div>
        )}
        
        {/* Short Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {packageDescription || 'Experience the journey of a lifetime with this amazing travel package.'}
        </p>
        
        {/* Price */}
        <div className="flex items-end justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-blue-600">${packagePrice}</span>
            <span className="text-gray-500 text-sm ml-1">/ person</span>
            {packageOriginalPrice && packageOriginalPrice > packagePrice && (
              <div className="text-sm text-gray-400 line-through">
                ${packageOriginalPrice}
              </div>
            )}
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-500">starting from</span>
          </div>
        </div>
        
        {/* Buttons */}
        <div className="flex gap-3">
          <Link to={`/package/${packageId}`} className="flex-1">
            <Button variant="outline" className="w-full hover:bg-blue-50">
              View Details
            </Button>
          </Link>
          <Button 
            variant="primary" 
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            onClick={() => onBookNow && onBookNow(pkg)}
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;