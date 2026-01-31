import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Package from '../src/models/Package.model.js';

dotenv.config();

const packages = [
  {
    packageId: 'PKG001',
    title: 'Dubai Dream Vacation',
    destination: {
      city: 'Dubai',
      country: 'UAE',
      continent: 'Asia'
    },
    description: 'Experience the luxury and grandeur of Dubai with our exclusive 5-day package. Visit iconic landmarks, enjoy desert safari, and indulge in world-class shopping.',
    highlights: [
      'Burj Khalifa Sky Deck visit',
      'Desert Safari with BBQ dinner',
      'Dubai Mall shopping experience',
      'Dubai Marina cruise',
      'Palm Jumeirah tour'
    ],
    duration: {
      days: 5,
      nights: 4
    },
    pricing: {
      originalPrice: 55000,
      discountedPrice: 45000,
      currency: 'INR',
      discount: 18
    },
    inclusions: [
      'Round-trip flights from major Indian cities',
      '4 nights accommodation in 5-star hotel',
      'Daily breakfast and 2 dinners',
      'Airport transfers',
      'Desert safari with BBQ dinner',
      'Burj Khalifa tickets (124th floor)',
      'Dubai city tour',
      'Visa assistance'
    ],
    exclusions: [
      'Personal expenses',
      'Travel insurance',
      'Lunch on most days',
      'Optional activities'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
        caption: 'Burj Khalifa at night'
      }
    ],
    rating: {
      average: 4.7,
      count: 342
    },
    category: 'luxury',
    difficulty: 'easy',
    flightDetails: {
      included: true,
      from: 'Multiple cities (Delhi, Mumbai, Bangalore)',
      airline: 'Emirates / Air India'
    },
    hotelDetails: {
      included: true,
      name: '5-Star Hotel in Downtown Dubai',
      starRating: 5,
      roomType: 'Deluxe Room'
    },
    availability: {
      startDate: new Date('2026-02-01'),
      endDate: new Date('2026-12-31'),
      maxBookings: 50,
      currentBookings: 12
    },
    tags: ['luxury', 'shopping', 'adventure', 'family-friendly', 'iconic'],
    isActive: true,
    isFeatured: true,
    bestSeason: 'November to March',
    minimumGuests: 1,
    maximumGuests: 8
  },
  {
    packageId: 'PKG002',
    title: 'Goa Beach Paradise',
    destination: {
      city: 'Goa',
      country: 'India',
      continent: 'Asia'
    },
    description: 'Relax on pristine beaches, explore Portuguese heritage, and enjoy vibrant nightlife in India\'s favorite beach destination.',
    highlights: [
      'Beach hopping across North & South Goa',
      'Water sports activities',
      'Portuguese fort visits',
      'Sunset cruise on Mandovi River',
      'Goan cuisine experience'
    ],
    duration: {
      days: 4,
      nights: 3
    },
    pricing: {
      originalPrice: 18000,
      discountedPrice: 14500,
      currency: 'INR',
      discount: 19
    },
    inclusions: [
      'Round-trip flights',
      '3 nights beach resort stay',
      'Daily breakfast',
      'Airport transfers',
      'North Goa sightseeing',
      'Water sports package',
      'Sunset cruise'
    ],
    exclusions: [
      'Lunch and dinner',
      'Personal expenses',
      'Travel insurance',
      'Adventure activities not mentioned'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2',
        caption: 'Beautiful Goa beaches'
      }
    ],
    rating: {
      average: 4.5,
      count: 567
    },
    category: 'beach',
    difficulty: 'easy',
    flightDetails: {
      included: true,
      from: 'All major cities',
      airline: 'IndiGo / SpiceJet'
    },
    hotelDetails: {
      included: true,
      name: 'Beach Resort in Calangute',
      starRating: 4,
      roomType: 'Sea View Room'
    },
    availability: {
      startDate: new Date('2026-02-01'),
      endDate: new Date('2026-12-31'),
      maxBookings: 100,
      currentBookings: 45
    },
    tags: ['beach', 'party', 'water-sports', 'relaxation', 'affordable'],
    isActive: true,
    isFeatured: true,
    bestSeason: 'October to March',
    minimumGuests: 1,
    maximumGuests: 10
  },
  {
    packageId: 'PKG003',
    title: 'Manali Snow Adventure',
    destination: {
      city: 'Manali',
      country: 'India',
      continent: 'Asia'
    },
    description: 'Experience the thrill of snow-capped mountains, adventure sports, and serene Himalayan beauty in Manali.',
    highlights: [
      'Rohtang Pass excursion',
      'Solang Valley adventure sports',
      'Hadimba Temple visit',
      'Old Manali exploration',
      'River rafting in Beas'
    ],
    duration: {
      days: 6,
      nights: 5
    },
    pricing: {
      originalPrice: 25000,
      discountedPrice: 19500,
      currency: 'INR',
      discount: 22
    },
    inclusions: [
      'Round-trip Volvo/flight from Delhi',
      '5 nights hotel accommodation',
      'Daily breakfast and dinner',
      'Rohtang Pass permit',
      'Solang Valley visit',
      'Local sightseeing',
      'All transfers'
    ],
    exclusions: [
      'Lunch',
      'Adventure activity costs',
      'Personal expenses',
      'Travel insurance'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
        caption: 'Snowy mountains of Manali'
      }
    ],
    rating: {
      average: 4.6,
      count: 423
    },
    category: 'adventure',
    difficulty: 'moderate',
    flightDetails: {
      included: false,
      from: 'Delhi (Volvo bus included)',
      airline: 'N/A'
    },
    hotelDetails: {
      included: true,
      name: 'Mountain View Hotel',
      starRating: 3,
      roomType: 'Deluxe Room'
    },
    availability: {
      startDate: new Date('2026-10-01'),
      endDate: new Date('2027-03-31'),
      maxBookings: 80,
      currentBookings: 34
    },
    tags: ['adventure', 'snow', 'mountains', 'honeymoon', 'family'],
    isActive: true,
    isFeatured: true,
    bestSeason: 'December to February (Snow), May to June (Pleasant)',
    minimumGuests: 2,
    maximumGuests: 8
  },
  {
    packageId: 'PKG004',
    title: 'Singapore & Malaysia Combo',
    destination: {
      city: 'Singapore',
      country: 'Singapore',
      continent: 'Asia'
    },
    description: 'Explore two amazing countries in one trip! Modern Singapore and vibrant Malaysia await you.',
    highlights: [
      'Universal Studios Singapore',
      'Gardens by the Bay',
      'Sentosa Island fun',
      'Petronas Towers Kuala Lumpur',
      'Genting Highlands'
    ],
    duration: {
      days: 7,
      nights: 6
    },
    pricing: {
      originalPrice: 65000,
      discountedPrice: 52000,
      currency: 'INR',
      discount: 20
    },
    inclusions: [
      'Round-trip flights',
      '3 nights Singapore + 3 nights Kuala Lumpur',
      'Daily breakfast',
      'Airport and inter-city transfers',
      'Universal Studios ticket',
      'City tours in both cities',
      'Visa assistance'
    ],
    exclusions: [
      'Lunch and dinner',
      'Personal expenses',
      'Travel insurance',
      'Optional tours'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd',
        caption: 'Singapore skyline'
      }
    ],
    rating: {
      average: 4.8,
      count: 289
    },
    category: 'family',
    difficulty: 'easy',
    flightDetails: {
      included: true,
      from: 'Major Indian cities',
      airline: 'Singapore Airlines / Air India'
    },
    hotelDetails: {
      included: true,
      name: '4-Star hotels in both cities',
      starRating: 4,
      roomType: 'Deluxe Room'
    },
    availability: {
      startDate: new Date('2026-02-01'),
      endDate: new Date('2026-12-31'),
      maxBookings: 60,
      currentBookings: 21
    },
    tags: ['family', 'shopping', 'theme-parks', 'multi-country', 'modern'],
    isActive: true,
    isFeatured: true,
    bestSeason: 'Year-round',
    minimumGuests: 2,
    maximumGuests: 10
  },
  {
    packageId: 'PKG005',
    title: 'Bali Island Retreat',
    destination: {
      city: 'Bali',
      country: 'Indonesia',
      continent: 'Asia'
    },
    description: 'Discover the magic of Bali with its stunning beaches, ancient temples, lush rice terraces, and warm hospitality.',
    highlights: [
      'Ubud rice terraces & monkey forest',
      'Tanah Lot temple sunset',
      'Water sports at Nusa Dua',
      'Traditional Balinese spa',
      'Kecak fire dance performance'
    ],
    duration: {
      days: 6,
      nights: 5
    },
    pricing: {
      originalPrice: 48000,
      discountedPrice: 38500,
      currency: 'INR',
      discount: 20
    },
    inclusions: [
      'Round-trip flights',
      '5 nights hotel/villa accommodation',
      'Daily breakfast',
      'Airport transfers',
      'Ubud full-day tour',
      'Water temple visit',
      'Sunset dinner at Jimbaran'
    ],
    exclusions: [
      'Visa on arrival fee ($35)',
      'Lunch (most days)',
      'Personal expenses',
      'Water sports fees'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
        caption: 'Bali rice terraces'
      }
    ],
    rating: {
      average: 4.7,
      count: 398
    },
    category: 'beach',
    difficulty: 'easy',
    flightDetails: {
      included: true,
      from: 'Delhi, Mumbai, Bangalore',
      airline: 'IndiGo / Batik Air'
    },
    hotelDetails: {
      included: true,
      name: 'Beach Resort / Private Villa',
      starRating: 4,
      roomType: 'Pool Villa'
    },
    availability: {
      startDate: new Date('2026-02-01'),
      endDate: new Date('2026-12-31'),
      maxBookings: 70,
      currentBookings: 28
    },
    tags: ['beach', 'cultural', 'honeymoon', 'spa', 'tropical'],
    isActive: true,
    isFeatured: true,
    bestSeason: 'April to October',
    minimumGuests: 2,
    maximumGuests: 6
  },
  {
    packageId: 'PKG006',
    title: 'Kerala Backwaters & Hills',
    destination: {
      city: 'Kerala',
      country: 'India',
      continent: 'Asia'
    },
    description: 'God\'s Own Country awaits! Experience houseboats, hill stations, tea plantations, and Ayurvedic wellness.',
    highlights: [
      'Houseboat stay in Alleppey',
      'Munnar tea gardens',
      'Thekkady wildlife sanctuary',
      'Kochi heritage walk',
      'Ayurvedic massage'
    ],
    duration: {
      days: 7,
      nights: 6
    },
    pricing: {
      originalPrice: 32000,
      discountedPrice: 26500,
      currency: 'INR',
      discount: 17
    },
    inclusions: [
      'Round-trip flights',
      '1 night houseboat + 5 nights hotels',
      'Daily breakfast and dinner',
      'All transfers',
      'Munnar sightseeing',
      'Thekkady tour',
      'Ayurvedic massage session'
    ],
    exclusions: [
      'Lunch',
      'Personal expenses',
      'Optional activities',
      'Travel insurance'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944',
        caption: 'Kerala backwaters'
      }
    ],
    rating: {
      average: 4.6,
      count: 512
    },
    category: 'cultural',
    difficulty: 'easy',
    flightDetails: {
      included: true,
      from: 'All major cities',
      airline: 'IndiGo / Air India'
    },
    hotelDetails: {
      included: true,
      name: '3-Star hotels + Deluxe Houseboat',
      starRating: 3,
      roomType: 'Deluxe Room / AC Houseboat'
    },
    availability: {
      startDate: new Date('2026-02-01'),
      endDate: new Date('2026-12-31'),
      maxBookings: 90,
      currentBookings: 47
    },
    tags: ['backwaters', 'hills', 'cultural', 'wellness', 'nature'],
    isActive: true,
    isFeatured: false,
    bestSeason: 'September to March',
    minimumGuests: 2,
    maximumGuests: 10
  },
  {
    packageId: 'PKG007',
    title: 'Thailand Discovery',
    destination: {
      city: 'Bangkok',
      country: 'Thailand',
      continent: 'Asia'
    },
    description: 'Explore vibrant Bangkok and tropical Phuket in one amazing trip. Temples, beaches, and Thai hospitality!',
    highlights: [
      'Grand Palace Bangkok',
      'Phi Phi Islands tour',
      'James Bond Island',
      'Thai cooking class',
      'Patong Beach nightlife'
    ],
    duration: {
      days: 6,
      nights: 5
    },
    pricing: {
      originalPrice: 42000,
      discountedPrice: 34500,
      currency: 'INR',
      discount: 18
    },
    inclusions: [
      'Round-trip international flights',
      '2 nights Bangkok + 3 nights Phuket',
      'Daily breakfast',
      'Domestic flight Bangkok-Phuket',
      'Bangkok city tour',
      'Phi Phi Island tour',
      'All transfers'
    ],
    exclusions: [
      'Visa fee',
      'Lunch and dinner',
      'Optional tours',
      'Personal expenses'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365',
        caption: 'Bangkok temples'
      }
    ],
    rating: {
      average: 4.5,
      count: 654
    },
    category: 'beach',
    difficulty: 'easy',
    flightDetails: {
      included: true,
      from: 'Delhi, Mumbai, Bangalore',
      airline: 'Thai Airways / Air India'
    },
    hotelDetails: {
      included: true,
      name: '4-Star hotels',
      starRating: 4,
      roomType: 'Deluxe Room'
    },
    availability: {
      startDate: new Date('2026-02-01'),
      endDate: new Date('2026-12-31'),
      maxBookings: 100,
      currentBookings: 58
    },
    tags: ['beach', 'cultural', 'party', 'islands', 'affordable'],
    isActive: true,
    isFeatured: false,
    bestSeason: 'November to April',
    minimumGuests: 2,
    maximumGuests: 10
  },
  {
    packageId: 'PKG008',
    title: 'Maldives Luxury Escape',
    destination: {
      city: 'Male',
      country: 'Maldives',
      continent: 'Asia'
    },
    description: 'Ultimate luxury in overwater villas. Crystal clear waters, pristine beaches, and world-class dining await.',
    highlights: [
      'Overwater villa stay',
      'Snorkeling with marine life',
      'Sunset dolphin cruise',
      'Private island dinner',
      'Spa treatments'
    ],
    duration: {
      days: 5,
      nights: 4
    },
    pricing: {
      originalPrice: 95000,
      discountedPrice: 78000,
      currency: 'INR',
      discount: 18
    },
    inclusions: [
      'Round-trip flights',
      '4 nights overwater villa',
      'All meals (full board)',
      'Speedboat/seaplane transfers',
      'Welcome drinks',
      'Snorkeling equipment',
      'One spa session'
    ],
    exclusions: [
      'Alcoholic beverages',
      'Diving courses',
      'Personal expenses',
      'Travel insurance'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8',
        caption: 'Maldives overwater villa'
      }
    ],
    rating: {
      average: 4.9,
      count: 187
    },
    category: 'luxury',
    difficulty: 'easy',
    flightDetails: {
      included: true,
      from: 'Major Indian cities',
      airline: 'IndiGo / SpiceJet'
    },
    hotelDetails: {
      included: true,
      name: '5-Star Island Resort',
      starRating: 5,
      roomType: 'Overwater Villa'
    },
    availability: {
      startDate: new Date('2026-02-01'),
      endDate: new Date('2026-12-31'),
      maxBookings: 30,
      currentBookings: 11
    },
    tags: ['luxury', 'honeymoon', 'beach', 'exclusive', 'romantic'],
    isActive: true,
    isFeatured: true,
    bestSeason: 'November to April',
    minimumGuests: 2,
    maximumGuests: 4
  }
];

const seedPackages = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/travelease');
    console.log('✅ Connected to MongoDB');

    await Package.deleteMany({});
    console.log('🗑️  Cleared existing packages');

    await Package.insertMany(packages);
    console.log(`✅ Created ${packages.length} packages`);

    console.log('\n📦 Package Summary:');
    console.log('─────────────────────────────');
    packages.forEach(pkg => {
      console.log(`${pkg.title} - ₹${pkg.pricing.discountedPrice} (${pkg.duration.days}D/${pkg.duration.nights}N)`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error);
    process.exit(1);
  }
};

seedPackages();