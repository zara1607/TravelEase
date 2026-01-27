import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card'
import { CURRENCY } from '../../lib/constants'
import { Tag, Shield } from 'lucide-react'

const PriceSummary = ({ basePrice, guests = 1, nights = 1, type = 'flight' }) => {
  const subtotal = basePrice * guests * (type === 'hotel' ? nights : 1)
  const taxRate = 0.12 // 12% tax
  const tax = subtotal * taxRate
  const serviceFee = 500
  const total = subtotal + tax + serviceFee

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Price Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Price Breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between text-gray-700">
            <span>
              {type === 'hotel' 
                ? `${CURRENCY.symbol}${basePrice.toLocaleString()} x ${nights} night${nights > 1 ? 's' : ''}`
                : `${CURRENCY.symbol}${basePrice.toLocaleString()} x ${guests} traveler${guests > 1 ? 's' : ''}`
              }
            </span>
            <span className="font-medium">
              {CURRENCY.symbol}{subtotal.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between text-gray-700">
            <span>Taxes & Fees ({(taxRate * 100).toFixed(0)}%)</span>
            <span className="font-medium">
              {CURRENCY.symbol}{tax.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between text-gray-700">
            <span>Service Fee</span>
            <span className="font-medium">
              {CURRENCY.symbol}{serviceFee.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">Total Amount</span>
            <span className="text-2xl font-bold text-primary">
              {CURRENCY.symbol}{total.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Offers */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <Tag className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-green-900 mb-1">
                Save ₹{(total * 0.1).toLocaleString()}
              </p>
              <p className="text-xs text-green-700">
                Use code FIRST10 for 10% off on your first booking
              </p>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-blue-900 mb-1">
                Secure Booking
              </p>
              <p className="text-xs text-blue-700">
                Your payment information is encrypted and secure
              </p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="pt-4 border-t border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">
            Booking Benefits
          </h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>Free cancellation up to 24 hours</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>Instant confirmation via email</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>24/7 customer support</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>Best price guarantee</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

export default PriceSummary