import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Download, Mail, Phone, Calendar, MapPin, Users } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;

  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex p-3 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">Your booking has been successfully confirmed.</p>
          <p className="text-sm text-gray-500 mt-2">Booking ID: {bookingData?.bookingId}</p>
        </motion.div>

        <Card className="mb-6">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Booking Details</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Travel Date</p>
                  <p className="font-medium">{bookingData?.selectedDate || 'To be confirmed'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Travelers</p>
                  <p className="font-medium">{bookingData?.travelers} persons</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Destination</p>
                  <p className="font-medium">
                    {bookingData?.item?.destination?.city}, {bookingData?.item?.destination?.country}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 mt-4 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Amount</span>
                <span className="text-2xl font-bold text-blue-600">
                  {formatPrice(bookingData?.item?.pricing?.discountedPrice * bookingData?.travelers)}
                </span>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={() => window.print()}
          >
            <Download className="w-4 h-4 mr-2" />
            Download Receipt
          </Button>
          <Button
            variant="primary"
            onClick={() => navigate('/bookings')}
          >
            View My Bookings
          </Button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-2">A confirmation email has been sent to your email address.</p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <Mail className="w-4 h-4" /> support@travelease.com
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-4 h-4" /> 1800-123-4567
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;