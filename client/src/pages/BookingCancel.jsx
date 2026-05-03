import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plane, Hotel, Package, Train, Bus, Car,
  Calendar, MapPin, Users, Clock, CreditCard,
  X, AlertCircle, CheckCircle, RefreshCw,
  ChevronLeft, FileText, HelpCircle, Phone,
  Mail, MessageSquare, ThumbsUp, Award
} from 'lucide-react';
import { useAuth } from '../context/useAuth';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const BookingCancel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [step, setStep] = useState(1);
  const [cancelReason, setCancelReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [acceptPolicy, setAcceptPolicy] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [cancellationDetails, setCancellationDetails] = useState(null);

  useEffect(() => {
    fetchBookingDetails();
  }, [id]);

  const fetchBookingDetails = async () => {
    setLoading(true);
    try {
      // In production, replace with actual API call
      // const response = await axios.get(`${API_URL}/bookings/${id}`, {
      //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      // });
      // setBooking(response.data.booking);
      // calculateCancellationDetails(response.data.booking);

      // Mock data for demonstration
      setTimeout(() => {
        const mockBooking = generateMockBooking(id);
        setBooking(mockBooking);
        calculateCancellationDetails(mockBooking);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching booking:', error);
      toast.error('Failed to load booking details');
      setLoading(false);
    }
  };

  const generateMockBooking = (bookingId) => {
    // Return mock data based on ID pattern
    if (bookingId.startsWith('FL')) {
      return {
        id: bookingId,
        type: 'flight',
        status: 'confirmed',
        from: 'Mumbai (BOM)',
        to: 'Delhi (DEL)',
        airline: 'IndiGo',
        flightNumber: '6E-123',
        departureTime: '10:30 AM',
        arrivalTime: '12:45 PM',
        date: '2024-03-20',
        price: 4599,
        passengers: 2,
        bookingReference: 'ABC12345',
        cancellationPolicy: 'Free cancellation up to 24 hours before departure. Cancellation fee of ₹500 per passenger applies within 24 hours.',
        refundable: true,
        cancellationDeadline: '2024-03-19T10:30:00',
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1174&q=80'
      };
    } else if (bookingId.startsWith('HT')) {
      return {
        id: bookingId,
        type: 'hotel',
        status: 'confirmed',
        hotelName: 'Taj Mahal Palace',
        location: 'Mumbai',
        checkIn: '2024-04-10',
        checkOut: '2024-04-14',
        nights: 4,
        guests: 2,
        price: 18999,
        bookingReference: 'HTR56789',
        cancellationPolicy: 'Free cancellation until 7 days before check-in. 50% cancellation fee within 7 days.',
        refundable: true,
        cancellationDeadline: '2024-04-03',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'
      };
    } else if (bookingId.startsWith('PK')) {
      return {
        id: bookingId,
        type: 'package',
        status: 'confirmed',
        packageName: 'Magical Goa Honeymoon Special',
        destination: 'Goa',
        duration: '5 Days / 4 Nights',
        travelDate: '2024-05-15',
        travelers: 2,
        price: 45999,
        bookingReference: 'PKR45678',
        cancellationPolicy: 'Free cancellation up to 30 days before departure. 25% cancellation fee within 30 days.',
        refundable: true,
        cancellationDeadline: '2024-04-15',
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1174&q=80'
      };
    } else if (bookingId.startsWith('TR')) {
      return {
        id: bookingId,
        type: 'train',
        status: 'confirmed',
        trainName: 'Rajdhani Express',
        trainNumber: '12951',
        from: 'Mumbai CST',
        to: 'Delhi H Nizamuddin',
        date: '2024-03-25',
        class: 'AC 3 Tier',
        passengers: 2,
        price: 1899,
        bookingReference: 'TRN78901',
        cancellationPolicy: 'Free cancellation up to 48 hours before departure. Cancellation fee as per IRCTC rules.',
        refundable: true,
        cancellationDeadline: '2024-03-23',
        image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1184&q=80'
      };
    } else if (bookingId.startsWith('BS')) {
      return {
        id: bookingId,
        type: 'bus',
        status: 'confirmed',
        operator: 'VRL Travels',
        busType: 'Volvo A/C Sleeper',
        from: 'Bangalore',
        to: 'Mysore',
        date: '2024-03-10',
        departureTime: '22:30',
        passengers: 2,
        price: 899,
        bookingReference: 'BUS45678',
        cancellationPolicy: 'Free cancellation up to 4 hours before departure. 50% cancellation fee within 4 hours.',
        refundable: true,
        cancellationDeadline: '2024-03-10T18:30:00',
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80'
      };
    } else if (bookingId.startsWith('CB')) {
      return {
        id: bookingId,
        type: 'cab',
        status: 'confirmed',
        cabType: 'Toyota Innova',
        pickupLocation: 'Mumbai Airport (T2)',
        dropLocation: 'Lonavala',
        date: '2024-03-05',
        pickupTime: '10:00 AM',
        passengers: 3,
        price: 2499,
        bookingReference: 'CAB12345',
        cancellationPolicy: 'Free cancellation up to 2 hours before pickup. Full charge within 2 hours.',
        refundable: true,
        cancellationDeadline: '2024-03-05T08:00:00',
        image: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'
      };
    }
    return null;
  };

  const calculateCancellationDetails = (bookingData) => {
    if (!bookingData) return;

    const now = new Date();
    const deadline = new Date(bookingData.cancellationDeadline);
    const isWithinFreeCancellation = now < deadline;

    let refundAmount = 0;
    let cancellationFee = 0;
    let feePercentage = 0;

    if (!bookingData.refundable) {
      refundAmount = 0;
      cancellationFee = bookingData.price;
      feePercentage = 100;
    } else if (isWithinFreeCancellation) {
      refundAmount = bookingData.price;
      cancellationFee = 0;
      feePercentage = 0;
    } else {
      // Calculate based on policy
      if (bookingData.type === 'flight') {
        cancellationFee = 500 * (bookingData.passengers || 1);
        refundAmount = Math.max(0, bookingData.price - cancellationFee);
        feePercentage = (cancellationFee / bookingData.price) * 100;
      } else if (bookingData.type === 'hotel') {
        cancellationFee = bookingData.price * 0.5;
        refundAmount = bookingData.price - cancellationFee;
        feePercentage = 50;
      } else if (bookingData.type === 'package') {
        cancellationFee = bookingData.price * 0.25;
        refundAmount = bookingData.price - cancellationFee;
        feePercentage = 25;
      } else if (bookingData.type === 'train') {
        cancellationFee = bookingData.price * 0.2;
        refundAmount = bookingData.price - cancellationFee;
        feePercentage = 20;
      } else if (bookingData.type === 'bus') {
        cancellationFee = bookingData.price * 0.5;
        refundAmount = bookingData.price - cancellationFee;
        feePercentage = 50;
      } else if (bookingData.type === 'cab') {
        cancellationFee = bookingData.price;
        refundAmount = 0;
        feePercentage = 100;
      }
    }

    setCancellationDetails({
      isWithinFreeCancellation,
      refundAmount: Math.round(refundAmount),
      cancellationFee: Math.round(cancellationFee),
      feePercentage: Math.round(feePercentage),
      deadline: bookingData.cancellationDeadline
    });
  };

  const handleCancelBooking = async () => {
    if (!cancelReason) {
      toast.error('Please select a reason for cancellation');
      return;
    }

    if (cancelReason === 'other' && !otherReason.trim()) {
      toast.error('Please specify the reason');
      return;
    }

    if (!acceptPolicy) {
      toast.error('Please accept the cancellation policy');
      return;
    }

    setCancelling(true);
    try {
      // In production, replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Booking cancelled successfully');
      setStep(3); // Move to confirmation step
    } catch (error) {
      toast.error('Failed to cancel booking');
    } finally {
      setCancelling(false);
    }
  };

  const getServiceIcon = (type) => {
    const icons = {
      flight: Plane,
      hotel: Hotel,
      package: Package,
      train: Train,
      bus: Bus,
      cab: Car
    };
    return icons[type] || Package;
  };

  const getServiceColor = (type) => {
    const colors = {
      flight: 'blue',
      hotel: 'green',
      package: 'purple',
      train: 'orange',
      bus: 'red',
      cab: 'indigo'
    };
    return colors[type] || 'gray';
  };

  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const cancelReasons = [
    { value: 'change-of-plans', label: 'Change of plans' },
    { value: 'found-better-deal', label: 'Found a better deal' },
    { value: 'emergency', label: 'Emergency / Medical reasons' },
    { value: 'incorrect-booking', label: 'Incorrect booking details' },
    { value: 'weather', label: 'Weather / Travel advisory' },
    { value: 'financial', label: 'Financial constraints' },
    { value: 'other', label: 'Other reason' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Not Found</h2>
          <p className="text-gray-600 mb-6">The booking you're looking for doesn't exist.</p>
          <Button variant="primary" onClick={() => navigate('/bookings')}>
            Back to My Bookings
          </Button>
        </div>
      </div>
    );
  }

  const ServiceIcon = getServiceIcon(booking.type);
  const serviceColor = getServiceColor(booking.type);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  step >= s
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  step >= s ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {s === 1 ? 'Review' : s === 2 ? 'Confirm' : 'Done'}
                </span>
                {s < 3 && (
                  <ChevronLeft className="w-4 h-4 text-gray-400 mx-4 rotate-180" />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card>
          <div className="p-6">
            {/* Step 1: Review Cancellation */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 bg-red-100 rounded-xl`}>
                    <X className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Cancel Booking</h1>
                    <p className="text-gray-600">Please review the cancellation details</p>
                  </div>
                </div>

                {/* Booking Summary */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 bg-${serviceColor}-100 rounded-xl`}>
                      <ServiceIcon className={`w-6 h-6 text-${serviceColor}-600`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {booking.type === 'flight' && `${booking.from} → ${booking.to}`}
                        {booking.type === 'hotel' && booking.hotelName}
                        {booking.type === 'package' && booking.packageName}
                        {booking.type === 'train' && `${booking.trainName} (${booking.trainNumber})`}
                        {booking.type === 'bus' && `${booking.operator} - ${booking.busType}`}
                        {booking.type === 'cab' && `${booking.cabType}`}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Booking ID: {booking.bookingReference}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {booking.date || booking.travelDate || booking.checkIn}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-gray-400" />
                          {booking.passengers || booking.guests || booking.travelers || booking.passengers} Guest(s)
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatCurrency(booking.price)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Cancellation Details */}
                {cancellationDetails && (
                  <div className="space-y-4 mb-6">
                    <div className={`p-4 rounded-xl ${
                      cancellationDetails.isWithinFreeCancellation
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-yellow-50 border border-yellow-200'
                    }`}>
                      <div className="flex items-start gap-3">
                        {cancellationDetails.isWithinFreeCancellation ? (
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                        )}
                        <div>
                          <p className={`font-medium ${
                            cancellationDetails.isWithinFreeCancellation
                              ? 'text-green-800'
                              : 'text-yellow-800'
                          }`}>
                            {cancellationDetails.isWithinFreeCancellation
                              ? 'Free Cancellation Available'
                              : 'Cancellation Charges Apply'}
                          </p>
                          <p className={`text-sm ${
                            cancellationDetails.isWithinFreeCancellation
                              ? 'text-green-600'
                              : 'text-yellow-600'
                          }`}>
                            {cancellationDetails.isWithinFreeCancellation
                              ? `Cancel before ${formatDate(cancellationDetails.deadline)} for full refund`
                              : `Cancellation fee: ${cancellationDetails.feePercentage}% of booking amount`}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Refund Summary</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Booking Amount</span>
                          <span className="font-medium">{formatCurrency(booking.price)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-red-600">
                          <span>Cancellation Fee</span>
                          <span>- {formatCurrency(cancellationDetails.cancellationFee)}</span>
                        </div>
                        <div className="flex justify-between font-bold pt-2 border-t border-gray-200">
                          <span>Refund Amount</span>
                          <span className="text-green-600">
                            {formatCurrency(cancellationDetails.refundAmount)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Reason for Cancellation *
                      </label>
                      <select
                        value={cancelReason}
                        onChange={(e) => setCancelReason(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 mb-3"
                      >
                        <option value="">Select a reason</option>
                        {cancelReasons.map(reason => (
                          <option key={reason.value} value={reason.value}>
                            {reason.label}
                          </option>
                        ))}
                      </select>

                      {cancelReason === 'other' && (
                        <textarea
                          value={otherReason}
                          onChange={(e) => setOtherReason(e.target.value)}
                          placeholder="Please specify your reason"
                          rows="3"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />
                      )}
                    </div>

                    <div className="bg-blue-50 rounded-xl p-4">
                      <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                        <HelpCircle className="w-4 h-4" />
                        Cancellation Policy
                      </h4>
                      <p className="text-sm text-blue-700">
                        {booking.cancellationPolicy}
                      </p>
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={acceptPolicy}
                        onChange={(e) => setAcceptPolicy(e.target.checked)}
                        className="mt-1 w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500"
                      />
                      <span className="text-sm text-gray-600">
                        I understand and accept the cancellation policy. I confirm that I want to cancel this booking.
                      </span>
                    </label>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => navigate(-1)}
                  >
                    Keep Booking
                  </Button>
                  <Button
                    variant="danger"
                    fullWidth
                    onClick={() => setStep(2)}
                    disabled={!cancelReason || (cancelReason === 'other' && !otherReason) || !acceptPolicy}
                  >
                    Proceed to Cancel
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Confirm Cancellation */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-10 h-10 text-red-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Are you absolutely sure?
                  </h2>
                  <p className="text-gray-600">
                    This action cannot be undone. Please confirm that you want to cancel this booking.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Cancellation Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Booking ID</span>
                      <span className="font-medium">{booking.bookingReference}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reason</span>
                      <span className="font-medium">
                        {cancelReason === 'other' ? otherReason : cancelReasons.find(r => r.value === cancelReason)?.label}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Refund Amount</span>
                      <span className="font-bold text-green-600">
                        {formatCurrency(cancellationDetails?.refundAmount || 0)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => setStep(1)}
                  >
                    Go Back
                  </Button>
                  <Button
                    variant="danger"
                    fullWidth
                    onClick={handleCancelBooking}
                    disabled={cancelling}
                  >
                    {cancelling ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Cancelling...
                      </>
                    ) : (
                      'Yes, Cancel Booking'
                    )}
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Cancellation Confirmed */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Booking Cancelled Successfully!
                  </h2>
                  <p className="text-gray-600">
                    Your booking has been cancelled. A refund of {formatCurrency(cancellationDetails?.refundAmount || 0)} will be processed to your original payment method within 5-7 business days.
                  </p>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 mb-6">
                  <h3 className="font-semibold text-blue-800 mb-3">What happens next?</h3>
                  <ul className="space-y-2 text-sm text-blue-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>Refund initiated - you'll receive confirmation via email</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>Amount will be credited within 5-7 business days</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>Cancellation confirmation sent to your registered email</span>
                    </li>
                  </ul>
                </div>

                {/* Feedback Section */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Help us improve</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Would you like to share why you cancelled? Your feedback helps us serve you better.
                  </p>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Share your feedback (optional)"
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-3"
                  />
                  <div className="flex gap-2">
                    {['Excellent', 'Good', 'Average', 'Poor'].map((rating) => (
                      <button
                        key={rating}
                        className="flex-1 py-2 px-3 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Alternative Options */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Looking for alternatives?</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="p-3 bg-white rounded-lg text-center hover:shadow-md transition-shadow">
                      <RefreshCw className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                      <span className="text-sm font-medium">Rebook Similar</span>
                    </button>
                    <button className="p-3 bg-white rounded-lg text-center hover:shadow-md transition-shadow">
                      <ThumbsUp className="w-5 h-5 text-green-600 mx-auto mb-2" />
                      <span className="text-sm font-medium">Browse Offers</span>
                    </button>
                    <button className="p-3 bg-white rounded-lg text-center hover:shadow-md transition-shadow">
                      <Phone className="w-5 h-5 text-purple-600 mx-auto mb-2" />
                      <span className="text-sm font-medium">Contact Support</span>
                    </button>
                    <button className="p-3 bg-white rounded-lg text-center hover:shadow-md transition-shadow">
                      <Mail className="w-5 h-5 text-orange-600 mx-auto mb-2" />
                      <span className="text-sm font-medium">Email Confirmation</span>
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Button variant="primary" onClick={() => navigate('/bookings')}>
                    Go to My Bookings
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/')}>
                    Browse More Travel Options
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </Card>

        {/* Need Help? Section */}
        {step !== 3 && (
          <Card className="mt-4">
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Need help with cancellation?</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-blue-600" />
                    24/7 Support: 1800-123-4567
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-green-600" />
                    support@travelease.com
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Live Chat
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BookingCancel;