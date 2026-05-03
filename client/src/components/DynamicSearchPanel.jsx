// src/components/DynamicSearchPanel.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plane,
  Hotel,
  Package,
  Train,
  Bus,
  Car,
  Ship,
  Globe,
  Shield,
  Calendar,
  Users,
  MapPin,
  Clock,
  Search,
  ArrowRightLeft,
  Anchor,
  Flag,
  FileText,
  Ticket,
  ChevronDown,
  X,
  AlertCircle
} from 'lucide-react';

// Centralized configuration object
const SEARCH_CONFIG = {
  flights: {
    id: 'flights',
    label: 'Flights',
    icon: Plane,
    buttonText: 'Search Flights',
    fields: [
      { 
        id: 'from', 
        label: 'From', 
        type: 'text', 
        icon: MapPin, 
        placeholder: 'City or Airport',
        required: true,
        colSpan: 'col-span-1'
      },
      { 
        id: 'to', 
        label: 'To', 
        type: 'text', 
        icon: MapPin, 
        placeholder: 'City or Airport',
        required: true,
        colSpan: 'col-span-1'
      },
      { 
        id: 'departureDate', 
        label: 'Departure', 
        type: 'date', 
        icon: Calendar, 
        placeholder: 'Select date',
        required: true,
        colSpan: 'col-span-1'
      },
      { 
        id: 'returnDate', 
        label: 'Return (Optional)', 
        type: 'date', 
        icon: Calendar, 
        placeholder: 'Select date',
        required: false,
        colSpan: 'col-span-1'
      },
      { 
        id: 'travelers', 
        label: 'Travelers', 
        type: 'select', 
        icon: Users, 
        placeholder: '1 Traveler, Economy',
        options: ['1 Traveler, Economy', '2 Travelers, Economy', '1 Traveler, Business', '2 Travelers, Business'],
        required: true,
        colSpan: 'col-span-1'
      }
    ],
    defaults: {
      from: '',
      to: '',
      departureDate: '',
      returnDate: '',
      travelers: '1 Traveler, Economy'
    }
  },
  hotels: {
    id: 'hotels',
    label: 'Hotels',
    icon: Hotel,
    buttonText: 'Search Hotels',
    fields: [
      { 
        id: 'destination', 
        label: 'Destination', 
        type: 'text', 
        icon: MapPin, 
        placeholder: 'City, hotel or area',
        required: true,
        colSpan: 'col-span-2'
      },
      { 
        id: 'checkIn', 
        label: 'Check-in', 
        type: 'date', 
        icon: Calendar, 
        placeholder: 'Check-in date',
        required: true,
        colSpan: 'col-span-1'
      },
      { 
        id: 'checkOut', 
        label: 'Check-out', 
        type: 'date', 
        icon: Calendar, 
        placeholder: 'Check-out date',
        required: true,
        colSpan: 'col-span-1'
      },
      { 
        id: 'guests', 
        label: 'Guests', 
        type: 'select', 
        icon: Users, 
        placeholder: '2 Guests, 1 Room',
        options: ['1 Guest, 1 Room', '2 Guests, 1 Room', '3 Guests, 1 Room', '4 Guests, 2 Rooms'],
        required: true,
        colSpan: 'col-span-1'
      }
    ],
    defaults: {
      destination: '',
      checkIn: '',
      checkOut: '',
      guests: '2 Guests, 1 Room'
    }
  },
  packages: {
    id: 'packages',
    label: 'Packages',
    icon: Package,
    buttonText: 'Search Packages',
    fields: [
      { 
        id: 'destination', 
        label: 'Destination', 
        type: 'text', 
        icon: MapPin, 
        placeholder: 'Where do you want to go?',
        required: true,
        colSpan: 'col-span-2'
      },
      { 
        id: 'startDate', 
        label: 'Start Date', 
        type: 'date', 
        icon: Calendar, 
        placeholder: 'Start date',
        required: true,
        colSpan: 'col-span-1'
      },
      { 
        id: 'duration', 
        label: 'Duration', 
        type: 'select', 
        icon: Clock, 
        placeholder: 'Select duration',
        options: ['3-5 Days', '6-8 Days', '9-12 Days', '12+ Days'],
        required: true,
        colSpan: 'col-span-1'
      },
      { 
        id: 'travelers', 
        label: 'Travelers', 
        type: 'select', 
        icon: Users, 
        placeholder: 'Number of travelers',
        options: ['1 Traveler', '2 Travelers', '3 Travelers', '4+ Travelers'],
        required: true,
        colSpan: 'col-span-1'
      }
    ],
    defaults: {
      destination: '',
      startDate: '',
      duration: '3-5 Days',
      travelers: '2 Travelers'
    }
  },
  trains: {
    id: 'trains',
    label: 'Trains',
    icon: Train,
    buttonText: 'Search Trains',
    fields: [
      { 
        id: 'from', 
        label: 'From', 
        type: 'text', 
        icon: MapPin, 
        placeholder: 'Station or City',
        required: true,
        colSpan: 'col-span-1'
      },
      { 
        id: 'to', 
        label: 'To', 
        type: 'text', 
        icon: MapPin, 
        placeholder: 'Station or City',
        required: true,
        colSpan: 'col-span-1'
      },
      { 
        id: 'travelDate', 
        label: 'Travel Date', 
        type: 'date', 
        icon: Calendar, 
        placeholder: 'Travel date',
        required: true,
        colSpan: 'col-span-1'
      },
      { 
        id: 'class', 
        label: 'Class', 
        type: 'select', 
        icon: Ticket, 
        placeholder: 'Select class',
        options: ['Sleeper', 'AC 3 Tier', 'AC 2 Tier', 'AC First Class'],
        required: true,
        colSpan: 'col-span-1'
      }
    ],
    defaults: {
      from: '',
      to: '',
      travelDate: '',
      class: 'Sleeper'
    }
  },
  buses: {
    id: 'buses',
    label: 'Buses',
    icon: Bus,
    buttonText: 'Search Buses',
    fields: [
      { 
        id: 'from', 
        label: 'From', 
        type: 'text', 
        icon: MapPin, 
        placeholder: 'City or Stop',
        required: true,
        colSpan: 'col-span-1'
      },
      { 
        id: 'to', 
        label: 'To', 
        type: 'text', 
        icon: MapPin, 
        placeholder: 'City or Stop',
        required: true,
        colSpan: 'col-span-1'
      },
      { 
        id: 'travelDate', 
        label: 'Travel Date', 
        type: 'date', 
        icon: Calendar, 
        placeholder: 'Travel date',
        required: true,
        colSpan: 'col-span-1'
      },
      { 
        id: 'seats', 
        label: 'Seats', 
        type: 'select', 
        icon: Users, 
        placeholder: 'Number of seats',
        options: ['1 Seat', '2 Seats', '3 Seats', '4+ Seats'],
        required: true,
        colSpan: 'col-span-1'
      }
    ],
    defaults: {
      from: '',
      to: '',
      travelDate: '',
      seats: '1 Seat'
    }
  },
  cabs: {
    id: 'cabs',
    label: 'Cabs',
    icon: Car,
    buttonText: 'Book a Cab',
    fields: [
      { 
        id: 'pickup', 
        label: 'Pickup Location', 
        type: 'text', 
        icon: MapPin, 
        placeholder: 'Enter pickup location',
        required: true,
        colSpan: 'col-span-2'
      },
      { 
        id: 'drop', 
        label: 'Drop Location', 
        type: 'text', 
        icon: MapPin, 
        placeholder: 'Enter drop location',
        required: true,
        colSpan: 'col-span-2'
      },
      { 
        id: 'datetime', 
        label: 'Pickup Date & Time', 
        type: 'datetime-local', 
        icon: Calendar, 
        placeholder: 'Select date & time',
        required: true,
        colSpan: 'col-span-1'
      }
    ],
    defaults: {
      pickup: '',
      drop: '',
      datetime: ''
    }
  },
  cruises: {
    id: 'cruises',
    label: 'Cruises',
    icon: Ship,
    buttonText: 'Search Cruises',
    fields: [
      { 
        id: 'departurePort', 
        label: 'Departure Port', 
        type: 'text', 
        icon: Anchor, 
        placeholder: 'Port name',
        required: true,
        colSpan: 'col-span-1'
      },
      { 
        id: 'destination', 
        label: 'Destination', 
        type: 'text', 
        icon: MapPin, 
        placeholder: 'Cruise destination',
        required: true,
        colSpan: 'col-span-1'
      },
      { 
        id: 'duration', 
        label: 'Duration', 
        type: 'select', 
        icon: Clock, 
        placeholder: 'Select duration',
        options: ['3-4 Nights', '5-7 Nights', '8-10 Nights', '10+ Nights'],
        required: true,
        colSpan: 'col-span-1'
      },
      { 
        id: 'travelers', 
        label: 'Travelers', 
        type: 'select', 
        icon: Users, 
        placeholder: 'Number of travelers',
        options: ['1 Traveler', '2 Travelers', '3 Travelers', '4 Travelers'],
        required: true,
        colSpan: 'col-span-1'
      }
    ],
    defaults: {
      departurePort: '',
      destination: '',
      duration: '5-7 Nights',
      travelers: '2 Travelers'
    }
  },
  visa: {
    id: 'visa',
    label: 'Visa',
    icon: Globe,
    buttonText: 'Check Visa',
    fields: [
      { 
        id: 'nationality', 
        label: 'Nationality', 
        type: 'text', 
        icon: Flag, 
        placeholder: 'Your nationality',
        required: true,
        colSpan: 'col-span-1'
      },
      { 
        id: 'destination', 
        label: 'Destination Country', 
        type: 'text', 
        icon: Globe, 
        placeholder: 'Country to visit',
        required: true,
        colSpan: 'col-span-1'
      },
      { 
        id: 'visaType', 
        label: 'Visa Type', 
        type: 'select', 
        icon: FileText, 
        placeholder: 'Select visa type',
        options: ['Tourist Visa', 'Business Visa', 'Student Visa', 'Work Visa'],
        required: true,
        colSpan: 'col-span-1'
      }
    ],
    defaults: {
      nationality: '',
      destination: '',
      visaType: 'Tourist Visa'
    }
  },
  insurance: {
    id: 'insurance',
    label: 'Insurance',
    icon: Shield,
    buttonText: 'Get Insurance',
    fields: [
      { 
        id: 'destination', 
        label: 'Destination', 
        type: 'text', 
        icon: MapPin, 
        placeholder: 'Travel destination',
        required: true,
        colSpan: 'col-span-2'
      },
      { 
        id: 'travelDates', 
        label: 'Travel Dates', 
        type: 'date', 
        icon: Calendar, 
        placeholder: 'Select dates',
        required: true,
        colSpan: 'col-span-1'
      },
      { 
        id: 'travelers', 
        label: 'Travelers', 
        type: 'select', 
        icon: Users, 
        placeholder: 'Number of travelers',
        options: ['1 Traveler', '2 Travelers', '3 Travelers', '4+ Travelers'],
        required: true,
        colSpan: 'col-span-1'
      }
    ],
    defaults: {
      destination: '',
      travelDates: '',
      travelers: '2 Travelers'
    }
  }
};

const DynamicSearchPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('flights');
  const [formData, setFormData] = useState({});
  const [swapCities, setSwapCities] = useState(false);

  // Get active configuration with fallback
  const activeConfig = SEARCH_CONFIG[activeTab] || SEARCH_CONFIG.flights;

  // Initialize form data with defaults
  useEffect(() => {
    const initialData = {};
    Object.keys(SEARCH_CONFIG).forEach(key => {
      initialData[key] = { ...SEARCH_CONFIG[key]?.defaults } || {};
    });
    setFormData(initialData);
  }, []);

  // Handle input changes with safe access
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [activeTab]: {
        ...(prev[activeTab] || {}),
        [field]: value
      }
    }));
  };

  const handleSwapCities = () => {
    if (activeTab === 'flights') {
      const from = formData.flights?.from || '';
      const to = formData.flights?.to || '';
      setFormData(prev => ({
        ...prev,
        flights: {
          ...(prev.flights || {}),
          from: to,
          to: from
        }
      }));
      setSwapCities(!swapCities);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchParams = new URLSearchParams({
      type: activeTab,
      ...formData[activeTab]
    });
    navigate(`/search?${searchParams.toString()}`);
  };

  // Get today's date for min attribute
  const today = new Date().toISOString().split('T')[0];

  // Render field based on type
  const renderField = (field) => {
    if (!field) return null;
    
    const Icon = field.icon || MapPin;
    const value = formData[activeTab]?.[field.id] || '';

    if (field.type === 'select') {
      return (
        <div key={field.id} className="relative">
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            value={value}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-gray-900 hover:border-gray-300 transition-colors"
          >
            <option value="" className="text-gray-500">{field.placeholder}</option>
            {field.options?.map((opt) => (
              <option key={opt} value={opt} className="text-gray-900">{opt}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      );
    }

    if (field.type === 'date' || field.type === 'datetime-local') {
      return (
        <div key={field.id} className="relative">
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type={field.type}
            value={value}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            min={field.type === 'date' ? today : undefined}
            placeholder={field.placeholder}
            className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 hover:border-gray-300 transition-colors"
          />
        </div>
      );
    }

    // Default text input
    return (
      <div key={field.id} className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={value}
          onChange={(e) => handleInputChange(field.id, e.target.value)}
          placeholder={field.placeholder}
          className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 hover:border-gray-300 transition-colors"
        />
      </div>
    );
  };

  // Safety check - if no config or fields, show error state
  if (!activeConfig || !activeConfig.fields) {
    return (
      <div className="w-full bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
        <p className="text-gray-600">Unable to load search form. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Tabs - Single row, no wrapping */}
      <div className="flex border-b border-gray-100 bg-gray-50/80 overflow-x-auto scrollbar-hide">
        {Object.values(SEARCH_CONFIG).map((service) => {
          if (!service) return null;
          const Icon = service.icon || Plane;
          const isActive = activeTab === service.id;
          
          return (
            <button
              key={service.id}
              onClick={() => setActiveTab(service.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all relative flex-shrink-0 ${
                isActive 
                  ? 'text-blue-600 bg-white' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
              <span>{service.label}</span>
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t" />
              )}
            </button>
          );
        })}
      </div>

      {/* Form */}
      <form onSubmit={handleSearch} className="p-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
          >
            {/* Swap button for flights */}
            {activeTab === 'flights' && (
              <div className="flex justify-end mb-2">
                <button
                  type="button"
                  onClick={handleSwapCities}
                  className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Swap cities"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Fields grid - max 2 rows */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {activeConfig.fields.map((field) => (
                <div key={field.id} className={field.colSpan || 'col-span-1'}>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  {renderField(field)}
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* CTA Button - Right aligned */}
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm hover:shadow"
          >
            <Search className="w-4 h-4" />
            <span>{activeConfig.buttonText || 'Search'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default DynamicSearchPanel;