// src/features/bookings/PackageSelector.jsx
// Interactive package selection component with visual cards

import { PACKAGES, PACKAGE_TYPES, formatPrice } from '../../lib/packages';

const PackageSelector = ({ selectedPackage, basePrice, onPackageSelect }) => {
  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-gray-900">
        Select Your Package
      </h4>
      <p className="text-sm text-gray-600">
        Choose the package that best suits your needs
      </p>

      <div className="grid grid-cols-1 gap-4">
        {Object.values(PACKAGES).map((pkg) => {
          const isSelected = selectedPackage === pkg.id;
          const packagePrice = basePrice * pkg.priceMultiplier;

          return (
            <div
              key={pkg.id}
              onClick={() => onPackageSelect(pkg.id)}
              className={`
                relative cursor-pointer rounded-lg border-2 p-4 transition-all
                ${
                  isSelected
                    ? `border-${pkg.color}-600 bg-${pkg.color}-50 shadow-md`
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                }
              `}
            >
              {/* Recommended Badge */}
              {pkg.recommended && (
                <div className="absolute -top-3 left-4">
                  <span className="bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                    Recommended
                  </span>
                </div>
              )}

              {/* Selected Indicator */}
              {isSelected && (
                <div className="absolute top-4 right-4">
                  <div className="bg-blue-600 rounded-full p-1">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              )}

              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{pkg.icon}</span>
                  <div>
                    <h5 className="text-lg font-bold text-gray-900">
                      {pkg.name}
                    </h5>
                    <p className="text-sm text-gray-600">{pkg.description}</p>
                  </div>
                </div>
              </div>

              {/* Price Display */}
              <div className="mb-3 pb-3 border-b border-gray-200">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {formatPrice(packagePrice)}
                  </span>
                  <span className="text-sm text-gray-500">per night</span>
                </div>
                {pkg.priceMultiplier > 1 && (
                  <p className="text-xs text-gray-500 mt-1">
                    {Math.round((pkg.priceMultiplier - 1) * 100)}% more than Simple
                  </p>
                )}
              </div>

              {/* Features List */}
              <div className="space-y-2">
                {pkg.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <svg
                      className={`w-5 h-5 flex-shrink-0 ${
                        isSelected ? 'text-green-600' : 'text-gray-400'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PackageSelector;