// src/data/samplePackages.js
// Sample holiday packages data

export const samplePackages = [
  // ✅ Custom Package added at the beginning
  {
    id: 'pkg-013',
    name: 'Your Custom Package',
    destination: 'City, Country',
    country: 'Country',
    type: 'package',
    duration: '5 Days / 4 Nights',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
    price: 50000,
    originalPrice: 60000,
    discount: 17,
    rating: 4.7,
    reviews: 500,
    description: 'Create your own dream vacation with customized experiences',
    highlights: ['Customizable itinerary', 'Flexible dates', 'Personalized activities'],
    included: ['Accommodation', 'Selected meals', 'Local transfers'],
    categories: ['custom', 'flexible', 'personalized'],
    featured: false,
  },
  {
    id: 'pkg-001',
    name: 'Dubai Luxury Escape',
    destination: 'Dubai, UAE',
    country: 'UAE',
    type: 'package',
    duration: '5 Days / 4 Nights',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
    price: 45000,
    originalPrice: 55000,
    discount: 18,
    rating: 4.8,
    reviews: 1250,
    description: 'Experience luxury shopping and ultramodern architecture in the heart of UAE',
    highlights: [
      'Burj Khalifa visit',
      '5-star hotel stay',
      'Desert Safari',
      'Dubai Mall shopping',
      'Airport transfers',
    ],
    included: [
      'Round-trip flights',
      '4-star hotel accommodation',
      'Daily breakfast',
      'City tour',
      'Visa assistance',
    ],
    categories: ['luxury', 'shopping', 'adventure'],
    featured: true,
  },
  {
    id: 'pkg-002',
    name: 'Paris Romantic Getaway',
    destination: 'Paris, France',
    country: 'France',
    type: 'package',
    duration: '6 Days / 5 Nights',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
    price: 75000,
    originalPrice: 90000,
    discount: 17,
    rating: 4.9,
    reviews: 2150,
    description: 'City of lights and romance with iconic landmarks and French cuisine',
    highlights: [
      'Eiffel Tower visit',
      'Louvre Museum',
      'Seine River cruise',
      'Versailles Palace',
      'French cuisine tour',
    ],
    included: [
      'Round-trip flights',
      'Boutique hotel stay',
      'Daily breakfast',
      'City pass',
      'Local guide',
    ],
    categories: ['romantic', 'culture', 'cuisine'],
    featured: true,
  },
  {
    id: 'pkg-003',
    name: 'Bali Beach Paradise',
    destination: 'Bali, Indonesia',
    country: 'Indonesia',
    type: 'package',
    duration: '7 Days / 6 Nights',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
    price: 35000,
    originalPrice: 42000,
    discount: 17,
    rating: 4.7,
    reviews: 1890,
    description: 'Tropical paradise with stunning beaches and ancient temples',
    highlights: [
      'Beach resort stay',
      'Temple tours',
      'Spa treatments',
      'Water sports',
      'Ubud rice terraces',
    ],
    included: [
      'Round-trip flights',
      'Beachfront resort',
      'Daily breakfast & dinner',
      'Airport transfers',
      'Guided tours',
    ],
    categories: ['beach', 'relaxation', 'nature'],
    featured: true,
  },
  {
    id: 'pkg-004',
    name: 'Maldives Overwater Villa',
    destination: 'Male, Maldives',
    country: 'Maldives',
    type: 'package',
    duration: '5 Days / 4 Nights',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800',
    price: 95000,
    originalPrice: 120000,
    discount: 21,
    rating: 5.0,
    reviews: 890,
    description: 'Ultimate luxury in overwater villas with crystal clear waters',
    highlights: [
      'Overwater villa',
      'Private beach access',
      'Scuba diving',
      'Spa & wellness',
      'Candlelit dinner',
    ],
    included: [
      'Seaplane transfers',
      'All-inclusive meals',
      'Water sports',
      'Spa credits',
      'Excursions',
    ],
    categories: ['luxury', 'honeymoon', 'beach'],
    featured: true,
  },
  {
    id: 'pkg-005',
    name: 'Singapore City Explorer',
    destination: 'Singapore',
    country: 'Singapore',
    type: 'package',
    duration: '4 Days / 3 Nights',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800',
    price: 32000,
    originalPrice: 38000,
    discount: 16,
    rating: 4.6,
    reviews: 1560,
    description: 'Modern city-state with stunning architecture and world-class attractions',
    highlights: [
      'Marina Bay Sands',
      'Gardens by the Bay',
      'Universal Studios',
      'Sentosa Island',
      'Night Safari',
    ],
    included: [
      'Round-trip flights',
      'City hotel',
      'Daily breakfast',
      'Attraction passes',
      'Metro card',
    ],
    categories: ['city', 'family', 'entertainment'],
    featured: false,
  },
  {
    id: 'pkg-006',
    name: 'London Heritage Tour',
    destination: 'London, UK',
    country: 'UK',
    type: 'package',
    duration: '7 Days / 6 Nights',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800',
    price: 85000,
    originalPrice: 100000,
    discount: 15,
    rating: 4.8,
    reviews: 2340,
    description: 'Historic capital with royal palaces and world-famous museums',
    highlights: [
      'Buckingham Palace',
      'Tower of London',
      'British Museum',
      'Thames cruise',
      'West End show',
    ],
    included: [
      'Round-trip flights',
      'Central hotel',
      'Daily breakfast',
      'Oyster card',
      'City tour',
    ],
    categories: ['heritage', 'culture', 'city'],
    featured: false,
  },
  {
    id: 'pkg-007',
    name: 'Thailand Adventure',
    destination: 'Bangkok & Phuket, Thailand',
    country: 'Thailand',
    type: 'package',
    duration: '8 Days / 7 Nights',
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800',
    price: 42000,
    originalPrice: 52000,
    discount: 19,
    rating: 4.7,
    reviews: 1780,
    description: 'Temple tours, beach relaxation, and vibrant street food culture',
    highlights: [
      'Bangkok city tour',
      'Phi Phi Islands',
      'Thai cooking class',
      'Beach resort stay',
      'Floating markets',
    ],
    included: [
      'Round-trip flights',
      'Multi-city hotels',
      'Daily breakfast',
      'Domestic flights',
      'Guided tours',
    ],
    categories: ['adventure', 'beach', 'culture'],
    featured: false,
  },
  {
    id: 'pkg-008',
    name: 'Switzerland Alps Retreat',
    destination: 'Zurich & Interlaken, Switzerland',
    country: 'Switzerland',
    type: 'package',
    duration: '6 Days / 5 Nights',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800',
    price: 110000,
    originalPrice: 135000,
    discount: 19,
    rating: 4.9,
    reviews: 1120,
    description: 'Breathtaking mountain scenery and charming alpine villages',
    highlights: [
      'Jungfrau mountain',
      'Lake cruises',
      'Swiss chocolate tour',
      'Cable car rides',
      'Alpine villages',
    ],
    included: [
      'Round-trip flights',
      'Mountain hotels',
      'Swiss Travel Pass',
      'Daily breakfast',
      'Scenic train rides',
    ],
    categories: ['nature', 'adventure', 'luxury'],
    featured: false,
  },
  {
    id: 'pkg-009',
    name: 'Greece Island Hopping',
    destination: 'Athens & Santorini, Greece',
    country: 'Greece',
    type: 'package',
    duration: '8 Days / 7 Nights',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800',
    price: 68000,
    originalPrice: 82000,
    discount: 17,
    rating: 4.8,
    reviews: 1650,
    description: 'Ancient ruins, white-washed villages, and stunning sunsets',
    highlights: [
      'Acropolis visit',
      'Santorini sunsets',
      'Island ferries',
      'Beach time',
      'Greek cuisine',
    ],
    included: [
      'Round-trip flights',
      'Island hotels',
      'Ferry tickets',
      'Daily breakfast',
      'City tours',
    ],
    categories: ['island', 'romantic', 'heritage'],
    featured: false,
  },
  {
    id: 'pkg-010',
    name: 'Australia East Coast',
    destination: 'Sydney & Gold Coast, Australia',
    country: 'Australia',
    type: 'package',
    duration: '10 Days / 9 Nights',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800',
    price: 125000,
    originalPrice: 155000,
    discount: 19,
    rating: 4.9,
    reviews: 980,
    description: 'Iconic landmarks, beautiful beaches, and wildlife encounters',
    highlights: [
      'Sydney Opera House',
      'Great Barrier Reef',
      'Gold Coast beaches',
      'Wildlife parks',
      'Coastal drives',
    ],
    included: [
      'Round-trip flights',
      'City & beach hotels',
      'Daily breakfast',
      'Domestic flights',
      'Attraction passes',
    ],
    categories: ['adventure', 'beach', 'wildlife'],
    featured: false,
  },
  {
    id: 'pkg-011',
    name: 'Japan Cherry Blossom',
    destination: 'Tokyo & Kyoto, Japan',
    country: 'Japan',
    type: 'package',
    duration: '7 Days / 6 Nights',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800',
    price: 92000,
    originalPrice: 112000,
    discount: 18,
    rating: 4.9,
    reviews: 1450,
    description: 'Ancient temples, modern technology, and beautiful cherry blossoms',
    highlights: [
      'Cherry blossom viewing',
      'Temples & shrines',
      'Bullet train ride',
      'Mt. Fuji view',
      'Traditional tea ceremony',
    ],
    included: [
      'Round-trip flights',
      'City hotels',
      'JR Pass',
      'Daily breakfast',
      'Guided tours',
    ],
    categories: ['culture', 'nature', 'heritage'],
    featured: false,
  },
  {
    id: 'pkg-012',
    name: 'New York City Lights',
    destination: 'New York, USA',
    country: 'USA',
    type: 'package',
    duration: '6 Days / 5 Nights',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
    price: 105000,
    originalPrice: 128000,
    discount: 18,
    rating: 4.7,
    reviews: 2100,
    description: 'The city that never sleeps with world-famous attractions',
    highlights: [
      'Statue of Liberty',
      'Times Square',
      'Central Park',
      'Broadway show',
      'Empire State Building',
    ],
    included: [
      'Round-trip flights',
      'Manhattan hotel',
      'Daily breakfast',
      'City pass',
      'Airport transfers',
    ],
    categories: ['city', 'entertainment', 'culture'],
    featured: false,
  },
];

/**
 * Get featured packages
 */
export const getFeaturedPackages = () => {
  return samplePackages.filter(pkg => pkg.featured);
};

/**
 * Get package by ID
 */
export const getPackageById = (id) => {
  return samplePackages.find(pkg => pkg.id === id);
};

/**
 * Filter packages by criteria
 */
export const filterPackages = (filters = {}) => {
  let filtered = [...samplePackages];

  // Filter by price range
  if (filters.minPrice || filters.maxPrice) {
    filtered = filtered.filter(pkg => {
      const price = pkg.price;
      const min = filters.minPrice || 0;
      const max = filters.maxPrice || Infinity;
      return price >= min && price <= max;
    });
  }

  // Filter by rating
  if (filters.minRating) {
    filtered = filtered.filter(pkg => pkg.rating >= filters.minRating);
  }

  // Filter by category
  if (filters.category) {
    filtered = filtered.filter(pkg => 
      pkg.categories.includes(filters.category.toLowerCase())
    );
  }

  // Filter by destination
  if (filters.destination) {
    const searchTerm = filters.destination.toLowerCase();
    filtered = filtered.filter(pkg => 
      pkg.destination.toLowerCase().includes(searchTerm) ||
      pkg.country.toLowerCase().includes(searchTerm)
    );
  }

  return filtered;
};

/**
 * Search packages
 */
export const searchPackages = (query) => {
  if (!query) return samplePackages;
  
  const searchTerm = query.toLowerCase();
  return samplePackages.filter(pkg => 
    pkg.name.toLowerCase().includes(searchTerm) ||
    pkg.destination.toLowerCase().includes(searchTerm) ||
    pkg.country.toLowerCase().includes(searchTerm) ||
    pkg.description.toLowerCase().includes(searchTerm)
  );
};