// /src/pages/DetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Star, Heart, Share2, Calendar, Users, Clock,
  Check, X, ChevronLeft, ChevronRight, Plane, Hotel, Car,
  Coffee, Camera, Gift, Globe, Sun, Umbrella, Award,
  Shield, Phone, Mail, Info, ThumbsUp, Package,
  Wifi, Dumbbell, Waves, Utensils, Sparkles, Mountain,
  Compass, Ship, Anchor, Flag, FileText, Briefcase,
  Home, DollarSign, BookOpen, Fingerprint, AlertCircle,
  Luggage, Bath, Wind, Thermometer, Timer,
  Percent, Tag, Landmark, Tent, TreePine, Palmtree
} from 'lucide-react';
import { useAuth } from '../context/useAuth';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Card from '../ui/Card';

// Import all data sources
import { samplePackages, getPackageById } from '../data/samplePackages';
import { mockCruises } from './Cruises';
import { mockCountries } from './VisaServices';
import { mockPlans } from './TravelInsurance';
import { DEALS } from '../sections/deals/DealsCarousel';
import { FLIGHTS_DATA, HOTELS_DATA } from '../data/mockData';

// Seasonal Deals Data - with unique IDs matching Home.jsx
const SEASONAL_DEALS = {
  'seasonal-1': {
    id: 'seasonal-1',
    title: 'Summer Beach Escape',
    location: 'Goa, India',
    description: 'Enjoy the sun, sand and sea at Goa\'s best beaches with luxury accommodation and water activities.',
    longDescription: 'Escape to the tropical paradise of Goa with our exclusive summer package. Stay at premium beach resorts, indulge in thrilling water sports, enjoy sunset cruises, and experience the vibrant Goan nightlife. Perfect for families, couples, and solo travelers looking for the ultimate beach vacation.',
    images: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=1200&auto=format&fit=crop'
    ],
    price: 45000,
    originalPrice: 69000,
    discount: 35,
    rating: 4.8,
    reviews: 234,
    duration: '4 Days / 3 Nights',
    badge: 'Summer Special',
    highlights: [
      'Stay at premium beach resort',
      'Water sports activities',
      'Sunset cruise',
      'Beachside dining',
      'Nightlife experience'
    ],
    inclusions: [
      'Round-trip flights',
      '4-star beach resort',
      'Daily breakfast',
      'Water sports package',
      'Sunset cruise',
      'Airport transfers'
    ],
    exclusions: [
      'Personal expenses',
      'Travel insurance',
      'Tips & gratuities',
      'Additional meals'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Goa', activities: ['Airport transfer', 'Check-in', 'Beach walk'] },
      { day: 2, title: 'North Goa Tour', activities: ['Calangute Beach', 'Water sports', 'Market visit'] },
      { day: 3, title: 'South Goa Exploration', activities: ['Palolem Beach', 'Sunset cruise'] },
      { day: 4, title: 'Departure', activities: ['Breakfast', 'Check-out', 'Airport transfer'] }
    ],
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Bar', 'Room Service']
  },
  'seasonal-2': {
    id: 'seasonal-2',
    title: 'Swiss Alps Ski Trip',
    location: 'Switzerland',
    description: 'Experience the magic of the Swiss Alps with world-class skiing and breathtaking mountain views.',
    longDescription: 'Embark on an unforgettable winter adventure in the Swiss Alps. Stay in cozy alpine chalets, ski on pristine slopes, and soak in the stunning mountain scenery. Perfect for skiing enthusiasts and winter wonderland seekers.',
    images: [
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&auto=format&fit=crop'
    ],
    price: 95000,
    originalPrice: 135000,
    discount: 30,
    rating: 4.9,
    reviews: 189,
    duration: '7 Days / 6 Nights',
    badge: 'Winter Wonderland',
    highlights: [
      'World-class skiing',
      'Alpine chalet stay',
      'Scenic train rides',
      'Swiss cuisine experience',
      'Mountain spa'
    ],
    inclusions: [
      'Round-trip flights',
      'Alpine chalet accommodation',
      'Daily breakfast',
      'Ski passes',
      'Equipment rental',
      'Airport transfers'
    ],
    exclusions: [
      'Ski instructor',
      'Personal expenses',
      'Travel insurance',
      'Tips'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Zurich', activities: ['Airport transfer', 'Check-in', 'Welcome dinner'] },
      { day: 2, title: 'Skiing Day 1', activities: ['Ski lessons', 'Mountain lunch'] },
      { day: 3, title: 'Skiing Day 2', activities: ['Advanced slopes', 'Après-ski'] },
      { day: 4, title: 'Free Day', activities: ['Explore village', 'Spa relaxation'] },
      { day: 5, title: 'Skiing Day 3', activities: ['Off-piste skiing', 'Mountain photography'] },
      { day: 6, title: 'Farewell Dinner', activities: ['Swiss fondue', 'Cultural show'] },
      { day: 7, title: 'Departure', activities: ['Check-out', 'Airport transfer'] }
    ],
    amenities: ['WiFi', 'Spa', 'Restaurant', 'Ski storage', 'Fireplace lounge']
  },
  'seasonal-3': {
    id: 'seasonal-3',
    title: 'European Christmas Markets',
    location: 'Multiple Cities',
    description: 'Experience the magic of Christmas across Europe\'s most enchanting markets.',
    longDescription: 'Immerse yourself in the festive spirit as you visit the most beautiful Christmas markets across Europe. From Vienna to Prague, experience traditional crafts, mulled wine, and holiday cheer in historic settings.',
    images: [
      'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=1200&auto=format&fit=crop'
    ],
    price: 85000,
    originalPrice: 113000,
    discount: 25,
    rating: 4.7,
    reviews: 156,
    duration: '8 Days / 7 Nights',
    badge: 'Festive Special',
    highlights: [
      'Visit famous Christmas markets',
      'Traditional mulled wine',
      'Historic city tours',
      'Local crafts shopping',
      'Festive concerts'
    ],
    inclusions: [
      'Round-trip flights',
      'Central hotels',
      'Daily breakfast',
      'Market tours',
      'Train between cities',
      'Airport transfers'
    ],
    exclusions: [
      'Lunch & dinner',
      'Personal expenses',
      'Travel insurance',
      'Tips'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Vienna', activities: ['Airport transfer', 'Evening market visit'] },
      { day: 2, title: 'Vienna Markets', activities: ['City tour', 'Christmas markets', 'Mulled wine tasting'] },
      { day: 3, title: 'Salzburg', activities: ['Train to Salzburg', 'Old Town market', 'Sound of Music tour'] },
      { day: 4, title: 'Munich', activities: ['Train to Munich', 'Marienplatz market', 'Glühwein tasting'] },
      { day: 5, title: 'Nuremberg', activities: ['Train to Nuremberg', 'Famous Christkindlesmarkt'] },
      { day: 6, title: 'Prague', activities: ['Train to Prague', 'Old Town Square market', 'Charles Bridge'] },
      { day: 7, title: 'Prague', activities: ['Prague Castle', 'Wenceslas Square market', 'Farewell dinner'] },
      { day: 8, title: 'Departure', activities: ['Check-out', 'Airport transfer'] }
    ],
    amenities: ['WiFi', 'Breakfast', 'City maps', 'Tour guide']
  },
  'seasonal-4': {
    id: 'seasonal-4',
    title: 'Weekend in Udaipur',
    location: 'Udaipur, India',
    description: 'Experience the romance and heritage of Udaipur, the City of Lakes.',
    longDescription: 'Escape to the romantic city of Udaipur for a perfect weekend getaway. Stay in heritage hotels, cruise on Lake Pichola, explore magnificent palaces, and witness traditional cultural performances.',
    images: [
      'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587474260583-4e6a1c4a3b4b?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587474260583-4e6a1c4a3b4b?w=1200&auto=format&fit=crop'
    ],
    price: 25000,
    originalPrice: 31000,
    discount: 20,
    rating: 4.6,
    reviews: 98,
    duration: '3 Days / 2 Nights',
    badge: 'Long Weekend',
    highlights: [
      'Heritage hotel stay',
      'Lake Pichola boat ride',
      'City Palace visit',
      'Cultural show',
      'Sunset views'
    ],
    inclusions: [
      'Round-trip flights',
      'Heritage hotel',
      'Daily breakfast',
      'City tour',
      'Boat ride',
      'Airport transfers'
    ],
    exclusions: [
      'Personal expenses',
      'Travel insurance',
      'Tips',
      'Additional meals'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Udaipur', activities: ['Airport transfer', 'Check-in', 'Sunset at Lake Pichola'] },
      { day: 2, title: 'City Tour', activities: ['City Palace', 'Jagdish Temple', 'Sahelion-ki-Bari', 'Cultural show in evening'] },
      { day: 3, title: 'Departure', activities: ['Breakfast', 'Shopping at local markets', 'Airport transfer'] }
    ],
    amenities: ['WiFi', 'Heritage property', 'Restaurant', 'Spa', 'Tour desk']
  }
};

// Comprehensive Destinations Data
const DESTINATIONS_DATA = {
  // Home.jsx destinations
  sample1: {
    id: 'sample1',
    name: 'Dubai',
    country: 'UAE',
    description: 'Experience the epitome of luxury in the desert metropolis. From the world\'s tallest building to endless desert safaris, Dubai offers an unforgettable blend of modern marvels and traditional Arabian culture.',
    longDescription: 'Dubai is a city of superlatives - home to the world\'s tallest building, largest shopping mall, and most luxurious hotels. Experience the perfect blend of modern marvels and traditional Arabian culture. From desert safaris to indoor skiing, Dubai offers unforgettable experiences for every traveler.',
    images: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548681528-6a5c45b66b9a?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1577147446927-e5c1c5d33b9e?w=1200&auto=format&fit=crop'
    ],
    price: 45000,
    rating: 4.9,
    reviews: 3240,
    bestTime: 'Nov-Mar',
    currency: 'AED',
    language: 'Arabic, English',
    timezone: 'GST (UTC+4)',
    highlights: [
      'Burj Khalifa - Tallest building in the world',
      'Desert safari with dune bashing and camel rides',
      'Dubai Mall and fountain show',
      'Palm Jumeirah - Iconic man-made island',
      'Gold and spice souks'
    ],
    activities: [
      'Desert Safari', 'Shopping', 'Dhow Cruise', 'Burj Khalifa Visit', 'Water Parks'
    ],
    weather: {
      summer: '35-45°C',
      winter: '20-30°C',
      spring: '25-35°C'
    }
  },
  sample2: {
    id: 'sample2',
    name: 'Paris',
    country: 'France',
    description: 'The city of love and lights, Paris captivates with its timeless romance, iconic landmarks, and world-class art and cuisine.',
    longDescription: 'Paris, the City of Light, captivates visitors with its timeless romance, iconic landmarks, and world-class art and cuisine. From the Eiffel Tower to the Louvre Museum, every corner tells a story of history, culture, and elegance. Indulge in French pastries, stroll along the Seine, and experience the magic of this enchanting city.',
    images: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200&auto=format&fit=crop'
    ],
    price: 75000,
    rating: 4.8,
    reviews: 4120,
    bestTime: 'Apr-Oct',
    currency: 'EUR',
    language: 'French',
    timezone: 'CET (UTC+1)',
    highlights: [
      'Eiffel Tower - Iconic iron lattice tower',
      'Louvre Museum - World\'s largest art museum',
      'Notre-Dame Cathedral - Gothic masterpiece',
      'Seine River cruise',
      'Montmartre and Sacré-Cœur'
    ],
    activities: [
      'Museum Tours', 'River Cruises', 'Wine Tasting', 'Shopping', 'Food Tours'
    ],
    weather: {
      summer: '18-25°C',
      winter: '3-8°C',
      spring: '10-18°C'
    }
  },
  sample3: {
    id: 'sample3',
    name: 'Bali',
    country: 'Indonesia',
    description: 'Island of the Gods with stunning beaches, ancient temples, and vibrant culture.',
    longDescription: 'Bali, the "Island of the Gods," is a tropical paradise offering stunning beaches, ancient temples, and a unique Hindu culture. Whether you\'re seeking relaxation on pristine beaches, adventure in the lush jungles, or spiritual experiences in ancient temples, Bali has it all. Experience traditional dance performances, indulge in spa treatments, and explore the island\'s natural beauty.',
    images: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566737236500-c8ac43014cd7?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=1200&auto=format&fit=crop'
    ],
    price: 55000,
    rating: 4.7,
    reviews: 2870,
    bestTime: 'Apr-Oct',
    currency: 'IDR',
    language: 'Indonesian, Balinese',
    timezone: 'WITA (UTC+8)',
    highlights: [
      'Uluwatu Temple - Cliff-top temple',
      'Tegalalang Rice Terraces',
      'Ubud Monkey Forest',
      'Tanah Lot Temple',
      'Beach clubs in Seminyak'
    ],
    activities: [
      'Temple Tours', 'Spa & Wellness', 'Surfing', 'Yoga Retreats', 'Cooking Classes'
    ],
    weather: {
      summer: '27-32°C',
      winter: '26-30°C',
      rainy: '25-30°C'
    }
  },
  sample4: {
    id: 'sample4',
    name: 'Maldives',
    country: 'Maldives',
    description: 'Luxury island paradise with overwater villas and crystal clear waters.',
    longDescription: 'The Maldives is the ultimate luxury beach destination, famous for its overwater villas, crystal clear turquoise waters, and vibrant coral reefs. Perfect for honeymooners and those seeking paradise, you can stay in stunning overwater bungalows, snorkel with tropical fish, and enjoy world-class dining and spa experiences.',
    images: [
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1573843981279-d1992c29c3b3?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580541832629-2d71e66c1a6b?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1573843981279-d1992c29c3b3?w=1200&auto=format&fit=crop'
    ],
    price: 95000,
    rating: 5.0,
    reviews: 1890,
    bestTime: 'Nov-Apr',
    currency: 'MVR',
    language: 'Dhivehi, English',
    timezone: 'MVT (UTC+5)',
    highlights: [
      'Overwater villas with glass floor',
      'House reef snorkeling',
      'Sunset dolphin cruises',
      'Underwater restaurants',
      'Private island experiences'
    ],
    activities: [
      'Snorkeling', 'Scuba Diving', 'Sunset Cruises', 'Spa Treatments', 'Fine Dining'
    ],
    weather: {
      summer: '28-32°C',
      winter: '27-30°C',
      monsoon: '27-30°C'
    }
  },
  sample5: {
    id: 'sample5',
    name: 'Swiss Alps',
    country: 'Switzerland',
    description: 'Breathtaking mountain scenery with world-class skiing and charming villages.',
    longDescription: 'The Swiss Alps offer some of the most spectacular mountain scenery in the world. From world-class skiing in winter to incredible hiking trails in summer, this region is a paradise for outdoor enthusiasts. Explore charming alpine villages, ride scenic trains, and experience the beauty of the Matterhorn and Jungfrau regions.',
    images: [
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&auto=format&fit=crop'
    ],
    price: 110000,
    rating: 4.9,
    reviews: 2340,
    bestTime: 'Dec-Mar, Jun-Sep',
    currency: 'CHF',
    language: 'German, French, Italian',
    timezone: 'CET (UTC+1)',
    highlights: [
      'Matterhorn views',
      'Jungfraujoch - Top of Europe',
      'Skiing in Zermatt',
      'Glacier Express train',
      'Alpine hiking trails'
    ],
    activities: [
      'Skiing', 'Hiking', 'Train Journeys', 'Mountain Climbing', 'Paragliding'
    ],
    weather: {
      summer: '10-20°C',
      winter: '-5-5°C',
      spring: '5-15°C'
    }
  },
  sample6: {
    id: 'sample6',
    name: 'Santorini',
    country: 'Greece',
    description: 'Iconic Greek island with white-washed buildings and stunning sunsets.',
    longDescription: 'Santorini is one of the most romantic destinations in the world, famous for its white-washed buildings with blue domes, stunning caldera views, and spectacular sunsets. Explore the charming villages of Oia and Fira, relax on unique volcanic beaches, and savor delicious Greek cuisine with a view of the Aegean Sea.',
    images: [
      'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1573843981279-d1992c29c3b3?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1573843981279-d1992c29c3b3?w=1200&auto=format&fit=crop'
    ],
    price: 68000,
    rating: 4.8,
    reviews: 1980,
    bestTime: 'Apr-Oct',
    currency: 'EUR',
    language: 'Greek',
    timezone: 'EET (UTC+2)',
    highlights: [
      'Oia sunset views',
      'Caldera boat tours',
      'Red and Black beaches',
      'Ancient Akrotiri',
      'Wine tasting'
    ],
    activities: [
      'Sunset Watching', 'Boat Tours', 'Wine Tasting', 'Beach Hopping', 'Photography'
    ],
    weather: {
      summer: '25-30°C',
      winter: '10-15°C',
      spring: '15-25°C'
    }
  },
  
  // Indian destinations
  goa: {
    id: 'goa',
    name: 'Goa',
    country: 'India',
    description: 'India\'s beach paradise with stunning coastlines, vibrant nightlife, and Portuguese heritage.',
    longDescription: 'Goa is a tropical paradise known for its beautiful beaches, vibrant nightlife, and rich Portuguese heritage. From the bustling beaches of North Goa to the serene shores of South Goa, there\'s something for everyone. Explore ancient churches, indulge in water sports, savor delicious seafood, and experience the unique blend of Indian and Portuguese cultures.',
    images: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=1200&auto=format&fit=crop'
    ],
    price: 25000,
    rating: 4.8,
    reviews: 2341,
    bestTime: 'Oct-Mar',
    currency: 'INR',
    language: 'Konkani, English',
    timezone: 'IST (UTC+5:30)',
    highlights: [
      'Pristine beaches like Calangute, Baga, and Palolem',
      'Portuguese-era churches and architecture',
      'Vibrant nightlife and beach shacks',
      'Water sports and dolphin spotting',
      'Spice plantations and wildlife sanctuaries'
    ],
    activities: [
      'Water Sports', 'Heritage Tours', 'Nightlife', 'Shopping', 'Seafood Dining'
    ],
    weather: {
      summer: '25-35°C',
      winter: '20-30°C',
      monsoon: '25-30°C'
    }
  },
  udaipur: {
    id: 'udaipur',
    name: 'Udaipur',
    country: 'India',
    description: 'The City of Lakes, famous for its romantic setting, majestic palaces, and rich cultural heritage.',
    longDescription: 'Udaipur, the "City of Lakes," is a romantic destination nestled in the Aravalli Hills. Famous for its stunning palaces, tranquil lakes, and rich cultural heritage, it offers a glimpse into the royal history of Rajasthan. Explore the magnificent City Palace, take a boat ride on Lake Pichola, and witness traditional folk performances.',
    images: [
      'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587474260583-4e6a1c4a3b4b?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587474260583-4e6a1c4a3b4b?w=1200&auto=format&fit=crop'
    ],
    price: 18000,
    rating: 4.7,
    reviews: 1876,
    bestTime: 'Oct-Mar',
    currency: 'INR',
    language: 'Hindi, English',
    timezone: 'IST (UTC+5:30)',
    highlights: [
      'City Palace - Largest palace complex in Rajasthan',
      'Lake Pichola boat rides',
      'Jagdish Temple',
      'Bagore-ki-Haveli cultural shows',
      'Sahelion-ki-Bari gardens'
    ],
    activities: [
      'Palace Tours', 'Boat Rides', 'Cultural Shows', 'Shopping', 'Heritage Walks'
    ],
    weather: {
      summer: '30-40°C',
      winter: '10-25°C',
      monsoon: '25-35°C'
    }
  },
  kerala: {
    id: 'kerala',
    name: 'Kerala',
    country: 'India',
    description: 'God\'s Own Country - known for its backwaters, Ayurvedic treatments, and lush greenery.',
    longDescription: 'Kerala, "God\'s Own Country," is a tropical paradise known for its serene backwaters, pristine beaches, lush hill stations, and unique Ayurvedic treatments. Experience a houseboat cruise through the backwaters of Alleppey, witness traditional Kathakali performances, and rejuvenate with authentic Ayurvedic therapies.',
    images: [
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1626624340240-a10d0a5ae4e0?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1626624340240-a10d0a5ae4e0?w=1200&auto=format&fit=crop'
    ],
    price: 22000,
    rating: 4.9,
    reviews: 2150,
    bestTime: 'Sep-Mar',
    currency: 'INR',
    language: 'Malayalam, English',
    timezone: 'IST (UTC+5:30)',
    highlights: [
      'Alleppey houseboat cruise',
      'Kumarakom backwaters',
      'Munnar tea plantations',
      'Kochi heritage sites',
      'Ayurvedic massages'
    ],
    activities: [
      'Houseboat Cruise', 'Ayurveda', 'Tea Plantation Tours', 'Kathakali Shows', 'Beach Walks'
    ],
    weather: {
      summer: '28-35°C',
      winter: '18-28°C',
      monsoon: '25-30°C'
    }
  },
  manali: {
    id: 'manali',
    name: 'Manali',
    country: 'India',
    description: 'Himalayan adventure hub with snow-capped peaks, scenic valleys, and thrilling activities.',
    longDescription: 'Manali is a beautiful hill station in the Himalayas, offering breathtaking views, adventure activities, and serene landscapes. From skiing in Solang Valley to trekking in the surrounding mountains, it\'s a paradise for adventure seekers. Experience the unique culture, visit ancient temples, and enjoy the stunning natural beauty.',
    images: [
      'https://images.unsplash.com/photo-1626624340240-a10d0a5ae4e0?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1626624340240-a10d0a5ae4e0?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&auto=format&fit=crop'
    ],
    price: 15000,
    rating: 4.6,
    reviews: 1650,
    bestTime: 'Apr-Jun, Dec-Feb',
    currency: 'INR',
    language: 'Hindi, English',
    timezone: 'IST (UTC+5:30)',
    highlights: [
      'Solang Valley adventure sports',
      'Rohtang Pass snow activities',
      'Hadimba Temple',
      'Old Manali cafes',
      'Trekking and camping'
    ],
    activities: [
      'Skiing', 'Paragliding', 'Trekking', 'Camping', 'Temple Tours'
    ],
    weather: {
      summer: '15-25°C',
      winter: '-5-10°C',
      monsoon: '15-20°C'
    }
  },
  andaman: {
    id: 'andaman',
    name: 'Andaman',
    country: 'India',
    description: 'Tropical island paradise with crystal clear waters, coral reefs, and pristine beaches.',
    longDescription: 'The Andaman Islands are a tropical paradise in the Bay of Bengal, known for their stunning beaches, crystal clear waters, and rich marine life. Perfect for honeymooners and beach lovers, you can enjoy snorkeling, scuba diving, sea walking, and explore the historic Cellular Jail in Port Blair.',
    images: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580541832629-2d71e66c1a6b?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580541832629-2d71e66c1a6b?w=1200&auto=format&fit=crop'
    ],
    price: 35000,
    rating: 4.8,
    reviews: 1430,
    bestTime: 'Nov-May',
    currency: 'INR',
    language: 'Hindi, English, Bengali',
    timezone: 'IST (UTC+5:30)',
    highlights: [
      'Radhanagar Beach - Asia\'s best beach',
      'Scuba diving and snorkeling',
      'Cellular Jail history',
      'Havelock Island',
      'Sea walking experience'
    ],
    activities: [
      'Scuba Diving', 'Snorkeling', 'Sea Walking', 'Island Tours', 'Beach Relaxation'
    ],
    weather: {
      summer: '25-35°C',
      winter: '20-30°C',
      monsoon: '25-30°C'
    }
  }
};

// Countdown Timer Component
const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Mins' },
    { value: timeLeft.seconds, label: 'Secs' }
  ];

  return (
    <div className="flex items-center gap-2">
      {timeUnits.map((unit, index) => (
        <div key={unit.label} className="text-center">
          <div className="bg-orange-100 rounded-lg px-3 py-2 min-w-[60px]">
            <span className="text-2xl font-bold text-orange-600">
              {String(unit.value).padStart(2, '0')}
            </span>
          </div>
          <span className="text-xs text-gray-600 mt-1 block">{unit.label}</span>
        </div>
      ))}
    </div>
  );
};

// Image Gallery Component
const ImageGallery = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);

  const handlePrevious = () => {
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="relative rounded-2xl overflow-hidden bg-gray-100">
        <div className="relative h-96 cursor-pointer" onClick={() => setShowFullscreen(true)}>
          <img
            src={images[currentIndex]?.url || images[currentIndex]}
            alt={`${title} - Image ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all ${
                    index === currentIndex 
                      ? 'ring-2 ring-blue-600 scale-105' 
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={image.url || image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onClick={() => setShowFullscreen(false)}
          >
            <button
              onClick={() => setShowFullscreen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="w-8 h-8" />
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-3 rounded-full text-white"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <img
              src={images[currentIndex]?.url || images[currentIndex]}
              alt={`${title} - Fullscreen`}
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />
            
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-3 rounded-full text-white"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ========== HELPER FUNCTIONS FOR SAFE DATA ACCESS ==========

const formatPrice = (price) => {
  if (price === undefined || price === null) return '₹0';
  return `₹${Number(price).toLocaleString('en-IN')}`;
};

const getPrice = (data) => {
  if (!data) return 0;
  
  if (typeof data.price === 'number') return data.price;
  if (data.pricing?.discountedPrice) return data.pricing.discountedPrice;
  if (data.pricing?.price) return data.pricing.price;
  if (data.cost) return data.cost;
  
  return 0;
};

const getOriginalPrice = (data) => {
  if (!data) return 0;
  
  if (typeof data.originalPrice === 'number') return data.originalPrice;
  if (data.pricing?.originalPrice) return data.pricing.originalPrice;
  if (data.price) return data.price * 1.2;
  
  return 0;
};

const getRating = (data) => {
  if (!data) return 0;
  
  if (typeof data.rating === 'number') return data.rating;
  if (data.rating?.average) return data.rating.average;
  if (data.rating?.value) return data.rating.value;
  
  return 4.5;
};

const getReviews = (data) => {
  if (!data) return 0;
  
  if (typeof data.reviews === 'number') return data.reviews;
  if (data.rating?.count) return data.rating.count;
  if (data.reviewCount) return data.reviewCount;
  
  return 0;
};

const getLocation = (data) => {
  if (!data) return 'Unknown';
  
  if (typeof data.location === 'string') return data.location;
  if (typeof data.destination === 'string') return data.destination;
  if (data.destination?.city && data.destination?.country) {
    return `${data.destination.city}, ${data.destination.country}`;
  }
  if (data.city && data.country) return `${data.city}, ${data.country}`;
  
  return 'International';
};

const getDuration = (data) => {
  if (!data) return '';
  
  if (typeof data.duration === 'string') return data.duration;
  if (data.duration?.days && data.duration?.nights) {
    return `${data.duration.days} Days / ${data.duration.nights} Nights`;
  }
  if (data.nights && data.days) return `${data.days} Days / ${data.nights} Nights`;
  
  return '';
};

const getImages = (data) => {
  if (!data) return [];
  
  if (data.images && Array.isArray(data.images) && data.images.length > 0) {
    return data.images;
  }
  if (data.image) return [data.image];
  if (data.gallery && Array.isArray(data.gallery)) return data.gallery;
  if (data.images?.length) return data.images;
  
  return [
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&auto=format&fit=crop'
  ];
};

const getHighlights = (data) => {
  if (!data) return [];
  
  if (data.highlights && Array.isArray(data.highlights)) return data.highlights;
  if (data.activities && Array.isArray(data.activities)) return data.activities;
  
  return [];
};

const getInclusions = (data) => {
  if (!data) return [];
  
  if (data.inclusions && Array.isArray(data.inclusions)) return data.inclusions;
  if (data.included && Array.isArray(data.included)) return data.included;
  if (data.amenities && Array.isArray(data.amenities)) return data.amenities;
  
  return [];
};

const getExclusions = (data) => {
  if (!data) return [];
  
  if (data.exclusions && Array.isArray(data.exclusions)) return data.exclusions;
  
  return [];
};

const getItinerary = (data) => {
  if (!data) return [];
  
  if (data.itinerary && Array.isArray(data.itinerary)) return data.itinerary;
  
  return [];
};

// ========== COMPONENTS ==========

// Destination Details Component
const DestinationDetailsComponent = ({ data }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [selectedDate, setSelectedDate] = useState('');
  const [travelers, setTravelers] = useState(2);

  const price = getPrice(data);
  const rating = getRating(data);
  const reviews = getReviews(data);
  const location = getLocation(data);
  const totalPrice = price * travelers;
  const highlights = getHighlights(data);
  const activities = data.activities || [];

  const handleBookNow = () => {
    if (!isAuthenticated) {
      sessionStorage.setItem('redirectAfterLogin', `/details/destination/${data.id}`);
      navigate('/login');
      return;
    }
    navigate('/booking', { 
      state: { 
        item: { 
          ...data, 
          type: 'destination',
          name: data.name,
          destination: location,
          price: price,
          duration: 'Customizable'
        }, 
        type: 'destination',
        selectedDate, 
        travelers 
      } 
    });
  };

  return (
    <div className="space-y-6">
      {/* Header with Title and Rating */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
        <div className="flex items-center gap-2 text-gray-600 mt-2">
          <MapPin className="w-4 h-4" />
          <span>{data.country || location}</span>
        </div>
        
        {/* Rating */}
        {rating > 0 && (
          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-gray-900">{rating}</span>
            </div>
            <span className="text-sm text-gray-500">({reviews.toLocaleString()} reviews)</span>
          </div>
        )}
      </div>

      {/* Quick Info Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-blue-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-blue-600" />
            <span className="text-xs text-gray-500">Starting from</span>
          </div>
          <p className="text-xl font-bold text-blue-600">{formatPrice(price)}</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-green-600" />
            <span className="text-xs text-gray-500">Best Time</span>
          </div>
          <p className="text-lg font-semibold text-green-700">{data.bestTime || 'All Year'}</p>
        </div>
      </div>

      {/* Description */}
      <div>
        <h3 className="font-bold text-gray-900 mb-2">About</h3>
        <p className="text-gray-700 leading-relaxed text-sm">
          {data.longDescription || data.description}
        </p>
      </div>

      {/* Highlights */}
      {highlights.length > 0 && (
        <div>
          <h3 className="font-bold text-gray-900 mb-3">Highlights</h3>
          <div className="grid grid-cols-1 gap-2">
            {highlights.slice(0, 4).map((highlight, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="bg-green-100 rounded-full p-1 mt-0.5">
                  <Check className="w-3 h-3 text-green-600" />
                </div>
                <span className="text-sm text-gray-700">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Activities */}
      {activities.length > 0 && (
        <div>
          <h3 className="font-bold text-gray-900 mb-3">Popular Activities</h3>
          <div className="flex flex-wrap gap-2">
            {activities.map((activity, index) => (
              <Badge key={index} variant="secondary" className="bg-purple-50 text-purple-700 border-purple-100">
                {activity}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Weather Info */}
      {data.weather && (
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Sun className="w-4 h-4 text-orange-500" />
            Weather Information
          </h3>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-xs text-gray-500">Summer</p>
              <p className="text-sm font-semibold">{data.weather.summer}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Winter</p>
              <p className="text-sm font-semibold">{data.weather.winter}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Monsoon</p>
              <p className="text-sm font-semibold">{data.weather.monsoon}</p>
            </div>
          </div>
        </div>
      )}

      {/* Booking Section */}
      <Card className="border-2 border-blue-200">
        <div className="p-4">
          <h3 className="font-bold text-gray-900 mb-4">Book Your Trip</h3>
          
          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Travelers</label>
              <select
                value={travelers}
                onChange={(e) => setTravelers(parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Traveler' : 'Travelers'}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Base Price</span>
              <span className="font-semibold">{formatPrice(price * travelers)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Taxes & Fees</span>
              <span>Included</span>
            </div>
            <div className="border-t border-gray-200 mt-3 pt-3 flex items-center justify-between">
              <span className="font-bold text-gray-900">Total</span>
              <span className="text-xl font-bold text-blue-600">{formatPrice(totalPrice)}</span>
            </div>
          </div>

          <Button 
            variant="primary" 
            size="lg" 
            fullWidth 
            onClick={handleBookNow}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Book Now
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>

          <div className="mt-3 flex items-center justify-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3" /> Secure Booking
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" /> 24/7 Support
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

// Seasonal Deal Details Component
const SeasonalDealDetailsComponent = ({ data }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [selectedDate, setSelectedDate] = useState('');
  const [travelers, setTravelers] = useState(2);
  const [activeTab, setActiveTab] = useState('overview');

  const price = getPrice(data);
  const originalPrice = getOriginalPrice(data);
  const rating = getRating(data);
  const reviews = getReviews(data);
  const location = getLocation(data);
  const duration = getDuration(data) || data.duration;
  const totalPrice = price * travelers;
  const highlights = getHighlights(data);
  const inclusions = getInclusions(data);
  const exclusions = getExclusions(data);
  const itinerary = getItinerary(data);

  const handleBookNow = () => {
    if (!isAuthenticated) {
      sessionStorage.setItem('redirectAfterLogin', `/details/seasonal/${data.id}`);
      navigate('/login');
      return;
    }
    navigate('/booking', { 
      state: { 
        item: { 
          ...data, 
          type: 'seasonal',
          name: data.title,
          destination: location,
          price: price,
          duration: duration
        }, 
        type: 'seasonal',
        selectedDate, 
        travelers 
      } 
    });
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'highlights', label: 'Highlights' },
    ...(itinerary.length > 0 ? [{ id: 'itinerary', label: 'Itinerary' }] : []),
    { id: 'inclusions', label: 'Inclusions' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">{data.title}</h1>
          {data.badge && (
            <Badge variant="warning" className="bg-orange-500 text-white border-0 ml-4 whitespace-nowrap">
              {data.badge}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2 text-gray-600 mt-2">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{rating}</span>
          </div>
          <span className="text-sm text-gray-500">({reviews} reviews)</span>
        </div>
      </div>

      {/* Deal Badge */}
      {data.discount && (
        <div className="flex items-center gap-2">
          <Badge variant="danger" className="bg-red-500 text-white border-0 text-lg px-4 py-2">
            <Percent className="w-4 h-4 mr-1" />
            {data.discount}% OFF
          </Badge>
          {originalPrice > price && (
            <Badge variant="primary" className="bg-green-500 text-white border-0">
              Save {formatPrice(originalPrice - price)}
            </Badge>
          )}
        </div>
      )}

      {/* Price Card */}
      <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm opacity-90">Special Deal Price</p>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{formatPrice(price)}</span>
            {originalPrice > price && (
              <span className="text-sm opacity-75 line-through">{formatPrice(originalPrice)}</span>
            )}
          </div>
          {duration && (
            <p className="text-sm opacity-90 mt-1">{duration}</p>
          )}
        </div>
      </Card>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium text-sm whitespace-nowrap transition-all relative ${
                activeTab === tab.id
                  ? 'text-orange-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed text-sm">{data.longDescription || data.description}</p>
          </div>
        )}

        {activeTab === 'highlights' && highlights.length > 0 && (
          <div className="space-y-3">
            {highlights.map((highlight, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="bg-orange-100 rounded-full p-1 mt-0.5">
                  <Sparkles className="w-4 h-4 text-orange-600" />
                </div>
                <span className="text-gray-700 text-sm">{highlight}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'itinerary' && itinerary.length > 0 && (
          <div className="space-y-4">
            {itinerary.map((day, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Day {day.day}: {day.title}</h4>
                <div className="flex flex-wrap gap-2">
                  {day.activities && day.activities.map((activity, i) => (
                    <Badge key={i} variant="secondary" className="bg-white">
                      {activity}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'inclusions' && (
          <div className="space-y-4">
            {inclusions.length > 0 && (
              <div>
                <h4 className="font-semibold text-green-600 mb-2 flex items-center gap-2">
                  <Check className="w-4 h-4" /> Inclusions
                </h4>
                <div className="space-y-2">
                  {inclusions.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {exclusions.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold text-red-600 mb-2 flex items-center gap-2">
                  <X className="w-4 h-4" /> Exclusions
                </h4>
                <div className="space-y-2">
                  {exclusions.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <X className="w-4 h-4 text-red-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Booking Section */}
      <Card className="border-2 border-orange-200">
        <div className="p-4">
          <h3 className="font-bold text-gray-900 mb-4">Book This Deal</h3>
          
          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Travelers</label>
              <select
                value={travelers}
                onChange={(e) => setTravelers(parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Traveler' : 'Travelers'}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Deal Price</span>
              <span className="font-semibold">{formatPrice(price * travelers)}</span>
            </div>
            {originalPrice > price && (
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>You Save</span>
                <span className="text-green-600">{formatPrice((originalPrice - price) * travelers)}</span>
              </div>
            )}
            <div className="border-t border-gray-200 mt-3 pt-3 flex items-center justify-between">
              <span className="font-bold text-gray-900">Total</span>
              <span className="text-xl font-bold text-orange-600">{formatPrice(totalPrice)}</span>
            </div>
          </div>

          <Button 
            variant="primary" 
            size="lg" 
            fullWidth 
            onClick={handleBookNow}
            className="bg-orange-600 hover:bg-orange-700"
          >
            Book Now
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>

          <div className="mt-3 flex items-center justify-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Timer className="w-3 h-3" /> Limited Time
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" /> {reviews}+ booked
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

// Flight Details Component
const FlightDetails = ({ data }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const price = getPrice(data);
  const originalPrice = getOriginalPrice(data);

  const handleBookNow = () => {
    if (!isAuthenticated) {
      sessionStorage.setItem('redirectAfterLogin', `/details/flight/${data.id}`);
      navigate('/login');
      return;
    }
    navigate('/booking', { state: { item: data, type: 'flight' } });
  };

  return (
    <div className="space-y-6">
      {/* Airline Header */}
      <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-3xl shadow-md">
          {data.logo}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{data.airline}</h1>
          <p className="text-gray-600">{data.flightNumber} • {data.aircraft}</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Badge variant={data.refundable ? 'success' : 'secondary'} className="flex items-center gap-1">
            {data.refundable ? 'Free Cancellation' : 'Non-refundable'}
          </Badge>
        </div>
      </div>

      {/* Flight Route */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          {/* Departure */}
          <div className="text-center">
            <p className="text-4xl font-bold text-gray-900">{data.from?.time}</p>
            <p className="text-xl font-semibold text-gray-700">{data.from?.code}</p>
            <p className="text-gray-500">{data.from?.city}</p>
            <p className="text-sm text-gray-400 mt-1">Terminal {data.from?.terminal}</p>
          </div>
          
          {/* Flight Path */}
          <div className="flex-1 px-8">
            <div className="relative">
              <div className="border-t-2 border-gray-300 border-dashed"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-full shadow-md">
                <Plane className="w-5 h-5 text-blue-600 transform rotate-90" />
              </div>
            </div>
            <div className="text-center mt-3">
              <p className="font-semibold text-gray-700">{data.duration}</p>
              <Badge variant="success" className="mt-1">{data.stops}</Badge>
            </div>
          </div>
          
          {/* Arrival */}
          <div className="text-center">
            <p className="text-4xl font-bold text-gray-900">{data.to?.time}</p>
            <p className="text-xl font-semibold text-gray-700">{data.to?.code}</p>
            <p className="text-gray-500">{data.to?.city}</p>
            <p className="text-sm text-gray-400 mt-1">Terminal {data.to?.terminal}</p>
          </div>
        </div>

        {/* Flight Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Date</p>
              <p className="font-medium">{data.date ? new Date(data.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : 'TBD'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Seats</p>
              <p className="font-medium"><span className="text-orange-600 font-bold">{data.seatsLeft || 0}</span> left</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Luggage className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Baggage</p>
              <p className="font-medium">{data.baggage?.checkIn || '20kg'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Class</p>
              <p className="font-medium">{data.class || 'Economy'}</p>
            </div>
          </div>
        </div>

        {/* Amenities */}
        {data.amenities && (
          <div className="mt-4">
            <h3 className="font-medium text-gray-900 mb-2">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {data.amenities.map((amenity, i) => (
                <Badge key={i} variant="secondary" className="bg-blue-50 text-blue-700 border-blue-100">
                  {amenity}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Price & Booking */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Total Price</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-blue-600">{formatPrice(price)}</span>
              {originalPrice > price && (
                <span className="text-sm text-gray-500 line-through">{formatPrice(originalPrice)}</span>
              )}
              {data.discount && (
                <Badge variant="danger" className="bg-red-100 text-red-700">{data.discount}</Badge>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">per adult • taxes included</p>
          </div>
          <Button variant="primary" size="lg" onClick={handleBookNow}>
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

// Package Details Component
const PackageDetailsComponent = ({ data }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [selectedDate, setSelectedDate] = useState('');
  const [travelers, setTravelers] = useState(2);
  const [activeTab, setActiveTab] = useState('overview');

  const price = getPrice(data);
  const originalPrice = getOriginalPrice(data);
  const rating = getRating(data);
  const reviews = getReviews(data);
  const location = getLocation(data);
  const duration = getDuration(data) || data.duration;
  const totalPrice = price * travelers;
  const highlights = getHighlights(data);
  const inclusions = getInclusions(data);
  const exclusions = getExclusions(data);
  const itinerary = getItinerary(data);

  const handleBookNow = () => {
    if (!isAuthenticated) {
      sessionStorage.setItem('redirectAfterLogin', `/details/package/${data.id}`);
      navigate('/login');
      return;
    }
    navigate('/booking', { 
      state: { 
        item: { 
          ...data, 
          type: 'package',
          name: data.name || data.title,
          destination: location,
          price: price,
          duration: duration
        }, 
        type: 'package',
        selectedDate, 
        travelers 
      } 
    });
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'highlights', label: 'Highlights' },
    ...(inclusions.length > 0 || exclusions.length > 0 ? [{ id: 'inclusions', label: 'Inclusions' }] : []),
    ...(itinerary.length > 0 ? [{ id: 'itinerary', label: 'Itinerary' }] : []),
    { id: 'reviews', label: 'Reviews' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{data.name || data.title}</h1>
        <div className="flex items-center gap-2 text-gray-600 mt-2">
          <MapPin className="w-5 h-5" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{rating}</span>
          </div>
          <span className="text-sm text-gray-500">({reviews} reviews)</span>
        </div>
      </div>

      {/* Price Card */}
      <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="p-4">
          <p className="text-sm opacity-90 mb-1">Starting from</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{formatPrice(price)}</span>
            <span className="text-sm opacity-75">per person</span>
          </div>
          {duration && (
            <p className="text-sm opacity-90 mt-1">{duration}</p>
          )}
        </div>
      </Card>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium text-sm whitespace-nowrap transition-all relative ${
                activeTab === tab.id
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed text-sm">{data.description}</p>
          </div>
        )}

        {activeTab === 'highlights' && highlights.length > 0 && (
          <div className="space-y-3">
            {highlights.map((highlight, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="bg-blue-100 rounded-full p-1 mt-0.5">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-gray-700 text-sm">{highlight}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'inclusions' && (
          <div className="space-y-4">
            {inclusions.length > 0 && (
              <div>
                <h4 className="font-semibold text-green-600 mb-2">Inclusions</h4>
                <div className="space-y-2">
                  {inclusions.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {exclusions.length > 0 && (
              <div>
                <h4 className="font-semibold text-red-600 mb-2">Exclusions</h4>
                <div className="space-y-2">
                  {exclusions.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <X className="w-4 h-4 text-red-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'itinerary' && itinerary.length > 0 && (
          <div className="space-y-4">
            {itinerary.map((day, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Day {day.day}: {day.title}</h4>
                <div className="flex flex-wrap gap-2">
                  {day.activities && day.activities.map((activity, i) => (
                    <Badge key={i} variant="secondary" className="bg-white">
                      {activity}
                    </Badge>
                  ))}
                </div>
                {day.description && (
                  <p className="text-sm text-gray-600 mt-2">{day.description}</p>
                )}
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

      {/* Booking Section */}
      <Card className="border-2 border-blue-200">
        <div className="p-4">
          <h3 className="font-bold text-gray-900 mb-4">Book This Package</h3>
          
          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Travelers</label>
              <select
                value={travelers}
                onChange={(e) => setTravelers(parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Traveler' : 'Travelers'}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Base Price</span>
              <span className="font-semibold">{formatPrice(price * travelers)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Taxes & Fees</span>
              <span>Included</span>
            </div>
            <div className="border-t border-gray-200 mt-3 pt-3 flex items-center justify-between">
              <span className="font-bold text-gray-900">Total</span>
              <span className="text-xl font-bold text-blue-600">{formatPrice(totalPrice)}</span>
            </div>
          </div>

          <Button variant="primary" size="lg" fullWidth onClick={handleBookNow}>
            Book Now
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>

          <div className="mt-3 flex items-center justify-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3" /> Secure Booking
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> Free Cancellation
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

// Deal Details Component
const DealDetailsComponent = ({ data }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [selectedDate, setSelectedDate] = useState('');
  const [travelers, setTravelers] = useState(2);

  const price = getPrice(data);
  const originalPrice = getOriginalPrice(data);
  const rating = getRating(data);
  const reviews = getReviews(data);
  const location = getLocation(data);
  const duration = getDuration(data) || data.duration;
  const totalPrice = price * travelers;
  const highlights = getHighlights(data);

  const handleBookNow = () => {
    if (!isAuthenticated) {
      sessionStorage.setItem('redirectAfterLogin', `/details/deal/${data.id}`);
      navigate('/login');
      return;
    }
    navigate('/booking', { 
      state: { 
        item: { 
          ...data, 
          type: 'deal',
          name: data.title,
          destination: location,
          price: price,
          duration: duration
        }, 
        type: 'deal',
        selectedDate, 
        travelers 
      } 
    });
  };

  return (
    <div className="space-y-6">
      {/* Countdown Banner */}
      {data.validUntil && (
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Timer className="w-8 h-8" />
              <div>
                <h3 className="font-bold text-xl">Limited Time Offer!</h3>
                <p className="text-sm opacity-90">Hurry! This deal ends in</p>
              </div>
            </div>
            <CountdownTimer targetDate={data.validUntil} />
          </div>
        </div>
      )}

      {/* Deal Content */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{data.title}</h1>
        {location && (
          <div className="flex items-center gap-2 text-gray-600 mt-2">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
        )}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{rating}</span>
          </div>
          <span className="text-sm text-gray-500">({reviews} reviews)</span>
        </div>
      </div>

      <p className="text-gray-700 leading-relaxed">{data.longDescription || data.description}</p>

      {/* Highlights */}
      {highlights.length > 0 && (
        <div>
          <h3 className="font-bold text-gray-900 mb-3">Highlights</h3>
          <div className="grid grid-cols-1 gap-2">
            {highlights.slice(0, 4).map((highlight, index) => (
              <div key={index} className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Price & Booking */}
      <Card className="border-2 border-orange-200">
        <div className="p-4">
          <h3 className="font-bold text-gray-900 mb-4">Book This Deal</h3>
          
          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Travelers</label>
              <select
                value={travelers}
                onChange={(e) => setTravelers(parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Traveler' : 'Travelers'}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Deal Price</span>
              <span className="font-semibold">{formatPrice(price * travelers)}</span>
            </div>
            {originalPrice > price && (
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>You Save</span>
                <span className="text-green-600">{formatPrice((originalPrice - price) * travelers)}</span>
              </div>
            )}
            <div className="border-t border-gray-200 mt-3 pt-3 flex items-center justify-between">
              <span className="font-bold text-gray-900">Total</span>
              <span className="text-xl font-bold text-orange-600">{formatPrice(totalPrice)}</span>
            </div>
          </div>

          <Button variant="primary" size="lg" fullWidth onClick={handleBookNow} className="bg-orange-600 hover:bg-orange-700">
            Book Now
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
          
          <div className="mt-3 flex items-center justify-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Timer className="w-3 h-3" /> Limited Time
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" /> {reviews}+ booked
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

// Main Details Page Component
const DetailsPage = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);

      try {
        let item = null;

        switch (type) {
          case 'package':
            // Try multiple data sources with different ID formats
            item = samplePackages.find(p => p._id === id) ||
                   samplePackages.find(p => p.packageId === id) ||
                   samplePackages.find(p => p.id === parseInt(id)) ||
                   samplePackages.find(p => p.id === id) ||
                   getPackageById(id);
            break;
          case 'flight':
            item = FLIGHTS_DATA?.[id];
            break;
          case 'deal':
            item = DEALS?.find(deal => deal.id === id);
            break;
          case 'destination':
            item = DESTINATIONS_DATA[id];
            
            if (!item) {
              const destinationName = id?.toLowerCase();
              item = Object.values(DESTINATIONS_DATA).find(
                dest => dest.name?.toLowerCase() === destinationName
              );
            }
            
            if (!item && id) {
              item = {
                id,
                name: id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
                country: 'International',
                description: `Experience the beauty and culture of this amazing destination.`,
                longDescription: `Discover the wonders of ${id} with our exclusive travel packages. From stunning landscapes to rich cultural experiences, this destination offers something for every traveler.`,
                images: [
                  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&auto=format&fit=crop'
                ],
                price: 35000,
                rating: 4.5,
                reviews: 250,
                bestTime: 'All Year',
                currency: 'Local',
                language: 'Local',
                timezone: 'Local',
                highlights: [
                  'Cultural experiences',
                  'Local cuisine',
                  'Historical sites',
                  'Natural beauty'
                ],
                activities: ['Sightseeing', 'Culture', 'Food', 'Shopping'],
                weather: {
                  summer: '25-35°C',
                  winter: '15-25°C',
                  monsoon: '20-30°C'
                }
              };
            }
            break;
          case 'seasonal':
            item = SEASONAL_DEALS[id];
            break;
          default:
            setError(true);
        }

        if (item) {
          setData(item);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error loading details:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [type, id]);

  const renderContent = () => {
    if (!data) return null;
    
    switch (type) {
      case 'package':
        return <PackageDetailsComponent data={data} />;
      case 'flight':
        return <FlightDetails data={data} />;
      case 'deal':
        return <DealDetailsComponent data={data} />;
      case 'destination':
        return <DestinationDetailsComponent data={data} />;
      case 'seasonal':
        return <SeasonalDealDetailsComponent data={data} />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading details...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Content Not Found</h2>
          <p className="text-gray-600 mb-6">
            The {type} you're looking for doesn't exist or has been removed.
          </p>
          <Button variant="primary" onClick={() => navigate('/')}>
            Go Back Home
          </Button>
        </div>
      </div>
    );
  }

  const images = getImages(data);
  const displayTitle = data.title || data.name || 'Details';

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <button onClick={() => navigate('/')} className="hover:text-blue-600">Home</button>
          <ChevronRight className="w-4 h-4" />
          <button onClick={() => navigate(`/${type}s`)} className="hover:text-blue-600 capitalize">{type}s</button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">{displayTitle}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-2">
            {images.length > 0 && <ImageGallery images={images} title={displayTitle} />}
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;