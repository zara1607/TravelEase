import React, { useState } from 'react';
import { FaTimes, FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaUsers, FaCreditCard, FaCheck } from 'react-icons/fa';
import Button from '../../ui/Button';

const BookingForm = ({ package: pkg, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travelDate: '',
    travelers: 2,
    specialRequests: ''
  });
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number is invalid';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.travelDate) newErrors.travelDate = 'Travel date is required';
    if (!formData.travelers) newErrors.travelers = 'Number of travelers is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 3) {
      onSubmit({
        ...formData,
        packageId: pkg.id,
        packageName: pkg.name,
        totalPrice: pkg.price * formData.travelers
      });
    }
  };

  const totalPrice = pkg.price * formData.travelers;

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden sticky top-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">Book Your Package</h3>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full transition-colors">
            <FaTimes />
          </button>
        </div>
        <p className="text-blue-100 mt-1">{pkg.name}</p>
      </div>

      {/* Progress Steps */}
      <div className="flex border-b">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`flex-1 py-3 text-center relative ${
              step >= s ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <div className="relative">
              <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
                step > s 
                  ? 'bg-green-500 text-white' 
                  : step === s 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
              }`}>
                {step > s ? <FaCheck className="text-sm" /> : s}
              </div>
              <div className={`absolute top-4 left-1/2 w-full h-0.5 ${
                s < 3 ? 'block' : 'hidden'
              } ${step > s ? 'bg-green-500' : 'bg-gray-200'}`} />
            </div>
            <span className="text-xs mt-1 block">
              {s === 1 ? 'Personal' : s === 2 ? 'Travel' : 'Payment'}
            </span>
          </div>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6">
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="John Doe"
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="john@example.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="+1 234 567 8900"
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Travel Date
              </label>
              <div className="relative">
                <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  name="travelDate"
                  value={formData.travelDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.travelDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.travelDate && <p className="text-red-500 text-xs mt-1">{errors.travelDate}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Travelers
              </label>
              <div className="relative">
                <FaUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  name="travelers"
                  value={formData.travelers}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.travelers ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  {[...Array(pkg.maxTravelers || 10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i === 0 ? 'Traveler' : 'Travelers'}
                    </option>
                  ))}
                </select>
              </div>
              {errors.travelers && <p className="text-red-500 text-xs mt-1">{errors.travelers}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Special Requests (Optional)
              </label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Any dietary requirements, accessibility needs, or special occasions?"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            {/* Price Summary */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <h4 className="font-semibold text-gray-700 mb-2">Price Summary</h4>
              <div className="flex justify-between">
                <span className="text-gray-600">Package Price</span>
                <span className="font-medium">${pkg.price} × {formData.travelers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Taxes & Fees</span>
                <span className="font-medium">Included</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-blue-600 text-xl">${totalPrice}</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <div className="space-y-2">
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="payment" defaultChecked className="mr-3" />
                  <FaCreditCard className="text-blue-600 mr-2" />
                  <span>Credit / Debit Card</span>
                </label>
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="payment" className="mr-3" />
                  <span>PayPal</span>
                </label>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start">
              <input type="checkbox" id="terms" className="mt-1 mr-2" required />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a> and <a href="#" className="text-blue-600 hover:underline">Cancellation Policy</a>
              </label>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-3 mt-6">
          {step > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              className="flex-1"
            >
              Back
            </Button>
          )}
          {step < 3 ? (
            <Button
              type="button"
              variant="primary"
              onClick={handleNext}
              className={step > 1 ? 'flex-1' : 'w-full'}
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              variant="primary"
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              Confirm Booking
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BookingForm;