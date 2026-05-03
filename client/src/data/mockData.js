// Package Data (from PackageDetails.jsx)
export const SAMPLE_PACKAGES = {
  sample1: {
    _id: 'sample1',
    packageId: 'sample1',
    title: 'Magical Goa Beach Escape',
    category: 'beach',
    description: 'Enjoy the sun, sand and sea at Goa\'s best beaches with luxury accommodation and water activities. This package includes stay at premium beach resorts, daily breakfast, water sports activities, and a sunset cruise.',
    destination: {
      city: 'Goa',
      country: 'India'
    },
    duration: {
      days: 4,
      nights: 3
    },
    pricing: {
      originalPrice: 15000,
      discountedPrice: 12999,
      discount: 13
    },
    rating: {
      average: 4.5,
      count: 128
    },
    highlights: [
      'Private Beach Access',
      'Water Sports',
      'Sunset Cruise',
      'Luxury Resort',
      'Breakfast Included'
    ],
    inclusions: [
      'Flight',
      'Hotel',
      'Meals',
      'Sightseeing',
      'Transfer',
      'Water Sports',
      'Guide'
    ],
    exclusions: [
      'Personal Expenses',
      'Travel Insurance',
      'Tips & Gratuities',
      'Additional Meals'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Goa',
        description: 'Arrive at Goa airport. Transfer to hotel. Evening at leisure to explore nearby beach.',
        activities: ['Airport Transfer', 'Check-in', 'Beach Walk'],
        meals: ['Dinner']
      },
      {
        day: 2,
        title: 'North Goa Tour',
        description: 'Visit famous North Goa beaches including Calangute, Baga, and Anjuna. Enjoy water sports.',
        activities: ['Calangute Beach', 'Baga Beach', 'Water Sports', 'Market Visit'],
        meals: ['Breakfast', 'Lunch', 'Dinner']
      },
      {
        day: 3,
        title: 'South Goa Exploration',
        description: 'Explore South Goa\'s pristine beaches and Portuguese heritage sites.',
        activities: ['Palolem Beach', 'Colva Beach', 'Church Visit', 'Sunset Cruise'],
        meals: ['Breakfast', 'Dinner']
      },
      {
        day: 4,
        title: 'Departure',
        description: 'Breakfast at hotel. Transfer to airport for departure.',
        activities: ['Breakfast', 'Check-out', 'Airport Transfer'],
        meals: ['Breakfast']
      }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1174&q=80', caption: 'Beach Resort' },
      { url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1025&q=80', caption: 'Pool Area' },
      { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80', caption: 'Beach View' },
      { url: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80', caption: 'Water Sports' }
    ],
    bestSeason: 'Oct-Mar',
    reviews: [
      {
        id: 1,
        user: 'Rahul Sharma',
        rating: 5,
        date: '2024-01-15',
        comment: 'Amazing experience! The hotel was luxurious and the beach was beautiful. Water sports were thrilling.',
        avatar: 'https://i.pravatar.cc/150?img=1'
      },
      {
        id: 2,
        user: 'Priya Patel',
        rating: 4,
        date: '2024-01-10',
        comment: 'Great package overall. The sunset cruise was memorable. Food could be better.',
        avatar: 'https://i.pravatar.cc/150?img=2'
      },
      {
        id: 3,
        user: 'Amit Kumar',
        rating: 5,
        date: '2024-01-05',
        comment: 'Perfect honeymoon destination! Everything was well organized.',
        avatar: 'https://i.pravatar.cc/150?img=3'
      }
    ],
    faqs: [
      {
        question: 'What is the best time to visit?',
        answer: 'October to March is the best time with pleasant weather.'
      },
      {
        question: 'Is flight included?',
        answer: 'Yes, round-trip flights from major cities are included.'
      },
      {
        question: 'Can I customize the itinerary?',
        answer: 'Yes, we can customize based on your preferences.'
      }
    ],
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Bar', 'Gym', 'Room Service']
  },
  sample2: {
    _id: 'sample2',
    packageId: 'sample2',
    title: 'Kerala Backwaters & Ayurveda',
    category: 'luxury',
    description: 'Experience the serene backwaters of Kerala with houseboat stay and authentic Ayurvedic treatments.',
    destination: {
      city: 'Kerala',
      country: 'India'
    },
    duration: {
      days: 5,
      nights: 4
    },
    pricing: {
      originalPrice: 22000,
      discountedPrice: 18999,
      discount: 14
    },
    rating: {
      average: 4.7,
      count: 95
    },
    highlights: ['Houseboat Stay', 'Ayurvedic Massage', 'Kathakali Performance'],
    inclusions: ['Flight', 'Hotel', 'Meals', 'Sightseeing', 'Ayurveda'],
    exclusions: ['Personal Expenses', 'Travel Insurance', 'Tips'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Kochi',
        description: 'Arrive at Kochi airport. Transfer to hotel.',
        activities: ['Airport Transfer', 'Check-in'],
        meals: ['Dinner']
      },
      {
        day: 2,
        title: 'Alleppey Houseboat',
        description: 'Drive to Alleppey. Board traditional houseboat for backwater cruise.',
        activities: ['Houseboat Check-in', 'Backwater Cruise', 'Village Visit'],
        meals: ['Breakfast', 'Lunch', 'Dinner']
      },
      {
        day: 3,
        title: 'Ayurvedic Retreat',
        description: 'Transfer to Ayurvedic resort for wellness treatments.',
        activities: ['Ayurvedic Consultation', 'Massage', 'Yoga Session'],
        meals: ['Breakfast', 'Lunch', 'Dinner']
      }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80', caption: 'Houseboat' },
      { url: 'https://images.unsplash.com/photo-1626624340240-a10d0a5ae4e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80', caption: 'Backwaters' }
    ],
    bestSeason: 'Sep-Mar',
    reviews: [
      {
        id: 1,
        user: 'Sunita Reddy',
        rating: 5,
        date: '2024-01-20',
        comment: 'Best Ayurvedic experience!',
        avatar: 'https://i.pravatar.cc/150?img=4'
      }
    ],
    faqs: [
      {
        question: 'What is the best time to visit?',
        answer: 'September to March is ideal.'
      }
    ],
    amenities: ['WiFi', 'Ayurveda Center', 'Yoga Hall', 'Restaurant']
  },
  sample3: {
    _id: 'sample3',
    packageId: 'sample3',
    title: 'Manali Adventure Trek',
    category: 'adventure',
    description: 'Trek through the beautiful Himalayas, river rafting, paragliding and camping under the stars.',
    destination: {
      city: 'Manali',
      country: 'India'
    },
    duration: {
      days: 6,
      nights: 5
    },
    pricing: {
      originalPrice: 18000,
      discountedPrice: 15999,
      discount: 11
    },
    rating: {
      average: 4.6,
      count: 156
    },
    highlights: ['River Rafting', 'Paragliding', 'Camping', 'Trekking'],
    inclusions: ['Flight', 'Hotel', 'Meals', 'Activities', 'Guide'],
    exclusions: ['Personal Expenses', 'Travel Insurance', 'Tips'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Manali',
        description: 'Arrive at Kullu airport. Transfer to hotel.',
        activities: ['Airport Transfer', 'Check-in', 'Local Market'],
        meals: ['Dinner']
      },
      {
        day: 2,
        title: 'Solang Valley',
        description: 'Visit Solang Valley for paragliding and zorbing.',
        activities: ['Paragliding', 'Zorbing', 'Cable Car Ride'],
        meals: ['Breakfast', 'Lunch', 'Dinner']
      }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1626624340240-a10d0a5ae4e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80', caption: 'Mountain View' }
    ],
    bestSeason: 'Apr-Jun',
    reviews: [
      {
        id: 1,
        user: 'Vikram Singh',
        rating: 5,
        date: '2024-01-18',
        comment: 'Adventure of a lifetime!',
        avatar: 'https://i.pravatar.cc/150?img=5'
      }
    ],
    faqs: [
      {
        question: 'Is trekking experience required?',
        answer: 'No, beginners can also join.'
      }
    ],
    amenities: ['Camping Gear', 'Trekking Guide', 'Meals', 'Transport']
  },
  sample4: {
    _id: 'sample4',
    packageId: 'sample4',
    title: 'Udaipur Royal Heritage',
    category: 'cultural',
    description: 'Explore the city of lakes, majestic palaces, and experience royal Rajasthani culture.',
    destination: {
      city: 'Udaipur',
      country: 'India'
    },
    duration: {
      days: 4,
      nights: 3
    },
    pricing: {
      originalPrice: 16000,
      discountedPrice: 13499,
      discount: 16
    },
    rating: {
      average: 4.8,
      count: 203
    },
    highlights: ['Palace Visit', 'Lake Cruise', 'Folk Dance', 'Heritage Walk'],
    inclusions: ['Flight', 'Hotel', 'Meals', 'Sightseeing', 'Guide'],
    exclusions: ['Personal Expenses', 'Travel Insurance', 'Tips'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Udaipur',
        description: 'Arrive at Udaipur airport. Transfer to heritage hotel.',
        activities: ['Airport Transfer', 'Check-in', 'Evening Aarti'],
        meals: ['Dinner']
      },
      {
        day: 2,
        title: 'City Palace & Lake Pichola',
        description: 'Visit City Palace, Jagdish Temple, and enjoy boat ride on Lake Pichola.',
        activities: ['City Palace Tour', 'Boat Ride', 'Cultural Show'],
        meals: ['Breakfast', 'Lunch', 'Dinner']
      }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80', caption: 'City Palace' }
    ],
    bestSeason: 'Oct-Mar',
    reviews: [
      {
        id: 1,
        user: 'Anjali Mehta',
        rating: 5,
        date: '2024-01-12',
        comment: 'Royal experience!',
        avatar: 'https://i.pravatar.cc/150?img=6'
      }
    ],
    faqs: [
      {
        question: 'What is included in heritage walks?',
        answer: 'Guided tours of old city and markets.'
      }
    ],
    amenities: ['Heritage Hotel', 'Guide', 'Transport', 'Meals']
  },
  sample5: {
    _id: 'sample5',
    packageId: 'sample5',
    title: 'Andaman Island Honeymoon',
    category: 'honeymoon',
    description: 'Perfect honeymoon destination with pristine beaches, coral reefs and luxury resorts.',
    destination: {
      city: 'Andaman',
      country: 'India'
    },
    duration: {
      days: 7,
      nights: 6
    },
    pricing: {
      originalPrice: 35000,
      discountedPrice: 29999,
      discount: 14
    },
    rating: {
      average: 4.9,
      count: 167
    },
    highlights: ['Snorkeling', 'Scuba Diving', 'Sea Walking', 'Sunset View'],
    inclusions: ['Flight', 'Hotel', 'Meals', 'Activities', 'Transfer'],
    exclusions: ['Personal Expenses', 'Travel Insurance', 'Tips'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Port Blair',
        description: 'Arrive at Port Blair airport. Transfer to hotel.',
        activities: ['Airport Transfer', 'Check-in', 'Cellular Jail Visit'],
        meals: ['Dinner']
      },
      {
        day: 2,
        title: 'Havelock Island',
        description: 'Ferry to Havelock. Visit Radhanagar Beach.',
        activities: ['Ferry Ride', 'Beach Time', 'Sunset View'],
        meals: ['Breakfast', 'Lunch', 'Dinner']
      }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1173&q=80', caption: 'Andaman Beach' }
    ],
    bestSeason: 'Nov-May',
    reviews: [
      {
        id: 1,
        user: 'Neha & Raj',
        rating: 5,
        date: '2024-01-08',
        comment: 'Perfect honeymoon!',
        avatar: 'https://i.pravatar.cc/150?img=7'
      }
    ],
    faqs: [
      {
        question: 'Is scuba diving safe for beginners?',
        answer: 'Yes, professional instructors guide you.'
      }
    ],
    amenities: ['Luxury Resort', 'Water Sports', 'Private Transfers', 'Candlelight Dinner']
  },
  sample6: {
    _id: 'sample6',
    packageId: 'sample6',
    title: 'Ranthambore Wildlife Safari',
    category: 'wildlife',
    description: 'Spot tigers and wildlife in their natural habitat with expert guides and luxury tents.',
    destination: {
      city: 'Ranthambore',
      country: 'India'
    },
    duration: {
      days: 3,
      nights: 2
    },
    pricing: {
      originalPrice: 12000,
      discountedPrice: 9999,
      discount: 17
    },
    rating: {
      average: 4.4,
      count: 89
    },
    highlights: ['Tiger Safari', 'Bird Watching', 'Nature Walk', 'Photography'],
    inclusions: ['Flight', 'Hotel', 'Meals', 'Safari', 'Guide'],
    exclusions: ['Personal Expenses', 'Travel Insurance', 'Tips'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Ranthambore',
        description: 'Arrive at Sawai Madhopur railway station. Transfer to resort.',
        activities: ['Check-in', 'Nature Walk', 'Welcome Dinner'],
        meals: ['Dinner']
      },
      {
        day: 2,
        title: 'Tiger Safari',
        description: 'Morning and evening safari in Ranthambore National Park.',
        activities: ['Morning Safari', 'Afternoon Rest', 'Evening Safari'],
        meals: ['Breakfast', 'Lunch', 'Dinner']
      }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?ixlib=rb-4.0.3&auto=format&fit=crop&w=1173&q=80', caption: 'Tiger Safari' }
    ],
    bestSeason: 'Oct-Jun',
    reviews: [
      {
        id: 1,
        user: 'Arjun Nair',
        rating: 5,
        date: '2024-01-03',
        comment: 'Saw a tiger! Amazing experience.',
        avatar: 'https://i.pravatar.cc/150?img=8'
      }
    ],
    faqs: [
      {
        question: 'What are the chances of seeing a tiger?',
        answer: 'High during morning safaris.'
      }
    ],
    amenities: ['Luxury Tent', 'Safari Vehicle', 'Naturalist Guide', 'Bonfire']
  }
};

// Flight Data
export const FLIGHTS_DATA = {
  FL001: {
    id: 'FL001',
    type: 'flight',
    airline: 'Air India',
    airlineCode: 'AI',
    flightNumber: 'AI 860',
    logo: '🇮🇳',
    from: { code: 'DEL', city: 'Delhi', airport: 'Indira Gandhi International', terminal: 'T3', time: '06:00' },
    to: { code: 'BOM', city: 'Mumbai', airport: 'Chhatrapati Shivaji', terminal: 'T2', time: '08:15' },
    duration: '2h 15m',
    price: 4999,
    originalPrice: 8499,
    discount: '41% off',
    class: 'Economy',
    stops: 'Non-stop',
    date: '2025-03-20',
    seatsLeft: 12,
    rating: 4.5,
    reviews: 2345,
    amenities: ['Hot Meal', 'Wi-Fi', 'USB Port', 'Entertainment'],
    baggage: { cabin: '7kg', checkIn: '25kg' },
    aircraft: 'Boeing 787-8 Dreamliner',
    refundable: true,
    images: ['https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80']
  },
  FL002: {
    id: 'FL002',
    type: 'flight',
    airline: 'IndiGo',
    airlineCode: '6E',
    flightNumber: '6E 345',
    logo: '🟡',
    from: { code: 'BOM', city: 'Mumbai', airport: 'Chhatrapati Shivaji', terminal: 'T1', time: '09:30' },
    to: { code: 'BLR', city: 'Bangalore', airport: 'Kempegowda', terminal: 'T2', time: '11:45' },
    duration: '2h 15m',
    price: 3299,
    originalPrice: 5299,
    discount: '38% off',
    class: 'Economy',
    stops: 'Non-stop',
    date: '2025-03-20',
    seatsLeft: 8,
    rating: 4.3,
    reviews: 1876,
    amenities: ['Snacks', 'USB Port'],
    baggage: { cabin: '7kg', checkIn: '15kg' },
    aircraft: 'Airbus A320neo',
    refundable: false,
    images: ['https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80']
  }
};

// Deal Data
export const DEALS_DATA = {
  deal1: {
    id: 'deal1',
    title: 'Dubai Luxury Escape',
    description: '5-star luxury with Burj Khalifa view',
    longDescription: 'Experience the ultimate luxury vacation in Dubai. Stay at the iconic Burj Khalifa, enjoy private desert safaris, and indulge in world-class dining and shopping.',
    images: ['https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&auto=format&fit=crop'],
    discount: 40,
    price: 45000,
    originalPrice: 75000,
    validUntil: '2024-04-30',
    badge: 'Limited Time',
    location: 'Dubai, UAE',
    rating: 4.9,
    reviews: 1250,
    duration: '5 Days / 4 Nights',
    highlights: [
      'Stay at Armani Hotel Dubai',
      'Private desert safari experience',
      'Dinner at At.mosphere',
      'Dubai Fountain show',
      'Dubai Mall shopping voucher'
    ],
    inclusions: [
      'Round-trip flights',
      '5-star hotel accommodation',
      'Daily breakfast',
      'Desert safari with dinner',
      'Burj Khalifa observation deck',
      'Airport transfers'
    ],
    exclusions: [
      'Travel insurance',
      'Personal expenses',
      'Tips & gratuities',
      'Visa fees'
    ]
  },
  deal2: {
    id: 'deal2',
    title: 'Maldives Paradise',
    description: 'Overwater villa with all-inclusive',
    longDescription: 'Escape to paradise in the Maldives. Stay in a luxurious overwater villa, snorkel in crystal clear waters, and enjoy all-inclusive dining and activities.',
    images: ['https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&auto=format&fit=crop'],
    discount: 35,
    price: 95000,
    originalPrice: 146000,
    validUntil: '2024-05-15',
    badge: 'Best Seller',
    location: 'Maldives',
    rating: 5.0,
    reviews: 890,
    duration: '7 Days / 6 Nights',
    highlights: [
      'Overwater villa with glass floor',
      'Private pool',
      'House reef snorkeling',
      'Sunset dolphin cruise',
      'Candlelight dinner on beach'
    ],
    inclusions: [
      'Round-trip flights',
      'Overwater villa',
      'All meals & drinks',
      'Snorkeling equipment',
      'Sunset cruise',
      'Airport transfers by speedboat'
    ],
    exclusions: [
      'Spa treatments',
      'Scuba diving',
      'Personal expenses',
      'Tips'
    ]
  }
};

// Destination Data
export const DESTINATIONS_DATA = {
  dest1: {
    id: 'dest1',
    name: 'Dubai',
    country: 'UAE',
    description: 'Experience the epitome of luxury in the desert metropolis. From the world\'s tallest building to endless desert safaris, Dubai offers an unforgettable blend of modern marvels and traditional Arabian culture.',
    images: ['https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&auto=format&fit=crop'],
    price: 45000,
    rating: 4.9,
    bestTime: 'November to March',
    currency: 'AED',
    language: 'Arabic, English',
    timezone: 'GST (UTC+4)',
    highlights: [
      'Burj Khalifa - Tallest building in the world',
      'Dubai Mall - World\'s largest shopping mall',
      'Desert Safari - Dune bashing and camel rides',
      'Palm Jumeirah - Iconic man-made island',
      'Dubai Fountain - World\'s largest choreographed fountain'
    ]
  },
  dest2: {
    id: 'dest2',
    name: 'Paris',
    country: 'France',
    description: 'The city of love and lights, Paris captivates with its timeless romance, iconic landmarks, and world-class art and cuisine.',
    images: ['https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&auto=format&fit=crop'],
    price: 75000,
    rating: 4.8,
    bestTime: 'April to October',
    currency: 'Euro',
    language: 'French',
    timezone: 'CET (UTC+1)',
    highlights: [
      'Eiffel Tower - Iconic iron lattice tower',
      'Louvre Museum - World\'s largest art museum',
      'Notre-Dame Cathedral - Gothic masterpiece',
      'Champs-Élysées - Famous avenue',
      'Montmartre - Artistic neighborhood'
    ]
  }
};

// Visa Data
export const COUNTRIES_DATA = [
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
    requirements: ['passport', 'photo', 'bank-statement', 'itinerary', 'employment-letter']
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
    requirements: ['passport', 'photo', 'bank-statement', 'accommodation', 'travel-history']
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
    requirements: ['passport', 'photo', 'insurance', 'itinerary', 'flight-reservation']
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
    requirements: ['passport', 'photo', 'bank-statement', 'purpose-letter', 'biometrics']
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
    requirements: ['passport', 'photo', 'bank-statement', 'health-insurance', 'character-certificate']
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
    requirements: ['passport', 'photo', 'itinerary', 'flight-booking', 'hotel-booking']
  }
];

// Insurance Plans Data
export const INSURANCE_PLANS_DATA = [
  {
    id: 'basic',
    name: 'Basic Travel Shield',
    price: 499,
    currency: 'INR',
    coverage: {
      medical: 50000,
      cancellation: 25000,
      baggage: 10000,
      delay: 5000,
      accident: 100000
    },
    benefits: [
      'Emergency Medical Coverage',
      'Trip Cancellation',
      'Baggage Loss',
      'Flight Delay (4+ hours)',
      '24/7 Emergency Assistance'
    ],
    exclusions: [
      'Pre-existing conditions',
      'Adventure sports',
      'Intentional acts'
    ],
    popularity: 85,
    rating: 4.5,
    reviews: 1245,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: 'premium',
    name: 'Premium Travel Guard',
    price: 999,
    currency: 'INR',
    coverage: {
      medical: 200000,
      cancellation: 100000,
      baggage: 25000,
      delay: 10000,
      accident: 500000
    },
    benefits: [
      'Enhanced Medical Coverage',
      'Trip Cancellation & Interruption',
      'Baggage & Personal Effects',
      'Flight Delay (2+ hours)',
      'Emergency Evacuation',
      'Adventure Sports Coverage',
      'Personal Liability'
    ],
    exclusions: [
      'Pre-existing conditions with waiver available'
    ],
    popularity: 92,
    rating: 4.8,
    reviews: 876,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: 'family',
    name: 'Family Travel Protect',
    price: 1799,
    currency: 'INR',
    coverage: {
      medical: 300000,
      cancellation: 150000,
      baggage: 30000,
      delay: 15000,
      accident: 1000000
    },
    benefits: [
      'Covers up to 4 family members',
      'Comprehensive Medical Coverage',
      'Trip Cancellation & Interruption',
      'Baggage & Personal Effects',
      'Flight Delay (2+ hours)',
      'Emergency Evacuation',
      'Adventure Sports Coverage',
      'Personal Liability',
      'Child Care Benefits'
    ],
    exclusions: [
      'Pre-existing conditions with waiver available'
    ],
    popularity: 88,
    rating: 4.7,
    reviews: 654,
    image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: 'annual',
    name: 'Annual Multi-Trip',
    price: 3499,
    currency: 'INR',
    coverage: {
      medical: 250000,
      cancellation: 75000,
      baggage: 20000,
      delay: 10000,
      accident: 500000
    },
    benefits: [
      'Unlimited trips per year',
      'Coverage up to 30 days per trip',
      'Comprehensive Medical Coverage',
      'Trip Cancellation & Interruption',
      'Baggage & Personal Effects',
      'Flight Delay (2+ hours)',
      'Emergency Evacuation',
      'Personal Liability'
    ],
    exclusions: [
      'Pre-existing conditions',
      'Maximum 30 days per trip'
    ],
    popularity: 78,
    rating: 4.6,
    reviews: 432,
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1174&q=80'
  }
];

// Cruise Data
export const CRUISES_DATA = [
  {
    id: 'CR001',
    name: 'Caribbean Paradise',
    ship: 'Symphony of the Seas',
    line: 'Royal Caribbean',
    destination: 'Caribbean',
    departurePort: 'Miami, Florida',
    duration: '7 nights',
    price: 1299,
    originalPrice: 1599,
    discount: 19,
    rating: 4.8,
    reviews: 2341,
    images: ['https://images.unsplash.com/photo-1548574505-5e239809ee19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1064&q=80'],
    highlights: [
      'Largest ship in the world',
      'Ultimate family vacation',
      'Broadway-style entertainment',
      'World-class dining options'
    ]
  },
  {
    id: 'CR002',
    name: 'Mediterranean Explorer',
    ship: 'MSC Grandiosa',
    line: 'MSC Cruises',
    destination: 'Mediterranean',
    departurePort: 'Barcelona, Spain',
    duration: '7 nights',
    price: 1499,
    originalPrice: 1499,
    discount: 0,
    rating: 4.7,
    reviews: 1876,
    images: ['https://images.unsplash.com/photo-1578894381163-e3c4edd9d6c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'],
    highlights: [
      'Mediterranean highlights',
      'UNESCO World Heritage sites',
      'Gourmet dining experience',
      'Modern luxury ship'
    ]
  }
];

// Hotel Data
export const HOTELS_DATA = {
  hotel1: {
    id: 'hotel1',
    name: 'Grand Hyatt Mumbai',
    location: 'Mumbai, India',
    price: 12000,
    rating: 4.7,
    reviews: 1250,
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'],
    amenities: ['Swimming Pool', 'Spa', 'Restaurant', 'Gym', 'Wi-Fi'],
    description: 'Luxury hotel in the heart of Mumbai with world-class amenities.'
  }
};