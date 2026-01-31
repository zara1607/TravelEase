// src/lib/packages.js
// Enhanced package definitions with room-based pricing

export const PACKAGE_TYPES = {
  SIMPLE: 'simple',
  STANDARD: 'standard',
  LUXURY: 'luxury',
};

export const PACKAGES = {
  [PACKAGE_TYPES.SIMPLE]: {
    id: 'simple',
    name: 'Simple',
    priceMultiplier: 1.0,
    description: 'Basic amenities for a comfortable stay',
    features: [
      'Standard Room',
      'WiFi Access',
      'Daily Housekeeping',
      '24/7 Front Desk',
    ],
    icon: '🏨',
    color: 'blue',
  },
  [PACKAGE_TYPES.STANDARD]: {
    id: 'standard',
    name: 'Standard',
    priceMultiplier: 1.5,
    description: 'Enhanced experience with premium amenities',
    features: [
      'Deluxe Room',
      'Free Breakfast',
      'WiFi Access',
      'Daily Housekeeping',
      'Welcome Drink',
      'Room Service',
      'Gym Access',
    ],
    icon: '⭐',
    color: 'green',
    recommended: true,
  },
  [PACKAGE_TYPES.LUXURY]: {
    id: 'luxury',
    name: 'Luxury',
    priceMultiplier: 2.0,
    description: 'Ultimate luxury with exclusive benefits',
    features: [
      'Executive Suite',
      'Free Breakfast & Dinner',
      'Premium WiFi',
      'Priority Housekeeping',
      'Welcome Amenities',
      '24/7 Room Service',
      'Spa & Gym Access',
      'Airport Transfer',
      'Late Checkout',
      'Concierge Service',
    ],
    icon: '👑',
    color: 'purple',
  },
};

/**
 * Calculate comprehensive pricing with transparent breakdown
 * @param {Object} params - Pricing parameters
 * @returns {Object} Detailed pricing breakdown
 */
export const calculatePrice = ({
  basePrice,
  packageType = PACKAGE_TYPES.SIMPLE,
  numberOfNights = 1,
  numberOfRooms = 1,
  numberOfGuests = 1,
  serviceFee = 200,
  taxRate = 0.10,
  discountPercent = 0,
}) => {
  const packageMultiplier = PACKAGES[packageType]?.priceMultiplier || 1.0;
  const packageInfo = PACKAGES[packageType];
  
  // 1. Base hotel fee per night per room
  const hotelFeePerNightPerRoom = basePrice;
  
  // 2. Package adjustment per night per room
  const packageAdjustmentPerNightPerRoom = basePrice * (packageMultiplier - 1);
  
  // 3. Adjusted price per night per room (hotel fee + package)
  const pricePerNightPerRoom = basePrice * packageMultiplier;
  
  // 4. Total hotel fee (price × nights × rooms)
  const hotelFeeTotal = hotelFeePerNightPerRoom * numberOfNights * numberOfRooms;
  
  // 5. Total package adjustment
  const packageAdjustmentTotal = packageAdjustmentPerNightPerRoom * numberOfNights * numberOfRooms;
  
  // 6. Subtotal before service fee and tax
  const subtotal = pricePerNightPerRoom * numberOfNights * numberOfRooms;
  
  // 7. Discount calculation
  const discountAmount = discountPercent > 0 ? (subtotal * discountPercent) / 100 : 0;
  const subtotalAfterDiscount = subtotal - discountAmount;
  
  // 8. Service fee (flat rate)
  const totalServiceFee = serviceFee;
  
  // 9. Taxes (applied to subtotal after discount + service fee)
  const taxableAmount = subtotalAfterDiscount + totalServiceFee;
  const taxes = taxableAmount * taxRate;
  
  // 10. Final total
  const total = subtotalAfterDiscount + totalServiceFee + taxes;
  
  return {
    // Base pricing
    basePrice,
    hotelFeePerNightPerRoom,
    
    // Package info
    packageType,
    packageName: packageInfo?.name || 'Simple',
    packageMultiplier,
    packageAdjustmentPerNightPerRoom,
    packageAdjustmentTotal,
    
    // Calculated prices
    pricePerNightPerRoom,
    
    // Quantities
    numberOfNights,
    numberOfRooms,
    numberOfGuests,
    
    // Fee breakdown
    hotelFeeTotal,
    subtotal,
    
    // Discount
    discountPercent,
    discountAmount,
    subtotalAfterDiscount,
    
    // Additional charges
    serviceFee: totalServiceFee,
    taxRate,
    taxes,
    
    // Final
    total,
    
    // Savings display
    savings: discountAmount,
  };
};

/**
 * Format price for display in Indian Rupees
 */
export const formatPrice = (price) => {
  return `₹${Math.round(price).toLocaleString('en-IN')}`;
};

/**
 * Get package details by type
 */
export const getPackage = (packageType) => {
  return PACKAGES[packageType] || PACKAGES[PACKAGE_TYPES.SIMPLE];
};

/**
 * Calculate savings percentage
 */
export const calculateSavingsPercent = (originalPrice, finalPrice) => {
  if (originalPrice <= finalPrice) return 0;
  return Math.round(((originalPrice - finalPrice) / originalPrice) * 100);
};