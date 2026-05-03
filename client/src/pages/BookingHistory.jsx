import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plane, Hotel, Package, Train, Bus, Car,
  Calendar, MapPin, Users, Clock, CreditCard,
  Download, X, ChevronRight, AlertCircle, CheckCircle,
  Clock as ClockIcon, RefreshCw, Eye, FileText,
  Search, Filter, Download as DownloadIcon, Printer,
  Mail, Phone, MessageSquare, Star, Award,
  Briefcase, Luggage, Wifi, Coffee, Battery,
  ChevronDown, SlidersHorizontal, ArrowUpDown
} from 'lucide-react';
import { useAuth } from '../context/useAuth';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const BookingHistory = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelBookingId, setCancelBookingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({});
  const [downloading, setDownloading] = useState({});
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Mock Bookings Data
  const [bookings, setBookings] = useState([]);

  // Stats
  const [stats, setStats] = useState({
    totalBookings: 0,
    upcoming: 0,
    completed: 0,
    cancelled: 0,
    totalSpent: 0
  });

  // Fetch bookings on mount and when filters change
  useEffect(() => {
    fetchBookings();
  }, [activeTab, filterStatus, filterPeriod, sortBy]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      // In production, replace with actual API call
      // const response = await axios.get(`${API_URL}/bookings`, {
      //   params: {
      //     type: activeTab !== 'all' ? activeTab : undefined,
      //     status: filterStatus !== 'all' ? filterStatus : undefined,
      //     period: filterPeriod,
      //     sort: sortBy
      //   },
      //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      // });
      // setBookings(response.data.bookings);
      // setStats(response.data.stats);

      // Mock data for demonstration
      setTimeout(() => {
        const mockBookings = generateMockBookings();
        setBookings(mockBookings);
        calculateStats(mockBookings);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load bookings');
      setLoading(false);
    }
  };

  const calculateStats = (bookingsData) => {
    const stats = {
      totalBookings: bookingsData.length,
      upcoming: bookingsData.filter(b => b.status === 'confirmed' && new Date(b.travelDate) > new Date()).length,
      completed: bookingsData.filter(b => b.status === 'completed').length,
      cancelled: bookingsData.filter(b => b.status === 'cancelled').length,
      totalSpent: bookingsData.reduce((sum, b) => sum + (b.price || 0), 0)
    };
    setStats(stats);
  };

  const generateMockBookings = () => {
    return [
      // Flights
      {
        id: 'FL001',
        type: 'flight',
        service: 'flight',
        status: 'confirmed',
        bookingDate: '2024-02-15',
        travelDate: '2024-03-20',
        price: 4599,
        currency: 'INR',
        passengers: 2,
        from: 'Mumbai (BOM)',
        to: 'Delhi (DEL)',
        airline: 'IndiGo',
        flightNumber: '6E-123',
        departureTime: '10:30 AM',
        arrivalTime: '12:45 PM',
        duration: '2h 15m',
        class: 'economy',
        bookingReference: 'ABC12345',
        pnr: 'PNR6E123',
        cancellationPolicy: 'Free cancellation up to 24 hours before departure',
        refundable: true,
        canCancel: true,
        canRebook: true,
        canDownload: true,
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1174&q=80',
        passengersList: [
          { name: 'John Doe', age: 32, seat: '12A' },
          { name: 'Jane Doe', age: 30, seat: '12B' }
        ],
        baggage: { cabin: '7kg', checkin: '15kg' }
      },
      {
        id: 'FL002',
        type: 'flight',
        service: 'flight',
        status: 'completed',
        bookingDate: '2024-01-10',
        travelDate: '2024-02-05',
        price: 3899,
        currency: 'INR',
        passengers: 1,
        from: 'Delhi (DEL)',
        to: 'Goa (GOI)',
        airline: 'SpiceJet',
        flightNumber: 'SG-456',
        departureTime: '06:15 AM',
        arrivalTime: '08:30 AM',
        duration: '2h 15m',
        class: 'economy',
        bookingReference: 'XYZ78901',
        pnr: 'PNRSG456',
        cancellationPolicy: 'Non-refundable',
        refundable: false,
        canCancel: false,
        canRebook: true,
        canDownload: true,
        image: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
        passengersList: [
          { name: 'John Smith', age: 28, seat: '14C' }
        ],
        baggage: { cabin: '7kg', checkin: '15kg' }
      },

      // Hotels
      {
        id: 'HT001',
        type: 'hotel',
        service: 'hotel',
        status: 'confirmed',
        bookingDate: '2024-02-18',
        travelDate: '2024-04-10',
        price: 18999,
        currency: 'INR',
        guests: 2,
        nights: 4,
        hotelName: 'Taj Mahal Palace',
        location: 'Mumbai',
        roomType: 'Deluxe Room',
        checkIn: '2024-04-10',
        checkOut: '2024-04-14',
        bookingReference: 'HTR56789',
        cancellationPolicy: 'Free cancellation until 7 days before check-in',
        refundable: true,
        canCancel: true,
        canRebook: true,
        canDownload: true,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
        amenities: ['Pool', 'Spa', 'Restaurant', 'Free WiFi'],
        address: 'Apollo Bunder, Colaba, Mumbai'
      },
      {
        id: 'HT002',
        type: 'hotel',
        service: 'hotel',
        status: 'completed',
        bookingDate: '2024-01-05',
        travelDate: '2024-02-20',
        price: 8999,
        currency: 'INR',
        guests: 2,
        nights: 2,
        hotelName: 'The Leela Palace',
        location: 'Goa',
        roomType: 'Premium Room',
        checkIn: '2024-02-20',
        checkOut: '2024-02-22',
        bookingReference: 'HTR98765',
        cancellationPolicy: 'Non-refundable',
        refundable: false,
        canCancel: false,
        canRebook: true,
        canDownload: true,
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1025&q=80',
        amenities: ['Beach Access', 'Pool', 'Restaurant'],
        address: 'Candolim Beach, Goa'
      },

      // Packages
      {
        id: 'PK001',
        type: 'package',
        service: 'package',
        status: 'confirmed',
        bookingDate: '2024-02-20',
        travelDate: '2024-05-15',
        price: 45999,
        currency: 'INR',
        travelers: 2,
        packageName: 'Magical Goa Honeymoon Special',
        destination: 'Goa',
        duration: '5 Days / 4 Nights',
        hotel: 'The Leela Palace',
        flights: 'IndiGo (Mumbai-Goa-Mumbai)',
        inclusions: ['Flights', 'Hotels', 'Meals', 'Sightseeing', 'Transfers'],
        bookingReference: 'PKR45678',
        cancellationPolicy: 'Free cancellation up to 30 days before departure',
        refundable: true,
        canCancel: true,
        canRebook: true,
        canDownload: true,
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1174&q=80',
        itinerary: [
          { day: 1, activity: 'Arrival in Goa, Check-in, Beach Evening' },
          { day: 2, activity: 'North Goa Tour & Water Sports' },
          { day: 3, activity: 'South Goa Exploration' },
          { day: 4, activity: 'Sunset Cruise & Romantic Dinner' },
          { day: 5, activity: 'Departure' }
        ]
      },
      {
        id: 'PK002',
        type: 'package',
        service: 'package',
        status: 'completed',
        bookingDate: '2023-12-10',
        travelDate: '2024-01-15',
        price: 35999,
        currency: 'INR',
        travelers: 4,
        packageName: 'Kerala Backwaters Family Tour',
        destination: 'Kerala',
        duration: '6 Days / 5 Nights',
        hotel: 'Houseboat & Resort',
        flights: 'Included from major cities',
        inclusions: ['Flights', 'Hotels', 'Houseboat', 'Meals', 'Activities'],
        bookingReference: 'PKR12345',
        cancellationPolicy: 'Non-refundable',
        refundable: false,
        canCancel: false,
        canRebook: false,
        canDownload: true,
        image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80',
        itinerary: [
          { day: 1, activity: 'Arrival in Kochi' },
          { day: 2, activity: 'Munnar Tea Gardens' },
          { day: 3, activity: 'Thekkady Wildlife' },
          { day: 4, activity: 'Alleppey Houseboat' },
          { day: 5, activity: 'Marari Beach' },
          { day: 6, activity: 'Departure' }
        ]
      },

      // Trains
      {
        id: 'TR001',
        type: 'train',
        service: 'train',
        status: 'confirmed',
        bookingDate: '2024-02-12',
        travelDate: '2024-03-25',
        price: 1899,
        currency: 'INR',
        passengers: 2,
        from: 'Mumbai CST',
        to: 'Delhi H Nizamuddin',
        trainName: 'Rajdhani Express',
        trainNumber: '12951',
        class: 'AC 3 Tier',
        departureTime: '16:35',
        arrivalTime: '08:30',
        duration: '15h 55m',
        coach: 'B3',
        seats: ['23', '24'],
        bookingReference: 'TRN78901',
        pnr: 'PNR456789',
        cancellationPolicy: 'Free cancellation up to 48 hours before departure',
        refundable: true,
        canCancel: true,
        canRebook: true,
        canDownload: true,
        image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1184&q=80',
        passengersList: [
          { name: 'Raj Kumar', age: 45, berth: 'Lower' },
          { name: 'Priya Kumar', age: 42, berth: 'Upper' }
        ]
      },
      {
        id: 'TR002',
        type: 'train',
        service: 'train',
        status: 'cancelled',
        bookingDate: '2024-01-18',
        travelDate: '2024-02-28',
        price: 1499,
        currency: 'INR',
        passengers: 1,
        from: 'Bangalore',
        to: 'Chennai',
        trainName: 'Shatabdi Express',
        trainNumber: '12007',
        class: 'Chair Car',
        departureTime: '06:00',
        arrivalTime: '11:30',
        duration: '5h 30m',
        coach: 'C5',
        seats: ['18'],
        bookingReference: 'TRN23456',
        pnr: 'PNR789123',
        cancellationPolicy: 'Refund processed',
        refundable: true,
        canCancel: false,
        canRebook: true,
        canDownload: true,
        image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1184&q=80',
        passengersList: [
          { name: 'Rahul Sharma', age: 35, berth: 'Window' }
        ]
      },

      // Buses
      {
        id: 'BS001',
        type: 'bus',
        service: 'bus',
        status: 'confirmed',
        bookingDate: '2024-02-14',
        travelDate: '2024-03-10',
        price: 899,
        currency: 'INR',
        passengers: 2,
        from: 'Bangalore',
        to: 'Mysore',
        operator: 'VRL Travels',
        busType: 'Volvo A/C Sleeper',
        departureTime: '22:30',
        arrivalTime: '04:30',
        duration: '6h',
        seats: ['12', '13'],
        boardingPoint: 'Majestic Bus Stand',
        dropPoint: 'Mysore Bus Stand',
        bookingReference: 'BUS45678',
        cancellationPolicy: 'Free cancellation up to 4 hours before departure',
        refundable: true,
        canCancel: true,
        canRebook: true,
        canDownload: true,
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80',
        passengersList: [
          { name: 'Amit Patel', age: 28 },
          { name: 'Neha Patel', age: 26 }
        ]
      },
      {
        id: 'BS002',
        type: 'bus',
        service: 'bus',
        status: 'completed',
        bookingDate: '2024-01-22',
        travelDate: '2024-02-15',
        price: 1299,
        currency: 'INR',
        passengers: 1,
        from: 'Pune',
        to: 'Goa',
        operator: 'Konduskar Travels',
        busType: 'Non A/C Seater',
        departureTime: '20:00',
        arrivalTime: '06:00',
        duration: '10h',
        seats: ['22'],
        boardingPoint: 'Shivajinagar',
        dropPoint: 'Panaji',
        bookingReference: 'BUS78901',
        cancellationPolicy: 'Non-refundable',
        refundable: false,
        canCancel: false,
        canRebook: false,
        canDownload: true,
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80',
        passengersList: [
          { name: 'Suresh Kumar', age: 32 }
        ]
      },

      // Cabs
      {
        id: 'CB001',
        type: 'cab',
        service: 'cab',
        status: 'confirmed',
        bookingDate: '2024-02-16',
        travelDate: '2024-03-05',
        price: 2499,
        currency: 'INR',
        passengers: 3,
        pickupLocation: 'Mumbai Airport (T2)',
        dropLocation: 'Lonavala',
        cabType: 'Toyota Innova',
        driverName: 'Rajesh',
        driverPhone: '+91 98765 43210',
        pickupTime: '10:00 AM',
        tripDuration: '3 hours',
        distance: '85 km',
        bookingReference: 'CAB12345',
        cancellationPolicy: 'Free cancellation up to 2 hours before pickup',
        refundable: true,
        canCancel: true,
        canRebook: true,
        canDownload: true,
        image: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
        vehicleDetails: {
          model: 'Toyota Innova Crysta',
          color: 'Silver',
          registration: 'MH-01-AB-1234'
        }
      },
      {
        id: 'CB002',
        type: 'cab',
        service: 'cab',
        status: 'completed',
        bookingDate: '2024-01-25',
        travelDate: '2024-02-10',
        price: 899,
        currency: 'INR',
        passengers: 2,
        pickupLocation: 'Delhi Airport',
        dropLocation: 'Connaught Place',
        cabType: 'Hatchback',
        driverName: 'Vikram',
        driverPhone: '+91 98765 12345',
        pickupTime: '14:30',
        tripDuration: '45 mins',
        distance: '18 km',
        bookingReference: 'CAB67890',
        cancellationPolicy: 'Non-refundable',
        refundable: false,
        canCancel: false,
        canRebook: true,
        canDownload: true,
        image: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
        vehicleDetails: {
          model: 'Maruti Swift Dzire',
          color: 'White',
          registration: 'DL-01-XY-5678'
        }
      }
    ];
  };

  const tabs = [
    { id: 'all', label: 'All', icon: Briefcase, count: bookings.length },
    { id: 'flight', label: 'Flights', icon: Plane, count: bookings.filter(b => b.type === 'flight').length },
    { id: 'hotel', label: 'Hotels', icon: Hotel, count: bookings.filter(b => b.type === 'hotel').length },
    { id: 'package', label: 'Packages', icon: Package, count: bookings.filter(b => b.type === 'package').length },
    { id: 'train', label: 'Trains', icon: Train, count: bookings.filter(b => b.type === 'train').length },
    { id: 'bus', label: 'Buses', icon: Bus, count: bookings.filter(b => b.type === 'bus').length },
    { id: 'cab', label: 'Cabs', icon: Car, count: bookings.filter(b => b.type === 'cab').length }
  ];

  const getStatusBadge = (status) => {
    const variants = {
      confirmed: { variant: 'success', label: 'Confirmed', icon: CheckCircle },
      pending: { variant: 'warning', label: 'Pending', icon: Clock },
      completed: { variant: 'secondary', label: 'Completed', icon: Award },
      cancelled: { variant: 'danger', label: 'Cancelled', icon: X },
      refunded: { variant: 'info', label: 'Refunded', icon: RefreshCw }
    };
    return variants[status] || variants.pending;
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
    return icons[type] || Briefcase;
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

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  const handleCloseDetails = () => {
    setShowDetailsModal(false);
    setSelectedBooking(null);
  };

  const handleDownload = async (bookingId, type) => {
    setDownloading(prev => ({ ...prev, [bookingId]: true }));
    try {
      // In production, replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate PDF/invoice
      const element = document.createElement('a');
      const file = new Blob([`Booking Invoice - ${bookingId}`], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `booking-${bookingId}-invoice.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      
      toast.success(`${type === 'ticket' ? 'Ticket' : 'Invoice'} downloaded successfully`);
    } catch (error) {
      toast.error('Download failed');
    } finally {
      setDownloading(prev => ({ ...prev, [bookingId]: false }));
    }
  };

  const handleCancelBooking = async () => {
    if (!cancelReason) {
      toast.error('Please select a cancellation reason');
      return;
    }

    setActionLoading(prev => ({ ...prev, [cancelBookingId]: true }));
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setBookings(prev => prev.map(b => 
        b.id === cancelBookingId 
          ? { ...b, status: 'cancelled', canCancel: false }
          : b
      ));
      
      toast.success('Booking cancelled successfully');
      setShowCancelModal(false);
      setCancelReason('');
      setCancelBookingId(null);
    } catch (error) {
      toast.error('Failed to cancel booking');
    } finally {
      setActionLoading(prev => ({ ...prev, [cancelBookingId]: false }));
    }
  };

  const handleRebook = (booking) => {
    navigate(`/${booking.type}s`, { 
      state: { 
        rebookingData: booking,
        prefill: true 
      } 
    });
  };

  const filteredBookings = bookings.filter(booking => {
    if (activeTab !== 'all' && booking.type !== activeTab) return false;
    if (filterStatus !== 'all' && booking.status !== filterStatus) return false;
    
    if (filterPeriod === 'upcoming') {
      return new Date(booking.travelDate) > new Date();
    } else if (filterPeriod === 'past') {
      return new Date(booking.travelDate) < new Date();
    }
    
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      return (
        booking.id.toLowerCase().includes(searchLower) ||
        booking.bookingReference?.toLowerCase().includes(searchLower) ||
        booking.from?.toLowerCase().includes(searchLower) ||
        booking.to?.toLowerCase().includes(searchLower) ||
        booking.hotelName?.toLowerCase().includes(searchLower) ||
        booking.packageName?.toLowerCase().includes(searchLower) ||
        booking.location?.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  const sortedBookings = [...filteredBookings].sort((a, b) => {
    if (sortBy === 'date-desc') {
      return new Date(b.travelDate) - new Date(a.travelDate);
    } else if (sortBy === 'date-asc') {
      return new Date(a.travelDate) - new Date(b.travelDate);
    } else if (sortBy === 'price-desc') {
      return b.price - a.price;
    } else if (sortBy === 'price-asc') {
      return a.price - b.price;
    }
    return 0;
  });

  // Render booking card based on type
  const renderBookingCard = (booking) => {
    const ServiceIcon = getServiceIcon(booking.type);
    const serviceColor = getServiceColor(booking.type);
    const statusBadge = getStatusBadge(booking.status);
    const StatusIcon = statusBadge.icon;

    return (
      <motion.div
        key={booking.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="group"
      >
        <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 bg-${serviceColor}-50 rounded-xl`}>
                  <ServiceIcon className={`w-6 h-6 text-${serviceColor}-600`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">
                      {booking.type === 'flight' && `${booking.from} → ${booking.to}`}
                      {booking.type === 'hotel' && booking.hotelName}
                      {booking.type === 'package' && booking.packageName}
                      {booking.type === 'train' && `${booking.trainName} (${booking.trainNumber})`}
                      {booking.type === 'bus' && `${booking.operator}`}
                      {booking.type === 'cab' && `${booking.cabType}`}
                    </h3>
                    <Badge 
                      variant={statusBadge.variant} 
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <StatusIcon className="w-3 h-3" />
                      {statusBadge.label}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Booking ID: {booking.bookingReference || booking.id}
                  </p>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                ₹{booking.price.toLocaleString('en-IN')}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {/* Date & Time */}
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-gray-500">Date</p>
                  <p className="font-medium text-gray-900">
                    {new Date(booking.travelDate).toLocaleDateString('en-US', { 
                      day: 'numeric', 
                      month: 'short' 
                    })}
                  </p>
                </div>
              </div>

              {/* Passengers/Guests */}
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-gray-500">
                    {booking.type === 'hotel' ? 'Guests' : 
                     booking.type === 'cab' ? 'Passengers' : 'Travelers'}
                  </p>
                  <p className="font-medium text-gray-900">
                    {booking.passengers || booking.guests || booking.travelers || 1}
                  </p>
                </div>
              </div>

              {/* Service Specific Info */}
              {booking.type === 'flight' && (
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-gray-500">Duration</p>
                    <p className="font-medium text-gray-900">{booking.duration}</p>
                  </div>
                </div>
              )}

              {booking.type === 'hotel' && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-gray-500">Location</p>
                    <p className="font-medium text-gray-900">{booking.location}</p>
                  </div>
                </div>
              )}

              {booking.type === 'package' && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-gray-500">Destination</p>
                    <p className="font-medium text-gray-900">{booking.destination}</p>
                  </div>
                </div>
              )}

              {booking.type === 'train' && (
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-gray-500">Duration</p>
                    <p className="font-medium text-gray-900">{booking.duration}</p>
                  </div>
                </div>
              )}

              {booking.type === 'bus' && (
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-gray-500">Departure</p>
                    <p className="font-medium text-gray-900">{booking.departureTime}</p>
                  </div>
                </div>
              )}

              {booking.type === 'cab' && (
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-gray-500">Pickup Time</p>
                    <p className="font-medium text-gray-900">{booking.pickupTime}</p>
                  </div>
                </div>
              )}

              {/* Price per unit */}
              <div className="flex items-center gap-2 text-sm">
                <CreditCard className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-gray-500">
                    {booking.type === 'hotel' ? 'Per Night' :
                     booking.type === 'cab' ? 'Total' : 'Per Person'}
                  </p>
                  <p className="font-medium text-gray-900">
                    ₹{(booking.price / (booking.passengers || booking.guests || booking.travelers || 1)).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewDetails(booking)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
                {booking.canDownload && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(booking.id, 'invoice')}
                    disabled={downloading[booking.id]}
                  >
                    {downloading[booking.id] ? (
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4 mr-2" />
                    )}
                    Invoice
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-2">
                {booking.canCancel && booking.status !== 'cancelled' && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                    onClick={() => {
                      setCancelBookingId(booking.id);
                      setShowCancelModal(true);
                    }}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                )}
                {booking.canRebook && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleRebook(booking)}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Rebook
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Skeleton Header */}
          <div className="mb-8">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-96 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Skeleton Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-6">
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>

          {/* Skeleton Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {[1, 2, 3, 4, 5, 6, 7].map(i => (
              <div key={i} className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"></div>
            ))}
          </div>

          {/* Skeleton Cards */}
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                  <div className="flex-1">
                    <div className="h-5 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 mb-4">
                  {[1, 2, 3, 4].map(j => (
                    <div key={j} className="h-12 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-gray-600 mt-2">
            View and manage all your travel bookings in one place
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
            <p className="text-3xl font-bold text-gray-900">{stats.totalBookings}</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-gray-600 mb-1">Upcoming Trips</p>
            <p className="text-3xl font-bold text-green-600">{stats.upcoming}</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-gray-600 mb-1">Completed</p>
            <p className="text-3xl font-bold text-blue-600">{stats.completed}</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-gray-600 mb-1">Total Spent</p>
            <p className="text-3xl font-bold text-gray-900">
              ₹{stats.totalSpent.toLocaleString('en-IN')}
            </p>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by booking ID, destination, hotel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
          </div>

          {/* Expanded Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <Card className="mt-4 p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Booking Status
                      </label>
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      >
                        <option value="all">All Status</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="refunded">Refunded</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Trip Period
                      </label>
                      <select
                        value={filterPeriod}
                        onChange={(e) => setFilterPeriod(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      >
                        <option value="all">All Trips</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="past">Past</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sort By
                      </label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      >
                        <option value="date-desc">Date (Newest First)</option>
                        <option value="date-asc">Date (Oldest First)</option>
                        <option value="price-desc">Price (High to Low)</option>
                        <option value="price-asc">Price (Low to High)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date Range
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="date"
                          value={dateRange.start}
                          onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        />
                        <input
                          type="date"
                          value={dateRange.end}
                          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tabs */}
        <div className="mb-6 overflow-x-auto pb-2">
          <div className="flex gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  {tab.count > 0 && (
                    <Badge 
                      variant={isActive ? 'primary' : 'secondary'} 
                      size="sm"
                      className={isActive ? 'bg-white text-blue-600' : ''}
                    >
                      {tab.count}
                    </Badge>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {sortedBookings.length > 0 ? (
              sortedBookings.map(booking => renderBookingCard(booking))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-xl shadow-sm p-12 text-center"
              >
                <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No bookings found
                </h3>
                <p className="text-gray-600 mb-6">
                  {activeTab === 'all' 
                    ? "You haven't made any bookings yet" 
                    : `You don't have any ${activeTab} bookings`}
                </p>
                <Button variant="primary" onClick={() => navigate('/')}>
                  Start Exploring
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Booking Details Modal */}
      <AnimatePresence>
        {showDetailsModal && selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
                <button
                  onClick={handleCloseDetails}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6">
                {/* Booking Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-4 bg-${getServiceColor(selectedBooking.type)}-50 rounded-xl`}>
                      {React.createElement(getServiceIcon(selectedBooking.type), {
                        className: `w-8 h-8 text-${getServiceColor(selectedBooking.type)}-600`
                      })}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {selectedBooking.type === 'flight' && `${selectedBooking.from} → ${selectedBooking.to}`}
                        {selectedBooking.type === 'hotel' && selectedBooking.hotelName}
                        {selectedBooking.type === 'package' && selectedBooking.packageName}
                        {selectedBooking.type === 'train' && selectedBooking.trainName}
                        {selectedBooking.type === 'bus' && selectedBooking.operator}
                        {selectedBooking.type === 'cab' && selectedBooking.cabType}
                      </h3>
                      <p className="text-gray-500">Booking ID: {selectedBooking.bookingReference || selectedBooking.id}</p>
                    </div>
                  </div>
                  <Badge variant={getStatusBadge(selectedBooking.status).variant} size="lg">
                    {getStatusBadge(selectedBooking.status).label}
                  </Badge>
                </div>

                {/* Service Specific Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Flight Details */}
                  {selectedBooking.type === 'flight' && (
                    <>
                      <DetailCard title="Flight Information">
                        <DetailRow icon={Plane} label="Airline" value={selectedBooking.airline} />
                        <DetailRow icon={FileText} label="Flight Number" value={selectedBooking.flightNumber} />
                        <DetailRow icon={Award} label="Class" value={selectedBooking.class} />
                        <DetailRow icon={Clock} label="Duration" value={selectedBooking.duration} />
                      </DetailCard>
                      <DetailCard title="Route & Timing">
                        <DetailRow icon={MapPin} label="From" value={selectedBooking.from} />
                        <DetailRow icon={MapPin} label="To" value={selectedBooking.to} />
                        <DetailRow icon={Clock} label="Departure" value={selectedBooking.departureTime} />
                        <DetailRow icon={Clock} label="Arrival" value={selectedBooking.arrivalTime} />
                      </DetailCard>
                      <DetailCard title="Passenger Information">
                        {selectedBooking.passengersList?.map((p, i) => (
                          <DetailRow 
                            key={i} 
                            icon={Users} 
                            label={`Passenger ${i + 1}`} 
                            value={`${p.name} (${p.age}) - Seat ${p.seat || p.berth || 'N/A'}`} 
                          />
                        ))}
                      </DetailCard>
                      <DetailCard title="Baggage Allowance">
                        <DetailRow icon={Luggage} label="Cabin" value={selectedBooking.baggage?.cabin} />
                        <DetailRow icon={Briefcase} label="Check-in" value={selectedBooking.baggage?.checkin} />
                      </DetailCard>
                    </>
                  )}

                  {/* Hotel Details */}
                  {selectedBooking.type === 'hotel' && (
                    <>
                      <DetailCard title="Hotel Information">
                        <DetailRow icon={Hotel} label="Hotel Name" value={selectedBooking.hotelName} />
                        <DetailRow icon={MapPin} label="Location" value={selectedBooking.location} />
                        <DetailRow icon={Award} label="Room Type" value={selectedBooking.roomType} />
                        <DetailRow icon={Users} label="Guests" value={selectedBooking.guests} />
                      </DetailCard>
                      <DetailCard title="Stay Details">
                        <DetailRow icon={Calendar} label="Check-in" value={new Date(selectedBooking.checkIn).toLocaleDateString()} />
                        <DetailRow icon={Calendar} label="Check-out" value={new Date(selectedBooking.checkOut).toLocaleDateString()} />
                        <DetailRow icon={Clock} label="Nights" value={selectedBooking.nights} />
                      </DetailCard>
                      <DetailCard title="Amenities">
                        <div className="flex flex-wrap gap-2">
                          {selectedBooking.amenities?.map((amenity, i) => (
                            <Badge key={i} variant="secondary" className="bg-blue-50 text-blue-700">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </DetailCard>
                      <DetailCard title="Address">
                        <p className="text-gray-700">{selectedBooking.address}</p>
                      </DetailCard>
                    </>
                  )}

                  {/* Package Details */}
                  {selectedBooking.type === 'package' && (
                    <>
                      <DetailCard title="Package Information">
                        <DetailRow icon={Package} label="Package Name" value={selectedBooking.packageName} />
                        <DetailRow icon={MapPin} label="Destination" value={selectedBooking.destination} />
                        <DetailRow icon={Clock} label="Duration" value={selectedBooking.duration} />
                        <DetailRow icon={Users} label="Travelers" value={selectedBooking.travelers} />
                      </DetailCard>
                      <DetailCard title="Inclusions">
                        <div className="flex flex-wrap gap-2">
                          {selectedBooking.inclusions?.map((inclusion, i) => (
                            <Badge key={i} variant="success" className="bg-green-50 text-green-700">
                              {inclusion}
                            </Badge>
                          ))}
                        </div>
                      </DetailCard>
                      <DetailCard title="Itinerary" className="md:col-span-2">
                        <div className="space-y-3">
                          {selectedBooking.itinerary?.map((day, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <Badge variant="primary" className="bg-blue-600 text-white">
                                Day {day.day}
                              </Badge>
                              <p className="text-gray-700">{day.activity}</p>
                            </div>
                          ))}
                        </div>
                      </DetailCard>
                    </>
                  )}

                  {/* Train Details */}
                  {selectedBooking.type === 'train' && (
                    <>
                      <DetailCard title="Train Information">
                        <DetailRow icon={Train} label="Train Name" value={selectedBooking.trainName} />
                        <DetailRow icon={FileText} label="Train Number" value={selectedBooking.trainNumber} />
                        <DetailRow icon={Award} label="Class" value={selectedBooking.class} />
                        <DetailRow icon={Clock} label="Duration" value={selectedBooking.duration} />
                      </DetailCard>
                      <DetailCard title="Journey Details">
                        <DetailRow icon={MapPin} label="From" value={selectedBooking.from} />
                        <DetailRow icon={MapPin} label="To" value={selectedBooking.to} />
                        <DetailRow icon={Clock} label="Departure" value={selectedBooking.departureTime} />
                        <DetailRow icon={Clock} label="Arrival" value={selectedBooking.arrivalTime} />
                      </DetailCard>
                      <DetailCard title="Passenger Information">
                        {selectedBooking.passengersList?.map((p, i) => (
                          <DetailRow 
                            key={i} 
                            icon={Users} 
                            label={`Passenger ${i + 1}`} 
                            value={`${p.name} - Coach ${selectedBooking.coach}, Berth ${p.berth}`} 
                          />
                        ))}
                      </DetailCard>
                      <DetailCard title="PNR & Coach">
                        <DetailRow icon={FileText} label="PNR" value={selectedBooking.pnr} />
                        <DetailRow icon={Users} label="Coach" value={selectedBooking.coach} />
                        <DetailRow icon={Users} label="Seats" value={selectedBooking.seats?.join(', ')} />
                      </DetailCard>
                    </>
                  )}

                  {/* Bus Details */}
                  {selectedBooking.type === 'bus' && (
                    <>
                      <DetailCard title="Bus Information">
                        <DetailRow icon={Bus} label="Operator" value={selectedBooking.operator} />
                        <DetailRow icon={Award} label="Bus Type" value={selectedBooking.busType} />
                        <DetailRow icon={Clock} label="Duration" value={selectedBooking.duration} />
                      </DetailCard>
                      <DetailCard title="Route & Timing">
                        <DetailRow icon={MapPin} label="From" value={selectedBooking.from} />
                        <DetailRow icon={MapPin} label="To" value={selectedBooking.to} />
                        <DetailRow icon={Clock} label="Departure" value={selectedBooking.departureTime} />
                        <DetailRow icon={Clock} label="Arrival" value={selectedBooking.arrivalTime} />
                      </DetailCard>
                      <DetailCard title="Boarding Details">
                        <DetailRow icon={MapPin} label="Boarding Point" value={selectedBooking.boardingPoint} />
                        <DetailRow icon={MapPin} label="Drop Point" value={selectedBooking.dropPoint} />
                        <DetailRow icon={Users} label="Seats" value={selectedBooking.seats?.join(', ')} />
                      </DetailCard>
                      <DetailCard title="Passenger Information">
                        {selectedBooking.passengersList?.map((p, i) => (
                          <DetailRow key={i} icon={Users} label={`Passenger ${i + 1}`} value={p.name} />
                        ))}
                      </DetailCard>
                    </>
                  )}

                  {/* Cab Details */}
                  {selectedBooking.type === 'cab' && (
                    <>
                      <DetailCard title="Cab Information">
                        <DetailRow icon={Car} label="Cab Type" value={selectedBooking.cabType} />
                        <DetailRow icon={Award} label="Vehicle" value={selectedBooking.vehicleDetails?.model} />
                        <DetailRow icon={Battery} label="Registration" value={selectedBooking.vehicleDetails?.registration} />
                      </DetailCard>
                      <DetailCard title="Trip Details">
                        <DetailRow icon={MapPin} label="Pickup" value={selectedBooking.pickupLocation} />
                        <DetailRow icon={MapPin} label="Drop" value={selectedBooking.dropLocation} />
                        <DetailRow icon={Clock} label="Pickup Time" value={selectedBooking.pickupTime} />
                        <DetailRow icon={Clock} label="Duration" value={selectedBooking.tripDuration} />
                      </DetailCard>
                      <DetailCard title="Driver Details">
                        <DetailRow icon={Users} label="Driver" value={selectedBooking.driverName} />
                        <DetailRow icon={Phone} label="Contact" value={selectedBooking.driverPhone} />
                      </DetailCard>
                      <DetailCard title="Passengers">
                        <DetailRow icon={Users} label="Passengers" value={selectedBooking.passengers} />
                      </DetailCard>
                    </>
                  )}

                  {/* Common Details for all services */}
                  <DetailCard title="Payment Information" className="md:col-span-2">
                    <div className="grid grid-cols-2 gap-4">
                      <DetailRow icon={CreditCard} label="Total Amount" value={`₹${selectedBooking.price.toLocaleString('en-IN')}`} />
                      <DetailRow icon={FileText} label="Booking Date" value={new Date(selectedBooking.bookingDate).toLocaleDateString()} />
                      <DetailRow icon={Award} label="Refundable" value={selectedBooking.refundable ? 'Yes' : 'No'} />
                      <DetailRow icon={Clock} label="Cancellation Policy" value={selectedBooking.cancellationPolicy} />
                    </div>
                  </DetailCard>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                  {selectedBooking.canDownload && (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => handleDownload(selectedBooking.id, 'ticket')}
                        disabled={downloading[selectedBooking.id]}
                      >
                        {downloading[selectedBooking.id] ? (
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <DownloadIcon className="w-4 h-4 mr-2" />
                        )}
                        Download Ticket
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleDownload(selectedBooking.id, 'invoice')}
                        disabled={downloading[selectedBooking.id]}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Invoice
                      </Button>
                    </>
                  )}
                  {selectedBooking.canCancel && selectedBooking.status !== 'cancelled' && (
                    <Button
                      variant="danger"
                      onClick={() => {
                        setCancelBookingId(selectedBooking.id);
                        setShowDetailsModal(false);
                        setShowCancelModal(true);
                      }}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel Booking
                    </Button>
                  )}
                  {selectedBooking.canRebook && (
                    <Button
                      variant="primary"
                      onClick={() => {
                        handleCloseDetails();
                        handleRebook(selectedBooking);
                      }}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Rebook
                    </Button>
                  )}
                  <Button variant="outline" onClick={handleCloseDetails}>
                    Close
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cancel Booking Modal */}
      <AnimatePresence>
        {showCancelModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-red-600">Cancel Booking</h3>
                  <button
                    onClick={() => setShowCancelModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-sm text-red-600">
                      Are you sure you want to cancel this booking? This action may be subject to cancellation charges as per the policy.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reason for cancellation *
                    </label>
                    <select
                      value={cancelReason}
                      onChange={(e) => setCancelReason(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="">Select a reason</option>
                      <option value="change-of-plans">Change of plans</option>
                      <option value="found-better-deal">Found a better deal</option>
                      <option value="emergency">Emergency</option>
                      <option value="incorrect-booking">Incorrect booking</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 font-medium mb-2">Refund Summary</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Booking Amount</span>
                        <span className="font-medium">₹{bookings.find(b => b.id === cancelBookingId)?.price.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-red-600">
                        <span>Cancellation Charges</span>
                        <span>- ₹{Math.round(bookings.find(b => b.id === cancelBookingId)?.price * 0.1).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between font-bold pt-2 border-t border-gray-200">
                        <span>Refund Amount</span>
                        <span className="text-green-600">
                          ₹{Math.round(bookings.find(b => b.id === cancelBookingId)?.price * 0.9).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button variant="outline" fullWidth onClick={() => setShowCancelModal(false)}>
                    Keep Booking
                  </Button>
                  <Button
                    variant="danger"
                    fullWidth
                    onClick={handleCancelBooking}
                    disabled={actionLoading[cancelBookingId]}
                  >
                    {actionLoading[cancelBookingId] ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Cancelling...
                      </>
                    ) : (
                      'Confirm Cancellation'
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Helper Components
const DetailCard = ({ title, children, className = '' }) => (
  <div className={`bg-gray-50 rounded-xl p-4 ${className}`}>
    <h4 className="font-semibold text-gray-900 mb-3">{title}</h4>
    <div className="space-y-2">{children}</div>
  </div>
);

const DetailRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-2 text-sm">
    <Icon className="w-4 h-4 text-gray-400 mt-0.5" />
    <div>
      <span className="text-gray-500">{label}:</span>{' '}
      <span className="text-gray-900 font-medium">{value}</span>
    </div>
  </div>
);

export default BookingHistory;