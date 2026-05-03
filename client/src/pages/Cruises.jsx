// /src/pages/Cruises.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Ship, Anchor, MapPin, Calendar, Users, Clock,
  Star, Heart, Share2, ChevronRight, ChevronLeft,
  Search, Filter, X, CheckCircle, AlertCircle,
  Wifi, Coffee, Utensils, Dumbbell, Waves,
  Umbrella, Sunset, Wind, Thermometer, Droplets,
  Gift, Award, TrendingUp, Camera, Map, Compass,
  Phone, Mail, MessageSquare, Download, Printer,
  SlidersHorizontal, ArrowUpDown, Bed, Bath,
  BarChart, Package, CreditCard, Shield,
  Bell, BellOff, RefreshCw
} from 'lucide-react';
import { useAuth } from '../context/useAuth';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { toast } from 'react-hot-toast';

// Move all mock data outside the component and export it
export const mockShips = [
  { id: 'royal-caribbean', name: 'Royal Caribbean' },
  { id: 'msc', name: 'MSC Cruises' },
  { id: 'norwegian', name: 'Norwegian Cruise Line' },
  { id: 'carnival', name: 'Carnival Cruise Line' },
  { id: 'princess', name: 'Princess Cruises' },
  { id: 'celebrity', name: 'Celebrity Cruises' },
  { id: 'viking', name: 'Viking Cruises' },
  { id: 'seabourn', name: 'Seabourn Cruises' }
];

export const mockDestinations = [
  'Caribbean',
  'Mediterranean',
  'Alaska',
  'Asia',
  'South Pacific',
  'Northern Europe',
  'South America',
  'Africa',
  'Middle East',
  'Antarctica'
];

export const mockCruises = [
  {
    id: 'CR001',
    name: 'Caribbean Paradise',
    ship: 'Symphony of the Seas',
    line: 'Royal Caribbean',
    destination: 'Caribbean',
    departurePort: 'Miami, Florida',
    route: ['Miami', 'Nassau', 'CocoCay', 'Miami'],
    duration: '7 nights',
    departureDate: '2024-04-15',
    returnDate: '2024-04-22',
    price: 1299,
    originalPrice: 1599,
    discount: 19,
    rating: 4.8,
    reviews: 2341,
    cabins: {
      interior: { price: 899, amenities: ['Twin Beds', 'TV', 'Private Bath'] },
      oceanview: { price: 1099, amenities: ['Ocean View', 'Twin Beds', 'TV', 'Private Bath'] },
      balcony: { price: 1299, amenities: ['Private Balcony', 'Queen Bed', 'TV', 'Private Bath'] },
      suite: { price: 2499, amenities: ['Large Balcony', 'King Bed', 'Living Area', 'Jacuzzi', 'Butler Service'] }
    },
    amenities: [
      'Multiple Pools',
      'Water Slides',
      'Spa & Fitness',
      'Broadway Shows',
      'Casino',
      'Kids Club',
      'Fine Dining',
      'Bars & Lounges',
      'Sports Court',
      'Movie Theater'
    ],
    inclusions: [
      'All meals in main dining',
      'Entertainment shows',
      'Kids activities',
      'Fitness center',
      'Pool access',
      'Non-alcoholic beverages'
    ],
    exclusions: [
      'Alcoholic beverages',
      'Specialty dining',
      'Shore excursions',
      'Spa services',
      'Gratuities',
      'Wi-Fi package'
    ],
    itinerary: [
      { day: 1, port: 'Miami, Florida', arrival: '4:00 PM', departure: '—', activities: ['Embarkation', 'Welcome Aboard', 'Sail Away Party'] },
      { day: 2, port: 'At Sea', arrival: '—', departure: '—', activities: ['Pool Day', 'Entertainment', 'Dining', 'Casino Night'] },
      { day: 3, port: 'Nassau, Bahamas', arrival: '8:00 AM', departure: '6:00 PM', activities: ['Beach Day', 'Atlantis Resort', 'Shopping', 'Local Cuisine'] },
      { day: 4, port: 'CocoCay, Bahamas', arrival: '7:00 AM', departure: '5:00 PM', activities: ['Private Island', 'Water Park', 'Snorkeling', 'BBQ Lunch'] },
      { day: 5, port: 'At Sea', arrival: '—', departure: '—', activities: ['Relaxation', 'Activities', 'Shows', 'Gala Dinner'] },
      { day: 6, port: 'Miami, Florida', arrival: '7:00 AM', departure: '—', activities: ['Breakfast', 'Disembarkation'] }
    ],
    images: [
      'https://images.pexels.com/photos/1004584/pexels-photo-1004584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2387871/pexels-photo-2387871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    features: [
      { icon: 'Users', label: 'Capacity', value: '5,400 passengers' },
      { icon: 'Anchor', label: 'Tonnage', value: '228,081 GT' },
      { icon: 'Clock', label: 'Built', value: '2018' },
      { icon: 'Award', label: 'Rating', value: '4.8/5' }
    ],
    highlights: [
      'Largest ship in the world',
      'Ultimate family vacation',
      'Broadway-style entertainment',
      'World-class dining options'
    ],
    popular: true
  },
  {
    id: 'CR002',
    name: 'Mediterranean Explorer',
    ship: 'MSC Grandiosa',
    line: 'MSC Cruises',
    destination: 'Mediterranean',
    departurePort: 'Barcelona, Spain',
    route: ['Barcelona', 'Marseille', 'Genoa', 'Naples', 'Palma de Mallorca', 'Barcelona'],
    duration: '7 nights',
    departureDate: '2024-05-10',
    returnDate: '2024-05-17',
    price: 1499,
    originalPrice: 1499,
    discount: 0,
    rating: 4.7,
    reviews: 1876,
    cabins: {
      interior: { price: 999, amenities: ['Twin Beds', 'TV', 'Private Bath'] },
      oceanview: { price: 1199, amenities: ['Ocean View', 'Twin Beds', 'TV', 'Private Bath'] },
      balcony: { price: 1499, amenities: ['Private Balcony', 'Queen Bed', 'TV', 'Private Bath'] },
      suite: { price: 2799, amenities: ['Large Balcony', 'King Bed', 'Living Area', 'Jacuzzi', 'Butler Service'] }
    },
    amenities: [
      'Mediterranean Pool',
      'Aquapark',
      'Spa & Wellness',
      'Broadway Theatre',
      'Casino',
      'Kids Area',
      'International Dining',
      'Sunset Bar',
      'Golf Simulator',
      'Virtual Reality Zone'
    ],
    inclusions: [
      'All meals in main dining',
      'Entertainment',
      'Pool access',
      'Kids club',
      'Fitness center'
    ],
    exclusions: [
      'Drinks package',
      'Specialty restaurants',
      'Shore excursions',
      'Spa treatments',
      'Wi-Fi',
      'Gratuities'
    ],
    itinerary: [
      { day: 1, port: 'Barcelona, Spain', arrival: '6:00 PM', departure: '—', activities: ['Embarkation', 'Welcome Dinner', 'Flamingo Show'] },
      { day: 2, port: 'Marseille, France', arrival: '9:00 AM', departure: '6:00 PM', activities: ['City Tour', 'French Cuisine', 'Notre-Dame'] },
      { day: 3, port: 'Genoa, Italy', arrival: '8:00 AM', departure: '6:00 PM', activities: ['Historic Center', 'Aquarium', 'Pesto Making'] },
      { day: 4, port: 'Naples, Italy', arrival: '7:00 AM', departure: '7:00 PM', activities: ['Pompeii Tour', 'Pizza Making', 'Amalfi Coast'] },
      { day: 5, port: 'Palma de Mallorca', arrival: '9:00 AM', departure: '6:00 PM', activities: ['Beach Day', 'Cathedral Visit', 'Pearl Shopping'] },
      { day: 6, port: 'At Sea', arrival: '—', departure: '—', activities: ['Relaxation', 'Entertainment', 'Gala Dinner'] },
      { day: 7, port: 'Barcelona, Spain', arrival: '7:00 AM', departure: '—', activities: ['Breakfast', 'Disembarkation'] }
    ],
    images: [
      'https://images.pexels.com/photos/221471/pexels-photo-221471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    features: [
      { icon: 'Users', label: 'Capacity', value: '6,300 passengers' },
      { icon: 'Anchor', label: 'Tonnage', value: '181,541 GT' },
      { icon: 'Clock', label: 'Built', value: '2019' },
      { icon: 'Award', label: 'Rating', value: '4.7/5' }
    ],
    highlights: [
      'Mediterranean highlights',
      'UNESCO World Heritage sites',
      'Gourmet dining experience',
      'Modern luxury ship'
    ]
  },
  {
    id: 'CR003',
    name: 'Alaskan Adventure',
    ship: 'Norwegian Bliss',
    line: 'Norwegian Cruise Line',
    destination: 'Alaska',
    departurePort: 'Seattle, Washington',
    route: ['Seattle', 'Juneau', 'Skagway', 'Glacier Bay', 'Ketchikan', 'Victoria', 'Seattle'],
    duration: '7 nights',
    departureDate: '2024-06-15',
    returnDate: '2024-06-22',
    price: 1799,
    originalPrice: 2099,
    discount: 14,
    rating: 4.9,
    reviews: 1543,
    cabins: {
      interior: { price: 1299, amenities: ['Twin Beds', 'TV', 'Private Bath'] },
      oceanview: { price: 1499, amenities: ['Ocean View', 'Twin Beds', 'TV', 'Private Bath'] },
      balcony: { price: 1799, amenities: ['Private Balcony', 'Queen Bed', 'TV', 'Private Bath'] },
      suite: { price: 3299, amenities: ['Large Balcony', 'King Bed', 'Living Area', 'Jacuzzi', 'Butler Service'] }
    },
    amenities: [
      'Observation Lounge',
      'Racing Track',
      'Laser Tag',
      'Water Slides',
      'Spa & Salon',
      'Comedy Club',
      'Brew Pub',
      'Fitness Center',
      'Jogging Track',
      'Outdoor Cinema'
    ],
    inclusions: [
      'All meals',
      'Entertainment',
      'Fitness center',
      'Kids programs',
      'Pool access'
    ],
    exclusions: [
      'Beverages',
      'Specialty dining',
      'Shore excursions',
      'Gratuities',
      'Wi-Fi',
      'Spa services'
    ],
    itinerary: [
      { day: 1, port: 'Seattle, Washington', arrival: '4:00 PM', departure: '—', activities: ['Embarkation', 'Sail Away Party'] },
      { day: 2, port: 'At Sea', arrival: '—', departure: '—', activities: ['Scenic Cruising', 'Onboard Activities', 'Welcome Show'] },
      { day: 3, port: 'Juneau, Alaska', arrival: '1:00 PM', departure: '9:00 PM', activities: ['Mendenhall Glacier', 'Whale Watching', 'Gold Creek'] },
      { day: 4, port: 'Skagway, Alaska', arrival: '7:00 AM', departure: '8:30 PM', activities: ['White Pass Railway', 'Gold Rush Tour', 'Dog Sledding'] },
      { day: 5, port: 'Glacier Bay', arrival: '6:00 AM', departure: '3:00 PM', activities: ['Glacier Viewing', 'Wildlife Spotting', 'Ranger Program'] },
      { day: 6, port: 'Ketchikan, Alaska', arrival: '10:00 AM', departure: '6:00 PM', activities: ['Creek Street', 'Lumberjack Show', 'Salmon Fishing'] },
      { day: 7, port: 'Victoria, BC', arrival: '6:00 PM', departure: '11:59 PM', activities: ['Butchart Gardens', 'City Tour', 'High Tea'] },
      { day: 8, port: 'Seattle, Washington', arrival: '6:00 AM', departure: '—', activities: ['Breakfast', 'Disembarkation'] }
    ],
    images: [
      'https://images.pexels.com/photos/2388049/pexels-photo-2388049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/534403/pexels-photo-534403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/210243/pexels-photo-210243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1183985/pexels-photo-1183985.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    features: [
      { icon: 'Users', label: 'Capacity', value: '4,004 passengers' },
      { icon: 'Anchor', label: 'Tonnage', value: '168,028 GT' },
      { icon: 'Clock', label: 'Built', value: '2018' },
      { icon: 'Award', label: 'Rating', value: '4.9/5' }
    ],
    highlights: [
      'Glacier Bay National Park',
      'Wildlife viewing',
      'Alaskan wilderness',
      'Luxury cruise experience'
    ],
    popular: true
  },
  {
    id: 'CR004',
    name: 'Greek Isles Explorer',
    ship: 'Celebrity Beyond',
    line: 'Celebrity Cruises',
    destination: 'Mediterranean',
    departurePort: 'Athens, Greece',
    route: ['Athens', 'Santorini', 'Mykonos', 'Rhodes', 'Ephesus', 'Athens'],
    duration: '10 nights',
    departureDate: '2024-07-08',
    returnDate: '2024-07-18',
    price: 2499,
    originalPrice: 2999,
    discount: 17,
    rating: 4.8,
    reviews: 987,
    cabins: {
      interior: { price: 1799, amenities: ['Twin Beds', 'TV', 'Private Bath'] },
      oceanview: { price: 1999, amenities: ['Ocean View', 'Twin Beds', 'TV', 'Private Bath'] },
      balcony: { price: 2499, amenities: ['Private Balcony', 'Queen Bed', 'TV', 'Private Bath'] },
      suite: { price: 4499, amenities: ['Large Balcony', 'King Bed', 'Living Area', 'Jacuzzi', 'Butler Service'] }
    },
    amenities: [
      'Infinity Pool',
      'Rooftop Garden',
      'Spa & Wellness',
      'Theatre',
      'Casino',
      'Kids Club',
      'Fine Dining',
      'Sunset Bar',
      'Art Gallery',
      'Culinary Studio'
    ],
    inclusions: [
      'All meals',
      'Premium beverages',
      'Wi-Fi',
      'Gratuities',
      'Entertainment',
      'Fitness classes'
    ],
    exclusions: [
      'Shore excursions',
      'Spa treatments',
      'Specialty dining',
      'Personal shopping'
    ],
    itinerary: [
      { day: 1, port: 'Athens, Greece', arrival: '6:00 PM', departure: '—', activities: ['Embarkation', 'Welcome Dinner'] },
      { day: 2, port: 'At Sea', arrival: '—', departure: '—', activities: ['Onboard Activities', 'Spa Day'] },
      { day: 3, port: 'Santorini, Greece', arrival: '8:00 AM', departure: '10:00 PM', activities: ['Caldera Views', 'Oia Sunset', 'Wine Tasting'] },
      { day: 4, port: 'Mykonos, Greece', arrival: '8:00 AM', departure: '11:00 PM', activities: ['Windmills', 'Beach Day', 'Nightlife'] },
      { day: 5, port: 'Rhodes, Greece', arrival: '9:00 AM', departure: '6:00 PM', activities: ['Old Town', 'Palace', 'Beach'] },
      { day: 6, port: 'Ephesus, Turkey', arrival: '7:00 AM', departure: '5:00 PM', activities: ['Ancient Ruins', 'Library of Celsus', 'Bazaar'] },
      { day: 7, port: 'At Sea', arrival: '—', departure: '—', activities: ['Relaxation', 'Entertainment'] },
      { day: 8, port: 'Athens, Greece', arrival: '7:00 AM', departure: '—', activities: ['Disembarkation'] }
    ],
    images: [
      'https://images.pexels.com/photos/1643409/pexels-photo-1643409.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/161840/pexels-photo-161840.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/951531/pexels-photo-951531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1796736/pexels-photo-1796736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    features: [
      { icon: 'Users', label: 'Capacity', value: '3,260 passengers' },
      { icon: 'Anchor', label: 'Tonnage', value: '140,600 GT' },
      { icon: 'Clock', label: 'Built', value: '2022' },
      { icon: 'Award', label: 'Rating', value: '4.8/5' }
    ],
    highlights: [
      'Greek island paradise',
      'Ancient history tour',
      'Luxury modern ship',
      'Culinary experiences'
    ]
  },
  {
    id: 'CR005',
    name: 'Bahamas Celebration',
    ship: 'Carnival Magic',
    line: 'Carnival Cruise Line',
    destination: 'Caribbean',
    departurePort: 'Miami, Florida',
    route: ['Miami', 'Nassau', 'Freeport', 'Half Moon Cay', 'Miami'],
    duration: '5 nights',
    departureDate: '2024-05-20',
    returnDate: '2024-05-25',
    price: 899,
    originalPrice: 1099,
    discount: 18,
    rating: 4.6,
    reviews: 3241,
    cabins: {
      interior: { price: 599, amenities: ['Twin Beds', 'TV', 'Private Bath'] },
      oceanview: { price: 749, amenities: ['Ocean View', 'Twin Beds', 'TV', 'Private Bath'] },
      balcony: { price: 899, amenities: ['Private Balcony', 'Queen Bed', 'TV', 'Private Bath'] },
      suite: { price: 1599, amenities: ['Large Balcony', 'King Bed', 'Living Area', 'Jacuzzi', 'Butler Service'] }
    },
    amenities: [
      'WaterWorks',
      'Serenity Adult-Only Retreat',
      'Spa & Fitness',
      'Casino',
      'Kids Club',
      'Guy\'s Burger Joint',
      'BlueIguana Cantina',
      'RedFrog Pub'
    ],
    inclusions: [
      'All meals in main dining',
      'Entertainment shows',
      'Kids activities',
      'Fitness center',
      'Pool access'
    ],
    exclusions: [
      'Alcoholic beverages',
      'Specialty dining',
      'Shore excursions',
      'Gratuities',
      'Wi-Fi'
    ],
    itinerary: [
      { day: 1, port: 'Miami, Florida', arrival: '4:00 PM', departure: '—', activities: ['Embarkation', 'Welcome Aboard'] },
      { day: 2, port: 'Nassau, Bahamas', arrival: '8:00 AM', departure: '6:00 PM', activities: ['Atlantis Resort', 'Straw Market', 'Junkanoo Beach'] },
      { day: 3, port: 'Freeport, Bahamas', arrival: '7:00 AM', departure: '4:00 PM', activities: ['Port Lucaya', 'Garden of Groves', 'Beach Day'] },
      { day: 4, port: 'Half Moon Cay', arrival: '8:00 AM', departure: '4:00 PM', activities: ['Private Island', 'Horseback Riding', 'Snorkeling'] },
      { day: 5, port: 'Miami, Florida', arrival: '8:00 AM', departure: '—', activities: ['Breakfast', 'Disembarkation'] }
    ],
    images: [
      'https://images.pexels.com/photos/29673827/pexels-photo-29673827/free-photo-of-scenic-coastal-view-of-tropical-beach-and-palms.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2387871/pexels-photo-2387871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    features: [
      { icon: 'Users', label: 'Capacity', value: '4,000 passengers' },
      { icon: 'Anchor', label: 'Tonnage', value: '130,000 GT' },
      { icon: 'Clock', label: 'Built', value: '2011' },
      { icon: 'Award', label: 'Rating', value: '4.6/5' }
    ],
    highlights: [
      'Fun-filled family cruise',
      'Bahamian paradise',
      'Water slides and pools',
      'Casino and nightlife'
    ],
    popular: true
  },
  {
    id: 'CR006',
    name: 'Norwegian Fjords Expedition',
    ship: 'Viking Venus',
    line: 'Viking Cruises',
    destination: 'Northern Europe',
    departurePort: 'Bergen, Norway',
    route: ['Bergen', 'Flam', 'Geiranger', 'Alesund', 'Stavanger', 'Bergen'],
    duration: '8 nights',
    departureDate: '2024-07-10',
    returnDate: '2024-07-18',
    price: 3899,
    originalPrice: 4499,
    discount: 13,
    rating: 4.9,
    reviews: 876,
    cabins: {
      interior: { price: 2899, amenities: ['Twin Beds', 'TV', 'Private Bath'] },
      oceanview: { price: 3299, amenities: ['Ocean View', 'Twin Beds', 'TV', 'Private Bath'] },
      balcony: { price: 3899, amenities: ['Private Balcony', 'Queen Bed', 'TV', 'Private Bath'] },
      suite: { price: 5899, amenities: ['Large Balcony', 'King Bed', 'Living Area', 'Jacuzzi', 'Butler Service'] }
    },
    amenities: [
      'Infinity Pool',
      'Spa & Wellness',
      'Explorer Lounge',
      'Fine Dining',
      'Library',
      'Cinema',
      'Observation Deck'
    ],
    inclusions: [
      'All meals',
      'Premium beverages',
      'Wi-Fi',
      'Excursions',
      'Gratuities',
      'Spa access'
    ],
    exclusions: [
      'Personal expenses',
      'Premium shore excursions'
    ],
    itinerary: [
      { day: 1, port: 'Bergen, Norway', arrival: '5:00 PM', departure: '—', activities: ['Embarkation', 'Welcome Dinner'] },
      { day: 2, port: 'Flam, Norway', arrival: '8:00 AM', departure: '5:00 PM', activities: ['Flam Railway', 'Fjord Cruise'] },
      { day: 3, port: 'Geiranger, Norway', arrival: '9:00 AM', departure: '6:00 PM', activities: ['Geirangerfjord', 'Waterfalls'] },
      { day: 4, port: 'Alesund, Norway', arrival: '8:00 AM', departure: '5:00 PM', activities: ['Art Nouveau Architecture', 'Mount Aksla'] },
      { day: 5, port: 'Stavanger, Norway', arrival: '9:00 AM', departure: '5:00 PM', activities: ['Pulpit Rock', 'Old Town'] },
      { day: 6, port: 'At Sea', arrival: '—', departure: '—', activities: ['Scenic Cruising', 'Entertainment'] },
      { day: 7, port: 'Bergen, Norway', arrival: '8:00 AM', departure: '—', activities: ['Disembarkation'] }
    ],
    images: [
      'https://images.pexels.com/photos/2388049/pexels-photo-2388049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/534403/pexels-photo-534403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/210243/pexels-photo-210243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1183985/pexels-photo-1183985.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    features: [
      { icon: 'Users', label: 'Capacity', value: '930 passengers' },
      { icon: 'Anchor', label: 'Tonnage', value: '47,800 GT' },
      { icon: 'Clock', label: 'Built', value: '2021' },
      { icon: 'Award', label: 'Rating', value: '4.9/5' }
    ],
    highlights: [
      'Norwegian fjords',
      'Scenic cruising',
      'Inclusive luxury',
      'Cultural immersion'
    ]
  },
  {
    id: 'CR007',
    name: 'Mexican Riviera',
    ship: 'Norwegian Joy',
    line: 'Norwegian Cruise Line',
    destination: 'South America',
    departurePort: 'Los Angeles, California',
    route: ['Los Angeles', 'Cabo San Lucas', 'Mazatlan', 'Puerto Vallarta', 'Los Angeles'],
    duration: '5 nights',
    departureDate: '2024-08-15',
    returnDate: '2024-08-20',
    price: 999,
    originalPrice: 1199,
    discount: 17,
    rating: 4.5,
    reviews: 2341,
    cabins: {
      interior: { price: 699, amenities: ['Twin Beds', 'TV', 'Private Bath'] },
      oceanview: { price: 849, amenities: ['Ocean View', 'Twin Beds', 'TV', 'Private Bath'] },
      balcony: { price: 999, amenities: ['Private Balcony', 'Queen Bed', 'TV', 'Private Bath'] },
      suite: { price: 1899, amenities: ['Large Balcony', 'King Bed', 'Living Area', 'Jacuzzi', 'Butler Service'] }
    },
    amenities: [
      'Racing Track',
      'Laser Tag',
      'Water Slides',
      'Spa & Salon',
      'Comedy Club',
      'Brew Pub',
      'Fitness Center',
      'Outdoor Cinema'
    ],
    inclusions: [
      'All meals',
      'Entertainment',
      'Fitness center',
      'Kids programs',
      'Pool access'
    ],
    exclusions: [
      'Beverages',
      'Specialty dining',
      'Shore excursions',
      'Gratuities',
      'Wi-Fi'
    ],
    itinerary: [
      { day: 1, port: 'Los Angeles', arrival: '5:00 PM', departure: '—', activities: ['Embarkation'] },
      { day: 2, port: 'At Sea', arrival: '—', departure: '—', activities: ['Onboard Activities'] },
      { day: 3, port: 'Cabo San Lucas', arrival: '8:00 AM', departure: '6:00 PM', activities: ['El Arco', 'Lover\'s Beach', 'Snorkeling'] },
      { day: 4, port: 'Mazatlan', arrival: '8:00 AM', departure: '6:00 PM', activities: ['Old Town', 'Golden Zone'] },
      { day: 5, port: 'Puerto Vallarta', arrival: '8:00 AM', departure: '6:00 PM', activities: ['Malecon', 'Beach Day'] },
      { day: 6, port: 'Los Angeles', arrival: '8:00 AM', departure: '—', activities: ['Disembarkation'] }
    ],
    images: [
      'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1516776/pexels-photo-1516776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2387871/pexels-photo-2387871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    features: [
      { icon: 'Users', label: 'Capacity', value: '3,800 passengers' },
      { icon: 'Anchor', label: 'Tonnage', value: '167,725 GT' },
      { icon: 'Clock', label: 'Built', value: '2017' },
      { icon: 'Award', label: 'Rating', value: '4.5/5' }
    ],
    highlights: [
      'Mexican Riviera',
      'Beach paradise',
      'Adventure activities',
      'Entertainment'
    ]
  },
  {
    id: 'CR008',
    name: 'South Pacific Paradise',
    ship: 'Ovation of the Seas',
    line: 'Royal Caribbean',
    destination: 'South Pacific',
    departurePort: 'Sydney, Australia',
    route: ['Sydney', 'Fiji', 'Vanuatu', 'New Caledonia', 'Sydney'],
    duration: '12 nights',
    departureDate: '2024-09-05',
    returnDate: '2024-09-17',
    price: 2899,
    originalPrice: 3299,
    discount: 12,
    rating: 4.8,
    reviews: 1432,
    cabins: {
      interior: { price: 1899, amenities: ['Twin Beds', 'TV', 'Private Bath'] },
      oceanview: { price: 2199, amenities: ['Ocean View', 'Twin Beds', 'TV', 'Private Bath'] },
      balcony: { price: 2599, amenities: ['Private Balcony', 'Queen Bed', 'TV', 'Private Bath'] },
      suite: { price: 4299, amenities: ['Large Balcony', 'King Bed', 'Living Area', 'Jacuzzi', 'Butler Service'] }
    },
    amenities: [
      'Multiple Pools',
      'FlowRider Surf',
      'North Star',
      'SeaPlex',
      'Spa',
      'Casino',
      'Fine Dining'
    ],
    inclusions: [
      'All meals',
      'Entertainment',
      'Pool access',
      'Fitness center',
      'Kids club'
    ],
    exclusions: [
      'Beverages',
      'Specialty dining',
      'Shore excursions',
      'Gratuities',
      'Wi-Fi'
    ],
    itinerary: [
      { day: 1, port: 'Sydney, Australia', arrival: '7:00 PM', departure: '—', activities: ['Embarkation'] },
      { day: 2-4, port: 'At Sea', arrival: '—', departure: '—', activities: ['Onboard Activities'] },
      { day: 5, port: 'Fiji', arrival: '8:00 AM', departure: '6:00 PM', activities: ['Beach Day', 'Cultural Show'] },
      { day: 6, port: 'Vanuatu', arrival: '9:00 AM', departure: '6:00 PM', activities: ['Snorkeling', 'Volcano Tour'] },
      { day: 7, port: 'New Caledonia', arrival: '8:00 AM', departure: '6:00 PM', activities: ['Beach', 'Shopping'] },
      { day: 8-10, port: 'At Sea', arrival: '—', departure: '—', activities: ['Relaxation'] },
      { day: 11, port: 'Sydney, Australia', arrival: '6:00 AM', departure: '—', activities: ['Disembarkation'] }
    ],
    images: [
      'https://images.pexels.com/photos/1004584/pexels-photo-1004584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/221471/pexels-photo-221471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    features: [
      { icon: 'Users', label: 'Capacity', value: '4,900 passengers' },
      { icon: 'Anchor', label: 'Tonnage', value: '168,666 GT' },
      { icon: 'Clock', label: 'Built', value: '2016' },
      { icon: 'Award', label: 'Rating', value: '4.8/5' }
    ],
    highlights: [
      'South Pacific islands',
      'Tropical paradise',
      'Adventure activities',
      'Relaxation'
    ],
    popular: true
  },
  {
    id: 'CR009',
    name: 'Dubai & Oman Discovery',
    ship: 'MSC Opera',
    line: 'MSC Cruises',
    destination: 'Middle East',
    departurePort: 'Dubai, UAE',
    route: ['Dubai', 'Abu Dhabi', 'Muscat', 'Khasab', 'Dubai'],
    duration: '6 nights',
    departureDate: '2024-10-10',
    returnDate: '2024-10-16',
    price: 1399,
    originalPrice: 1699,
    discount: 18,
    rating: 4.6,
    reviews: 1123,
    cabins: {
      interior: { price: 899, amenities: ['Twin Beds', 'TV', 'Private Bath'] },
      oceanview: { price: 1099, amenities: ['Ocean View', 'Twin Beds', 'TV', 'Private Bath'] },
      balcony: { price: 1399, amenities: ['Private Balcony', 'Queen Bed', 'TV', 'Private Bath'] },
      suite: { price: 2499, amenities: ['Large Balcony', 'King Bed', 'Living Area', 'Jacuzzi', 'Butler Service'] }
    },
    amenities: [
      'Pool',
      'Spa',
      'Casino',
      'Fine Dining',
      'Shopping Arcade',
      'Kids Club'
    ],
    inclusions: [
      'All meals',
      'Entertainment',
      'Pool access',
      'Fitness center'
    ],
    exclusions: [
      'Beverages',
      'Shore excursions',
      'Gratuities',
      'Wi-Fi'
    ],
    itinerary: [
      { day: 1, port: 'Dubai, UAE', arrival: '8:00 PM', departure: '—', activities: ['Embarkation'] },
      { day: 2, port: 'Dubai', arrival: '8:00 AM', departure: '11:00 PM', activities: ['Burj Khalifa', 'Dubai Mall'] },
      { day: 3, port: 'Abu Dhabi', arrival: '9:00 AM', departure: '8:00 PM', activities: ['Sheikh Zayed Mosque', 'Ferrari World'] },
      { day: 4, port: 'Muscat, Oman', arrival: '8:00 AM', departure: '6:00 PM', activities: ['Sultan Qaboos Grand Mosque', 'Muttrah Souq'] },
      { day: 5, port: 'Khasab, Oman', arrival: '8:00 AM', departure: '5:00 PM', activities: ['Dhow Cruise', 'Snorkeling'] },
      { day: 6, port: 'Dubai', arrival: '9:00 AM', departure: '—', activities: ['Disembarkation'] }
    ],
    images: [
      'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1516776/pexels-photo-1516776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2387871/pexels-photo-2387871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    features: [
      { icon: 'Users', label: 'Capacity', value: '2,500 passengers' },
      { icon: 'Anchor', label: 'Tonnage', value: '65,000 GT' },
      { icon: 'Clock', label: 'Built', value: '2004' },
      { icon: 'Award', label: 'Rating', value: '4.6/5' }
    ],
    highlights: [
      'Middle Eastern luxury',
      'Modern architecture',
      'Cultural experience',
      'Shopping paradise'
    ]
  },
  {
    id: 'CR010',
    name: 'Antarctic Expedition',
    ship: 'Seabourn Venture',
    line: 'Seabourn Cruises',
    destination: 'Antarctica',
    departurePort: 'Ushuaia, Argentina',
    route: ['Ushuaia', 'Drake Passage', 'Antarctic Peninsula', 'South Shetland Islands', 'Ushuaia'],
    duration: '12 nights',
    departureDate: '2024-11-15',
    returnDate: '2024-11-27',
    price: 8999,
    originalPrice: 9999,
    discount: 10,
    rating: 4.9,
    reviews: 432,
    cabins: {
      interior: { price: 6999, amenities: ['Twin Beds', 'TV', 'Private Bath'] },
      oceanview: { price: 7999, amenities: ['Ocean View', 'Twin Beds', 'TV', 'Private Bath'] },
      balcony: { price: 8999, amenities: ['Private Balcony', 'Queen Bed', 'TV', 'Private Bath'] },
      suite: { price: 12999, amenities: ['Large Balcony', 'King Bed', 'Living Area', 'Jacuzzi', 'Butler Service'] }
    },
    amenities: [
      'Expedition Lounge',
      'Spa',
      'Observation Lounge',
      'Fine Dining',
      'Lecture Hall',
      'Zodiac Fleet'
    ],
    inclusions: [
      'All meals',
      'Premium beverages',
      'Wi-Fi',
      'Expedition gear',
      'Zodiac excursions',
      'Expert guides'
    ],
    exclusions: [
      'Airfare',
      'Travel insurance',
      'Personal expenses'
    ],
    itinerary: [
      { day: 1, port: 'Ushuaia, Argentina', arrival: '6:00 PM', departure: '—', activities: ['Embarkation', 'Expedition Briefing'] },
      { day: 2-3, port: 'Drake Passage', arrival: '—', departure: '—', activities: ['Wildlife Spotting', 'Lectures'] },
      { day: 4-8, port: 'Antarctic Peninsula', arrival: '8:00 AM', departure: '6:00 PM', activities: ['Zodiac Cruising', 'Penguin Colonies', 'Kayaking'] },
      { day: 9, port: 'South Shetland Islands', arrival: '8:00 AM', departure: '5:00 PM', activities: ['Whale Watching', 'Research Stations'] },
      { day: 10-11, port: 'Drake Passage', arrival: '—', departure: '—', activities: ['Lectures', 'Photo Workshops'] },
      { day: 12, port: 'Ushuaia', arrival: '8:00 AM', departure: '—', activities: ['Disembarkation'] }
    ],
    images: [
      'https://images.pexels.com/photos/2388049/pexels-photo-2388049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/534403/pexels-photo-534403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/210243/pexels-photo-210243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1183985/pexels-photo-1183985.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    features: [
      { icon: 'Users', label: 'Capacity', value: '264 passengers' },
      { icon: 'Anchor', label: 'Tonnage', value: '23,000 GT' },
      { icon: 'Clock', label: 'Built', value: '2022' },
      { icon: 'Award', label: 'Rating', value: '4.9/5' }
    ],
    highlights: [
      'Antarctic wilderness',
      'Wildlife encounters',
      'Expert expedition team',
      'Ultimate adventure'
    ]
  },
  {
    id: 'CR011',
    name: 'Hawaiian Islands Cruise',
    ship: 'Princess Cruises',
    line: 'Princess Cruises',
    destination: 'South Pacific',
    departurePort: 'Honolulu, Hawaii',
    route: ['Honolulu', 'Maui', 'Hawaii', 'Kauai', 'Honolulu'],
    duration: '7 nights',
    departureDate: '2024-12-05',
    returnDate: '2024-12-12',
    price: 1999,
    originalPrice: 2399,
    discount: 17,
    rating: 4.7,
    reviews: 1876,
    cabins: {
      interior: { price: 1299, amenities: ['Twin Beds', 'TV', 'Private Bath'] },
      oceanview: { price: 1599, amenities: ['Ocean View', 'Twin Beds', 'TV', 'Private Bath'] },
      balcony: { price: 1999, amenities: ['Private Balcony', 'Queen Bed', 'TV', 'Private Bath'] },
      suite: { price: 3499, amenities: ['Large Balcony', 'King Bed', 'Living Area', 'Jacuzzi', 'Butler Service'] }
    },
    amenities: [
      'Pools',
      'Spa',
      'Casino',
      'Fine Dining',
      'Entertainment',
      'Movies Under the Stars'
    ],
    inclusions: [
      'All meals',
      'Entertainment',
      'Pool access',
      'Fitness center'
    ],
    exclusions: [
      'Beverages',
      'Specialty dining',
      'Shore excursions',
      'Gratuities',
      'Wi-Fi'
    ],
    itinerary: [
      { day: 1, port: 'Honolulu', arrival: '5:00 PM', departure: '—', activities: ['Embarkation'] },
      { day: 2, port: 'Maui', arrival: '8:00 AM', departure: '6:00 PM', activities: ['Road to Hana'] },
      { day: 3, port: 'Hawaii', arrival: '8:00 AM', departure: '6:00 PM', activities: ['Volcanoes National Park'] },
      { day: 4, port: 'Kauai', arrival: '8:00 AM', departure: '6:00 PM', activities: ['Napali Coast'] },
      { day: 5, port: 'At Sea', arrival: '—', departure: '—', activities: ['Onboard Activities'] },
      { day: 6, port: 'Honolulu', arrival: '8:00 AM', departure: '—', activities: ['Disembarkation'] }
    ],
    images: [
      'https://images.pexels.com/photos/1004584/pexels-photo-1004584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/221471/pexels-photo-221471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    features: [
      { icon: 'Users', label: 'Capacity', value: '3,600 passengers' },
      { icon: 'Anchor', label: 'Tonnage', value: '107,000 GT' },
      { icon: 'Clock', label: 'Built', value: '2013' },
      { icon: 'Award', label: 'Rating', value: '4.7/5' }
    ],
    highlights: [
      'Hawaiian islands',
      'Volcanic landscapes',
      'Beach paradise',
      'Cultural experiences'
    ],
    popular: true
  },
  {
    id: 'CR012',
    name: 'Croatian Coast & Greek Islands',
    ship: 'Celebrity Infinity',
    line: 'Celebrity Cruises',
    destination: 'Mediterranean',
    departurePort: 'Venice, Italy',
    route: ['Venice', 'Split', 'Dubrovnik', 'Corfu', 'Santorini', 'Athens'],
    duration: '8 nights',
    departureDate: '2024-08-20',
    returnDate: '2024-08-28',
    price: 2799,
    originalPrice: 3299,
    discount: 15,
    rating: 4.8,
    reviews: 1543,
    cabins: {
      interior: { price: 1799, amenities: ['Twin Beds', 'TV', 'Private Bath'] },
      oceanview: { price: 2199, amenities: ['Ocean View', 'Twin Beds', 'TV', 'Private Bath'] },
      balcony: { price: 2799, amenities: ['Private Balcony', 'Queen Bed', 'TV', 'Private Bath'] },
      suite: { price: 4599, amenities: ['Large Balcony', 'King Bed', 'Living Area', 'Jacuzzi', 'Butler Service'] }
    },
    amenities: [
      'Pool',
      'Spa',
      'Casino',
      'Fine Dining',
      'Entertainment',
      'Kids Club'
    ],
    inclusions: [
      'All meals',
      'Entertainment',
      'Pool access',
      'Fitness center'
    ],
    exclusions: [
      'Beverages',
      'Specialty dining',
      'Shore excursions',
      'Gratuities',
      'Wi-Fi'
    ],
    itinerary: [
      { day: 1, port: 'Venice', arrival: '6:00 PM', departure: '—', activities: ['Embarkation'] },
      { day: 2, port: 'Split', arrival: '8:00 AM', departure: '6:00 PM', activities: ['Diocletian Palace'] },
      { day: 3, port: 'Dubrovnik', arrival: '8:00 AM', departure: '8:00 PM', activities: ['City Walls'] },
      { day: 4, port: 'Corfu', arrival: '9:00 AM', departure: '6:00 PM', activities: ['Old Town'] },
      { day: 5, port: 'Santorini', arrival: '8:00 AM', departure: '10:00 PM', activities: ['Oia Sunset'] },
      { day: 6, port: 'Athens', arrival: '8:00 AM', departure: '—', activities: ['Acropolis'] }
    ],
    images: [
      'https://images.pexels.com/photos/1643409/pexels-photo-1643409.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/161840/pexels-photo-161840.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/951531/pexels-photo-951531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1796736/pexels-photo-1796736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    features: [
      { icon: 'Users', label: 'Capacity', value: '2,170 passengers' },
      { icon: 'Anchor', label: 'Tonnage', value: '91,000 GT' },
      { icon: 'Clock', label: 'Built', value: '2001' },
      { icon: 'Award', label: 'Rating', value: '4.8/5' }
    ],
    highlights: [
      'Adriatic beauty',
      'Greek islands',
      'Medieval towns',
      'Crystal clear waters'
    ]
  },
  {
    id: 'CR013',
    name: 'Panama Canal Adventure',
    ship: 'Carnival Panorama',
    line: 'Carnival Cruise Line',
    destination: 'South America',
    departurePort: 'Miami, Florida',
    route: ['Miami', 'Cartagena', 'Panama Canal', 'Costa Rica', 'Miami'],
    duration: '9 nights',
    departureDate: '2025-01-15',
    returnDate: '2025-01-24',
    price: 2199,
    originalPrice: 2599,
    discount: 15,
    rating: 4.6,
    reviews: 1432,
    cabins: {
      interior: { price: 1499, amenities: ['Twin Beds', 'TV', 'Private Bath'] },
      oceanview: { price: 1799, amenities: ['Ocean View', 'Twin Beds', 'TV', 'Private Bath'] },
      balcony: { price: 2199, amenities: ['Private Balcony', 'Queen Bed', 'TV', 'Private Bath'] },
      suite: { price: 3699, amenities: ['Large Balcony', 'King Bed', 'Living Area', 'Jacuzzi', 'Butler Service'] }
    },
    amenities: [
      'WaterWorks',
      'SkyCourse',
      'Spa',
      'Casino',
      'Fine Dining',
      'Comedy Club'
    ],
    inclusions: [
      'All meals',
      'Entertainment',
      'Pool access',
      'Fitness center',
      'Kids club'
    ],
    exclusions: [
      'Beverages',
      'Specialty dining',
      'Shore excursions',
      'Gratuities',
      'Wi-Fi'
    ],
    itinerary: [
      { day: 1, port: 'Miami', arrival: '4:00 PM', departure: '—', activities: ['Embarkation'] },
      { day: 2, port: 'At Sea', arrival: '—', departure: '—', activities: ['Onboard Activities'] },
      { day: 3, port: 'Cartagena', arrival: '8:00 AM', departure: '5:00 PM', activities: ['Old Town', 'Castle'] },
      { day: 4, port: 'Panama Canal', arrival: '6:00 AM', departure: '5:00 PM', activities: ['Canal Transit'] },
      { day: 5, port: 'Costa Rica', arrival: '8:00 AM', departure: '5:00 PM', activities: ['Rainforest', 'Wildlife'] },
      { day: 6-8, port: 'At Sea', arrival: '—', departure: '—', activities: ['Entertainment'] },
      { day: 9, port: 'Miami', arrival: '8:00 AM', departure: '—', activities: ['Disembarkation'] }
    ],
    images: [
      'https://images.pexels.com/photos/1004584/pexels-photo-1004584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/221471/pexels-photo-221471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    features: [
      { icon: 'Users', label: 'Capacity', value: '4,000 passengers' },
      { icon: 'Anchor', label: 'Tonnage', value: '133,500 GT' },
      { icon: 'Clock', label: 'Built', value: '2019' },
      { icon: 'Award', label: 'Rating', value: '4.6/5' }
    ],
    highlights: [
      'Engineering marvel',
      'Central America',
      'Rainforest adventure',
      'Historical ports'
    ]
  },
  {
    id: 'CR014',
    name: 'Singapore & Malaysia Explorer',
    ship: 'Quantum of the Seas',
    line: 'Royal Caribbean',
    destination: 'Asia',
    departurePort: 'Singapore',
    route: ['Singapore', 'Penang', 'Kuala Lumpur', 'Phuket', 'Singapore'],
    duration: '5 nights',
    departureDate: '2024-10-20',
    returnDate: '2024-10-25',
    price: 1299,
    originalPrice: 1599,
    discount: 19,
    rating: 4.7,
    reviews: 2134,
    cabins: {
      interior: { price: 899, amenities: ['Twin Beds', 'TV', 'Private Bath'] },
      oceanview: { price: 1099, amenities: ['Ocean View', 'Twin Beds', 'TV', 'Private Bath'] },
      balcony: { price: 1299, amenities: ['Private Balcony', 'Queen Bed', 'TV', 'Private Bath'] },
      suite: { price: 2499, amenities: ['Large Balcony', 'King Bed', 'Living Area', 'Jacuzzi', 'Butler Service'] }
    },
    amenities: [
      'Indoor Pool',
      'RipCord by iFly',
      'North Star',
      'Surf Simulator',
      'Spa',
      'Casino'
    ],
    inclusions: [
      'All meals',
      'Entertainment',
      'Pool access',
      'Fitness center'
    ],
    exclusions: [
      'Beverages',
      'Specialty dining',
      'Shore excursions',
      'Gratuities',
      'Wi-Fi'
    ],
    itinerary: [
      { day: 1, port: 'Singapore', arrival: '5:00 PM', departure: '—', activities: ['Embarkation'] },
      { day: 2, port: 'Penang', arrival: '8:00 AM', departure: '6:00 PM', activities: ['Street Food', 'Heritage Tour'] },
      { day: 3, port: 'Kuala Lumpur', arrival: '9:00 AM', departure: '6:00 PM', activities: ['Petronas Towers'] },
      { day: 4, port: 'Phuket', arrival: '8:00 AM', departure: '6:00 PM', activities: ['Beach Day'] },
      { day: 5, port: 'Singapore', arrival: '8:00 AM', departure: '—', activities: ['Disembarkation'] }
    ],
    images: [
      'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1516776/pexels-photo-1516776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2387871/pexels-photo-2387871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    features: [
      { icon: 'Users', label: 'Capacity', value: '4,100 passengers' },
      { icon: 'Anchor', label: 'Tonnage', value: '168,666 GT' },
      { icon: 'Clock', label: 'Built', value: '2014' },
      { icon: 'Award', label: 'Rating', value: '4.7/5' }
    ],
    highlights: [
      'Southeast Asia',
      'Cultural diversity',
      'Modern cities',
      'Beach escapes'
    ],
    popular: true
  },
  {
    id: 'CR015',
    name: 'African Coast Discovery',
    ship: 'Norwegian Dawn',
    line: 'Norwegian Cruise Line',
    destination: 'Africa',
    departurePort: 'Cape Town, South Africa',
    route: ['Cape Town', 'Durban', 'Maputo', 'Richards Bay', 'Port Elizabeth', 'Cape Town'],
    duration: '10 nights',
    departureDate: '2025-02-10',
    returnDate: '2025-02-20',
    price: 3299,
    originalPrice: 3899,
    discount: 15,
    rating: 4.6,
    reviews: 876,
    cabins: {
      interior: { price: 2299, amenities: ['Twin Beds', 'TV', 'Private Bath'] },
      oceanview: { price: 2699, amenities: ['Ocean View', 'Twin Beds', 'TV', 'Private Bath'] },
      balcony: { price: 3299, amenities: ['Private Balcony', 'Queen Bed', 'TV', 'Private Bath'] },
      suite: { price: 5299, amenities: ['Large Balcony', 'King Bed', 'Living Area', 'Jacuzzi', 'Butler Service'] }
    },
    amenities: [
      'Pools',
      'Spa',
      'Casino',
      'Fine Dining',
      'Entertainment',
      'Kids Club'
    ],
    inclusions: [
      'All meals',
      'Entertainment',
      'Pool access',
      'Fitness center'
    ],
    exclusions: [
      'Beverages',
      'Specialty dining',
      'Shore excursions',
      'Gratuities',
      'Wi-Fi'
    ],
    itinerary: [
      { day: 1, port: 'Cape Town', arrival: '6:00 PM', departure: '—', activities: ['Embarkation'] },
      { day: 2, port: 'Cape Town', arrival: '8:00 AM', departure: '5:00 PM', activities: ['Table Mountain'] },
      { day: 3, port: 'Durban', arrival: '8:00 AM', departure: '6:00 PM', activities: ['Beach', 'Indian Markets'] },
      { day: 4, port: 'Maputo', arrival: '9:00 AM', departure: '6:00 PM', activities: ['City Tour'] },
      { day: 5, port: 'Richards Bay', arrival: '8:00 AM', departure: '5:00 PM', activities: ['Game Reserve'] },
      { day: 6, port: 'Port Elizabeth', arrival: '8:00 AM', departure: '5:00 PM', activities: ['Beach'] },
      { day: 7-9, port: 'At Sea', arrival: '—', departure: '—', activities: ['Entertainment'] },
      { day: 10, port: 'Cape Town', arrival: '8:00 AM', departure: '—', activities: ['Disembarkation'] }
    ],
    images: [
      'https://images.pexels.com/photos/2388049/pexels-photo-2388049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/534403/pexels-photo-534403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/210243/pexels-photo-210243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1183985/pexels-photo-1183985.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    features: [
      { icon: 'Users', label: 'Capacity', value: '2,400 passengers' },
      { icon: 'Anchor', label: 'Tonnage', value: '92,250 GT' },
      { icon: 'Clock', label: 'Built', value: '2002' },
      { icon: 'Award', label: 'Rating', value: '4.6/5' }
    ],
    highlights: [
      'South African coast',
      'Wildlife safari',
      'Cultural diversity',
      'Scenic beauty'
    ]
  }
];
const Cruises = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [selectedShip, setSelectedShip] = useState('all');
  const [selectedCruise, setSelectedCruise] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [availability, setAvailability] = useState({});

  // Use the exported mock data
  const [cruises, setCruises] = useState([]);
  const [ships, setShips] = useState([]);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    fetchCruises();
  }, []);

  const fetchCruises = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setCruises(mockCruises);
      setShips(mockShips);
      setDestinations(mockDestinations);
      
      // Initialize availability
      const avail = {};
      mockCruises.forEach(cruise => {
        avail[cruise.id] = {
          interior: Math.floor(Math.random() * 10) + 1,
          oceanview: Math.floor(Math.random() * 8) + 1,
          balcony: Math.floor(Math.random() * 6) + 1,
          suite: Math.floor(Math.random() * 3) + 1
        };
      });
      setAvailability(avail);
    } catch (error) {
      console.error('Error fetching cruises:', error);
      toast.error('Failed to load cruises');
    } finally {
      setLoading(false);
    }
  };

  const getAvailabilityStatus = (cruiseId, cabinType) => {
    const avail = availability[cruiseId]?.[cabinType] || 0;
    if (avail === 0) return 'sold-out';
    if (avail <= 3) return 'limited';
    return 'available';
  };

  const getAvailabilityBadge = (status) => {
    switch(status) {
      case 'available':
        return { variant: 'success', label: 'Available', icon: CheckCircle };
      case 'limited':
        return { variant: 'warning', label: 'Limited', icon: AlertCircle };
      case 'sold-out':
        return { variant: 'danger', label: 'Sold Out', icon: X };
      default:
        return { variant: 'secondary', label: 'Check', icon: Clock };
    }
  };

  const filteredCruises = cruises.filter(cruise => {
    if (selectedDestination !== 'all' && cruise.destination !== selectedDestination) return false;
    if (selectedShip !== 'all' && cruise.line !== selectedShip) return false;
    if (searchQuery && !cruise.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !cruise.ship.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (cruise.price < priceRange.min || cruise.price > priceRange.max) return false;
    return true;
  });

  const sortedCruises = [...filteredCruises].sort((a, b) => {
    switch(sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'duration':
        return parseInt(a.duration) - parseInt(b.duration);
      case 'rating':
        return b.rating - a.rating;
      case 'date':
        return new Date(a.departureDate) - new Date(b.departureDate);
      default:
        return b.reviews - a.reviews;
    }
  });

  const handleViewDetails = (cruise) => {
    setSelectedCruise(cruise);
    setShowDetailsModal(true);
  };

  const handleBookNow = (cruise) => {
    navigate(`/cruise-booking/${cruise.id}`, { state: { cruise } });
  };

  const toggleWishlist = (cruiseId) => {
    if (wishlist.includes(cruiseId)) {
      setWishlist(wishlist.filter(id => id !== cruiseId));
      toast.success('Removed from wishlist');
    } else {
      setWishlist([...wishlist, cruiseId]);
      toast.success('Added to wishlist');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 w-96 bg-gray-200 rounded mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-gray-200 rounded-xl h-96"></div>
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
          <h1 className="text-3xl font-bold text-gray-900">Luxury Cruise Vacations</h1>
          <p className="text-gray-600 mt-2">
            Discover amazing cruise itineraries to the world's most beautiful destinations
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search cruises by name or ship..."
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
              <ChevronRight className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-90' : ''}`} />
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
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Destination
                      </label>
                      <select
                        value={selectedDestination}
                        onChange={(e) => setSelectedDestination(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="all">All Destinations</option>
                        {destinations.map(dest => (
                          <option key={dest} value={dest}>{dest}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cruise Line
                      </label>
                      <select
                        value={selectedShip}
                        onChange={(e) => setSelectedShip(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="all">All Cruise Lines</option>
                        {ships.map(ship => (
                          <option key={ship.id} value={ship.name}>{ship.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price Range
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder="Min"
                          value={priceRange.min}
                          onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) || 0 })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="number"
                          placeholder="Max"
                          value={priceRange.max}
                          onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) || 10000 })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sort By
                      </label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="popular">Most Popular</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="duration">Duration: Short to Long</option>
                        <option value="rating">Top Rated</option>
                        <option value="date">Departure Date</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-200">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedDestination('all');
                        setSelectedShip('all');
                        setPriceRange({ min: 0, max: 10000 });
                        setSortBy('popular');
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
            <span className="font-bold text-gray-900">{sortedCruises.length}</span> cruises found
          </p>
        </div>

        {/* Cruises Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCruises.map((cruise) => {
            const isWishlisted = wishlist.includes(cruise.id);
            const availStatus = {
              interior: getAvailabilityStatus(cruise.id, 'interior'),
              oceanview: getAvailabilityStatus(cruise.id, 'oceanview'),
              balcony: getAvailabilityStatus(cruise.id, 'balcony'),
              suite: getAvailabilityStatus(cruise.id, 'suite')
            };

            return (
              <motion.div
                key={cruise.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200 h-full">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={cruise.images[0]}
                      alt={cruise.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(cruise.id);
                      }}
                      className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors z-10"
                    >
                      <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                    </button>

                    {/* Discount Badge */}
                    {cruise.discount > 0 && (
                      <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1.5 rounded-full font-bold text-sm shadow-lg z-10">
                        {cruise.discount}% OFF
                      </div>
                    )}

                    {/* Cruise Line */}
                    <div className="absolute bottom-3 left-3 text-white">
                      <p className="text-sm opacity-90">{cruise.line}</p>
                      <h3 className="text-xl font-bold">{cruise.name}</h3>
                    </div>
                  </div>

                  <div className="p-4">
                    {/* Ship & Rating */}
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-600">{cruise.ship}</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold">{cruise.rating}</span>
                        <span className="text-xs text-gray-500">({cruise.reviews})</span>
                      </div>
                    </div>

                    {/* Route */}
                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{cruise.departurePort}</span>
                      <ChevronRight className="w-4 h-4" />
                      <span className="truncate">{cruise.route[cruise.route.length - 1]}</span>
                    </div>

                    {/* Duration & Date */}
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{cruise.duration}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{new Date(cruise.departureDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {cruise.highlights.slice(0, 2).map((highlight, i) => (
                        <Badge key={i} variant="secondary" size="sm" className="bg-blue-50 text-blue-700">
                          {highlight}
                        </Badge>
                      ))}
                    </div>

                    {/* Cabin Availability */}
                    <div className="grid grid-cols-4 gap-1 mb-4">
                      {Object.entries(availStatus).map(([type, status]) => {
                        const badge = getAvailabilityBadge(status);
                        return (
                          <div key={type} className="text-center">
                            <p className="text-xs font-medium capitalize mb-1">{type}</p>
                            <Badge variant={badge.variant} size="sm" className="text-[10px]">
                              {badge.label}
                            </Badge>
                          </div>
                        );
                      })}
                    </div>

                    {/* Price */}
                    <div className="flex items-end justify-between mb-4">
                      <div>
                        {cruise.originalPrice !== cruise.price && (
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-400 line-through">${cruise.originalPrice}</span>
                            <span className="text-green-600 font-medium">Save ${cruise.originalPrice - cruise.price}</span>
                          </div>
                        )}
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold text-gray-900">${cruise.price}</span>
                          <span className="text-sm text-gray-500">/person</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleViewDetails(cruise)}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleBookNow(cruise)}
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {sortedCruises.length === 0 && (
          <Card className="p-12 text-center">
            <Ship className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Cruises Found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <Button
              variant="primary"
              onClick={() => {
                setSearchQuery('');
                setSelectedDestination('all');
                setSelectedShip('all');
                setPriceRange({ min: 0, max: 10000 });
              }}
            >
              Clear Filters
            </Button>
          </Card>
        )}
      </div>

      {/* Cruise Details Modal */}
      <AnimatePresence>
        {showDetailsModal && selectedCruise && (
          <CruiseDetailsModal
            cruise={selectedCruise}
            availability={availability[selectedCruise.id]}
            onClose={() => setShowDetailsModal(false)}
            onBook={() => {
              setShowDetailsModal(false);
              handleBookNow(selectedCruise);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Cruise Details Modal Component
const CruiseDetailsModal = ({ cruise, availability, onClose, onBook }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentImage, setCurrentImage] = useState(0);

  const handlePreviousImage = () => {
    setCurrentImage(prev => (prev === 0 ? cruise.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImage(prev => (prev === cruise.images.length - 1 ? 0 : prev + 1));
  };

  const getAvailabilityBadge = (count) => {
    if (count === 0) return { variant: 'danger', label: 'Sold Out' };
    if (count <= 3) return { variant: 'warning', label: `${count} left` };
    return { variant: 'success', label: 'Available' };
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{cruise.name}</h2>
            <p className="text-gray-600">{cruise.ship} • {cruise.line}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Image Gallery */}
          <div className="relative h-96 mb-6 rounded-xl overflow-hidden">
            <img
              src={cruise.images[currentImage]}
              alt={cruise.name}
              className="w-full h-full object-cover"
            />
            
            {cruise.images.length > 1 && (
              <>
                <button
                  onClick={handlePreviousImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {cruise.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImage ? 'w-4 bg-blue-600' : 'bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <div className="flex gap-6 overflow-x-auto">
              {['overview', 'itinerary', 'cabins', 'amenities', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 font-medium text-sm capitalize border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="mb-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Features Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {cruise.features.map((feature, i) => (
                    <div key={i} className="bg-gray-50 rounded-lg p-4 text-center">
                      <div className="w-6 h-6 text-blue-600 mx-auto mb-2">
                        {feature.icon === 'Users' && <Users className="w-6 h-6" />}
                        {feature.icon === 'Anchor' && <Anchor className="w-6 h-6" />}
                        {feature.icon === 'Clock' && <Clock className="w-6 h-6" />}
                        {feature.icon === 'Award' && <Award className="w-6 h-6" />}
                      </div>
                      <p className="text-sm text-gray-500">{feature.label}</p>
                      <p className="font-semibold text-gray-900">{feature.value}</p>
                    </div>
                  ))}
                </div>

                {/* Highlights */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Highlights</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {cruise.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inclusions/Exclusions */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Inclusions
                    </h3>
                    <ul className="space-y-2">
                      {cruise.inclusions.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-red-600" />
                      Exclusions
                    </h3>
                    <ul className="space-y-2">
                      {cruise.exclusions.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <XCircle className="w-4 h-4 text-red-600" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'itinerary' && (
              <div className="space-y-4">
                {cruise.itinerary.map((day, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">Day {day.day}: {day.port}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        {day.arrival !== '—' && <span>Arrive: {day.arrival}</span>}
                        {day.departure !== '—' && <span>Depart: {day.departure}</span>}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {day.activities.map((activity, i) => (
                        <Badge key={i} variant="secondary" className="bg-gray-100">
                          {activity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'cabins' && (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 mb-4">Cabin Categories</h3>
                <div className="grid grid-cols-1 gap-4">
                  {Object.entries(cruise.cabins).map(([type, details]) => {
                    const availCount = availability?.[type] || 0;
                    const status = getAvailabilityBadge(availCount);
                    
                    return (
                      <div key={type} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900 capitalize">{type} Cabin</h4>
                            <p className="text-sm text-gray-600">${details.price} per person</p>
                          </div>
                          <Badge variant={status.variant}>{status.label}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {details.amenities.map((amenity, i) => (
                            <Badge key={i} variant="secondary" size="sm" className="bg-white">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'amenities' && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {cruise.amenities.map((amenity, i) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="w-6 h-6 text-blue-600 mx-auto mb-2">
                      {amenity.includes('Pool') && <Waves className="w-6 h-6" />}
                      {amenity.includes('Spa') && <Shield className="w-6 h-6" />}
                      {amenity.includes('Dining') && <Utensils className="w-6 h-6" />}
                      {amenity.includes('Bar') && <Coffee className="w-6 h-6" />}
                      {amenity.includes('Fitness') && <Dumbbell className="w-6 h-6" />}
                      {amenity.includes('WiFi') && <Wifi className="w-6 h-6" />}
                    </div>
                    <p className="text-sm font-medium text-gray-900">{amenity}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="text-center py-8 text-gray-500">
                <Star className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p>Reviews coming soon</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button variant="primary" onClick={onBook}>
              Book Now
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Cruises;