import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Phone, Calendar, CreditCard } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card'
import Button from '../../ui/Button'
import { useMutation } from '@tanstack/react-query'
import { createBooking } from './bookings.api'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const BookingForm = ({ itemId, itemType, totalPrice }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    specialRequests: '',
    // Payment fields
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  })

  const bookingMutation = useMutation({
    mutationFn: createBooking,
    onSuccess: (data) => {
      toast.success('Booking confirmed successfully!')
      navigate(`/dashboard/bookings`)
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Booking failed. Please try again.')
    }
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validation
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast.error('Please fill in all required fields')
      return
    }

    // Create booking payload
    const bookingData = {
      itemId,
      itemType,
      passengerDetails: {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone
      },
      specialRequests: formData.specialRequests,
      totalPrice,
      paymentMethod: 'card'
    }

    bookingMutation.mutate(bookingData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Passenger Details */}
      <Card>
        <CardHeader>
          <CardTitle>Passenger Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+91 1234567890"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Requests (Optional)
            </label>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleInputChange}
              placeholder="Any special requirements or preferences..."
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
            />
          </div>
        </CardContent>
      </Card>

      {/* Payment Details */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Number *
            </label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="cardNumber"
                required
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cardholder Name *
            </label>
            <input
              type="text"
              name="cardName"
              required
              value={formData.cardName}
              onChange={handleInputChange}
              placeholder="John Doe"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="expiryDate"
                  required
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  maxLength="5"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CVV *
              </label>
              <input
                type="text"
                name="cvv"
                required
                value={formData.cvv}
                onChange={handleInputChange}
                placeholder="123"
                maxLength="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">🔒 Secure Payment:</span> Your payment information is encrypted and secure.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Terms & Submit */}
      <Card>
        <CardContent>
          <label className="flex items-start gap-2 mb-4">
            <input
              type="checkbox"
              required
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary mt-1"
            />
            <span className="text-sm text-gray-700">
              I agree to the terms and conditions and cancellation policy *
            </span>
          </label>

          <Button
            type="submit"
            size="lg"
            fullWidth
            loading={bookingMutation.isPending}
          >
            {bookingMutation.isPending ? 'Processing Payment...' : 'Confirm Booking'}
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}

export default BookingForm