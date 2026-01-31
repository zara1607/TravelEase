// src/features/bookings/PriceSummary.jsx
// Transparent price summary with detailed billing breakdown

import { useMemo } from 'react';
import { calculatePrice, getPackage, formatPrice } from '../../lib/packages';

const PriceSummary = ({ type, itemData, pricingDetails }) => {
  // Calculate all pricing dynamically with complete transparency
  const pricing = useMemo(() => {
    if (type === 'hotel') {
      return calculatePrice({
        basePrice: pricingDetails.basePrice || 0,
        packageType: pricingDetails.packageType,
        numberOfNights: pricingDetails.numberOfNights || 1,
        numberOfRooms: pricingDetails.numberOfRooms || 1,
        numberOfGuests: pricingDetails.numberOfGuests || 1,
        serviceFee: pricingDetails.serviceFee || 200,
        taxRate: pricingDetails.taxRate || 0.10,
        discountPercent: pricingDetails.discountPercent || 0,
      });
    } else {
      // For flights and tours
      const basePrice = pricingDetails.basePrice || 0;
      const serviceFee = pricingDetails.serviceFee || 200;
      const taxRate = pricingDetails.taxRate || 0.10;
      
      let subtotal = basePrice;
      
      if (type === 'tour' || type === 'flight') {
        const guests = pricingDetails.numberOfGuests || 1;
        subtotal = basePrice * guests;
      }
      
      const taxes = subtotal * taxRate;
      const total = subtotal + serviceFee + taxes;
      
      return {
        basePrice,
        subtotal,
        serviceFee,
        taxes,
        taxRate,
        total,
        packageType: null,
      };
    }
  }, [type, pricingDetails]);

  const selectedPackage = type === 'hotel' ? getPackage(pricingDetails.packageType) : null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        Price Summary
      </h3>

      {/* Item Preview */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        {itemData.image && (
          <img
            src={itemData.image}
            alt={itemData.name || 'Item'}
            className="w-full h-32 object-cover rounded-lg mb-3"
          />
        )}
        <h4 className="font-semibold text-gray-900">
          {itemData.name || itemData.airline || 'Booking Item'}
        </h4>
        {itemData.location && (
          <p className="text-sm text-gray-600 mt-1 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {itemData.location}
          </p>
        )}
        {type === 'flight' && itemData.from && itemData.to && (
          <p className="text-sm text-gray-600 mt-1">
            {itemData.from} → {itemData.to}
          </p>
        )}
      </div>

      {/* Package Badge (Hotels only) */}
      {type === 'hotel' && selectedPackage && (
        <div className="mb-6 pb-6 border-b border-gray-200">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{selectedPackage.icon}</span>
              <div>
                <p className="text-xs text-gray-600">Selected Package</p>
                <p className="font-bold text-gray-900 text-lg">{selectedPackage.name}</p>
              </div>
            </div>
            <p className="text-xs text-gray-600">
              {selectedPackage.description}
            </p>
          </div>
        </div>
      )}

      {/* TRANSPARENT PRICE BREAKDOWN */}
      <div className="space-y-3 mb-6">
        <h4 className="font-semibold text-gray-900 text-sm mb-3 uppercase tracking-wide">
          Billing Details
        </h4>

        {type === 'hotel' && (
          <>
            {/* Hotel Fee Line Item */}
            <div className="space-y-1">
              <div className="flex justify-between items-start text-gray-700">
                <div className="flex-1">
                  <p className="font-medium">Hotel Fee</p>
                  <p className="text-xs text-gray-500">
                    {formatPrice(pricing.hotelFeePerNightPerRoom)} × {pricingDetails.numberOfNights} night{pricingDetails.numberOfNights > 1 ? 's' : ''} × {pricingDetails.numberOfRooms} room{pricingDetails.numberOfRooms > 1 ? 's' : ''}
                  </p>
                </div>
                <span className="font-semibold text-gray-900">
                  {formatPrice(pricing.hotelFeeTotal)}
                </span>
              </div>
            </div>

            {/* Package Adjustment (if not Simple) */}
            {selectedPackage && pricing.packageMultiplier > 1 && (
              <div className="space-y-1">
                <div className="flex justify-between items-start text-gray-700">
                  <div className="flex-1">
                    <p className="font-medium">{selectedPackage.name} Package Upgrade</p>
                    <p className="text-xs text-gray-500">
                      +{Math.round((pricing.packageMultiplier - 1) * 100)}% premium ({formatPrice(pricing.packageAdjustmentPerNightPerRoom)}/night/room)
                    </p>
                  </div>
                  <span className="font-semibold text-gray-900">
                    +{formatPrice(pricing.packageAdjustmentTotal)}
                  </span>
                </div>
              </div>
            )}

            {/* Subtotal */}
            <div className="pt-3 border-t border-gray-200">
              <div className="flex justify-between text-gray-900">
                <span className="font-semibold">Room Charges</span>
                <span className="font-bold">{formatPrice(pricing.subtotal)}</span>
              </div>
            </div>

            {/* Discount */}
            {pricing.discountPercent > 0 && pricing.discountAmount > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-semibold text-green-800 text-sm">
                        Discount Applied ({pricing.discountPercent}% OFF)
                      </p>
                      <p className="text-xs text-green-700">You're saving on this booking!</p>
                    </div>
                  </div>
                  <span className="font-bold text-green-700">
                    -{formatPrice(pricing.discountAmount)}
                  </span>
                </div>
              </div>
            )}

            {/* Subtotal after discount */}
            {pricing.discountAmount > 0 && (
              <div className="flex justify-between text-gray-900">
                <span className="font-medium">Subtotal after discount</span>
                <span className="font-bold">{formatPrice(pricing.subtotalAfterDiscount)}</span>
              </div>
            )}
          </>
        )}

        {/* For flights and tours */}
        {(type === 'tour' || type === 'flight') && (
          <div className="flex justify-between text-gray-700">
            <div>
              <p className="font-medium">Base Fare</p>
              <p className="text-xs text-gray-500">
                {formatPrice(pricing.basePrice)} × {pricingDetails.numberOfGuests} traveler{pricingDetails.numberOfGuests > 1 ? 's' : ''}
              </p>
            </div>
            <span className="font-semibold">{formatPrice(pricing.subtotal)}</span>
          </div>
        )}

        {/* Service Fee */}
        <div className="flex justify-between text-gray-700 pt-3 border-t border-gray-200">
          <div>
            <p className="font-medium">Service Fee</p>
            <p className="text-xs text-gray-500">Platform booking fee</p>
          </div>
          <span className="font-semibold">{formatPrice(pricing.serviceFee)}</span>
        </div>

        {/* Taxes */}
        <div className="flex justify-between text-gray-700">
          <div>
            <p className="font-medium">Taxes & Fees</p>
            <p className="text-xs text-gray-500">
              {(pricing.taxRate * 100).toFixed(0)}% GST on room charges + service fee
            </p>
          </div>
          <span className="font-semibold">{formatPrice(pricing.taxes)}</span>
        </div>
      </div>

      {/* TOTAL */}
      <div className="pt-6 border-t-2 border-gray-300 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Total Amount</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatPrice(pricing.total)}
            </p>
          </div>
          {pricing.savings > 0 && (
            <div className="text-right">
              <p className="text-xs text-gray-600">You Save</p>
              <p className="text-lg font-bold text-green-600">
                {formatPrice(pricing.savings)}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Booking Details Summary */}
      {type === 'hotel' && (
        <div className="space-y-3 mb-6">
          <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
            Booking Details
          </h4>
          
          {pricingDetails.checkIn && pricingDetails.checkOut && (
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Check-in</span>
                <span className="font-medium text-gray-900">
                  {new Date(pricingDetails.checkIn).toLocaleDateString('en-IN', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Check-out</span>
                <span className="font-medium text-gray-900">
                  {new Date(pricingDetails.checkOut).toLocaleDateString('en-IN', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                <span className="text-gray-600">Total nights</span>
                <span className="font-semibold text-gray-900">
                  {pricingDetails.numberOfNights || 1}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Rooms</span>
                <span className="font-semibold text-gray-900">
                  {pricingDetails.numberOfRooms || 1}
                </span>
              </div>
            </div>
          )}

          {/* Travelers */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Travelers</span>
              <span className="font-medium text-gray-900">
                {pricingDetails.numberOfAdults || 1} Adult{(pricingDetails.numberOfAdults || 1) > 1 ? 's' : ''}
                {pricingDetails.numberOfChildren > 0 && 
                  `, ${pricingDetails.numberOfChildren} Child${pricingDetails.numberOfChildren > 1 ? 'ren' : ''}`
                }
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Package Features (Hotels only) */}
      {type === 'hotel' && selectedPackage && (
        <div className="mb-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p className="font-semibold text-gray-900">
              Included in {selectedPackage.name} Package
            </p>
          </div>
          <div className="space-y-1.5">
            {selectedPackage.features.slice(0, 5).map((feature, index) => (
              <div key={index} className="flex items-start text-sm text-gray-700">
                <svg className="w-4 h-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>{feature}</span>
              </div>
            ))}
            {selectedPackage.features.length > 5 && (
              <p className="text-xs text-gray-600 ml-6">
                +{selectedPackage.features.length - 5} more amenities
              </p>
            )}
          </div>
        </div>
      )}

      {/* Cancellation Policy */}
      <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div className="text-sm">
            <p className="font-semibold text-blue-900 mb-1">Free Cancellation</p>
            <p className="text-blue-800">
              Cancel up to 24 hours before check-in for a full refund
            </p>
          </div>
        </div>
      </div>

      {/* Security Badge */}
      <div className="flex items-center justify-center py-4 border-t border-gray-200">
        <svg className="w-5 h-5 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span className="text-sm text-gray-600">
          Secure Payment • Protected Booking
        </span>
      </div>
    </div>
  );
};

export default PriceSummary;