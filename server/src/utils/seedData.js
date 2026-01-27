import connectDB from '../config/db.js'
import Flight from '../models/Flight.js'
import Hotel from '../models/Hotel.js'
import Tour from '../models/Tour.js'
import User from '../models/User.js'

// Premium Flights Data
const flights = [
  {
    airline: 'Air India',
    flightNumber: 'AI101',
    departure: { airport: 'DEL', city: 'Delhi', time: new Date('2026-02-15T06:00:00') },
    arrival: { airport: 'BOM', city: 'Mumbai', time: new Date('2026-02-15T08:30:00') },
    duration: 150,
    price: 4500,
    class: 'economy',
    stops: 0,
    availableSeats: 120,
    amenities: { wifi: true, meals: true, entertainment: true },
    baggage: { cabin: '7 kg', checkin: '15 kg' },
    refundable: true,
    status: 'active'
  },
  {
    airline: 'IndiGo',
    flightNumber: '6E202',
    departure: { airport: 'BLR', city: 'Bangalore', time: new Date('2026-02-15T09:00:00') },
    arrival: { airport: 'GOI', city: 'Goa', time: new Date('2026-02-15T10:30:00') },
    duration: 90,
    price: 3200,
    class: 'economy',
    stops: 0,
    availableSeats: 150,
    amenities: { wifi: false, meals: false, entertainment: false },
    baggage: { cabin: '7 kg', checkin: '15 kg' },
    refundable: false,
    status: 'active'
  },
  {
    airline: 'Emirates',
    flightNumber: 'EK505',
    departure: { airport: 'BOM', city: 'Mumbai', time: new Date('2026-02-16T22:00:00') },
    arrival: { airport: 'DXB', city: 'Dubai', time: new Date('2026-02-17T00:30:00') },
    duration: 210,
    price: 18500,
    class: 'business',
    stops: 0,
    availableSeats: 40,
    amenities: { wifi: true, meals: true, entertainment: true },
    baggage: { cabin: '7 kg', checkin: '30 kg' },
    refundable: true,
    status: 'active'
  },
  {
    airline: 'Vistara',
    flightNumber: 'UK851',
    departure: { airport: 'DEL', city: 'Delhi', time: new Date('2026-02-18T14:00:00') },
    arrival: { airport: 'SIN', city: 'Singapore', time: new Date('2026-02-18T21:30:00') },
    duration: 330,
    price: 15200,
    class: 'premium_economy',
    stops: 0,
    availableSeats: 60,
    amenities: { wifi: true, meals: true, entertainment: true },
    baggage: { cabin: '7 kg', checkin: '25 kg' },
    refundable: true,
    status: 'active'
  },
  {
    airline: 'Qatar Airways',
    flightNumber: 'QR572',
    departure: { airport: 'BOM', city: 'Mumbai', time: new Date('2026-02-20T03:00:00') },
    arrival: { airport: 'DOH', city: 'Doha', time: new Date('2026-02-20T05:15:00') },
    duration: 255,
    price: 22000,
    class: 'business',
    stops: 0,
    availableSeats: 35,
    amenities: { wifi: true, meals: true, entertainment: true },
    baggage: { cabin: '7 kg', checkin: '40 kg' },
    refundable: true,
    status: 'active'
  },
  {
    airline: 'SpiceJet',
    flightNumber: 'SG8156',
    departure: { airport: 'DEL', city: 'Delhi', time: new Date('2026-02-22T07:30:00') },
    arrival: { airport: 'JAI', city: 'Jaipur', time: new Date('2026-02-22T08:45:00') },
    duration: 75,
    price: 2100,
    class: 'economy',
    stops: 0,
    availableSeats: 140,
    amenities: { wifi: false, meals: false, entertainment: false },
    baggage: { cabin: '7 kg', checkin: '15 kg' },
    refundable: false,
    status: 'active'
  },
  {
    airline: 'British Airways',
    flightNumber: 'BA139',
    departure: { airport: 'DEL', city: 'Delhi', time: new Date('2026-02-25T02:30:00') },
    arrival: { airport: 'LHR', city: 'London', time: new Date('2026-02-25T07:45:00') },
    duration: 555,
    price: 45000,
    class: 'economy',
    stops: 0,
    availableSeats: 180,
    amenities: { wifi: true, meals: true, entertainment: true },
    baggage: { cabin: '7 kg', checkin: '23 kg' },
    refundable: true,
    status: 'active'
  },
  {
    airline: 'Singapore Airlines',
    flightNumber: 'SQ406',
    departure: { airport: 'BOM', city: 'Mumbai', time: new Date('2026-03-01T23:55:00') },
    arrival: { airport: 'SIN', city: 'Singapore', time: new Date('2026-03-02T07:30:00') },
    duration: 395,
    price: 28500,
    class: 'business',
    stops: 0,
    availableSeats: 42,
    amenities: { wifi: true, meals: true, entertainment: true },
    baggage: { cabin: '7 kg', checkin: '40 kg' },
    refundable: true,
    status: 'active'
  }
]

// Premium Hotels Data (10 hotels)
const hotels = [
  {
    name: 'The Taj Mahal Palace',
    description: 'An iconic luxury hotel overlooking the Gateway of India, offering world-class amenities, exquisite dining, and legendary hospitality in the heart of Mumbai.',
    location: 'Colaba, Mumbai',
    city: 'Mumbai',
    country: 'India',
    address: 'Apollo Bunder, Colaba, Mumbai, Maharashtra 400001',
    rating: 4.8,
    reviews: 2847,
    pricePerNight: 15000,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80'
    ],
    amenities: ['WiFi', 'Breakfast', 'Gym', 'Pool', 'Spa', 'Restaurant', 'Bar', 'Room Service'],
    rooms: { total: 285, available: 45 },
    featured: true,
    discount: 15,
    status: 'active'
  },
  {
    name: 'The Leela Palace New Delhi',
    description: 'Palatial luxury hotel blending contemporary design with traditional Indian hospitality, featuring lavish rooms, fine dining, and impeccable service.',
    location: 'Chanakyapuri, New Delhi',
    city: 'Delhi',
    country: 'India',
    address: 'Diplomatic Enclave, Chanakyapuri, New Delhi 110023',
    rating: 4.9,
    reviews: 1923,
    pricePerNight: 18000,
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80'
    ],
    amenities: ['WiFi', 'Breakfast', 'Gym', 'Pool', 'Spa', 'Restaurant', 'Butler Service', 'Airport Transfer'],
    rooms: { total: 254, available: 38 },
    featured: true,
    discount: 12,
    status: 'active'
  },
  {
    name: 'The Oberoi Udaivilas',
    description: 'A majestic palace hotel on the banks of Lake Pichola, featuring stunning architecture, luxurious suites, and breathtaking views of the City Palace.',
    location: 'Lake Pichola, Udaipur',
    city: 'Udaipur',
    country: 'India',
    address: 'Haridasji Ki Magri, Udaipur, Rajasthan 313001',
    rating: 4.9,
    reviews: 1654,
    pricePerNight: 35000,
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80'
    ],
    amenities: ['WiFi', 'Breakfast', 'Gym', 'Pool', 'Spa', 'Restaurant', 'Butler Service', 'Boat Rides'],
    rooms: { total: 87, available: 12 },
    featured: true,
    discount: 10,
    status: 'active'
  },
  {
    name: 'ITC Grand Chola',
    description: 'South India\'s largest luxury hotel inspired by Chola architecture, offering exceptional dining, wellness facilities, and grand hospitality.',
    location: 'Guindy, Chennai',
    city: 'Chennai',
    country: 'India',
    address: '63, Mount Road, Guindy, Chennai, Tamil Nadu 600032',
    rating: 4.7,
    reviews: 2134,
    pricePerNight: 12500,
    images: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80'
    ],
    amenities: ['WiFi', 'Breakfast', 'Gym', 'Pool', 'Spa', 'Restaurant', 'Bar', 'Business Center'],
    rooms: { total: 600, available: 85 },
    featured: true,
    discount: 18,
    status: 'active'
  },
  {
    name: 'The Leela Goa',
    description: 'Luxury beachfront resort with stunning ocean views, world-class amenities, Portuguese-inspired architecture, and exceptional dining experiences.',
    location: 'Mobor Beach, South Goa',
    city: 'Goa',
    country: 'India',
    address: 'Mobor, Cavelossim, South Goa, Goa 403731',
    rating: 4.7,
    reviews: 1890,
    pricePerNight: 14000,
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80'
    ],
    amenities: ['WiFi', 'Breakfast', 'Gym', 'Pool', 'Spa', 'Beach Access', 'Water Sports', 'Kids Club'],
    rooms: { total: 206, available: 42 },
    featured: true,
    discount: 20,
    status: 'active'
  },
  {
    name: 'Taj Falaknuma Palace',
    description: 'A 19th-century palace turned luxury hotel offering royal suites, vintage cars, fine dining, and panoramic views of Hyderabad city.',
    location: 'Falaknuma, Hyderabad',
    city: 'Hyderabad',
    country: 'India',
    address: 'Engine Bowli, Falaknuma, Hyderabad, Telangana 500053',
    rating: 4.8,
    reviews: 987,
    pricePerNight: 28000,
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80'
    ],
    amenities: ['WiFi', 'Breakfast', 'Gym', 'Pool', 'Spa', 'Restaurant', 'Heritage Tours', 'Butler Service'],
    rooms: { total: 60, available: 8 },
    featured: true,
    discount: 8,
    status: 'active'
  },
  {
    name: 'The Oberoi Amarvilas',
    description: 'Luxury hotel with uninterrupted views of the Taj Mahal, featuring Mughal-inspired architecture, terraced lawns, and world-class hospitality.',
    location: 'Taj East Gate, Agra',
    city: 'Agra',
    country: 'India',
    address: 'Taj East Gate Road, Agra, Uttar Pradesh 282001',
    rating: 4.9,
    reviews: 1432,
    pricePerNight: 42000,
    images: [
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80'
    ],
    amenities: ['WiFi', 'Breakfast', 'Gym', 'Pool', 'Spa', 'Restaurant', 'Butler Service', 'Taj Mahal Views'],
    rooms: { total: 102, available: 15 },
    featured: true,
    discount: 5,
    status: 'active'
  },
  {
    name: 'JW Marriott Mumbai Sahar',
    description: 'Contemporary luxury hotel near the airport, offering spacious rooms, multiple dining options, and extensive meeting facilities.',
    location: 'Andheri East, Mumbai',
    city: 'Mumbai',
    country: 'India',
    address: 'IA Project Road, Chhatrapati Shivaji International Airport, Mumbai 400099',
    rating: 4.6,
    reviews: 2567,
    pricePerNight: 11000,
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80'
    ],
    amenities: ['WiFi', 'Breakfast', 'Gym', 'Pool', 'Spa', 'Restaurant', 'Bar', 'Airport Shuttle'],
    rooms: { total: 569, available: 120 },
    featured: false,
    discount: 22,
    status: 'active'
  },
  {
    name: 'Wildflower Hall Shimla',
    description: 'Luxury mountain resort in the Himalayas offering stunning valley views, adventure activities, and a tranquil escape in nature.',
    location: 'Chharabra, Shimla',
    city: 'Shimla',
    country: 'India',
    address: 'Chharabra, Shimla, Himachal Pradesh 171012',
    rating: 4.8,
    reviews: 756,
    pricePerNight: 22000,
    images: [
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80'
    ],
    amenities: ['WiFi', 'Breakfast', 'Gym', 'Pool', 'Spa', 'Restaurant', 'Trekking', 'Mountain Views'],
    rooms: { total: 85, available: 18 },
    featured: false,
    discount: 15,
    status: 'active'
  },
  {
    name: 'Rambagh Palace Jaipur',
    description: 'Former royal residence transformed into a luxury heritage hotel, featuring opulent suites, regal gardens, and authentic Rajasthani hospitality.',
    location: 'Bhawani Singh Road, Jaipur',
    city: 'Jaipur',
    country: 'India',
    address: 'Bhawani Singh Road, Jaipur, Rajasthan 302005',
    rating: 4.7,
    reviews: 1876,
    pricePerNight: 24000,
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80'
    ],
    amenities: ['WiFi', 'Breakfast', 'Gym', 'Pool', 'Spa', 'Restaurant', 'Heritage Tours', 'Royal Dining'],
    rooms: { total: 78, available: 22 },
    featured: true,
    discount: 12,
    status: 'active'
  }
]

// Premium Tour Packages
const tours = [
  {
    name: 'Incredible Rajasthan Heritage Tour',
    description: 'Immerse yourself in the royal heritage of Rajasthan, exploring magnificent forts, palaces, and vibrant bazaars across Jaipur, Udaipur, Jodhpur, and Jaisalmer.',
    destination: 'Rajasthan',
    duration: '7 Days, 6 Nights',
    price: 52000,
    originalPrice: 65000,
    images: [
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&q=80',
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&q=80'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Jaipur', description: 'Check-in and city orientation tour', activities: ['Hawa Mahal', 'City Palace', 'Jantar Mantar'] },
      { day: 2, title: 'Jaipur Exploration', description: 'Full day sightseeing', activities: ['Amber Fort', 'Jal Mahal', 'Local Markets'] }
    ],
    inclusions: ['Accommodation', 'Breakfast', 'Transportation', 'Guide', 'Entry Fees'],
    exclusions: ['Lunch & Dinner', 'Personal Expenses', 'Travel Insurance'],
    rating: 4.8,
    reviews: 842,
    maxGroupSize: 15,
    availableSlots: 8,
    startDates: [new Date('2026-03-10'), new Date('2026-03-24')],
    difficulty: 'easy',
    category: 'cultural',
    featured: true,
    discount: 20,
    status: 'active'
  },
  {
    name: 'Kerala Backwaters & Beach Escape',
    description: 'Experience the tranquil beauty of Kerala with houseboat cruises through backwaters, spice plantation tours, and beach relaxation.',
    destination: 'Kerala',
    duration: '6 Days, 5 Nights',
    price: 38000,
    originalPrice: 48000,
    images: [
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&q=80'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Kochi', description: 'Welcome to Kerala', activities: ['Fort Kochi', 'Chinese Fishing Nets'] },
      { day: 2, title: 'Munnar Hill Station', description: 'Tea gardens', activities: ['Tea Plantation', 'Mattupetty Dam'] }
    ],
    inclusions: ['Hotels & Houseboat', 'Daily Breakfast', 'Transportation', 'Guide'],
    exclusions: ['Lunch & Dinner', 'Personal Expenses'],
    rating: 4.9,
    reviews: 1234,
    maxGroupSize: 12,
    availableSlots: 6,
    startDates: [new Date('2026-02-28'), new Date('2026-03-14')],
    difficulty: 'easy',
    category: 'beach',
    featured: true,
    discount: 21,
    status: 'active'
  },
  {
    name: 'Himalayan Adventure - Manali Leh',
    description: 'Thrilling adventure through the Himalayas covering Manali and Leh with monasteries and mountain passes.',
    destination: 'Himachal & Ladakh',
    duration: '9 Days, 8 Nights',
    price: 68000,
    originalPrice: 85000,
    images: [
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80'
    ],
    itinerary: [
      { day: 1, title: 'Arrival Manali', description: 'Mountain town', activities: ['Mall Road', 'Hadimba Temple'] },
      { day: 2, title: 'Manali Sightseeing', description: 'Solang Valley', activities: ['Rohtang Pass', 'Adventure'] }
    ],
    inclusions: ['Accommodation', 'Breakfast & Dinner', 'Transportation', 'Permits'],
    exclusions: ['Lunch', 'Adventure Activities', 'Personal Expenses'],
    rating: 4.7,
    reviews: 567,
    maxGroupSize: 10,
    availableSlots: 4,
    startDates: [new Date('2026-05-15'), new Date('2026-06-01')],
    difficulty: 'moderate',
    category: 'adventure',
    featured: true,
    discount: 20,
    status: 'active'
  },
  {
    name: 'Golden Triangle with Varanasi',
    description: 'Classic India tour covering Delhi, Agra, Jaipur and spiritual Varanasi.',
    destination: 'North India',
    duration: '8 Days, 7 Nights',
    price: 46000,
    originalPrice: 58000,
    images: [
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&q=80'
    ],
    itinerary: [
      { day: 1, title: 'Delhi Arrival', description: 'Capital city', activities: ['India Gate', 'Qutub Minar'] },
      { day: 2, title: 'Delhi Sightseeing', description: 'Old & New Delhi', activities: ['Red Fort', 'Jama Masjid'] }
    ],
    inclusions: ['Hotels', 'Breakfast', 'Transportation', 'Flights', 'Guide'],
    exclusions: ['Lunch & Dinner', 'Personal Expenses'],
    rating: 4.8,
    reviews: 1456,
    maxGroupSize: 16,
    availableSlots: 10,
    startDates: [new Date('2026-03-05'), new Date('2026-03-19')],
    difficulty: 'easy',
    category: 'cultural',
    featured: true,
    discount: 21,
    status: 'active'
  },
  {
    name: 'Goa Beach Paradise',
    description: 'Ultimate beach vacation with water sports, beaches, and Portuguese heritage.',
    destination: 'Goa',
    duration: '5 Days, 4 Nights',
    price: 28000,
    originalPrice: 35000,
    images: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80'
    ],
    itinerary: [
      { day: 1, title: 'Goa Arrival', description: 'Beach paradise', activities: ['Beach Check-in', 'Sunset'] },
      { day: 2, title: 'North Goa', description: 'Beaches and forts', activities: ['Fort Aguada', 'Anjuna'] }
    ],
    inclusions: ['Beach Resort', 'Breakfast', 'Transportation', 'Water Sports'],
    exclusions: ['Lunch & Dinner', 'Alcohol', 'Personal Expenses'],
    rating: 4.6,
    reviews: 2134,
    maxGroupSize: 20,
    availableSlots: 15,
    startDates: [new Date('2026-02-20'), new Date('2026-03-06')],
    difficulty: 'easy',
    category: 'beach',
    featured: false,
    discount: 20,
    status: 'active'
  },
  {
    name: 'Andaman Islands Paradise',
    description: 'Tropical island getaway with pristine beaches, coral reefs and water adventures.',
    destination: 'Andaman Islands',
    duration: '6 Days, 5 Nights',
    price: 58000,
    originalPrice: 72000,
    images: [
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80'
    ],
    itinerary: [
      { day: 1, title: 'Port Blair Arrival', description: 'Island welcome', activities: ['Cellular Jail', 'Light Show'] },
      { day: 2, title: 'Havelock Island', description: 'Beach paradise', activities: ['Radhanagar Beach', 'Snorkeling'] }
    ],
    inclusions: ['Hotels', 'Breakfast', 'Ferry Tickets', 'Activities', 'Guide'],
    exclusions: ['Lunch & Dinner', 'Scuba Diving', 'Personal Expenses'],
    rating: 4.9,
    reviews: 876,
    maxGroupSize: 14,
    availableSlots: 7,
    startDates: [new Date('2026-03-12'), new Date('2026-03-26')],
    difficulty: 'easy',
    category: 'beach',
    featured: true,
    discount: 19,
    status: 'active'
  },
  {
    name: 'Spiritual Uttarakhand Yatra',
    description: 'Divine journey through Haridwar, Rishikesh, and Char Dham pilgrimage sites.',
    destination: 'Uttarakhand',
    duration: '7 Days, 6 Nights',
    price: 42000,
    originalPrice: 52000,
    images: [
      'https://images.unsplash.com/photo-1620503374956-c942862f0372?w=1200&q=80'
    ],
    itinerary: [
      { day: 1, title: 'Haridwar Arrival', description: 'Holy city', activities: ['Har Ki Pauri', 'Ganga Aarti'] },
      { day: 2, title: 'Rishikesh', description: 'Yoga capital', activities: ['Laxman Jhula', 'River Rafting'] }
    ],
    inclusions: ['Accommodation', 'All Meals', 'Transportation', 'Temple Visits', 'Guide'],
    exclusions: ['Personal Expenses', 'Donations', 'Adventure Activities'],
    rating: 4.7,
    reviews: 654,
    maxGroupSize: 18,
    availableSlots: 12,
    startDates: [new Date('2026-04-10'), new Date('2026-04-24')],
    difficulty: 'moderate',
    category: 'spiritual',
    featured: false,
    discount: 19,
    status: 'active'
  }
]

const seedDatabase = async () => {
  try {
    console.log('🌱 Connecting to database...')
    await connectDB()

    console.log('🗑️  Clearing existing data...')
    await Flight.deleteMany({})
    await Hotel.deleteMany({})
    await Tour.deleteMany({})

    console.log('📥 Inserting sample data...')
    await Flight.insertMany(flights)
    console.log('✅ Flights seeded:', flights.length)

    await Hotel.insertMany(hotels)
    console.log('✅ Hotels seeded:', hotels.length)

    await Tour.insertMany(tours)
    console.log('✅ Tours seeded:', tours.length)

    // Create admin user
    const adminExists = await User.findOne({ email: 'admin@travelease.com' })
    if (!adminExists) {
      await User.create({
        name: 'Admin User',
        email: 'admin@travelease.com',
        password: 'admin123',
        phone: '+91 9876543210',
        role: 'admin'
      })
      console.log('✅ Admin user created')
      console.log('   Email: admin@travelease.com')
      console.log('   Password: admin123')
    }

    console.log('\n🎉 Database seeded successfully!')
    console.log('📊 Summary:')
    console.log(`   - ${flights.length} Flights`)
    console.log(`   - ${hotels.length} Hotels`)
    console.log(`   - ${tours.length} Tour Packages`)
    console.log('\n')
    
    process.exit(0)

  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()