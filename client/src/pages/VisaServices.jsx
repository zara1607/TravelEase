// /src/pages/VisaServices.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, Clock, FileText, Upload, Award, Search, Star, 
  CheckCircle, XCircle, AlertCircle, Eye, Download, X,
  ChevronLeft, ChevronRight, RefreshCw, Shield, Heart,
  Briefcase, Plane, Hotel, Car, MapPin, Calendar, Users,
  BookOpen, Camera, Fingerprint, Home, DollarSign,
  Flag, Phone, Mail, MessageSquare, CreditCard, Wallet,
  Bell, BellOff, SlidersHorizontal, Filter, ChevronDown
} from 'lucide-react';
import { useAuth } from '../context/useAuth';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { toast } from 'react-hot-toast';

// Expanded visa data with 20+ countries
export const mockCountries = [
  {
    id: 'usa',
    name: 'United States',
    code: 'US',
    flag: '🇺🇸',
    continent: 'North America',
    processingTime: '5-7 business days',
    fee: 160,
    currency: 'USD',
    popularity: 95,
    visaTypes: ['Tourist', 'Business', 'Student', 'Work'],
    image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?ixlib=rb-4.0.3&auto=format&fit=crop&w=1199&q=80',
    requirements: ['passport', 'photo', 'bank-statement', 'itinerary', 'employment-letter'],
    validity: '10 years',
    stayPeriod: 'Up to 180 days',
    embassies: ['New Delhi', 'Mumbai', 'Kolkata', 'Chennai'],
    successRate: 92
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    code: 'GB',
    flag: '🇬🇧',
    continent: 'Europe',
    processingTime: '15 business days',
    fee: 130,
    currency: 'GBP',
    popularity: 90,
    visaTypes: ['Standard Visitor', 'Business', 'Student', 'Family'],
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    requirements: ['passport', 'photo', 'bank-statement', 'accommodation', 'travel-history'],
    validity: '6 months',
    stayPeriod: 'Up to 180 days',
    embassies: ['New Delhi', 'Mumbai', 'Bangalore'],
    successRate: 88
  },
  {
    id: 'schengen',
    name: 'Schengen Area',
    code: 'EU',
    flag: '🇪🇺',
    continent: 'Europe',
    processingTime: '15 calendar days',
    fee: 80,
    currency: 'EUR',
    popularity: 88,
    visaTypes: ['Tourist', 'Business', 'Transit'],
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    requirements: ['passport', 'photo', 'insurance', 'itinerary', 'flight-reservation'],
    validity: 'Up to 90 days',
    stayPeriod: '90 days within 180 days',
    embassies: ['New Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Goa'],
    successRate: 85
  },
  {
    id: 'canada',
    name: 'Canada',
    code: 'CA',
    flag: '🇨🇦',
    continent: 'North America',
    processingTime: '20-30 business days',
    fee: 100,
    currency: 'CAD',
    popularity: 85,
    visaTypes: ['Visitor', 'Business', 'Student', 'Work'],
    image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1111&q=80',
    requirements: ['passport', 'photo', 'bank-statement', 'purpose-letter', 'biometrics'],
    validity: 'Up to 10 years',
    stayPeriod: 'Up to 6 months',
    embassies: ['New Delhi', 'Mumbai', 'Bangalore', 'Chandigarh'],
    successRate: 86
  },
  {
    id: 'australia',
    name: 'Australia',
    code: 'AU',
    flag: '🇦🇺',
    continent: 'Oceania',
    processingTime: '20-25 business days',
    fee: 145,
    currency: 'AUD',
    popularity: 82,
    visaTypes: ['Visitor', 'Business', 'Student', 'Work'],
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    requirements: ['passport', 'photo', 'bank-statement', 'health-insurance', 'character-certificate'],
    validity: '1 year',
    stayPeriod: '3, 6, or 12 months',
    embassies: ['New Delhi', 'Mumbai', 'Bangalore'],
    successRate: 84
  },
  {
    id: 'japan',
    name: 'Japan',
    code: 'JP',
    flag: '🇯🇵',
    continent: 'Asia',
    processingTime: '5-7 business days',
    fee: 30,
    currency: 'USD',
    popularity: 80,
    visaTypes: ['Tourist', 'Business', 'Transit'],
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    requirements: ['passport', 'photo', 'itinerary', 'flight-booking', 'hotel-booking'],
    validity: '90 days',
    stayPeriod: '15-90 days',
    embassies: ['New Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Bangalore'],
    successRate: 90
  },
  {
    id: 'singapore',
    name: 'Singapore',
    code: 'SG',
    flag: '🇸🇬',
    continent: 'Asia',
    processingTime: '3-5 business days',
    fee: 25,
    currency: 'SGD',
    popularity: 89,
    visaTypes: ['Tourist', 'Business', 'Transit'],
    image: 'https://images.unsplash.com/photo-1525623997230-b6dcebcdc2e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    requirements: ['passport', 'photo', 'itinerary', 'flight-booking', 'hotel-booking'],
    validity: 'Up to 2 years',
    stayPeriod: 'Up to 30 days',
    embassies: ['New Delhi', 'Mumbai', 'Chennai'],
    successRate: 94
  },
  {
    id: 'dubai',
    name: 'Dubai',
    code: 'AE',
    flag: '🇦🇪',
    continent: 'Middle East',
    processingTime: '3-5 business days',
    fee: 120,
    currency: 'AED',
    popularity: 92,
    visaTypes: ['Tourist', 'Business', 'Transit', 'Family'],
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    requirements: ['passport', 'photo', 'itinerary', 'flight-booking', 'hotel-booking'],
    validity: '60 days',
    stayPeriod: '30-60 days',
    embassies: ['New Delhi', 'Mumbai', 'VFS Centers nationwide'],
    successRate: 96,
    popular: true
  },
  {
    id: 'thailand',
    name: 'Thailand',
    code: 'TH',
    flag: '🇹🇭',
    continent: 'Asia',
    processingTime: '3-5 business days',
    fee: 40,
    currency: 'USD',
    popularity: 87,
    visaTypes: ['Tourist', 'Business', 'Transit'],
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    requirements: ['passport', 'photo', 'itinerary', 'flight-booking', 'hotel-booking'],
    validity: '3 months',
    stayPeriod: '30-60 days',
    embassies: ['New Delhi', 'Mumbai', 'Kolkata', 'Chennai'],
    successRate: 91
  },
  {
    id: 'newzealand',
    name: 'New Zealand',
    code: 'NZ',
    flag: '🇳🇿',
    continent: 'Oceania',
    processingTime: '20-25 business days',
    fee: 165,
    currency: 'NZD',
    popularity: 78,
    visaTypes: ['Visitor', 'Business', 'Student', 'Work'],
    image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1171&q=80',
    requirements: ['passport', 'photo', 'bank-statement', 'health-insurance', 'character-certificate'],
    validity: 'Up to 5 years',
    stayPeriod: 'Up to 9 months',
    embassies: ['New Delhi', 'Mumbai'],
    successRate: 82
  },
  {
    id: 'china',
    name: 'China',
    code: 'CN',
    flag: '🇨🇳',
    continent: 'Asia',
    processingTime: '4-5 business days',
    fee: 85,
    currency: 'USD',
    popularity: 75,
    visaTypes: ['Tourist', 'Business', 'Student'],
    image: 'https://images.unsplash.com/photo-1508804052814-cd3ba865a116?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    requirements: ['passport', 'photo', 'itinerary', 'flight-booking', 'hotel-booking', 'invitation-letter'],
    validity: '3-10 years',
    stayPeriod: '30-90 days',
    embassies: ['New Delhi', 'Mumbai', 'Kolkata', 'Chennai'],
    successRate: 80
  },
  {
    id: 'russia',
    name: 'Russia',
    code: 'RU',
    flag: '🇷🇺',
    continent: 'Europe',
    processingTime: '7-10 business days',
    fee: 100,
    currency: 'USD',
    popularity: 72,
    visaTypes: ['Tourist', 'Business', 'Student'],
    image: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    requirements: ['passport', 'photo', 'itinerary', 'flight-booking', 'hotel-booking', 'invitation-letter'],
    validity: '30 days',
    stayPeriod: '30 days',
    embassies: ['New Delhi', 'Mumbai', 'Kolkata', 'Chennai'],
    successRate: 78
  },
  {
    id: 'brazil',
    name: 'Brazil',
    code: 'BR',
    flag: '🇧🇷',
    continent: 'South America',
    processingTime: '10-15 business days',
    fee: 90,
    currency: 'USD',
    popularity: 70,
    visaTypes: ['Tourist', 'Business'],
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    requirements: ['passport', 'photo', 'itinerary', 'flight-booking', 'hotel-booking', 'bank-statement'],
    validity: '5 years',
    stayPeriod: '90 days',
    embassies: ['New Delhi', 'Mumbai'],
    successRate: 83
  },
  {
    id: 'southafrica',
    name: 'South Africa',
    code: 'ZA',
    flag: '🇿🇦',
    continent: 'Africa',
    processingTime: '7-10 business days',
    fee: 45,
    currency: 'USD',
    popularity: 74,
    visaTypes: ['Tourist', 'Business'],
    image: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    requirements: ['passport', 'photo', 'itinerary', 'flight-booking', 'hotel-booking', 'bank-statement', 'yellow-fever'],
    validity: '90 days',
    stayPeriod: '30 days',
    embassies: ['New Delhi', 'Mumbai'],
    successRate: 81
  },
  {
    id: 'egypt',
    name: 'Egypt',
    code: 'EG',
    flag: '🇪🇬',
    continent: 'Africa',
    processingTime: '5-7 business days',
    fee: 50,
    currency: 'USD',
    popularity: 76,
    visaTypes: ['Tourist', 'Business'],
    image: 'https://images.unsplash.com/photo-1539650119574-8ff9c5b0b9d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    requirements: ['passport', 'photo', 'itinerary', 'flight-booking', 'hotel-booking'],
    validity: '90 days',
    stayPeriod: '30 days',
    embassies: ['New Delhi', 'Mumbai'],
    successRate: 86
  },
  {
    id: 'turkey',
    name: 'Turkey',
    code: 'TR',
    flag: '🇹🇷',
    continent: 'Europe/Asia',
    processingTime: '3-5 business days',
    fee: 60,
    currency: 'USD',
    popularity: 82,
    visaTypes: ['Tourist', 'Business', 'Transit'],
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&auto=format&fit=crop&w=1171&q=80',
    requirements: ['passport', 'photo', 'itinerary', 'flight-booking', 'hotel-booking'],
    validity: '180 days',
    stayPeriod: '30-90 days',
    embassies: ['New Delhi', 'Mumbai', 'Kolkata', 'Chennai'],
    successRate: 88
  },
  {
    id: 'srilanka',
    name: 'Sri Lanka',
    code: 'LK',
    flag: '🇱🇰',
    continent: 'Asia',
    processingTime: '2-3 business days',
    fee: 20,
    currency: 'USD',
    popularity: 79,
    visaTypes: ['Tourist', 'Business'],
    image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    requirements: ['passport', 'photo', 'itinerary', 'flight-booking', 'hotel-booking'],
    validity: '30 days',
    stayPeriod: '30 days',
    embassies: ['New Delhi', 'Mumbai', 'Chennai', 'Kolkata'],
    successRate: 95,
    popular: true
  },
  {
    id: 'malaysia',
    name: 'Malaysia',
    code: 'MY',
    flag: '🇲🇾',
    continent: 'Asia',
    processingTime: '3-5 business days',
    fee: 25,
    currency: 'USD',
    popularity: 81,
    visaTypes: ['Tourist', 'Business'],
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    requirements: ['passport', 'photo', 'itinerary', 'flight-booking', 'hotel-booking'],
    validity: '3 months',
    stayPeriod: '30 days',
    embassies: ['New Delhi', 'Mumbai', 'Chennai'],
    successRate: 92
  },
  {
    id: 'indonesia',
    name: 'Indonesia',
    code: 'ID',
    flag: '🇮🇩',
    continent: 'Asia',
    processingTime: '4-6 business days',
    fee: 35,
    currency: 'USD',
    popularity: 80,
    visaTypes: ['Tourist', 'Business'],
    image: 'https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    requirements: ['passport', 'photo', 'itinerary', 'flight-booking', 'hotel-booking'],
    validity: '30-60 days',
    stayPeriod: '30 days',
    embassies: ['New Delhi', 'Mumbai', 'Chennai', 'Kolkata'],
    successRate: 89
  },
  {
    id: 'france',
    name: 'France',
    code: 'FR',
    flag: '🇫🇷',
    continent: 'Europe',
    processingTime: '10-15 business days',
    fee: 80,
    currency: 'EUR',
    popularity: 87,
    visaTypes: ['Tourist', 'Business', 'Student'],
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=1173&q=80',
    requirements: ['passport', 'photo', 'insurance', 'itinerary', 'flight-reservation', 'hotel-booking'],
    validity: '90 days',
    stayPeriod: '90 days within 180 days',
    embassies: ['New Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Puducherry'],
    successRate: 85
  },
  {
    id: 'germany',
    name: 'Germany',
    code: 'DE',
    flag: '🇩🇪',
    continent: 'Europe',
    processingTime: '10-15 business days',
    fee: 80,
    currency: 'EUR',
    popularity: 84,
    visaTypes: ['Tourist', 'Business', 'Student'],
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    requirements: ['passport', 'photo', 'insurance', 'itinerary', 'flight-reservation', 'hotel-booking'],
    validity: '90 days',
    stayPeriod: '90 days within 180 days',
    embassies: ['New Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Bangalore'],
    successRate: 86
  },
  {
    id: 'italy',
    name: 'Italy',
    code: 'IT',
    flag: '🇮🇹',
    continent: 'Europe',
    processingTime: '10-15 business days',
    fee: 80,
    currency: 'EUR',
    popularity: 83,
    visaTypes: ['Tourist', 'Business', 'Student'],
    image: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    requirements: ['passport', 'photo', 'insurance', 'itinerary', 'flight-reservation', 'hotel-booking'],
    validity: '90 days',
    stayPeriod: '90 days within 180 days',
    embassies: ['New Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Goa'],
    successRate: 84
  },
  {
    id: 'switzerland',
    name: 'Switzerland',
    code: 'CH',
    flag: '🇨🇭',
    continent: 'Europe',
    processingTime: '10-15 business days',
    fee: 80,
    currency: 'CHF',
    popularity: 82,
    visaTypes: ['Tourist', 'Business'],
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    requirements: ['passport', 'photo', 'insurance', 'itinerary', 'flight-reservation', 'hotel-booking'],
    validity: '90 days',
    stayPeriod: '90 days within 180 days',
    embassies: ['New Delhi', 'Mumbai', 'Bangalore'],
    successRate: 87
  }
];

export const mockRequirements = {
  passport: { label: 'Valid Passport', description: 'Minimum 6 months validity, at least 2 blank pages', icon: 'BookOpen' },
  photo: { label: 'Passport Photos', description: '2 copies, 2x2 inches, white background', icon: 'Camera' },
  'bank-statement': { label: 'Bank Statement', description: 'Last 6 months with sufficient balance', icon: 'DollarSign' },
  itinerary: { label: 'Travel Itinerary', description: 'Detailed travel plan with dates and places', icon: 'MapPin' },
  'employment-letter': { label: 'Employment Letter', description: 'From employer with leave approval', icon: 'Briefcase' },
  accommodation: { label: 'Accommodation Proof', description: 'Hotel bookings or invitation letter', icon: 'Home' },
  'travel-history': { label: 'Travel History', description: 'Previous visas and travel stamps', icon: 'Globe' },
  insurance: { label: 'Travel Insurance', description: 'Minimum coverage €30,000', icon: 'Shield' },
  'flight-reservation': { label: 'Flight Reservation', description: 'Round trip confirmed booking', icon: 'Calendar' },
  'purpose-letter': { label: 'Purpose Letter', description: 'Explanation of visit and intentions', icon: 'FileText' },
  biometrics: { label: 'Biometrics', description: 'At VAC - fingerprints and photograph', icon: 'Fingerprint' },
  'health-insurance': { label: 'Health Insurance', description: 'Valid in destination country', icon: 'Shield' },
  'character-certificate': { label: 'Character Certificate', description: 'Police clearance certificate', icon: 'Award' },
  'invitation-letter': { label: 'Invitation Letter', description: 'From host/sponsor in destination', icon: 'Mail' },
  'yellow-fever': { label: 'Yellow Fever Certificate', description: 'Required for certain countries', icon: 'AlertCircle' }
};

export const mockApplications = [
  {
    id: 'VISA001',
    country: 'United States',
    type: 'Tourist',
    status: 'processing',
    submittedDate: '2024-02-15',
    processingTime: '5-7 business days',
    fee: 160,
    documents: ['passport', 'photo', 'bank-statement', 'itinerary'],
    missingDocuments: [],
    trackingSteps: [
      { step: 'Application Submitted', date: '2024-02-15', status: 'completed' },
      { step: 'Document Verification', date: '2024-02-16', status: 'completed' },
      { step: 'Interview Scheduled', date: '2024-02-20', status: 'pending' },
      { step: 'Visa Decision', date: null, status: 'pending' }
    ]
  },
  {
    id: 'VISA002',
    country: 'United Kingdom',
    type: 'Standard Visitor',
    status: 'approved',
    submittedDate: '2024-01-10',
    approvalDate: '2024-02-05',
    validUntil: '2025-02-04',
    fee: 130,
    documents: ['passport', 'photo', 'bank-statement', 'accommodation'],
    trackingSteps: [
      { step: 'Application Submitted', date: '2024-01-10', status: 'completed' },
      { step: 'Biometrics Appointment', date: '2024-01-15', status: 'completed' },
      { step: 'Application Processing', date: '2024-01-20', status: 'completed' },
      { step: 'Visa Approved', date: '2024-02-05', status: 'completed' }
    ]
  },
  {
    id: 'VISA003',
    country: 'Schengen Area',
    type: 'Tourist',
    status: 'rejected',
    submittedDate: '2024-01-05',
    rejectionDate: '2024-01-25',
    rejectionReason: 'Insufficient funds proof',
    fee: 80,
    documents: ['passport', 'photo', 'insurance', 'itinerary'],
    missingDocuments: ['bank-statement'],
    trackingSteps: [
      { step: 'Application Submitted', date: '2024-01-05', status: 'completed' },
      { step: 'Document Verification', date: '2024-01-10', status: 'completed' },
      { step: 'Application Processing', date: '2024-01-15', status: 'completed' },
      { step: 'Visa Rejected', date: '2024-01-25', status: 'rejected' }
    ]
  }
];

const VisaServices = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('apply');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [selectedVisaType, setSelectedVisaType] = useState('all');
  const [selectedContinent, setSelectedContinent] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200 });

  // Use the exported mock data
  const [countries, setCountries] = useState([]);
  const [applications, setApplications] = useState([]);
  const [requirements, setRequirements] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCountries(mockCountries);
      setApplications(mockApplications);
      setRequirements(mockRequirements);
    } catch (error) {
      console.error('Error fetching visa data:', error);
      toast.error('Failed to load visa services');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'apply', label: 'Apply for Visa', icon: Globe },
    { id: 'track', label: 'Track Applications', icon: Clock },
    { id: 'requirements', label: 'Requirements', icon: FileText },
    { id: 'documents', label: 'My Documents', icon: Upload },
    { id: 'history', label: 'Visa History', icon: Award }
  ];

  const continents = ['All', 'Asia', 'Europe', 'North America', 'South America', 'Africa', 'Oceania', 'Middle East'];
  const visaTypes = ['All', 'Tourist', 'Business', 'Student', 'Work', 'Family', 'Transit'];

  const getStatusBadge = (status) => {
    const variants = {
      processing: { variant: 'warning', label: 'Processing', icon: Clock },
      approved: { variant: 'success', label: 'Approved', icon: CheckCircle },
      rejected: { variant: 'danger', label: 'Rejected', icon: XCircle },
      completed: { variant: 'secondary', label: 'Completed', icon: Award }
    };
    return variants[status] || variants.processing;
  };

  const handleApplyNow = (country) => {
    setSelectedCountry(country);
    setShowApplicationModal(true);
  };

  const handleTrackApplication = (application) => {
    setSelectedApplication(application);
    setShowTrackingModal(true);
  };

  const handleUploadDocument = async (file, type) => {
    setUploading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success(`${type} uploaded successfully`);
      setShowDocumentModal(false);
    } catch (error) {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmitApplication = async (formData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Visa application submitted successfully');
      setShowApplicationModal(false);
      // Add to applications list
    } catch (error) {
      toast.error('Application submission failed');
    }
  };

  const getFilteredCountries = () => {
    let filtered = [...countries];
    
    if (searchQuery) {
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.continent.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedContinent !== 'all') {
      filtered = filtered.filter(c => c.continent === selectedContinent);
    }

    if (selectedVisaType !== 'all') {
      filtered = filtered.filter(c => c.visaTypes.includes(selectedVisaType));
    }

    if (priceRange.max < 200) {
      filtered = filtered.filter(c => c.fee <= priceRange.max);
    }
    
    return filtered;
  };

  const filteredCountries = getFilteredCountries();
  const hasMore = visibleCount < filteredCountries.length;

  const handleLoadMore = () => {
    setLoadMoreLoading(true);
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 8, filteredCountries.length));
      setLoadMoreLoading(false);
    }, 500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-64 bg-gray-200 rounded"></div>
            <div className="h-4 w-96 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-64 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
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
          <h1 className="text-3xl font-bold text-gray-900">Visa Services</h1>
          <p className="text-gray-600 mt-2">
            Apply for visas, track applications, and manage documents for {countries.length}+ countries worldwide
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Countries</p>
                <p className="text-3xl font-bold text-gray-900">{countries.length}+</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Processing</p>
                <p className="text-3xl font-bold text-yellow-600">2</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-xl">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Approved</p>
                <p className="text-3xl font-bold text-green-600">5</p>
              </div>
              <div className="p-3 bg-green-50 rounded-xl">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Success Rate</p>
                <p className="text-3xl font-bold text-purple-600">94%</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>
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
                </button>
              );
            })}
          </div>
        </div>

        {/* Apply Tab */}
        {activeTab === 'apply' && (
          <div>
            {/* Search and Filters */}
            <div className="mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by country name or continent..."
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
                    <Card className="mt-4 p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Continent
                          </label>
                          <select
                            value={selectedContinent}
                            onChange={(e) => setSelectedContinent(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                          >
                            {continents.map(continent => (
                              <option key={continent} value={continent === 'All' ? 'all' : continent}>
                                {continent}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Visa Type
                          </label>
                          <select
                            value={selectedVisaType}
                            onChange={(e) => setSelectedVisaType(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                          >
                            {visaTypes.map(type => (
                              <option key={type} value={type === 'All' ? 'all' : type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Max Fee (USD)
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="200"
                            step="10"
                            value={priceRange.max}
                            onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                            className="w-full accent-blue-600"
                          />
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm text-gray-600">$0</span>
                            <span className="text-sm text-gray-600">${priceRange.max}+</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-200">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedContinent('all');
                            setSelectedVisaType('all');
                            setPriceRange({ min: 0, max: 200 });
                            setSearchQuery('');
                          }}
                        >
                          Reset Filters
                        </Button>
                        <Button variant="primary" size="sm" onClick={() => setShowFilters(false)}>
                          Apply Filters
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Results Count */}
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                <span className="font-bold text-gray-900">{filteredCountries.length}</span> countries found
              </p>
            </div>

            {/* Countries Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCountries.slice(0, visibleCount).map((country) => (
                <motion.div
                  key={country.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group"
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200 h-full">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={country.image}
                        alt={country.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      <div className="absolute top-3 left-3 text-4xl">
                        {country.flag}
                      </div>
                      <div className="absolute bottom-3 left-3 text-white">
                        <h3 className="text-xl font-bold">{country.name}</h3>
                        <p className="text-sm opacity-90">{country.continent}</p>
                      </div>
                      <div className="absolute top-3 right-3">
                        <Badge variant="secondary" className="bg-white/90 text-gray-900">
                          {country.processingTime}
                        </Badge>
                      </div>
                      {country.popular && (
                        <div className="absolute top-3 right-24">
                          <Badge variant="primary" className="bg-yellow-400 text-yellow-900">
                            🔥 Popular
                          </Badge>
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      {/* Fee & Popularity */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-gray-900">
                            {country.currency === 'USD' ? '$' : 
                             country.currency === 'GBP' ? '£' : 
                             country.currency === 'EUR' ? '€' : 
                             country.currency === 'CAD' ? 'C$' : 
                             country.currency === 'AUD' ? 'A$' : 
                             country.currency === 'CHF' ? 'CHF' :
                             country.currency === 'SGD' ? 'S$' :
                             country.currency === 'AED' ? 'AED' : '$'}
                            {country.fee}
                          </span>
                          <span className="text-sm text-gray-500">{country.currency}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{country.popularity}%</span>
                        </div>
                      </div>

                      {/* Visa Types */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {country.visaTypes.map((type, i) => (
                          <Badge key={i} variant="secondary" size="sm" className="bg-blue-50 text-blue-700">
                            {type}
                          </Badge>
                        ))}
                      </div>

                      {/* Visa Details */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">Processing: {country.processingTime}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">Validity: {country.validity}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">Stay: {country.stayPeriod}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-gray-600">Success Rate: {country.successRate}%</span>
                        </div>
                      </div>

                      {/* Requirements Preview */}
                      <div className="mb-4">
                        <p className="text-xs font-medium text-gray-500 mb-2">Required Documents:</p>
                        <div className="flex flex-wrap gap-1">
                          {country.requirements.slice(0, 3).map((req, i) => (
                            <Badge key={i} variant="secondary" size="sm" className="bg-gray-100">
                              {requirements[req]?.label || req}
                            </Badge>
                          ))}
                          {country.requirements.length > 3 && (
                            <Badge variant="secondary" size="sm" className="bg-gray-100">
                              +{country.requirements.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => {
                            setSelectedCountry(country);
                            setShowApplicationModal(true);
                          }}
                        >
                          View Details
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleApplyNow(country)}
                        >
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Loading State */}
            {loadMoreLoading && (
              <div className="mt-8 text-center">
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-lg shadow-md">
                  <RefreshCw className="w-5 h-5 animate-spin text-blue-600" />
                  <span className="text-gray-600">Loading more countries...</span>
                </div>
              </div>
            )}

            {/* No Results */}
            {filteredCountries.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-xl shadow-md p-12 text-center"
              >
                <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Countries Found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedContinent('all');
                    setSelectedVisaType('all');
                    setPriceRange({ min: 0, max: 200 });
                  }}
                >
                  Clear All Filters
                </Button>
              </motion.div>
            )}

            {/* Load More Button */}
            {filteredCountries.length > 0 && hasMore && (
              <div className="mt-8 text-center">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="px-12"
                  onClick={handleLoadMore}
                  disabled={loadMoreLoading}
                >
                  Load More Countries ({visibleCount}/{filteredCountries.length})
                </Button>
              </div>
            )}

            {/* All Loaded Message */}
            {filteredCountries.length > 0 && !hasMore && visibleCount > 0 && (
              <div className="mt-8 text-center">
                <p className="text-gray-500">You've seen all {filteredCountries.length} countries</p>
              </div>
            )}
          </div>
        )}

        {/* Track Applications Tab */}
        {activeTab === 'track' && (
          <div className="space-y-4">
            {applications.map((app) => {
              const statusBadge = getStatusBadge(app.status);
              const StatusIcon = statusBadge.icon;

              return (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 bg-blue-50 rounded-xl`}>
                            <Globe className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{app.country} - {app.type} Visa</h3>
                            <p className="text-sm text-gray-500">Application ID: {app.id}</p>
                          </div>
                        </div>
                        <Badge variant={statusBadge.variant} className="flex items-center gap-1">
                          <StatusIcon className="w-3 h-3" />
                          {statusBadge.label}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-500">Submitted</p>
                          <p className="font-medium">{new Date(app.submittedDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Processing Time</p>
                          <p className="font-medium">{app.processingTime}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Fee Paid</p>
                          <p className="font-medium">${app.fee}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Documents</p>
                          <p className="font-medium">{app.documents.length}/5</p>
                        </div>
                      </div>

                      {/* Progress Tracker */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          {app.trackingSteps.map((step, index) => (
                            <div key={index} className="flex-1 text-center">
                              <div className={`text-xs font-medium ${
                                step.status === 'completed' ? 'text-green-600' :
                                step.status === 'rejected' ? 'text-red-600' :
                                step.status === 'pending' ? 'text-gray-400' :
                                'text-blue-600'
                              }`}>
                                {step.step}
                              </div>
                              {step.date && (
                                <div className="text-xs text-gray-500 mt-1">
                                  {new Date(step.date).toLocaleDateString()}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="relative h-2 bg-gray-200 rounded-full">
                          <div
                            className="absolute h-2 bg-blue-600 rounded-full"
                            style={{
                              width: `${(app.trackingSteps.filter(s => s.status === 'completed').length / app.trackingSteps.length) * 100}%`
                            }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2">
                        {app.missingDocuments?.length > 0 && (
                          <Button
                            variant="warning"
                            size="sm"
                            onClick={() => setShowDocumentModal(true)}
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Required Documents
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleTrackApplication(app)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Track Details
                        </Button>
                        {app.status === 'approved' && (
                          <Button
                            variant="success"
                            size="sm"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download Visa
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}

            {applications.length === 0 && (
              <Card className="p-12 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Applications Yet</h3>
                <p className="text-gray-600 mb-6">Start your visa application process today</p>
                <Button variant="primary" onClick={() => setActiveTab('apply')}>
                  Browse Countries
                </Button>
              </Card>
            )}
          </div>
        )}

        {/* Requirements Tab */}
        {activeTab === 'requirements' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Common Requirements
                </h3>
                <div className="space-y-4">
                  {Object.entries(requirements).map(([key, req]) => (
                    <div key={key} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-white rounded-lg">
                        {req.icon === 'BookOpen' && <BookOpen className="w-5 h-5 text-blue-600" />}
                        {req.icon === 'Camera' && <Camera className="w-5 h-5 text-blue-600" />}
                        {req.icon === 'DollarSign' && <DollarSign className="w-5 h-5 text-blue-600" />}
                        {req.icon === 'MapPin' && <MapPin className="w-5 h-5 text-blue-600" />}
                        {req.icon === 'Briefcase' && <Briefcase className="w-5 h-5 text-blue-600" />}
                        {req.icon === 'Home' && <Home className="w-5 h-5 text-blue-600" />}
                        {req.icon === 'Globe' && <Globe className="w-5 h-5 text-blue-600" />}
                        {req.icon === 'Shield' && <Shield className="w-5 h-5 text-blue-600" />}
                        {req.icon === 'Calendar' && <Calendar className="w-5 h-5 text-blue-600" />}
                        {req.icon === 'FileText' && <FileText className="w-5 h-5 text-blue-600" />}
                        {req.icon === 'Fingerprint' && <Fingerprint className="w-5 h-5 text-blue-600" />}
                        {req.icon === 'Award' && <Award className="w-5 h-5 text-blue-600" />}
                        {req.icon === 'Mail' && <Mail className="w-5 h-5 text-blue-600" />}
                        {req.icon === 'AlertCircle' && <AlertCircle className="w-5 h-5 text-blue-600" />}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{req.label}</p>
                        <p className="text-sm text-gray-500">{req.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-green-600" />
                  Tips for Successful Application
                </h3>
                <div className="space-y-3">
                  {[
                    'Ensure all documents are clear and legible',
                    'Apply at least 3-4 weeks before travel',
                    'Double-check all information before submitting',
                    'Keep copies of all submitted documents',
                    'Track your application status regularly',
                    'Respond promptly to any requests for additional information',
                    'Maintain sufficient bank balance for last 6 months',
                    'Provide genuine hotel and flight bookings',
                    'Get travel insurance with adequate coverage',
                    'Prepare for visa interview if required'
                  ].map((tip, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <p className="text-gray-700">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Application Modal */}
      <AnimatePresence>
        {showApplicationModal && selectedCountry && (
          <VisaApplicationModal
            country={selectedCountry}
            onClose={() => setShowApplicationModal(false)}
            onSubmit={handleSubmitApplication}
            requirements={requirements}
          />
        )}
      </AnimatePresence>

      {/* Document Upload Modal */}
      <AnimatePresence>
        {showDocumentModal && (
          <DocumentUploadModal
            onClose={() => setShowDocumentModal(false)}
            onUpload={handleUploadDocument}
            uploading={uploading}
            requirements={requirements}
          />
        )}
      </AnimatePresence>

      {/* Tracking Modal */}
      <AnimatePresence>
        {showTrackingModal && selectedApplication && (
          <TrackingModal
            application={selectedApplication}
            onClose={() => setShowTrackingModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Modal Components (kept as is from original)
const VisaApplicationModal = ({ country, onClose, onSubmit, requirements }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    visaType: '',
    passportNumber: '',
    passportExpiry: '',
    fullName: '',
    dateOfBirth: '',
    nationality: '',
    purpose: '',
    travelDates: { from: '', to: '' },
    accommodation: '',
    employment: '',
    documents: {}
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Apply for {country.name} Visa</h2>
              <p className="text-gray-600 mt-1">Step {step} of 3</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="relative h-2 bg-gray-200 rounded-full mb-8">
            <div
              className="absolute h-2 bg-blue-600 rounded-full transition-all"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Visa Type *
                  </label>
                  <select
                    value={formData.visaType}
                    onChange={(e) => setFormData({ ...formData, visaType: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select visa type</option>
                    {country.visaTypes.map((type, i) => (
                      <option key={i} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Passport Number *
                  </label>
                  <input
                    type="text"
                    value={formData.passportNumber}
                    onChange={(e) => setFormData({ ...formData, passportNumber: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Passport Expiry Date *
                  </label>
                  <input
                    type="date"
                    value={formData.passportExpiry}
                    onChange={(e) => setFormData({ ...formData, passportExpiry: e.target.value })}
                    min={new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name (as in passport) *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nationality *
                  </label>
                  <input
                    type="text"
                    value={formData.nationality}
                    onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Purpose of Visit *
                  </label>
                  <textarea
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Travel From *
                    </label>
                    <input
                      type="date"
                      value={formData.travelDates.from}
                      onChange={(e) => setFormData({
                        ...formData,
                        travelDates: { ...formData.travelDates, from: e.target.value }
                      })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Travel To *
                    </label>
                    <input
                      type="date"
                      value={formData.travelDates.to}
                      onChange={(e) => setFormData({
                        ...formData,
                        travelDates: { ...formData.travelDates, to: e.target.value }
                      })}
                      min={formData.travelDates.from}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Accommodation Details *
                  </label>
                  <input
                    type="text"
                    value={formData.accommodation}
                    onChange={(e) => setFormData({ ...formData, accommodation: e.target.value })}
                    placeholder="Hotel name, address, booking reference"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employment Details *
                  </label>
                  <textarea
                    value={formData.employment}
                    onChange={(e) => setFormData({ ...formData, employment: e.target.value })}
                    rows="3"
                    placeholder="Company name, position, duration, monthly income"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 mb-4">Required Documents</h3>
                
                {country.requirements.map((reqKey, i) => {
                  const req = requirements[reqKey];
                  return (
                    <div key={i} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {req?.icon === 'BookOpen' && <BookOpen className="w-5 h-5 text-blue-600" />}
                          {req?.icon === 'Camera' && <Camera className="w-5 h-5 text-blue-600" />}
                          {req?.icon === 'DollarSign' && <DollarSign className="w-5 h-5 text-blue-600" />}
                          {req?.icon === 'MapPin' && <MapPin className="w-5 h-5 text-blue-600" />}
                          {req?.icon === 'Briefcase' && <Briefcase className="w-5 h-5 text-blue-600" />}
                          {req?.icon === 'Home' && <Home className="w-5 h-5 text-blue-600" />}
                          {req?.icon === 'Globe' && <Globe className="w-5 h-5 text-blue-600" />}
                          {req?.icon === 'Shield' && <Shield className="w-5 h-5 text-blue-600" />}
                          {req?.icon === 'Calendar' && <Calendar className="w-5 h-5 text-blue-600" />}
                          {req?.icon === 'FileText' && <FileText className="w-5 h-5 text-blue-600" />}
                          {req?.icon === 'Fingerprint' && <Fingerprint className="w-5 h-5 text-blue-600" />}
                          {req?.icon === 'Award' && <Award className="w-5 h-5 text-blue-600" />}
                          <span className="font-medium text-gray-900">{req?.label}</span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => document.getElementById(`doc-${i}`).click()}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload
                        </Button>
                        <input
                          id={`doc-${i}`}
                          type="file"
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                      </div>
                      <p className="text-xs text-gray-500">{req?.description}</p>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="flex justify-between mt-6">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}
              <Button type="submit" variant="primary" className="ml-auto">
                {step === 3 ? 'Submit Application' : 'Continue'}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

const DocumentUploadModal = ({ onClose, onUpload, uploading, requirements }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentType, setDocumentType] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile && documentType) {
      onUpload(selectedFile, documentType);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-xl shadow-xl max-w-md w-full"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Upload Document</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Document Type *
              </label>
              <select
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select document type</option>
                {Object.entries(requirements).map(([key, req]) => (
                  <option key={key} value={key}>{req.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                File *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer"
                >
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PDF, JPG, PNG up to 10MB
                  </p>
                </label>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button variant="outline" fullWidth onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              fullWidth
              onClick={handleUpload}
              disabled={!selectedFile || !documentType || uploading}
            >
              {uploading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                'Upload Document'
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const TrackingModal = ({ application, onClose }) => {
  const getStatusBadge = (status) => {
    const variants = {
      processing: { variant: 'warning', label: 'Processing', icon: Clock },
      approved: { variant: 'success', label: 'Approved', icon: CheckCircle },
      rejected: { variant: 'danger', label: 'Rejected', icon: XCircle },
      completed: { variant: 'secondary', label: 'Completed', icon: Award }
    };
    return variants[status] || variants.processing;
  };

  const statusBadge = getStatusBadge(application.status);
  const StatusIcon = statusBadge.icon;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Application Tracking</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600">Application ID</p>
                <p className="font-bold text-gray-900">{application.id}</p>
              </div>
              <Badge variant={statusBadge.variant} className="flex items-center gap-1">
                <StatusIcon className="w-3 h-3" />
                {statusBadge.label}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Country</p>
                <p className="font-medium">{application.country}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Visa Type</p>
                <p className="font-medium">{application.type}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Submitted</p>
                <p className="font-medium">{new Date(application.submittedDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Fee Paid</p>
                <p className="font-medium">${application.fee}</p>
              </div>
            </div>
          </div>

          <h4 className="font-semibold text-gray-900 mb-4">Tracking Timeline</h4>
          <div className="space-y-4">
            {application.trackingSteps.map((step, index) => (
              <div key={index} className="relative pl-8 pb-4 last:pb-0">
                {index < application.trackingSteps.length - 1 && (
                  <div className="absolute left-3 top-3 bottom-0 w-0.5 bg-gray-200"></div>
                )}
                <div className={`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center ${
                  step.status === 'completed' ? 'bg-green-600' :
                  step.status === 'rejected' ? 'bg-red-600' :
                  step.status === 'pending' ? 'bg-gray-300' :
                  'bg-blue-600'
                }`}>
                  {step.status === 'completed' ? (
                    <CheckCircle className="w-4 h-4 text-white" />
                  ) : step.status === 'rejected' ? (
                    <XCircle className="w-4 h-4 text-white" />
                  ) : (
                    <Clock className="w-4 h-4 text-white" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{step.step}</p>
                  {step.date && (
                    <p className="text-sm text-gray-500">{new Date(step.date).toLocaleDateString()}</p>
                  )}
                  {step.status === 'rejected' && application.rejectionReason && (
                    <p className="text-sm text-red-600 mt-1">Reason: {application.rejectionReason}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {application.status === 'approved' && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">Visa Approved!</p>
                  <p className="text-sm text-green-600">Valid until {new Date(application.validUntil).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          )}

          {application.status === 'rejected' && (
            <div className="mt-6 p-4 bg-red-50 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <div>
                  <p className="font-medium text-red-800">Visa Rejected</p>
                  <p className="text-sm text-red-600">Reason: {application.rejectionReason}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default VisaServices;