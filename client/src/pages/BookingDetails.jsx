import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plane, Hotel, Package, Train, Bus, Car,
  Calendar, MapPin, Users, Clock, CreditCard,
  Download, X, ChevronLeft, CheckCircle, AlertCircle,
  FileText, Phone, Mail, Printer, Share2
} from 'lucide-react';
import { useAuth } from '../context/useAuth';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

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

      // Mock data for demonstration
      setTimeout(() => {
        const mockBooking = generateMockBooking(id);
        setBooking(mockBooking);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching booking details:', error);
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
        duration: '2h 15m',
        class: 'economy',
        price: 4599,
        passengers: 2,
        bookingReference: 'ABC12345',
        pnr: 'PNR6E123',
        // ... more details
      };
    }
    // Add other types...
  };

  const handleDownload = async (type) => {
    setDownloading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success(`${type} downloaded successfully`);
    } catch (error) {
      toast.error('Download failed');
    } finally {
      setDownloading(false);
    }
  };

  const handleCancel = () => {
    navigate(`/bookings/cancel/${id}`);
  };

  const handleRebook = () => {
    navigate(`/${booking.type}s`, { state: { rebookingData: booking } });
  };

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

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/bookings')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to My Bookings
        </button>

        {/* Booking Details Content */}
        <Card>
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Booking Details</h1>
            {/* Render service-specific details */}
            {/* Similar to modal content in BookingHistory */}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BookingDetails;