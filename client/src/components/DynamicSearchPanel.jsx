import React, { useState } from 'react';
import { 
  Plane, Building2, Package, Train, Bus, Car,
  MapPin, Calendar, Users, Search, Clock, ArrowRightLeft,
  ChevronDown
} from 'lucide-react';

const DynamicSearchPanel = () => {
  const [activeTab, setActiveTab] = useState('packages');
  const [showTravelersDropdown, setShowTravelersDropdown] = useState(false);
  
  const [formData, setFormData] = useState({
    flights: {
      tripType: 'roundtrip',
      from: { city: 'Delhi', code: 'DEL, Delhi Airport India' },
      to: { city: 'Mumbai', code: 'BOM, Chhatrapati Shivaji International Airport' },
      departureDate: '',
      returnDate: '',
      travelers: { adults: 1, children: 0, infants: 0 },
      class: 'Economy'
    },
    hotels: {
      destination: '',
      checkIn: '',
      checkOut: '',
      rooms: 1,
      guests: 2
    },
    packages: {
      destination: '',
      startDate: '',
      duration: '5',
      travelers: 2
    },
    trains: {
      from: '',
      to: '',
      departureDate: '',
      class: 'Sleeper'
    },
    buses: {
      from: '',
      to: '',
      departureDate: '',
      seats: 1
    },
    cabs: {
      tripType: 'outstation',
      pickupLocation: '',
      dropLocation: '',
      pickupDate: '',
      pickupTime: '12:00'
    }
  });

  const tabs = [
    { id: 'flights', label: 'Flights', icon: Plane },
    { id: 'hotels', label: 'Hotels', icon: Building2 },
    { id: 'packages', label: 'Holiday Packages', icon: Package },
    { id: 'trains', label: 'Trains', icon: Train },
    { id: 'buses', label: 'Buses', icon: Bus },
    { id: 'cabs', label: 'Cabs', icon: Car }
  ];

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [field]: value
      }
    }));
  };

  const handleSearch = () => {
    console.log(`Searching ${activeTab}:`, formData[activeTab]);
  };

  const getSearchButtonText = () => {
    const texts = {
      flights: 'Search Flights',
      hotels: 'Search Hotels',
      packages: 'Search Packages',
      trains: 'Search Trains',
      buses: 'Search Buses',
      cabs: 'Search Cabs'
    };
    return texts[activeTab];
  };

  const getTotalTravelers = () => {
    const { adults, children, infants } = formData.flights.travelers;
    return adults + children + infants;
  };

  const handleSwapCities = () => {
    const temp = formData.flights.from;
    updateFormData('from', formData.flights.to);
    updateFormData('to', temp);
  };

  const FlightsForm = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex gap-6">
        {[
          { value: 'oneway', label: 'One Way' },
          { value: 'roundtrip', label: 'Round Trip' },
          { value: 'multicity', label: 'Multi City' }
        ].map((type) => (
          <label key={type.value} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="tripType"
              value={type.value}
              checked={formData.flights.tripType === type.value}
              onChange={(e) => updateFormData('tripType', e.target.value)}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">{type.label}</span>
          </label>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-3">
          <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">From</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={formData.flights.from.city}
              onChange={(e) => updateFormData('from', { ...formData.flights.from, city: e.target.value })}
              className="w-full pl-12 pr-4 pt-3 pb-2 border-2 border-gray-200 rounded-lg text-gray-900 font-bold text-xl focus:border-blue-500 focus:outline-none transition-colors"
              placeholder="Delhi"
            />
            <div className="text-xs text-gray-500 mt-1 px-12 truncate">
              {formData.flights.from.code}
            </div>
          </div>
        </div>

        <div className="md:col-span-1 flex items-center justify-center pt-8">
          <button
            onClick={handleSwapCities}
            className="p-2.5 bg-white border-2 border-gray-300 rounded-full hover:bg-blue-50 hover:border-blue-500 transition-all"
          >
            <ArrowRightLeft className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="md:col-span-3">
          <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">To</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={formData.flights.to.city}
              onChange={(e) => updateFormData('to', { ...formData.flights.to, city: e.target.value })}
              className="w-full pl-12 pr-4 pt-3 pb-2 border-2 border-gray-200 rounded-lg text-gray-900 font-bold text-xl focus:border-blue-500 focus:outline-none transition-colors"
              placeholder="Mumbai"
            />
            <div className="text-xs text-gray-500 mt-1 px-12 truncate">
              {formData.flights.to.code}
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide flex items-center gap-1">
            Departure
            <ChevronDown className="w-4 h-4" />
          </label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              value={formData.flights.departureDate}
              onChange={(e) => updateFormData('departureDate', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-lg text-gray-600 font-medium focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {formData.flights.tripType === 'roundtrip' && (
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide flex items-center gap-1">
              Return
              <ChevronDown className="w-4 h-4" />
            </label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="date"
                value={formData.flights.returnDate}
                onChange={(e) => updateFormData('returnDate', e.target.value)}
                min={formData.flights.departureDate || new Date().toISOString().split('T')[0]}
                className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-lg text-gray-600 font-medium focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
          </div>
        )}

        <div className="md:col-span-1 relative">
          <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide flex items-center gap-1">
            Travelers
            <ChevronDown className="w-4 h-4" />
          </label>
          <div className="relative">
            <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <button
              type="button"
              onClick={() => setShowTravelersDropdown(!showTravelersDropdown)}
              className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-lg text-gray-800 font-medium text-left focus:border-blue-500 focus:outline-none transition-colors"
            >
              {getTotalTravelers()} {getTotalTravelers() === 1 ? 'Traveler' : 'Travelers'}
            </button>

            {showTravelersDropdown && (
              <div className="absolute top-full mt-2 right-0 w-80 bg-white border-2 border-gray-200 rounded-lg shadow-xl z-50 p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">Adults</div>
                      <div className="text-xs text-gray-500">12+ years</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateFormData('travelers', {
                          ...formData.flights.travelers,
                          adults: Math.max(1, formData.flights.travelers.adults - 1)
                        })}
                        className="w-8 h-8 border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-50"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-semibold">{formData.flights.travelers.adults}</span>
                      <button
                        onClick={() => updateFormData('travelers', {
                          ...formData.flights.travelers,
                          adults: formData.flights.travelers.adults + 1
                        })}
                        className="w-8 h-8 border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-50"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">Children</div>
                      <div className="text-xs text-gray-500">2-12 years</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateFormData('travelers', {
                          ...formData.flights.travelers,
                          children: Math.max(0, formData.flights.travelers.children - 1)
                        })}
                        className="w-8 h-8 border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-50"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-semibold">{formData.flights.travelers.children}</span>
                      <button
                        onClick={() => updateFormData('travelers', {
                          ...formData.flights.travelers,
                          children: formData.flights.travelers.children + 1
                        })}
                        className="w-8 h-8 border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-50"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <label className="block text-sm font-semibold mb-2">Travel Class</label>
                    <select
                      value={formData.flights.class}
                      onChange={(e) => updateFormData('class', e.target.value)}
                      className="w-full p-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    >
                      <option value="Economy">Economy</option>
                      <option value="Premium Economy">Premium Economy</option>
                      <option value="Business">Business</option>
                      <option value="First">First Class</option>
                    </select>
                  </div>

                  <button
                    onClick={() => setShowTravelersDropdown(false)}
                    className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const HotelsForm = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fadeIn">
      <div>
        <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">Destination</label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={formData.hotels.destination}
            onChange={(e) => updateFormData('destination', e.target.value)}
            placeholder="e.g. Goa, Dubai"
            className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-lg text-gray-800 font-medium placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">Check-in</label>
        <div className="relative">
          <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="date"
            value={formData.hotels.checkIn}
            onChange={(e) => updateFormData('checkIn', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-lg text-gray-600 font-medium focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">Check-out</label>
        <div className="relative">
          <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="date"
            value={formData.hotels.checkOut}
            onChange={(e) => updateFormData('checkOut', e.target.value)}
            min={formData.hotels.checkIn || new Date().toISOString().split('T')[0]}
            className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-lg text-gray-600 font-medium focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">Rooms & Guests</label>
        <div className="relative">
          <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={`${formData.hotels.rooms}-${formData.hotels.guests}`}
            onChange={(e) => {
              const [rooms, guests] = e.target.value.split('-');
              updateFormData('rooms', parseInt(rooms));
              updateFormData('guests', parseInt(guests));
            }}
            className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-lg text-gray-800 font-medium focus:border-blue-500 focus:outline-none appearance-none cursor-pointer transition-colors"
          >
            <option value="1-1">1 Room, 1 Guest</option>
            <option value="1-2">1 Room, 2 Guests</option>
            <option value="2-2">2 Rooms, 2 Guests</option>
            <option value="2-4">2 Rooms, 4 Guests</option>
          </select>
        </div>
      </div>
    </div>
  );

  const PackagesForm = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fadeIn">
      <div>
        <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">Destination</label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={formData.packages.destination}
            onChange={(e) => updateFormData('destination', e.target.value)}
            placeholder="e.g. Dubai, Bali"
            className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-lg text-gray-800 font-medium placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">Start Date</label>
        <div className="relative">
          <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="date"
            value={formData.packages.startDate}
            onChange={(e) => updateFormData('startDate', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-lg text-gray-600 font-medium focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">Duration</label>
        <div className="relative">
          <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={formData.packages.duration}
            onChange={(e) => updateFormData('duration', e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-lg text-gray-800 font-medium focus:border-blue-500 focus:outline-none appearance-none cursor-pointer transition-colors"
          >
            <option value="3">3 Days / 2 Nights</option>
            <option value="5">5 Days / 4 Nights</option>
            <option value="7">7 Days / 6 Nights</option>
            <option value="10">10 Days / 9 Nights</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">Travelers</label>
        <div className="relative">
          <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={formData.packages.travelers}
            onChange={(e) => updateFormData('travelers', parseInt(e.target.value))}
            className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-lg text-gray-800 font-medium focus:border-blue-500 focus:outline-none appearance-none cursor-pointer transition-colors"
          >
            {[1, 2, 3, 4, 5, 6].map(num => (
              <option key={num} value={num}>{num} Traveler{num > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  const TrainsForm = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fadeIn">
      <div>
        <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">From</label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={formData.trains.from}
            onChange={(e) => updateFormData('from', e.target.value)}
            placeholder="Enter station"
            className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-lg text-gray-800 font-medium placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">To</label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={formData.trains.to}
            onChange={(e) => updateFormData('to', e.target.value)}
            placeholder="Enter station"
            className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-lg text-gray-800 font-medium placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">Travel Date</label>
        <div className="relative">
          <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="date"
            value={formData.trains.departureDate}
            onChange={(e) => updateFormData('departureDate', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-lg text-gray-600 font-medium focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">Class</label>
        <select
          value={formData.trains.class}
          onChange={(e) => updateFormData('class', e.target.value)}
          className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-lg text-gray-800 font-medium focus:border-blue-500 focus:outline-none appearance-none cursor-pointer transition-colors"
        >
          <option value="Sleeper">Sleeper (SL)</option>
          <option value="3AC">AC 3 Tier (3A)</option>
          <option value="2AC">AC 2 Tier (2A)</option>
          <option value="1AC">AC 1st Class (1A)</option>
        </select>
      </div>
    </div>
  );

  const BusesForm = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fadeIn">
      <div>
        <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">From</label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={formData.buses.from}
            onChange={(e) => updateFormData('from', e.target.value)}
            placeholder="Enter city"
            className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-lg text-gray-800 font-medium placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">To</label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={formData.buses.to}
            onChange={(e) => updateFormData('to', e.target.value)}
            placeholder="Enter city"
            className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-lg text-gray-800 font-medium placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">Travel Date</label>
        <div className="relative">
          <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="date"
            value={formData.buses.departureDate}
            onChange={(e) => updateFormData('departureDate', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-lg text-gray-600 font-medium focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">Seats</label>
        <div className="relative">
          <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={formData.buses.seats}
            onChange={(e) => updateFormData('seats', parseInt(e.target.value))}
            className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-lg text-gray-800 font-medium focus:border-blue-500 focus:outline-none appearance-none cursor-pointer transition-colors"
          >
            {[1, 2, 3, 4, 5, 6].map(num => (
              <option key={num} value={num}>{num} Seat{num > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  const CabsForm = () => (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex gap-6">
        {[
          { value: 'outstation', label: 'Outstation' },
          { value: 'local', label: 'Local' },
          { value: 'airport', label: 'Airport' }
        ].map((type) => (
          <label key={type.value} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="cabTripType"
              value={type.value}
              checked={formData.cabs.tripType === type.value}
              onChange={(e) => updateFormData('tripType', e.target.value)}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">{type.label}</span>
          </label>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">Pickup Location</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={formData.cabs.pickupLocation}
              onChange={(e) => updateFormData('pickupLocation', e.target.value)}
              placeholder="Enter location"
              className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-lg text-gray-800 font-medium placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">Drop Location</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={formData.cabs.dropLocation}
              onChange={(e) => updateFormData('dropLocation', e.target.value)}
              placeholder="Enter location"
              className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-lg text-gray-800 font-medium placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">Pickup Date</label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              value={formData.cabs.pickupDate}
              onChange={(e) => updateFormData('pickupDate', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-lg text-gray-600 font-medium focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">Pickup Time</label>
          <div className="relative">
            <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="time"
              value={formData.cabs.pickupTime}
              onChange={(e) => updateFormData('pickupTime', e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-lg text-gray-800 font-medium focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderForm = () => {
    switch (activeTab) {
      case 'flights': return <FlightsForm />;
      case 'hotels': return <HotelsForm />;
      case 'packages': return <PackagesForm />;
      case 'trains': return <TrainsForm />;
      case 'buses': return <BusesForm />;
      case 'cabs': return <CabsForm />;
      default: return <PackagesForm />;
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden shadow-lg">
          <div className="flex border-b-2 border-gray-200 overflow-x-auto scrollbar-hide bg-gray-50">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 flex items-center gap-2.5 px-6 py-4 font-semibold text-base transition-all duration-200 relative whitespace-nowrap ${
                    isActive
                      ? 'text-blue-600 bg-white'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-white/50'
                  }`}
                >
                  <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                  <span>{tab.label}</span>
                  
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600"></div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="p-8">
            {renderForm()}

            <div className="mt-8">
              <button
                onClick={handleSearch}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-12 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-3"
              >
                <Search className="w-6 h-6" />
                {getSearchButtonText()}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default DynamicSearchPanel;