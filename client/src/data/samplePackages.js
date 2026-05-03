// Centralized package data with 35+ packages
export const samplePackages = [
  // ===== EXISTING PACKAGES (1-10) =====
  {
    id: 1,
    _id: 'sample1',
    packageId: 'sample1',
    name: "Enchanting Paris Escape",
    title: "Enchanting Paris Escape",
    destination: "Paris, France",
    location: "Île-de-France",
    duration: "5 Days / 4 Nights",
    rating: 4.8,
    reviews: 1245,
    description: "Experience the romance of Paris with Eiffel Tower visit, Seine cruise, and Louvre museum tour.",
    shortDescription: "Romantic getaway with iconic landmarks and French cuisine.",
    price: 1299,
    originalPrice: 1599,
    discount: 20,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
      "https://images.unsplash.com/photo-1549144511-f099e773ac5e?w=800",
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800",
      "https://images.unsplash.com/photo-1431274172761-fca41d930114?w=800"
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800", caption: "Eiffel Tower" },
      { url: "https://images.unsplash.com/photo-1549144511-f099e773ac5e?w=800", caption: "Louvre Museum" },
      { url: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800", caption: "Seine River" },
      { url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800", caption: "Notre-Dame" },
      { url: "https://images.unsplash.com/photo-1431274172761-fca41d930114?w=800", caption: "Montmartre" }
    ],
    highlights: [
      "Skip-the-line Eiffel Tower access",
      "1-hour Seine River cruise",
      "Louvre Museum guided tour",
      "Montmartre walking tour",
      "French wine tasting experience"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Paris",
        description: "Arrive at Charles de Gaulle Airport. Private transfer to your hotel. Evening welcome dinner with champagne.",
        activities: ["Airport Transfer", "Check-in", "Welcome Dinner"],
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Eiffel Tower & Seine Cruise",
        description: "Morning visit to Eiffel Tower with summit access. Afternoon Seine river cruise with audio guide.",
        activities: ["Eiffel Tower", "Seine Cruise"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 3,
        title: "Louvre Museum & Notre-Dame",
        description: "Guided tour of Louvre Museum (Mona Lisa, Venus de Milo). Evening walk around Notre-Dame Cathedral.",
        activities: ["Louvre Museum", "Notre-Dame"],
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 4,
        title: "Versailles Palace Day Trip",
        description: "Full-day excursion to Palace of Versailles with gardens access and fountain show.",
        activities: ["Versailles Palace", "Gardens Tour"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 5,
        title: "Departure",
        description: "Breakfast at hotel. Transfer to airport for departure.",
        activities: ["Breakfast", "Check-out", "Airport Transfer"],
        meals: ["Breakfast"]
      }
    ],
    includes: [
      "4 nights accommodation in 4-star hotel",
      "Daily breakfast",
      "2 dinners",
      "All transfers (airport-hotel-airport)",
      "Professional English-speaking guide",
      "All entrance fees as per itinerary",
      "24/7 customer support"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Tips and gratuities"
    ],
    inclusions: [
      "4 nights accommodation in 4-star hotel",
      "Daily breakfast",
      "2 dinners",
      "All transfers (airport-hotel-airport)",
      "Professional English-speaking guide",
      "All entrance fees as per itinerary",
      "24/7 customer support"
    ],
    availableDates: ["2024-06-15", "2024-07-20", "2024-08-10", "2024-09-05"],
    minTravelers: 2,
    maxTravelers: 10,
    pricing: {
      originalPrice: 1599,
      discountedPrice: 1299,
      discount: 20
    },
    destination: {
      city: "Paris",
      country: "France"
    },
    bestSeason: "Apr-Oct",
    amenities: ["WiFi", "Pool", "Restaurant", "Room Service", "Spa"],
    faqs: [
      {
        question: "What is the best time to visit?",
        answer: "April to October is the best time with pleasant weather."
      },
      {
        question: "Is flight included?",
        answer: "No, international flights are not included."
      }
    ]
  },
  {
    id: 2,
    _id: 'sample2',
    packageId: 'sample2',
    name: "Tropical Paradise Bali",
    title: "Tropical Paradise Bali",
    destination: "Bali, Indonesia",
    location: "Southeast Asia",
    duration: "7 Days / 6 Nights",
    rating: 4.9,
    reviews: 2156,
    description: "Discover the magic of Bali with temple visits, rice terraces, beach time, and cultural experiences.",
    shortDescription: "Exotic island getaway with stunning beaches and ancient temples.",
    price: 899,
    originalPrice: 1199,
    discount: 25,
    image: "https://images.unsplash.com/photo-1537996194471-e657dfa6f218?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1537996194471-e657dfa6f218?w=800",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800",
      "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?w=800",
      "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=800"
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1537996194471-e657dfa6f218?w=800", caption: "Bali Beach" },
      { url: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800", caption: "Rice Terraces" },
      { url: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800", caption: "Tanah Lot Temple" },
      { url: "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?w=800", caption: "Ubud Monkey Forest" },
      { url: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=800", caption: "Sunset at Jimbaran" }
    ],
    highlights: [
      "Visit to Tanah Lot temple",
      "Ubud rice terrace trekking",
      "Monkey Forest exploration",
      "Traditional Balinese cooking class",
      "Sunset at Jimbaran Bay"
    ],
    itinerary: [
      {
        day: 1,
        title: "Welcome to Bali",
        description: "Arrival at Ngurah Rai International Airport. Transfer to hotel in Seminyak. Evening free at leisure.",
        activities: ["Airport Transfer", "Check-in"],
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Ubud Cultural Tour",
        description: "Visit to Ubud Monkey Forest, Tegalalang Rice Terraces, and Ubud Palace. Traditional dance performance in evening.",
        activities: ["Monkey Forest", "Rice Terraces", "Ubud Palace", "Dance Performance"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 3,
        title: "Temple Exploration",
        description: "Visit to Tanah Lot temple, Ulun Danu Beratan temple, and Jatiluwih rice terraces.",
        activities: ["Tanah Lot", "Ulun Danu Temple", "Jatiluwih"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 4,
        title: "Island Excursion",
        description: "Day trip to Nusa Penida with visits to Kelingking Beach and Angel's Billabong.",
        activities: ["Kelingking Beach", "Angel's Billabong", "Snorkeling"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 5,
        title: "Relaxation Day",
        description: "Free day for beach activities, spa treatments, or shopping at Seminyak.",
        activities: ["Beach", "Spa", "Shopping"],
        meals: ["Breakfast"]
      },
      {
        day: 6,
        title: "Adventure Day",
        description: "White water rafting in Ayung River or Mount Batur sunrise trek (optional).",
        activities: ["Rafting", "Optional Trek"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 7,
        title: "Departure",
        description: "Breakfast at hotel. Transfer to airport for departure.",
        activities: ["Breakfast", "Check-out", "Airport Transfer"],
        meals: ["Breakfast"]
      }
    ],
    includes: [
      "6 nights accommodation in 4-star resorts",
      "Daily breakfast",
      "4 lunches",
      "All transfers and tours with private AC vehicle",
      "English-speaking guide",
      "All entrance fees"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Optional activities",
      "Personal expenses"
    ],
    inclusions: [
      "6 nights accommodation in 4-star resorts",
      "Daily breakfast",
      "4 lunches",
      "All transfers and tours with private AC vehicle",
      "English-speaking guide",
      "All entrance fees"
    ],
    availableDates: ["2024-05-10", "2024-06-15", "2024-07-20", "2024-08-25"],
    minTravelers: 2,
    maxTravelers: 8,
    pricing: {
      originalPrice: 1199,
      discountedPrice: 899,
      discount: 25
    },
    destination: {
      city: "Bali",
      country: "Indonesia"
    },
    bestSeason: "Apr-Oct",
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Yoga", "Beach Access"],
    faqs: [
      {
        question: "What is the best time to visit?",
        answer: "April to October is the best time with dry weather."
      },
      {
        question: "Is this package suitable for families?",
        answer: "Yes, it's family-friendly with activities for all ages."
      }
    ]
  },
  {
    id: 3,
    _id: 'sample3',
    packageId: 'sample3',
    name: "Luxury Dubai Experience",
    title: "Luxury Dubai Experience",
    destination: "Dubai, UAE",
    location: "Middle East",
    duration: "6 Days / 5 Nights",
    rating: 4.7,
    reviews: 1876,
    description: "Experience the opulence of Dubai with Burj Khalifa visit, desert safari, and luxury shopping.",
    shortDescription: "Modern marvels, desert adventures, and luxury shopping.",
    price: 1499,
    originalPrice: 1799,
    discount: 17,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
      "https://images.unsplash.com/photo-1546412414-8030e5f7f3f7?w=800",
      "https://images.unsplash.com/photo-1577147446924-5e3a5f0b0f9b?w=800",
      "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800",
      "https://images.unsplash.com/photo-1579944681017-5e6d2e5d9c3d?w=800"
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800", caption: "Burj Khalifa" },
      { url: "https://images.unsplash.com/photo-1546412414-8030e5f7f3f7?w=800", caption: "Desert Safari" },
      { url: "https://images.unsplash.com/photo-1577147446924-5e3a5f0b0f9b?w=800", caption: "Dubai Mall" },
      { url: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800", caption: "Palm Jumeirah" },
      { url: "https://images.unsplash.com/photo-1579944681017-5e6d2e5d9c3d?w=800", caption: "Dubai Marina" }
    ],
    highlights: [
      "Burj Khalifa observation deck (124th floor)",
      "Desert safari with dune bashing",
      "Dubai Mall and fountain show",
      "Abra ride in Dubai Creek",
      "Visit to Palm Jumeirah"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Dubai",
        description: "Arrival at Dubai International Airport. Private transfer to hotel. Evening welcome dinner at Dubai Marina.",
        activities: ["Airport Transfer", "Check-in", "Welcome Dinner"],
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Modern Dubai Tour",
        description: "Visit to Burj Khalifa, Dubai Mall, and Dubai Fountain show. Afternoon at Dubai Aquarium.",
        activities: ["Burj Khalifa", "Dubai Mall", "Dubai Aquarium"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 3,
        title: "Desert Safari Adventure",
        description: "Afternoon desert safari with dune bashing, camel ride, and BBQ dinner in desert camp.",
        activities: ["Dune Bashing", "Camel Ride", "BBQ Dinner"],
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 4,
        title: "Old Dubai & Waterfront",
        description: "Visit to Al Fahidi Historical District, Dubai Creek abra ride, and Gold Souk. Evening at Dubai Marina.",
        activities: ["Al Fahidi", "Abra Ride", "Gold Souk"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 5,
        title: "Palm Jumeirah & Atlantis",
        description: "Visit to Palm Jumeirah, Atlantis The Palm, and Aquaventure Waterpark. Evening at leisure.",
        activities: ["Palm Jumeirah", "Atlantis", "Aquaventure"],
        meals: ["Breakfast"]
      },
      {
        day: 6,
        title: "Departure",
        description: "Breakfast at hotel. Transfer to airport for departure.",
        activities: ["Breakfast", "Check-out", "Airport Transfer"],
        meals: ["Breakfast"]
      }
    ],
    includes: [
      "5 nights accommodation in 5-star hotel",
      "Daily breakfast",
      "2 dinners",
      "All transfers in private vehicle",
      "Desert safari with dinner",
      "Burj Khalifa tickets"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Optional activities"
    ],
    inclusions: [
      "5 nights accommodation in 5-star hotel",
      "Daily breakfast",
      "2 dinners",
      "All transfers in private vehicle",
      "Desert safari with dinner",
      "Burj Khalifa tickets"
    ],
    availableDates: ["2024-04-15", "2024-05-20", "2024-06-25", "2024-07-30"],
    minTravelers: 2,
    maxTravelers: 6,
    pricing: {
      originalPrice: 1799,
      discountedPrice: 1499,
      discount: 17
    },
    destination: {
      city: "Dubai",
      country: "UAE"
    },
    bestSeason: "Nov-Mar",
    amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Private Beach"],
    faqs: [
      {
        question: "What is the best time to visit Dubai?",
        answer: "November to March offers pleasant weather for outdoor activities."
      },
      {
        question: "Is alcohol allowed in Dubai?",
        answer: "Alcohol is served in licensed hotels and restaurants."
      }
    ]
  },
  {
    id: 4,
    _id: 'sample4',
    packageId: 'sample4',
    name: "Magical Maldives Escape",
    title: "Magical Maldives Escape",
    destination: "Maldives",
    location: "Indian Ocean",
    duration: "5 Days / 4 Nights",
    rating: 4.9,
    reviews: 1432,
    description: "Experience overwater luxury in the Maldives with pristine beaches, crystal clear waters, and marine life.",
    shortDescription: "Overwater bungalows, turquoise lagoons, and unforgettable sunsets.",
    price: 2299,
    originalPrice: 2799,
    discount: 18,
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800",
      "https://images.unsplash.com/photo-1573843988087-d9b8c3b6b7e9?w=800",
      "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800",
      "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=800",
      "https://images.unsplash.com/photo-1580540149927-0d212125eadb?w=800"
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800", caption: "Overwater Villa" },
      { url: "https://images.unsplash.com/photo-1573843988087-d9b8c3b6b7e9?w=800", caption: "Turquoise Waters" },
      { url: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800", caption: "Sunset" },
      { url: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=800", caption: "Marine Life" },
      { url: "https://images.unsplash.com/photo-1580540149927-0d212125eadb?w=800", caption: "Beach" }
    ],
    highlights: [
      "Stay in overwater villa",
      "Snorkeling with manta rays",
      "Sunset dolphin cruise",
      "Private beach dinner",
      "Spa treatment"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Paradise",
        description: "Arrival at Male International Airport. Speedboat transfer to resort. Welcome drink and check-in to overwater villa.",
        activities: ["Airport Transfer", "Check-in", "Welcome Drink"],
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Marine Exploration",
        description: "Morning snorkeling at house reef. Afternoon dolphin cruise with sunset views.",
        activities: ["Snorkeling", "Dolphin Cruise"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 3,
        title: "Relaxation Day",
        description: "Spa treatment in the morning. Beach time and swimming in the afternoon. Private dinner on the beach.",
        activities: ["Spa", "Beach", "Private Dinner"],
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 4,
        title: "Adventure Day",
        description: "Island hopping tour. Visit to local fishing village. Optional scuba diving.",
        activities: ["Island Hopping", "Fishing Village", "Optional Dive"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 5,
        title: "Departure",
        description: "Breakfast at villa. Transfer to airport for departure.",
        activities: ["Breakfast", "Check-out", "Airport Transfer"],
        meals: ["Breakfast"]
      }
    ],
    includes: [
      "4 nights in overwater villa",
      "All meals (breakfast, lunch, dinner)",
      "Welcome drinks and fruit basket",
      "Speedboat transfers",
      "One spa treatment per person",
      "Snorkeling equipment"
    ],
    exclusions: [
      "International flights",
      "Premium beverages",
      "Personal expenses",
      "Scuba diving (optional)"
    ],
    inclusions: [
      "4 nights in overwater villa",
      "All meals (breakfast, lunch, dinner)",
      "Welcome drinks and fruit basket",
      "Speedboat transfers",
      "One spa treatment per person",
      "Snorkeling equipment"
    ],
    availableDates: ["2024-04-01", "2024-05-15", "2024-06-20", "2024-07-25"],
    minTravelers: 2,
    maxTravelers: 4,
    pricing: {
      originalPrice: 2799,
      discountedPrice: 2299,
      discount: 18
    },
    destination: {
      city: "Maldives",
      country: "Maldives"
    },
    bestSeason: "Nov-Apr",
    amenities: ["Overwater Villa", "Spa", "Restaurant", "Bar", "Pool", "Water Sports"],
    faqs: [
      {
        question: "Is the Maldives suitable for honeymoon?",
        answer: "Yes, it's one of the world's top honeymoon destinations."
      },
      {
        question: "Do I need a visa?",
        answer: "Visa on arrival is available for most nationalities."
      }
    ]
  },
  {
    id: 5,
    _id: 'sample5',
    packageId: 'sample5',
    name: "Swiss Alpine Adventure",
    title: "Swiss Alpine Adventure",
    destination: "Switzerland",
    location: "Central Europe",
    duration: "8 Days / 7 Nights",
    rating: 4.8,
    reviews: 1654,
    description: "Explore the Swiss Alps with visits to Interlaken, Jungfraujoch, and scenic train rides.",
    shortDescription: "Majestic mountains, scenic train rides, and charming villages.",
    price: 2499,
    originalPrice: 2999,
    discount: 17,
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800",
      "https://images.unsplash.com/photo-1491557345352-5929e343d89f?w=800",
      "https://images.unsplash.com/photo-1473186578172-c141e679a5e3?w=800"
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800", caption: "Swiss Alps" },
      { url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800", caption: "Interlaken" },
      { url: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800", caption: "Jungfraujoch" },
      { url: "https://images.unsplash.com/photo-1491557345352-5929e343d89f?w=800", caption: "Scenic Train" },
      { url: "https://images.unsplash.com/photo-1473186578172-c141e679a5e3?w=800", caption: "Lake Geneva" }
    ],
    highlights: [
      "Jungfraujoch - Top of Europe",
      "Scenic Golden Pass train ride",
      "Interlaken adventure activities",
      "Lake Geneva cruise",
      "Swiss chocolate tasting"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Zurich",
        description: "Arrival at Zurich Airport. Transfer to hotel. Evening walking tour of Old Town.",
        activities: ["Airport Transfer", "Check-in", "Old Town Walk"],
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Lucerne & Mount Pilatus",
        description: "Visit to Lucerne with Chapel Bridge. Afternoon excursion to Mount Pilatus.",
        activities: ["Chapel Bridge", "Mount Pilatus"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 3,
        title: "Golden Pass Train to Interlaken",
        description: "Scenic train ride to Interlaken. Check-in and evening at leisure.",
        activities: ["Golden Pass Train", "Check-in"],
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 4,
        title: "Jungfraujoch Excursion",
        description: "Full-day excursion to Jungfraujoch - Top of Europe with ice palace and snow fun.",
        activities: ["Jungfraujoch", "Ice Palace", "Snow Fun"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 5,
        title: "Grindelwald & Lauterbrunnen",
        description: "Visit to Grindelwald village and Lauterbrunnen Valley with waterfalls.",
        activities: ["Grindelwald", "Lauterbrunnen Valley"],
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 6,
        title: "Geneva & Lake Geneva",
        description: "Transfer to Geneva via scenic route. Evening cruise on Lake Geneva.",
        activities: ["Geneva Tour", "Lake Cruise"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 7,
        title: "Montreux & Chillon Castle",
        description: "Visit to Montreux and Chillon Castle. Swiss chocolate workshop.",
        activities: ["Montreux", "Chillon Castle", "Chocolate Workshop"],
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 8,
        title: "Departure",
        description: "Breakfast at hotel. Transfer to Geneva Airport for departure.",
        activities: ["Breakfast", "Check-out", "Airport Transfer"],
        meals: ["Breakfast"]
      }
    ],
    includes: [
      "7 nights accommodation in 4-star hotels",
      "Daily breakfast",
      "4 dinners",
      "Swiss Travel Pass for 8 days",
      "All train and cable car tickets",
      "Jungfraujoch ticket"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Some meals"
    ],
    inclusions: [
      "7 nights accommodation in 4-star hotels",
      "Daily breakfast",
      "4 dinners",
      "Swiss Travel Pass for 8 days",
      "All train and cable car tickets",
      "Jungfraujoch ticket"
    ],
    availableDates: ["2024-06-10", "2024-07-15", "2024-08-20", "2024-09-25"],
    minTravelers: 2,
    maxTravelers: 8,
    pricing: {
      originalPrice: 2999,
      discountedPrice: 2499,
      discount: 17
    },
    destination: {
      city: "Switzerland",
      country: "Switzerland"
    },
    bestSeason: "Jun-Sep, Dec-Mar",
    amenities: ["WiFi", "Spa", "Restaurant", "Bar", "Mountain Views"],
    faqs: [
      {
        question: "What is the best time for skiing?",
        answer: "December to March is perfect for winter sports."
      },
      {
        question: "Do I need a visa?",
        answer: "Switzerland is part of the Schengen Area."
      }
    ]
  },
  {
    id: 6,
    _id: 'sample6',
    packageId: 'sample6',
    name: "Thai Island Hopper",
    title: "Thai Island Hopper",
    destination: "Thailand",
    location: "Southeast Asia",
    duration: "9 Days / 8 Nights",
    rating: 4.7,
    reviews: 1987,
    description: "Island hopping adventure through Phuket, Koh Phi Phi, and Krabi with crystal clear waters.",
    shortDescription: "Tropical islands, vibrant culture, and amazing street food.",
    price: 1199,
    originalPrice: 1499,
    discount: 20,
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800",
      "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800",
      "https://images.unsplash.com/photo-1537151625747-768eb6cf92b5?w=800",
      "https://images.unsplash.com/photo-1560703650-ef3e0f254ae0?w=800",
      "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800"
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800", caption: "Phi Phi Islands" },
      { url: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800", caption: "Phuket" },
      { url: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b5?w=800", caption: "Maya Bay" },
      { url: "https://images.unsplash.com/photo-1560703650-ef3e0f254ae0?w=800", caption: "Krabi" },
      { url: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800", caption: "Longtail Boat" }
    ],
    highlights: [
      "Phi Phi Islands tour",
      "Phang Nga Bay with James Bond Island",
      "Thai cooking class",
      "Elephant sanctuary visit",
      "Night market exploration"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Phuket",
        description: "Arrival at Phuket International Airport. Transfer to hotel. Evening at Patong Beach.",
        activities: ["Airport Transfer", "Check-in", "Patong Beach"],
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Phang Nga Bay Tour",
        description: "Sea canoeing through caves and mangroves. Visit to James Bond Island.",
        activities: ["Sea Canoeing", "James Bond Island"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 3,
        title: "Phi Phi Islands",
        description: "Speedboat tour to Phi Phi Don, Phi Phi Leh, Maya Bay, and Monkey Beach.",
        activities: ["Phi Phi Don", "Maya Bay", "Monkey Beach", "Snorkeling"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 4,
        title: "Krabi Exploration",
        description: "Transfer to Krabi. Visit to Tiger Cave Temple and hot springs.",
        activities: ["Transfer", "Tiger Cave Temple", "Hot Springs"],
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 5,
        title: "Railay Beach & Rock Climbing",
        description: "Rock climbing at Railay Beach. Swimming in Phra Nang Cave.",
        activities: ["Rock Climbing", "Railay Beach", "Phra Nang Cave"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 6,
        title: "Hong Islands Tour",
        description: "Longtail boat tour to Hong Islands for snorkeling and lagoon swimming.",
        activities: ["Hong Islands", "Snorkeling", "Lagoon"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 7,
        title: "Culture & Cuisine",
        description: "Morning visit to Big Buddha and Wat Chalong. Afternoon Thai cooking class.",
        activities: ["Big Buddha", "Wat Chalong", "Cooking Class"],
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 8,
        title: "Elephant Sanctuary",
        description: "Ethical elephant sanctuary visit. Evening at Phuket Night Market.",
        activities: ["Elephant Sanctuary", "Night Market"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 9,
        title: "Departure",
        description: "Breakfast at hotel. Transfer to airport for departure.",
        activities: ["Breakfast", "Check-out", "Airport Transfer"],
        meals: ["Breakfast"]
      }
    ],
    includes: [
      "8 nights accommodation in 4-star resorts",
      "Daily breakfast",
      "5 lunches",
      "All transfers and tours with private vehicle",
      "Speedboat tours",
      "English-speaking guide"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Some dinners"
    ],
    inclusions: [
      "8 nights accommodation in 4-star resorts",
      "Daily breakfast",
      "5 lunches",
      "All transfers and tours with private vehicle",
      "Speedboat tours",
      "English-speaking guide"
    ],
    availableDates: ["2024-05-05", "2024-06-10", "2024-07-15", "2024-08-20"],
    minTravelers: 2,
    maxTravelers: 10,
    pricing: {
      originalPrice: 1499,
      discountedPrice: 1199,
      discount: 20
    },
    destination: {
      city: "Phuket",
      country: "Thailand"
    },
    bestSeason: "Nov-Apr",
    amenities: ["Pool", "Spa", "Restaurant", "Beach Access", "WiFi"],
    faqs: [
      {
        question: "Is Thailand safe for tourists?",
        answer: "Yes, Thailand is very safe and tourist-friendly."
      },
      {
        question: "Do I need a visa?",
        answer: "Many nationalities get visa-free entry for 30 days."
      }
    ]
  },
  {
    id: 7,
    _id: 'sample7',
    packageId: 'sample7',
    name: "Japanese Cultural Discovery",
    title: "Japanese Cultural Discovery",
    destination: "Japan",
    location: "East Asia",
    duration: "10 Days / 9 Nights",
    rating: 4.9,
    reviews: 1432,
    description: "Immerse in Japanese culture from Tokyo's neon lights to Kyoto's ancient temples.",
    shortDescription: "Ancient traditions, modern marvels, and exquisite cuisine.",
    price: 2799,
    originalPrice: 3299,
    discount: 15,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800",
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800",
      "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800",
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800",
      "https://images.unsplash.com/photo-1536099659527-c976466194d2?w=800"
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800", caption: "Tokyo Tower" },
      { url: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800", caption: "Mount Fuji" },
      { url: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800", caption: "Kyoto Temple" },
      { url: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800", caption: "Osaka" },
      { url: "https://images.unsplash.com/photo-1536099659527-c976466194d2?w=800", caption: "Traditional Tea Ceremony" }
    ],
    highlights: [
      "Tokyo Disneyland or DisneySea",
      "Mount Fuji day trip",
      "Kyoto temple tour (Kinkaku-ji, Fushimi Inari)",
      "Traditional tea ceremony",
      "Osaka street food tour"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Tokyo",
        description: "Arrival at Narita or Haneda Airport. Transfer to hotel. Evening at Shibuya Crossing.",
        activities: ["Airport Transfer", "Check-in", "Shibuya Crossing"],
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Tokyo Exploration",
        description: "Visit to Asakusa Senso-ji Temple, Tokyo Skytree, and Akihabara electronics district.",
        activities: ["Senso-ji Temple", "Tokyo Skytree", "Akihabara"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 3,
        title: "Disney Day",
        description: "Full day at Tokyo Disneyland or DisneySea (optional).",
        activities: ["Tokyo Disneyland"],
        meals: ["Breakfast"]
      },
      {
        day: 4,
        title: "Mount Fuji Day Trip",
        description: "Excursion to Mount Fuji 5th Station, Lake Kawaguchi, and Oshino Hakkai village.",
        activities: ["Mount Fuji", "Lake Kawaguchi", "Oshino Hakkai"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 5,
        title: "Hakone & Bullet Train to Kyoto",
        description: "Hakone Open-Air Museum and Lake Ashi cruise. Shinkansen to Kyoto in evening.",
        activities: ["Hakone Museum", "Lake Ashi Cruise", "Shinkansen"],
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 6,
        title: "Kyoto Heritage Tour",
        description: "Visit to Kinkaku-ji (Golden Pavilion), Ryoan-ji Zen garden, and Nijo Castle.",
        activities: ["Kinkaku-ji", "Ryoan-ji", "Nijo Castle"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 7,
        title: "Arashiyama & Geisha District",
        description: "Arashiyama Bamboo Grove, Tenryu-ji Temple, and afternoon in Gion district.",
        activities: ["Bamboo Grove", "Tenryu-ji", "Gion"],
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 8,
        title: "Fushimi Inari & Nara",
        description: "Thousands of torii gates at Fushimi Inari. Afternoon in Nara with deer park.",
        activities: ["Fushimi Inari", "Nara Deer Park"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 9,
        title: "Osaka Food Adventure",
        description: "Day trip to Osaka. Visit to Osaka Castle and Dotonbori street food tour.",
        activities: ["Osaka Castle", "Dotonbori", "Street Food"],
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 10,
        title: "Departure",
        description: "Breakfast at hotel. Transfer to Kansai International Airport for departure.",
        activities: ["Breakfast", "Check-out", "Airport Transfer"],
        meals: ["Breakfast"]
      }
    ],
    includes: [
      "9 nights accommodation in 3-4 star hotels",
      "Daily breakfast",
      "4 lunches",
      "3 dinners",
      "7-day Japan Rail Pass",
      "All transfers and tours",
      "English-speaking guide"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Some meals"
    ],
    inclusions: [
      "9 nights accommodation in 3-4 star hotels",
      "Daily breakfast",
      "4 lunches",
      "3 dinners",
      "7-day Japan Rail Pass",
      "All transfers and tours",
      "English-speaking guide"
    ],
    availableDates: ["2024-04-01", "2024-05-10", "2024-06-15", "2024-07-20"],
    minTravelers: 2,
    maxTravelers: 8,
    pricing: {
      originalPrice: 3299,
      discountedPrice: 2799,
      discount: 15
    },
    destination: {
      city: "Tokyo",
      country: "Japan"
    },
    bestSeason: "Mar-May, Sep-Nov",
    amenities: ["WiFi", "Onsen", "Restaurant", "Shopping"],
    faqs: [
      {
        question: "Do I need a visa for Japan?",
        answer: "Many countries have visa exemption agreements with Japan."
      },
      {
        question: "What is the best time for cherry blossoms?",
        answer: "Late March to early April is cherry blossom season."
      }
    ]
  },
  {
    id: 8,
    _id: 'sample8',
    packageId: 'sample8',
    name: "Italian Romance",
    title: "Italian Romance",
    destination: "Italy",
    location: "Southern Europe",
    duration: "8 Days / 7 Nights",
    rating: 4.8,
    reviews: 1876,
    description: "Romantic journey through Rome, Florence, and Venice with authentic Italian experiences.",
    shortDescription: "Art, history, cuisine, and romance in the heart of Italy.",
    price: 2199,
    originalPrice: 2599,
    discount: 15,
    image: "https://images.unsplash.com/photo-1529260830199-42c24126f198?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1529260830199-42c24126f198?w=800",
      "https://images.unsplash.com/photo-1555992828-ca4dbe41d50b?w=800",
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800",
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800",
      "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800"
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1529260830199-42c24126f198?w=800", caption: "Colosseum" },
      { url: "https://images.unsplash.com/photo-1555992828-ca4dbe41d50b?w=800", caption: "Venice Canals" },
      { url: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800", caption: "Florence" },
      { url: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800", caption: "Vatican" },
      { url: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800", caption: "Tuscany" }
    ],
    highlights: [
      "Vatican Museums and Sistine Chapel",
      "Colosseum and Roman Forum",
      "Uffizi Gallery in Florence",
      "Gondola ride in Venice",
      "Wine tasting in Tuscany"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Rome",
        description: "Arrival at Leonardo da Vinci Airport. Transfer to hotel. Evening welcome dinner with wine.",
        activities: ["Airport Transfer", "Check-in", "Welcome Dinner"],
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Ancient Rome",
        description: "Visit to Colosseum, Roman Forum, and Palatine Hill. Afternoon at Trevi Fountain and Spanish Steps.",
        activities: ["Colosseum", "Roman Forum", "Trevi Fountain"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 3,
        title: "Vatican City",
        description: "Visit to Vatican Museums, Sistine Chapel, and St. Peter's Basilica.",
        activities: ["Vatican Museums", "Sistine Chapel", "St. Peter's"],
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 4,
        title: "Florence & Renaissance Art",
        description: "High-speed train to Florence. Visit to Duomo, Ponte Vecchio, and Accademia Gallery (David).",
        activities: ["Train to Florence", "Duomo", "Ponte Vecchio", "David"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 5,
        title: "Tuscany Wine Tour",
        description: "Day trip to Chianti region with wine tasting at two vineyards. Lunch at local farmhouse.",
        activities: ["Chianti", "Wine Tasting", "Farmhouse Lunch"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 6,
        title: "Pisa & Cinque Terre",
        description: "Visit to Leaning Tower of Pisa. Afternoon in Cinque Terre villages.",
        activities: ["Leaning Tower", "Cinque Terre"],
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 7,
        title: "Venice Canals",
        description: "Train to Venice. Gondola ride through canals. Visit to St. Mark's Square and Rialto Bridge.",
        activities: ["Train to Venice", "Gondola Ride", "St. Mark's", "Rialto"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 8,
        title: "Departure",
        description: "Breakfast at hotel. Transfer to Marco Polo Airport for departure.",
        activities: ["Breakfast", "Check-out", "Airport Transfer"],
        meals: ["Breakfast"]
      }
    ],
    includes: [
      "7 nights accommodation in 4-star hotels",
      "Daily breakfast",
      "3 dinners with wine",
      "2 lunches",
      "All train tickets between cities",
      "All entrance fees as per itinerary",
      "English-speaking guide"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Some meals"
    ],
    inclusions: [
      "7 nights accommodation in 4-star hotels",
      "Daily breakfast",
      "3 dinners with wine",
      "2 lunches",
      "All train tickets between cities",
      "All entrance fees as per itinerary",
      "English-speaking guide"
    ],
    availableDates: ["2024-05-15", "2024-06-20", "2024-07-25", "2024-08-30"],
    minTravelers: 2,
    maxTravelers: 8,
    pricing: {
      originalPrice: 2599,
      discountedPrice: 2199,
      discount: 15
    },
    destination: {
      city: "Rome",
      country: "Italy"
    },
    bestSeason: "Apr-Oct",
    amenities: ["WiFi", "Restaurant", "Bar", "Guided Tours"],
    faqs: [
      {
        question: "Is Italy expensive?",
        answer: "Italy offers options for all budgets."
      },
      {
        question: "What is the best time to visit?",
        answer: "Spring (April-May) and Fall (September-October) are ideal."
      }
    ]
  },
  {
    id: 9,
    _id: 'sample9',
    packageId: 'sample9',
    name: "Greek Island Odyssey",
    title: "Greek Island Odyssey",
    destination: "Greece",
    location: "Southern Europe",
    duration: "9 Days / 8 Nights",
    rating: 4.8,
    reviews: 1654,
    description: "Discover ancient ruins and stunning islands including Athens, Santorini, and Mykonos.",
    shortDescription: "Ancient history, white-washed villages, and beautiful sunsets.",
    price: 1899,
    originalPrice: 2299,
    discount: 17,
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800",
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800",
      "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=800",
      "https://images.unsplash.com/photo-1504893524559-b855b0c3c5b3?w=800",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800"
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800", caption: "Santorini" },
      { url: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800", caption: "Mykonos" },
      { url: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=800", caption: "Acropolis" },
      { url: "https://images.unsplash.com/photo-1504893524559-b855b0c3c5b3?w=800", caption: "Oia Sunset" },
      { url: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800", caption: "Greek Cuisine" }
    ],
    highlights: [
      "Acropolis and Parthenon",
      "Santorini sunset in Oia",
      "Mykonos windmills",
      "Ancient Delos tour",
      "Greek cooking class"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Athens",
        description: "Arrival at Athens International Airport. Transfer to hotel. Evening at Plaka district.",
        activities: ["Airport Transfer", "Check-in", "Plaka"],
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Ancient Athens",
        description: "Visit to Acropolis, Parthenon, and Acropolis Museum. Afternoon at Temple of Olympian Zeus.",
        activities: ["Acropolis", "Parthenon", "Acropolis Museum"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 3,
        title: "Ferry to Santorini",
        description: "High-speed ferry to Santorini. Check-in to cave hotel in Oia or Fira. Sunset views.",
        activities: ["Ferry", "Check-in", "Sunset Viewing"],
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 4,
        title: "Santorini Exploration",
        description: "Visit to Fira town, Pyrgos village, and Red Beach. Wine tasting at local winery.",
        activities: ["Fira", "Pyrgos", "Red Beach", "Wine Tasting"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 5,
        title: "Volcano & Hot Springs",
        description: "Boat tour to Nea Kameni volcano, Palea Kameni hot springs, and Thirassia island.",
        activities: ["Volcano", "Hot Springs", "Thirassia"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 6,
        title: "Ferry to Mykonos",
        description: "Morning ferry to Mykonos. Check-in and explore Mykonos Town and windmills.",
        activities: ["Ferry", "Mykonos Town", "Windmills"],
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 7,
        title: "Delos Day Trip",
        description: "Day trip to ancient Delos, birthplace of Apollo and Artemis.",
        activities: ["Delos Tour"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 8,
        title: "Beach Day",
        description: "Free day for beach activities at Paradise or Super Paradise Beach.",
        activities: ["Beach", "Swimming"],
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 9,
        title: "Departure",
        description: "Breakfast at hotel. Transfer to Mykonos Airport for departure.",
        activities: ["Breakfast", "Check-out", "Airport Transfer"],
        meals: ["Breakfast"]
      }
    ],
    includes: [
      "8 nights accommodation (3 in Athens, 3 in Santorini, 2 in Mykonos)",
      "Daily breakfast",
      "3 dinners",
      "2 lunches",
      "All ferry tickets",
      "All entrance fees as per itinerary",
      "English-speaking guide"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Some meals"
    ],
    inclusions: [
      "8 nights accommodation (3 in Athens, 3 in Santorini, 2 in Mykonos)",
      "Daily breakfast",
      "3 dinners",
      "2 lunches",
      "All ferry tickets",
      "All entrance fees as per itinerary",
      "English-speaking guide"
    ],
    availableDates: ["2024-06-01", "2024-07-05", "2024-08-10", "2024-09-15"],
    minTravelers: 2,
    maxTravelers: 8,
    pricing: {
      originalPrice: 2299,
      discountedPrice: 1899,
      discount: 17
    },
    destination: {
      city: "Athens",
      country: "Greece"
    },
    bestSeason: "May-Oct",
    amenities: ["Pool", "Sea View", "Restaurant", "WiFi"],
    faqs: [
      {
        question: "Do I need a visa for Greece?",
        answer: "Greece is part of the Schengen Area."
      },
      {
        question: "What is the best time for island hopping?",
        answer: "June to September offers the best weather."
      }
    ]
  },
  {
    id: 10,
    _id: 'sample10',
    packageId: 'sample10',
    name: "Moroccan Sahara Adventure",
    title: "Moroccan Sahara Adventure",
    destination: "Morocco",
    location: "North Africa",
    duration: "8 Days / 7 Nights",
    rating: 4.6,
    reviews: 1234,
    description: "Journey through imperial cities and Sahara desert with camel trek and luxury camping.",
    shortDescription: "Exotic markets, desert landscapes, and rich cultural heritage.",
    price: 1499,
    originalPrice: 1799,
    discount: 17,
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800",
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=800",
      "https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=800",
      "https://images.unsplash.com/photo-1559893088-c0787ebfc084?w=800",
      "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800"
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800", caption: "Sahara Desert" },
      { url: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800", caption: "Marrakech" },
      { url: "https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=800", caption: "Fes" },
      { url: "https://images.unsplash.com/photo-1559893088-c0787ebfc084?w=800", caption: "Camel Trek" },
      { url: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800", caption: "Desert Camp" }
    ],
    highlights: [
      "Camel trek in Sahara Desert",
      "Luxury desert camp with stargazing",
      "Fes medina exploration",
      "Marrakech souk shopping",
      "Atlas Mountains visit"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Marrakech",
        description: "Arrival at Marrakech Menara Airport. Transfer to riad in medina. Evening at Jemaa el-Fnaa square.",
        activities: ["Airport Transfer", "Check-in", "Jemaa el-Fnaa"],
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Marrakech Exploration",
        description: "Visit to Bahia Palace, Koutoubia Mosque, and Majorelle Garden. Afternoon souk shopping.",
        activities: ["Bahia Palace", "Koutoubia", "Majorelle Garden", "Souk"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 3,
        title: "Atlas Mountains & Ait Benhaddou",
        description: "Drive through High Atlas Mountains. Visit to Ait Benhaddou kasbah (Game of Thrones location).",
        activities: ["Atlas Mountains", "Ait Benhaddou"],
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 4,
        title: "Dades Valley & Todra Gorge",
        description: "Drive through Dades Valley with scenic stops. Walk through Todra Gorge canyons.",
        activities: ["Dades Valley", "Todra Gorge"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 5,
        title: "Sahara Desert - Merzouga",
        description: "Arrival in Merzouga. Camel trek into Erg Chebbi dunes. Luxury desert camp with traditional music.",
        activities: ["Camel Trek", "Desert Camp", "Traditional Music"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 6,
        title: "Fes via Middle Atlas",
        description: "Sunrise over dunes. Drive to Fes via Ifrane and cedar forests with Barbary apes.",
        activities: ["Sunrise", "Drive to Fes", "Ifrane", "Cedar Forest"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 7,
        title: "Fes Medina Tour",
        description: "Guided tour of Fes medina including tanneries, Bou Inania Madrasa, and Al Quaraouiyine University.",
        activities: ["Fes Medina", "Tanneries", "Bou Inania", "University"],
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 8,
        title: "Departure",
        description: "Breakfast at riad. Transfer to Fes-Saiss Airport for departure.",
        activities: ["Breakfast", "Check-out", "Airport Transfer"],
        meals: ["Breakfast"]
      }
    ],
    includes: [
      "7 nights accommodation (riads and desert camp)",
      "Daily breakfast",
      "4 dinners",
      "3 lunches",
      "All transfers in 4x4 vehicle",
      "Camel trek and desert camp",
      "English-speaking guide"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Some lunches"
    ],
    inclusions: [
      "7 nights accommodation (riads and desert camp)",
      "Daily breakfast",
      "4 dinners",
      "3 lunches",
      "All transfers in 4x4 vehicle",
      "Camel trek and desert camp",
      "English-speaking guide"
    ],
    availableDates: ["2024-04-10", "2024-05-15", "2024-09-20", "2024-10-25"],
    minTravelers: 2,
    maxTravelers: 6,
    pricing: {
      originalPrice: 1799,
      discountedPrice: 1499,
      discount: 17
    },
    destination: {
      city: "Marrakech",
      country: "Morocco"
    },
    bestSeason: "Mar-May, Sep-Nov",
    amenities: ["Riad", "Desert Camp", "WiFi", "Restaurant"],
    faqs: [
      {
        question: "Is Morocco safe for tourists?",
        answer: "Yes, Morocco is generally safe and welcoming."
      },
      {
        question: "What should I wear in the desert?",
        answer: "Light, comfortable clothing and a jacket for cool nights."
      }
    ]
  },

  // ===== NEW PACKAGES (11-35) =====

  // Singapore Packages (11-13)
  {
    id: 11,
    _id: 'sample11',
    packageId: 'sample11',
    name: "Singapore City Lights",
    title: "Singapore City Lights",
    destination: "Singapore",
    location: "Southeast Asia",
    duration: "5 Days / 4 Nights",
    rating: 4.7,
    reviews: 1876,
    description: "Experience the futuristic skyline, world-class shopping, and diverse culinary scene of Singapore.",
    shortDescription: "Garden city with futuristic architecture and multicultural charm.",
    price: 1299,
    originalPrice: 1599,
    discount: 19,
    image: "https://images.unsplash.com/photo-1525623997230-b6dcebcdc2e0?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1525623997230-b6dcebcdc2e0?w=800",
      "https://images.unsplash.com/photo-1506355683714-ba08531925dc?w=800",
      "https://images.unsplash.com/photo-1552862750-746b8f6f7f25?w=800",
      "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800",
      "https://images.unsplash.com/photo-1535535112387-56ffe8db21ff?w=800"
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1525623997230-b6dcebcdc2e0?w=800", caption: "Marina Bay Sands" },
      { url: "https://images.unsplash.com/photo-1506355683714-ba08531925dc?w=800", caption: "Gardens by the Bay" },
      { url: "https://images.unsplash.com/photo-1552862750-746b8f6f7f25?w=800", caption: "Sentosa Island" },
      { url: "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800", caption: "Chinatown" },
      { url: "https://images.unsplash.com/photo-1535535112387-56ffe8db21ff?w=800", caption: "Merlion" }
    ],
    highlights: [
      "Marina Bay Sands SkyPark observation deck",
      "Gardens by the Bay with Supertree Grove",
      "Sentosa Island beach and attractions",
      "Chinatown and Little India cultural tours",
      "Singapore River cruise"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Singapore",
        description: "Arrival at Changi Airport. Transfer to hotel. Evening at Clarke Quay.",
        activities: ["Airport Transfer", "Check-in", "Clarke Quay"],
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Marina Bay Exploration",
        description: "Visit to Marina Bay Sands SkyPark, Gardens by the Bay, and evening light show.",
        activities: ["SkyPark", "Gardens by the Bay", "Light Show"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 3,
        title: "Sentosa Island",
        description: "Full day at Sentosa Island with Universal Studios or beach time.",
        activities: ["Universal Studios", "Sentosa Beaches"],
        meals: ["Breakfast"]
      },
      {
        day: 4,
        title: "Cultural Immersion",
        description: "Visit to Chinatown, Little India, and Kampong Glam. Evening river cruise.",
        activities: ["Chinatown", "Little India", "Kampong Glam", "River Cruise"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 5,
        title: "Departure",
        description: "Breakfast at hotel. Transfer to Changi Airport for departure.",
        activities: ["Breakfast", "Check-out", "Airport Transfer"],
        meals: ["Breakfast"]
      }
    ],
    includes: [
      "4 nights accommodation in 4-star hotel",
      "Daily breakfast",
      "2 lunches",
      "1 dinner",
      "All transfers",
      "Universal Studios ticket",
      "English-speaking guide"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Optional activities"
    ],
    inclusions: [
      "4 nights accommodation in 4-star hotel",
      "Daily breakfast",
      "2 lunches",
      "1 dinner",
      "All transfers",
      "Universal Studios ticket",
      "English-speaking guide"
    ],
    availableDates: ["2024-05-10", "2024-06-15", "2024-07-20", "2024-08-25"],
    minTravelers: 2,
    maxTravelers: 6,
    pricing: {
      originalPrice: 1599,
      discountedPrice: 1299,
      discount: 19
    },
    destination: {
      city: "Singapore",
      country: "Singapore"
    },
    bestSeason: "Feb-Apr",
    amenities: ["Pool", "WiFi", "Restaurant", "Gym", "Spa"],
    faqs: [
      {
        question: "Do I need a visa for Singapore?",
        answer: "Many nationalities get visa-free entry for 30 days."
      },
      {
        question: "Is Singapore expensive?",
        answer: "Singapore offers options for all budgets."
      }
    ]
  },
  {
    id: 12,
    _id: 'sample12',
    packageId: 'sample12',
    name: "Singapore Family Fun",
    title: "Singapore Family Fun",
    destination: "Singapore",
    location: "Southeast Asia",
    duration: "6 Days / 5 Nights",
    rating: 4.8,
    reviews: 1432,
    description: "Perfect family vacation with Universal Studios, Zoo, and kid-friendly attractions.",
    shortDescription: "Family-friendly adventure with world-class attractions.",
    price: 1499,
    originalPrice: 1799,
    discount: 17,
    image: "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800",
      "https://images.unsplash.com/photo-1552862750-746b8f6f7f25?w=800",
      "https://images.unsplash.com/photo-1525623997230-b6dcebcdc2e0?w=800",
      "https://images.unsplash.com/photo-1506355683714-ba08531925dc?w=800",
      "https://images.unsplash.com/photo-1535535112387-56ffe8db21ff?w=800"
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800", caption: "Universal Studios" },
      { url: "https://images.unsplash.com/photo-1552862750-746b8f6f7f25?w=800", caption: "Sentosa" },
      { url: "https://images.unsplash.com/photo-1525623997230-b6dcebcdc2e0?w=800", caption: "Marina Bay" },
      { url: "https://images.unsplash.com/photo-1506355683714-ba08531925dc?w=800", caption: "Gardens by the Bay" },
      { url: "https://images.unsplash.com/photo-1535535112387-56ffe8db21ff?w=800", caption: "Singapore Zoo" }
    ],
    highlights: [
      "Universal Studios Singapore",
      "Singapore Zoo with Night Safari",
      "S.E.A. Aquarium",
      "Adventure Cove Waterpark",
      "Kids' guided tours"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Singapore",
        description: "Arrival at Changi Airport. Transfer to family-friendly hotel.",
        activities: ["Airport Transfer", "Check-in", "Pool time"],
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Universal Studios",
        description: "Full day at Universal Studios with express passes.",
        activities: ["Universal Studios"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 3,
        title: "Sentosa Island",
        description: "Visit to S.E.A. Aquarium and Adventure Cove Waterpark.",
        activities: ["S.E.A. Aquarium", "Adventure Cove"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 4,
        title: "Singapore Zoo & Night Safari",
        description: "Day at Singapore Zoo. Evening at Night Safari.",
        activities: ["Singapore Zoo", "Night Safari"],
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 5,
        title: "Gardens by the Bay",
        description: "Visit to Gardens by the Bay and children's garden.",
        activities: ["Gardens by the Bay", "Children's Garden"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 6,
        title: "Departure",
        description: "Breakfast at hotel. Transfer to airport for departure.",
        activities: ["Breakfast", "Check-out", "Airport Transfer"],
        meals: ["Breakfast"]
      }
    ],
    includes: [
      "5 nights family-friendly accommodation",
      "Daily breakfast",
      "3 lunches",
      "2 dinners",
      "Universal Studios express passes",
      "Zoo and Night Safari tickets",
      "S.E.A. Aquarium tickets",
      "All transfers with child seats"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Souvenirs"
    ],
    inclusions: [
      "5 nights family-friendly accommodation",
      "Daily breakfast",
      "3 lunches",
      "2 dinners",
      "Universal Studios express passes",
      "Zoo and Night Safari tickets",
      "S.E.A. Aquarium tickets",
      "All transfers with child seats"
    ],
    availableDates: ["2024-06-01", "2024-07-10", "2024-08-15", "2024-12-10"],
    minTravelers: 2,
    maxTravelers: 5,
    pricing: {
      originalPrice: 1799,
      discountedPrice: 1499,
      discount: 17
    },
    destination: {
      city: "Singapore",
      country: "Singapore"
    },
    bestSeason: "Year-round",
    amenities: ["Kids Club", "Pool", "Family Rooms", "WiFi", "Restaurant"],
    faqs: [
      {
        question: "Is Singapore kid-friendly?",
        answer: "Yes, Singapore is very family-friendly with many attractions."
      },
      {
        question: "Are strollers available?",
        answer: "Yes, strollers can be rented at attractions."
      }
    ]
  },
  {
    id: 13,
    _id: 'sample13',
    packageId: 'sample13',
    name: "Singapore Luxury Escape",
    title: "Singapore Luxury Escape",
    destination: "Singapore",
    location: "Southeast Asia",
    duration: "5 Days / 4 Nights",
    rating: 4.9,
    reviews: 987,
    description: "Ultra-luxury experience with stays at Marina Bay Sands, fine dining, and exclusive experiences.",
    shortDescription: "5-star luxury with exclusive experiences and fine dining.",
    price: 3299,
    originalPrice: 3999,
    discount: 18,
    image: "https://images.unsplash.com/photo-1535535112387-56ffe8db21ff?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1535535112387-56ffe8db21ff?w=800",
      "https://images.unsplash.com/photo-1525623997230-b6dcebcdc2e0?w=800",
      "https://images.unsplash.com/photo-1506355683714-ba08531925dc?w=800",
      "https://images.unsplash.com/photo-1552862750-746b8f6f7f25?w=800"
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1535535112387-56ffe8db21ff?w=800", caption: "Marina Bay Sands Infinity Pool" },
      { url: "https://images.unsplash.com/photo-1525623997230-b6dcebcdc2e0?w=800", caption: "SkyPark" },
      { url: "https://images.unsplash.com/photo-1506355683714-ba08531925dc?w=800", caption: "Fine Dining" },
      { url: "https://images.unsplash.com/photo-1552862750-746b8f6f7f25?w=800", caption: "Luxury Shopping" }
    ],
    highlights: [
      "Stay at Marina Bay Sands with infinity pool",
      "Michelin-starred dining experiences",
      "Private yacht charter",
      "Luxury shopping with personal shopper",
      "Exclusive spa treatments"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Style",
        description: "VIP airport arrival with private limousine. Check-in at Marina Bay Sands.",
        activities: ["VIP Arrival", "Check-in", "Infinity Pool"],
        meals: ["Dinner at Michelin-starred restaurant"]
      },
      {
        day: 2,
        title: "SkyHigh Experience",
        description: "Breakfast at Spago. SkyPark observation deck. Evening light show from private cabana.",
        activities: ["Spago Breakfast", "SkyPark", "Private Light Show"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 3,
        title: "Yacht Charter",
        description: "Private yacht charter around Singapore's southern islands with champagne lunch.",
        activities: ["Yacht Charter", "Island Hopping", "Champagne Lunch"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 4,
        title: "Luxury Shopping",
        description: "Personal shopping at ION Orchard and Marina Bay Sands Shoppes with stylist.",
        activities: ["Personal Shopping", "Stylist Session"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 5,
        title: "Departure",
        description: "Breakfast at hotel. Private limousine to airport.",
        activities: ["Breakfast", "Check-out", "VIP Airport Transfer"],
        meals: ["Breakfast"]
      }
    ],
    includes: [
      "4 nights at Marina Bay Sands",
      "Daily breakfast",
      "3 Michelin-starred dinners",
      "Private limousine transfers",
      "Yacht charter with crew",
      "Personal shopper for 4 hours",
      "Spa treatment"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Personal shopping budget",
      "Additional spa treatments"
    ],
    inclusions: [
      "4 nights at Marina Bay Sands",
      "Daily breakfast",
      "3 Michelin-starred dinners",
      "Private limousine transfers",
      "Yacht charter with crew",
      "Personal shopper for 4 hours",
      "Spa treatment"
    ],
    availableDates: ["2024-05-15", "2024-06-20", "2024-07-25", "2024-08-30"],
    minTravelers: 2,
    maxTravelers: 4,
    pricing: {
      originalPrice: 3999,
      discountedPrice: 3299,
      discount: 18
    },
    destination: {
      city: "Singapore",
      country: "Singapore"
    },
    bestSeason: "Year-round",
    amenities: ["Infinity Pool", "Spa", "Michelin Restaurants", "Butler Service", "Gym"],
    faqs: [
      {
        question: "Is Marina Bay Sands worth it?",
        answer: "Absolutely, the infinity pool and views are unforgettable."
      },
      {
        question: "Are reservations required for restaurants?",
        answer: "Yes, we'll handle all reservations for you."
      }
    ]
  },

  // New York Packages (14-15)
  {
    id: 14,
    _id: 'sample14',
    packageId: 'sample14',
    name: "New York City Explorer",
    title: "New York City Explorer",
    destination: "New York, USA",
    location: "East Coast",
    duration: "6 Days / 5 Nights",
    rating: 4.8,
    reviews: 2341,
    description: "Experience the energy of NYC with visits to Times Square, Central Park, and Broadway shows.",
    shortDescription: "The Big Apple's iconic landmarks and vibrant culture.",
    price: 1899,
    originalPrice: 2299,
    discount: 17,
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800",
      "https://images.unsplash.com/photo-1522083165195-3424ed129620?w=800",
      "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800",
      "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=800",
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800"
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800", caption: "Times Square" },
      { url: "https://images.unsplash.com/photo-1522083165195-3424ed129620?w=800", caption: "Statue of Liberty" },
      { url: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800", caption: "Central Park" },
      { url: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=800", caption: "Empire State Building" },
      { url: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800", caption: "Brooklyn Bridge" }
    ],
    highlights: [
      "Statue of Liberty and Ellis Island",
      "Times Square and Broadway show",
      "Empire State Building observation deck",
      "Central Park bike tour",
      "Metropolitan Museum of Art"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in NYC",
        description: "Arrival at JFK or Newark. Transfer to Manhattan hotel. Evening Times Square.",
        activities: ["Airport Transfer", "Check-in", "Times Square"],
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Downtown Tour",
        description: "Statue of Liberty ferry, Wall Street, and 9/11 Memorial.",
        activities: ["Statue of Liberty", "Wall Street", "9/11 Memorial"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 3,
        title: "Midtown Landmarks",
        description: "Empire State Building, Rockefeller Center, and Radio City Music Hall.",
        activities: ["Empire State", "Rockefeller Center"],
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 4,
        title: "Central Park & Museums",
        description: "Central Park bike tour. Metropolitan Museum of Art in afternoon.",
        activities: ["Central Park", "The Met"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 5,
        title: "Brooklyn & Broadway",
        description: "Brooklyn Bridge walk, DUMBO exploration. Evening Broadway show.",
        activities: ["Brooklyn Bridge", "DUMBO", "Broadway Show"],
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 6,
        title: "Departure",
        description: "Breakfast at hotel. Transfer to airport for departure.",
        activities: ["Breakfast", "Check-out", "Airport Transfer"],
        meals: ["Breakfast"]
      }
    ],
    includes: [
      "5 nights accommodation in Manhattan",
      "Daily breakfast",
      "2 lunches",
      "2 dinners",
      "Broadway show ticket",
      "Statue of Liberty ferry",
      "Empire State Building ticket",
      "MetroCard for 5 days"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Tips"
    ],
    inclusions: [
      "5 nights accommodation in Manhattan",
      "Daily breakfast",
      "2 lunches",
      "2 dinners",
      "Broadway show ticket",
      "Statue of Liberty ferry",
      "Empire State Building ticket",
      "MetroCard for 5 days"
    ],
    availableDates: ["2024-05-10", "2024-06-15", "2024-09-20", "2024-10-25"],
    minTravelers: 2,
    maxTravelers: 6,
    pricing: {
      originalPrice: 2299,
      discountedPrice: 1899,
      discount: 17
    },
    destination: {
      city: "New York",
      country: "USA"
    },
    bestSeason: "Apr-Jun, Sep-Nov",
    amenities: ["WiFi", "Gym", "Restaurant", "Concierge"],
    faqs: [
      {
        question: "Do I need a visa for USA?",
        answer: "Most visitors need ESTA or visa."
      },
      {
        question: "What is the best time to visit?",
        answer: "Spring and Fall offer pleasant weather."
      }
    ]
  },
  {
    id: 15,
    _id: 'sample15',
    packageId: 'sample15',
    name: "NYC Holiday Magic",
    title: "NYC Holiday Magic",
    destination: "New York, USA",
    location: "East Coast",
    duration: "5 Days / 4 Nights",
    rating: 4.9,
    reviews: 1876,
    description: "Experience the magic of New York during the holiday season with ice skating and festive decorations.",
    shortDescription: "Christmas in New York - skating, shopping, and holiday lights.",
    price: 2199,
    originalPrice: 2699,
    discount: 19,
    image: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=800",
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800",
      "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800",
      "https://images.unsplash.com/photo-1522083165195-3424ed129620?w=800"
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=800", caption: "Rockefeller Christmas Tree" },
      { url: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800", caption: "Holiday Lights" },
      { url: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800", caption: "Ice Skating" },
      { url: "https://images.unsplash.com/photo-1522083165195-3424ed129620?w=800", caption: "Holiday Shopping" }
    ],
    highlights: [
      "Rockefeller Center Christmas Tree",
      "Ice skating at Rockefeller Center",
      "Holiday window displays",
      "Radio City Christmas Spectacular",
      "Dyker Heights Christmas lights"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in NYC",
        description: "Arrival and check-in. Evening at Rockefeller Center to see the Christmas Tree.",
        activities: ["Check-in", "Rockefeller Tree"],
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Holiday Traditions",
        description: "Ice skating at Rockefeller. Radio City Christmas Spectacular in evening.",
        activities: ["Ice Skating", "Radio City Show"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 3,
        title: "Shopping & Lights",
        description: "Fifth Avenue holiday windows. Evening tour of Dyker Heights lights.",
        activities: ["Holiday Windows", "Dyker Heights"],
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 4,
        title: "Central Park & More",
        description: "Central Park winter walk. Bryant Park Winter Village.",
        activities: ["Central Park", "Bryant Park"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 5,
        title: "Departure",
        description: "Breakfast at hotel. Transfer to airport.",
        activities: ["Breakfast", "Check-out", "Airport Transfer"],
        meals: ["Breakfast"]
      }
    ],
    includes: [
      "4 nights holiday-season accommodation",
      "Daily breakfast",
      "2 lunches",
      "2 dinners",
      "Ice skating tickets",
      "Radio City show tickets",
      "Holiday lights tour"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Shopping"
    ],
    inclusions: [
      "4 nights holiday-season accommodation",
      "Daily breakfast",
      "2 lunches",
      "2 dinners",
      "Ice skating tickets",
      "Radio City show tickets",
      "Holiday lights tour"
    ],
    availableDates: ["2024-12-05", "2024-12-12", "2024-12-19"],
    minTravelers: 2,
    maxTravelers: 6,
    pricing: {
      originalPrice: 2699,
      discountedPrice: 2199,
      discount: 19
    },
    destination: {
      city: "New York",
      country: "USA"
    },
    bestSeason: "December",
    amenities: ["WiFi", "Heated Pool", "Restaurant", "Concierge"],
    faqs: [
      {
        question: "When is the tree lighting?",
        answer: "Usually late November or early December."
      },
      {
        question: "Is it very crowded?",
        answer: "Yes, but the experience is magical."
      }
    ]
  },

  // Kerala Packages (16-18)
  {
    id: 16,
    _id: 'sample16',
    packageId: 'sample16',
    name: "Kerala Backwaters Bliss",
    title: "Kerala Backwaters Bliss",
    destination: "Kerala, India",
    location: "South India",
    duration: "6 Days / 5 Nights",
    rating: 4.8,
    reviews: 2134,
    description: "Cruise the serene backwaters of Kerala on a traditional houseboat with Ayurvedic treatments.",
    shortDescription: "Houseboat cruises, Ayurveda, and lush green landscapes.",
    price: 899,
    originalPrice: 1099,
    discount: 18,
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800",
      "https://images.unsplash.com/photo-1626624340240-a10d0a5ae4e0?w=800",
      "https://images.unsplash.com/photo-1589802829985-817e3d4e1f1f?w=800",
      "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=800"
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800", caption: "Houseboat" },
      { url: "https://images.unsplash.com/photo-1626624340240-a10d0a5ae4e0?w=800", caption: "Backwaters" },
      { url: "https://images.unsplash.com/photo-1589802829985-817e3d4e1f1f?w=800", caption: "Sunset" },
      { url: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=800", caption: "Ayurveda" }
    ],
    highlights: [
      "2-night houseboat stay on backwaters",
      "Traditional Kerala massage",
      "Kathakali dance performance",
      "Spice plantation visit",
      "Sunset cruise"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Kochi",
        description: "Arrival at Kochi airport. Transfer to hotel. Evening Kathakali performance.",
        activities: ["Airport Transfer", "Check-in", "Kathakali"],
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Kochi Heritage Tour",
        description: "Visit to Fort Kochi, Chinese fishing nets, and Mattancherry Palace.",
        activities: ["Fort Kochi", "Fishing Nets", "Mattancherry"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 3,
        title: "Houseboat Check-in",
        description: "Drive to Alleppey. Board traditional houseboat for backwater cruise.",
        activities: ["Drive to Alleppey", "Houseboat Check-in", "Backwater Cruise"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 4,
        title: "Backwaters Exploration",
        description: "Full day cruising through backwaters, visiting local villages.",
        activities: ["Village Visit", "Canoe Ride", "Sunset Views"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 5,
        title: "Ayurvedic Retreat",
        description: "Check-out from houseboat. Transfer to Ayurvedic resort for treatment.",
        activities: ["Check-out", "Ayurvedic Consultation", "Massage"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 6,
        title: "Departure",
        description: "Breakfast at resort. Transfer to Kochi airport.",
        activities: ["Breakfast", "Check-out", "Airport Transfer"],
        meals: ["Breakfast"]
      }
    ],
    includes: [
      "5 nights accommodation (hotels + houseboat)",
      "Daily breakfast",
      "3 lunches",
      "4 dinners",
      "Houseboat cruise",
      "Ayurvedic massage",
      "All transfers",
      "English-speaking guide"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Additional treatments"
    ],
    inclusions: [
      "5 nights accommodation (hotels + houseboat)",
      "Daily breakfast",
      "3 lunches",
      "4 dinners",
      "Houseboat cruise",
      "Ayurvedic massage",
      "All transfers",
      "English-speaking guide"
    ],
    availableDates: ["2024-09-10", "2024-10-15", "2024-11-20", "2024-12-05"],
    minTravelers: 2,
    maxTravelers: 6,
    pricing: {
      originalPrice: 1099,
      discountedPrice: 899,
      discount: 18
    },
    destination: {
      city: "Kochi",
      country: "India"
    },
    bestSeason: "Sep-Mar",
    amenities: ["Houseboat", "Ayurveda Center", "Restaurant", "WiFi"],
    faqs: [
      {
        question: "What is the best time for backwaters?",
        answer: "September to March offers pleasant weather."
      },
      {
        question: "Are houseboats safe?",
        answer: "Yes, they are well-maintained with safety equipment."
      }
    ]
  },
  {
    id: 17,
    _id: 'sample17',
    packageId: 'sample17',
    name: "Munnar Tea Garden Retreat",
    title: "Munnar Tea Garden Retreat",
    destination: "Kerala, India",
    location: "South India",
    duration: "4 Days / 3 Nights",
    rating: 4.7,
    reviews: 1654,
    description: "Escape to the lush tea plantations of Munnar with stunning views and cool climate.",
    shortDescription: "Rolling tea estates, misty mountains, and colonial charm.",
    price: 599,
    originalPrice: 749,
    discount: 20,
    image: "https://images.unsplash.com/photo-1626624340240-a10d0a5ae4e0?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1626624340240-a10d0a5ae4e0?w=800",
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800",
      "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=800",
      "https://images.unsplash.com/photo-1589802829985-817e3d4e1f1f?w=800"
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1626624340240-a10d0a5ae4e0?w=800", caption: "Tea Plantations" },
      { url: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800", caption: "Misty Hills" },
      { url: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=800", caption: "Tea Museum" },
      { url: "https://images.unsplash.com/photo-1589802829985-817e3d4e1f1f?w=800", caption: "Waterfalls" }
    ],
    highlights: [
      "Tea plantation tour",
      "Tea tasting experience",
      "Eravikulam National Park",
      "Mattupetty Dam",
      "Sunrise at Top Station"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Munnar",
        description: "Drive from Kochi to Munnar. Check-in to resort amidst tea gardens.",
        activities: ["Scenic Drive", "Check-in", "Evening Tea"],
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Tea Experience",
        description: "Tea museum visit, plantation walk, and tea tasting session.",
        activities: ["Tea Museum", "Plantation Walk", "Tea Tasting"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 3,
        title: "Munnar Sightseeing",
        description: "Visit to Eravikulam National Park, Mattupetty Dam, and Echo Point.",
        activities: ["National Park", "Dam Visit", "Echo Point"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 4,
        title: "Departure",
        description: "Breakfast at resort. Drive back to Kochi for departure.",
        activities: ["Breakfast", "Check-out", "Drive to Kochi"],
        meals: ["Breakfast"]
      }
    ],
    includes: [
      "3 nights accommodation in tea garden resort",
      "Daily breakfast",
      "2 lunches",
      "3 dinners",
      "Tea plantation tour",
      "National Park entry",
      "All transfers"
    ],
    exclusions: [
      "Flights to Kochi",
      "Travel insurance",
      "Personal expenses",
      "Tips"
    ],
    inclusions: [
      "3 nights accommodation in tea garden resort",
      "Daily breakfast",
      "2 lunches",
      "3 dinners",
      "Tea plantation tour",
      "National Park entry",
      "All transfers"
    ],
    availableDates: ["2024-09-05", "2024-10-10", "2024-11-15", "2024-12-20"],
    minTravelers: 2,
    maxTravelers: 8,
    pricing: {
      originalPrice: 749,
      discountedPrice: 599,
      discount: 20
    },
    destination: {
      city: "Munnar",
      country: "India"
    },
    bestSeason: "Sep-Mar",
    amenities: ["Mountain View", "Restaurant", "Bonfire", "WiFi"],
    faqs: [
      {
        question: "What is the temperature in Munnar?",
        answer: "15-25°C during the day, cooler at night."
      },
      {
        question: "Is Munnar good for honeymoon?",
        answer: "Yes, it's very romantic with beautiful views."
      }
    ]
  },
  {
    id: 18,
    _id: 'sample18',
    packageId: 'sample18',
    name: "Kerala Honeymoon Special",
    title: "Kerala Honeymoon Special",
    destination: "Kerala, India",
    location: "South India",
    duration: "7 Days / 6 Nights",
    rating: 4.9,
    reviews: 1432,
    description: "Romantic honeymoon package combining backwaters, hills, and beaches.",
    shortDescription: "Perfect honeymoon with houseboat, hill station, and beach.",
    price: 1299,
    originalPrice: 1599,
    discount: 19,
    image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=800",
      "https://images.unsplash.com/photo-1626624340240-a10d0a5ae4e0?w=800",
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800",
      "https://images.unsplash.com/photo-1589802829985-817e3d4e1f1f?w=800"
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=800", caption: "Houseboat" },
      { url: "https://images.unsplash.com/photo-1626624340240-a10d0a5ae4e0?w=800", caption: "Munnar" },
      { url: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800", caption: "Backwaters" },
      { url: "https://images.unsplash.com/photo-1589802829985-817e3d4e1f1f?w=800", caption: "Beach" }
    ],
    highlights: [
      "2 nights in Munnar tea garden resort",
      "2 nights houseboat experience",
      "2 nights beach resort in Kovalam",
      "Couple's spa treatment",
      "Candlelight dinner on houseboat"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Kochi",
        description: "Arrival and drive to Munnar. Check-in to romantic resort.",
        activities: ["Drive to Munnar", "Check-in"],
        meals: ["Candlelight Dinner"]
      },
      {
        day: 2,
        title: "Munnar Romance",
        description: "Tea plantation visit and couple's photography session.",
        activities: ["Tea Plantations", "Photo Session"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 3,
        title: "Munnar to Alleppey",
        description: "Drive to Alleppey. Board private houseboat for 2 nights.",
        activities: ["Houseboat Check-in", "Backwater Cruise"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 4,
        title: "Houseboat Romance",
        description: "Full day on houseboat with village visits and sunset views.",
        activities: ["Village Visit", "Sunset Cruise", "Candlelight Dinner"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 5,
        title: "Alleppey to Kovalam",
        description: "Drive to Kovalam beach. Check-in to beach resort.",
        activities: ["Beach Time", "Sunset Walk"],
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 6,
        title: "Beach Relaxation",
        description: "Beach day with couple's spa treatment.",
        activities: ["Beach", "Spa", "Romantic Dinner"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 7,
        title: "Departure",
        description: "Breakfast at resort. Transfer to Thiruvananthapuram airport.",
        activities: ["Breakfast", "Check-out", "Airport Transfer"],
        meals: ["Breakfast"]
      }
    ],
    includes: [
      "6 nights accommodation (Munnar, Houseboat, Kovalam)",
      "Daily breakfast",
      "3 lunches",
      "6 dinners with 2 romantic dinners",
      "Houseboat cruise",
      "Couple's spa treatment",
      "All transfers",
      "Honeymoon decoration"
    ],
    exclusions: [
      "Flights",
      "Travel insurance",
      "Personal expenses",
      "Tips"
    ],
    inclusions: [
      "6 nights accommodation (Munnar, Houseboat, Kovalam)",
      "Daily breakfast",
      "3 lunches",
      "6 dinners with 2 romantic dinners",
      "Houseboat cruise",
      "Couple's spa treatment",
      "All transfers",
      "Honeymoon decoration"
    ],
    availableDates: ["2024-09-01", "2024-10-15", "2024-11-20", "2024-12-10"],
    minTravelers: 2,
    maxTravelers: 2,
    pricing: {
      originalPrice: 1599,
      discountedPrice: 1299,
      discount: 19
    },
    destination: {
      city: "Kerala",
      country: "India"
    },
    bestSeason: "Sep-Mar",
    amenities: ["Romantic Setup", "Spa", "Pool", "Private Dinner"],
    faqs: [
      {
        question: "Is this only for honeymoon?",
        answer: "Yes, it's designed for couples."
      },
      {
        question: "Can we customize the itinerary?",
        answer: "Yes, we can personalize for you."
      }
    ]
  },

  // Additional International Packages (19-25)
  {
    id: 19,
    _id: 'sample19',
    packageId: 'sample19',
    name: "London Royal Experience",
    title: "London Royal Experience",
    destination: "London, UK",
    location: "United Kingdom",
    duration: "6 Days / 5 Nights",
    rating: 4.8,
    reviews: 1876,
    description: "Discover royal London with visits to Buckingham Palace, Tower of London, and West End shows.",
    shortDescription: "Royal palaces, historic landmarks, and British charm.",
    price: 1999,
    originalPrice: 2399,
    discount: 17,
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800",
      "https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=800",
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800",
      "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800"
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800", caption: "Big Ben" },
      { url: "https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=800", caption: "London Eye" },
      { url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800", caption: "Tower Bridge" },
      { url: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800", caption: "Buckingham Palace" }
    ],
    highlights: [
      "Changing of the Guard at Buckingham Palace",
      "London Eye ride",
      "Tower of London with Crown Jewels",
      "West End theatre show",
      "Thames River cruise"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in London",
        description: "Arrival at Heathrow. Transfer to hotel. Evening at leisure.",
        activities: ["Airport Transfer", "Check-in"],
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Royal London",
        description: "Buckingham Palace, Changing of the Guard, and St. James's Park.",
        activities: ["Buckingham Palace", "Changing of the Guard"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 3,
        title: "Historic London",
        description: "Tower of London, Tower Bridge, and Thames cruise.",
        activities: ["Tower of London", "Tower Bridge", "River Cruise"],
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 4,
        title: "West End & Shopping",
        description: "West End show in evening. Shopping at Covent Garden.",
        activities: ["Shopping", "West End Show"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 5,
        title: "London Eye & South Bank",
        description: "London Eye, South Bank exploration, and Borough Market.",
        activities: ["London Eye", "South Bank", "Borough Market"],
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 6,
        title: "Departure",
        description: "Breakfast at hotel. Transfer to airport.",
        activities: ["Breakfast", "Check-out", "Airport Transfer"],
        meals: ["Breakfast"]
      }
    ],
    includes: [
      "5 nights central London hotel",
      "Daily breakfast",
      "2 lunches",
      "3 dinners",
      "London Eye ticket",
      "Tower of London ticket",
      "West End show ticket",
      "River cruise",
      "Oyster card with credit"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Tips"
    ],
    inclusions: [
      "5 nights central London hotel",
      "Daily breakfast",
      "2 lunches",
      "3 dinners",
      "London Eye ticket",
      "Tower of London ticket",
      "West End show ticket",
      "River cruise",
      "Oyster card with credit"
    ],
    availableDates: ["2024-05-10", "2024-06-15", "2024-07-20", "2024-08-25"],
    minTravelers: 2,
    maxTravelers: 6,
    pricing: {
      originalPrice: 2399,
      discountedPrice: 1999,
      discount: 17
    },
    destination: {
      city: "London",
      country: "UK"
    },
    bestSeason: "May-Sep",
    amenities: ["WiFi", "Restaurant", "Concierge", "Gym"],
    faqs: [
      {
        question: "Do I need a visa for UK?",
        answer: "Most visitors need a UK visa or ETA."
      },
      {
        question: "What is the best time to visit?",
        answer: "Summer months offer the best weather."
      }
    ]
  },
  {
    id: 20,
    _id: 'sample20',
    packageId: 'sample20',
    name: "Australian Adventure",
    title: "Australian Adventure",
    destination: "Sydney, Australia",
    location: "Australia",
    duration: "8 Days / 7 Nights",
    rating: 4.8,
    reviews: 1543,
    description: "Explore Sydney's iconic Opera House, Bondi Beach, and Blue Mountains.",
    shortDescription: "Down Under adventure with iconic landmarks and natural beauty.",
    price: 2899,
    originalPrice: 3399,
    discount: 15,
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800",
      "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800",
      "https://images.unsplash.com/photo-1501426026826-31c667bdf23d?w=800",
      "https://images.unsplash.com/photo-1514395462725-fb4566210144?w=800"
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800", caption: "Sydney Opera House" },
      { url: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800", caption: "Harbour Bridge" },
      { url: "https://images.unsplash.com/photo-1501426026826-31c667bdf23d?w=800", caption: "Bondi Beach" },
      { url: "https://images.unsplash.com/photo-1514395462725-fb4566210144?w=800", caption: "Blue Mountains" }
    ],
    highlights: [
      "Sydney Opera House tour",
      "Harbour Bridge climb",
      "Bondi to Coogee coastal walk",
      "Blue Mountains day trip",
      "Taronga Zoo experience"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Sydney",
        description: "Arrival at Sydney Airport. Transfer to hotel. Evening at Darling Harbour.",
        activities: ["Airport Transfer", "Check-in", "Darling Harbour"],
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Sydney Icons",
        description: "Opera House tour, Royal Botanic Garden, and Harbour Bridge.",
        activities: ["Opera House", "Botanic Garden", "Bridge"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 3,
        title: "Beach Day",
        description: "Bondi Beach, coastal walk to Coogee, and beach time.",
        activities: ["Bondi Beach", "Coastal Walk"],
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 4,
        title: "Blue Mountains",
        description: "Day trip to Blue Mountains with Three Sisters and wildlife park.",
        activities: ["Blue Mountains", "Three Sisters", "Wildlife"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 5,
        title: "Taronga Zoo",
        description: "Ferry to Taronga Zoo with koala encounters.",
        activities: ["Taronga Zoo", "Ferry Ride"],
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 6,
        title: "The Rocks & Shopping",
        description: "The Rocks historic area, shopping at Circular Quay.",
        activities: ["The Rocks", "Shopping"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 7,
        title: "Manly Beach",
        description: "Ferry to Manly, beach time, and scenic walk.",
        activities: ["Manly Ferry", "Manly Beach"],
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 8,
        title: "Departure",
        description: "Breakfast at hotel. Transfer to airport.",
        activities: ["Breakfast", "Check-out", "Airport Transfer"],
        meals: ["Breakfast"]
      }
    ],
    includes: [
      "7 nights accommodation",
      "Daily breakfast",
      "3 lunches",
      "4 dinners",
      "Opera House tour",
      "Bridge climb",
      "Blue Mountains tour",
      "Taronga Zoo tickets",
      "Opal card for transport"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Tips"
    ],
    inclusions: [
      "7 nights accommodation",
      "Daily breakfast",
      "3 lunches",
      "4 dinners",
      "Opera House tour",
      "Bridge climb",
      "Blue Mountains tour",
      "Taronga Zoo tickets",
      "Opal card for transport"
    ],
    availableDates: ["2024-09-10", "2024-10-15", "2024-11-20", "2025-02-10"],
    minTravelers: 2,
    maxTravelers: 6,
    pricing: {
      originalPrice: 3399,
      discountedPrice: 2899,
      discount: 15
    },
    destination: {
      city: "Sydney",
      country: "Australia"
    },
    bestSeason: "Sep-Nov, Mar-May",
    amenities: ["Pool", "WiFi", "Restaurant", "Gym"],
    faqs: [
      {
        question: "Do I need a visa for Australia?",
        answer: "Yes, most visitors need an ETA or visa."
      },
      {
        question: "What is the best time to visit?",
        answer: "Spring (Sep-Nov) and Autumn (Mar-May) are ideal."
      }
    ]
  },
  {
    id: 21,
    _id: 'sample21',
    packageId: 'sample21',
    name: "South Africa Safari",
    title: "South Africa Safari",
    destination: "Cape Town, South Africa",
    location: "South Africa",
    duration: "8 Days / 7 Nights",
    rating: 4.9,
    reviews: 1342,
    description: "Experience wildlife safari in Kruger and stunning scenery in Cape Town.",
    shortDescription: "Big Five safari, Table Mountain, and Cape Winelands.",
    price: 3299,
    originalPrice: 3899,
    discount: 15,
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800",
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800",
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800",
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800"
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800", caption: "Safari" },
      { url: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800", caption: "Table Mountain" },
      { url: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800", caption: "Cape Town" },
      { url: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800", caption: "Wine Tasting" }
    ],
    highlights: [
      "Big Five safari in Kruger",
      "Table Mountain cable car",
      "Cape of Good Hope",
      "Penguin colony at Boulders Beach",
      "Stellenbosch wine tasting"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Johannesburg",
        description: "Arrival and transfer to hotel. Evening briefing.",
        activities: ["Airport Transfer", "Check-in"],
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Kruger Safari",
        description: "Flight to Kruger. Afternoon safari drive.",
        activities: ["Flight", "Safari Drive"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 3,
        title: "Full Day Safari",
        description: "Morning and evening safari drives in open vehicles.",
        activities: ["Morning Safari", "Evening Safari"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 4,
        title: "Kruger to Cape Town",
        description: "Morning safari. Flight to Cape Town.",
        activities: ["Morning Safari", "Flight"],
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 5,
        title: "Table Mountain & City",
        description: "Table Mountain cable car, V&A Waterfront.",
        activities: ["Table Mountain", "V&A Waterfront"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 6,
        title: "Cape Peninsula Tour",
        description: "Cape of Good Hope, Cape Point, Boulders Beach penguins.",
        activities: ["Cape Point", "Penguins", "Chapman's Peak"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 7,
        title: "Winelands Tour",
        description: "Stellenbosch and Franschhoek wine tasting.",
        activities: ["Wine Tasting", "Cellar Tours"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 8,
        title: "Departure",
        description: "Breakfast at hotel. Transfer to Cape Town airport.",
        activities: ["Breakfast", "Check-out", "Airport Transfer"],
        meals: ["Breakfast"]
      }
    ],
    includes: [
      "7 nights accommodation (safari lodge + Cape Town hotel)",
      "Daily breakfast",
      "4 lunches",
      "6 dinners",
      "Kruger safari drives",
      "Table Mountain cable car",
      "Cape Peninsula tour",
      "Wine tasting",
      "Domestic flights"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Tips"
    ],
    inclusions: [
      "7 nights accommodation (safari lodge + Cape Town hotel)",
      "Daily breakfast",
      "4 lunches",
      "6 dinners",
      "Kruger safari drives",
      "Table Mountain cable car",
      "Cape Peninsula tour",
      "Wine tasting",
      "Domestic flights"
    ],
    availableDates: ["2024-05-10", "2024-06-15", "2024-07-20", "2024-08-25"],
    minTravelers: 2,
    maxTravelers: 6,
    pricing: {
      originalPrice: 3899,
      discountedPrice: 3299,
      discount: 15
    },
    destination: {
      city: "Cape Town",
      country: "South Africa"
    },
    bestSeason: "May-Sep",
    amenities: ["Safari Lodge", "Pool", "Restaurant", "WiFi"],
    faqs: [
      {
        question: "Do I need vaccinations?",
        answer: "Consult your doctor for recommended vaccines."
      },
      {
        question: "Is safari safe?",
        answer: "Yes, with experienced guides."
      }
    ]
  },
  {
    id: 22,
    _id: 'sample22',
    packageId: 'sample22',
    name: "Barcelona & Costa Brava",
    title: "Barcelona & Costa Brava",
    destination: "Barcelona, Spain",
    location: "Spain",
    duration: "6 Days / 5 Nights",
    rating: 4.8,
    reviews: 1654,
    description: "Discover Gaudí's masterpieces and relax on Costa Brava's beautiful beaches.",
    shortDescription: "Catalan culture, Gaudí architecture, and Mediterranean beaches.",
    price: 1599,
    originalPrice: 1899,
    discount: 16,
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800",
      "https://images.unsplash.com/photo-1523531294919-4bcd22c6b5b5?w=800",
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800",
      "https://images.unsplash.com/photo-1523531294919-4bcd22c6b5b5?w=800"
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800", caption: "Sagrada Familia" },
      { url: "https://images.unsplash.com/photo-1523531294919-4bcd22c6b5b5?w=800", caption: "Park Güell" },
      { url: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800", caption: "Costa Brava" },
      { url: "https://images.unsplash.com/photo-1523531294919-4bcd22c6b5b5?w=800", caption: "Gothic Quarter" }
    ],
    highlights: [
      "Sagrada Familia and Park Güell",
      "Gothic Quarter walking tour",
      "Flamenco show",
      "Costa Brava day trip",
      "Tapas tasting experience"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Barcelona",
        description: "Arrival at Barcelona airport. Transfer to hotel. Evening tapas tour.",
        activities: ["Airport Transfer", "Check-in", "Tapas Tour"],
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Gaudí Day",
        description: "Sagrada Familia, Park Güell, and Casa Batlló.",
        activities: ["Sagrada Familia", "Park Güell", "Casa Batlló"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 3,
        title: "Gothic Quarter",
        description: "Barcelona Cathedral, La Rambla, and Boqueria Market.",
        activities: ["Gothic Quarter", "La Rambla", "Boqueria"],
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 4,
        title: "Costa Brava Day Trip",
        description: "Day trip to Costa Brava with beach time and medieval villages.",
        activities: ["Costa Brava", "Beach", "Village Visit"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 5,
        title: "Montjuïc & Flamenco",
        description: "Montjuïc Castle, Magic Fountain. Evening Flamenco show.",
        activities: ["Montjuïc", "Magic Fountain", "Flamenco"],
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 6,
        title: "Departure",
        description: "Breakfast at hotel. Transfer to airport.",
        activities: ["Breakfast", "Check-out", "Airport Transfer"],
        meals: ["Breakfast"]
      }
    ],
    includes: [
      "5 nights boutique hotel",
      "Daily breakfast",
      "2 lunches",
      "3 dinners",
      "Gaudí tour tickets",
      "Costa Brava excursion",
      "Flamenco show",
      "Tapas tour"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Tips"
    ],
    inclusions: [
      "5 nights boutique hotel",
      "Daily breakfast",
      "2 lunches",
      "3 dinners",
      "Gaudí tour tickets",
      "Costa Brava excursion",
      "Flamenco show",
      "Tapas tour"
    ],
    availableDates: ["2024-05-15", "2024-06-20", "2024-07-25", "2024-08-30"],
    minTravelers: 2,
    maxTravelers: 6,
    pricing: {
      originalPrice: 1899,
      discountedPrice: 1599,
      discount: 16
    },
    destination: {
      city: "Barcelona",
      country: "Spain"
    },
    bestSeason: "May-Oct",
    amenities: ["Pool", "Rooftop Bar", "WiFi", "Restaurant"],
    faqs: [
      {
        question: "Do I need a visa for Spain?",
        answer: "Spain is part of the Schengen Area."
      },
      {
        question: "What is the best time to visit?",
        answer: "Late spring and early fall are ideal."
      }
    ]
  },
  {
    id: 23,
    _id: 'sample23',
    packageId: 'sample23',
    name: "Iceland Northern Lights",
    title: "Iceland Northern Lights",
    destination: "Reykjavik, Iceland",
    location: "Iceland",
    duration: "5 Days / 4 Nights",
    rating: 4.9,
    reviews: 1876,
    description: "Chase the aurora borealis and explore Iceland's stunning landscapes.",
    shortDescription: "Northern Lights, glaciers, hot springs, and volcanic landscapes.",
    price: 2499,
    originalPrice: 2999,
    discount: 17,
    image: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800",
      "https://images.unsplash.com/photo-1519631128182-433895475ffe?w=800",
      "https://images.unsplash.com/photo-1504893524559-b855b0c3c5b3?w=800",
      "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800"
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800", caption: "Northern Lights" },
      { url: "https://images.unsplash.com/photo-1519631128182-433895475ffe?w=800", caption: "Blue Lagoon" },
      { url: "https://images.unsplash.com/photo-1504893524559-b855b0c3c5b3?w=800", caption: "Glacier" },
      { url: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800", caption: "Waterfall" }
    ],
    highlights: [
      "Northern Lights hunting tours",
      "Blue Lagoon geothermal spa",
      "Golden Circle tour (Gullfoss, Geysir, Þingvellir)",
      "Glacier hiking",
      "Ice cave exploration (winter)"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Reykjavik",
        description: "Arrival at Keflavik Airport. Transfer to Blue Lagoon. Check-in to hotel in Reykjavik.",
        activities: ["Airport Transfer", "Blue Lagoon", "Check-in"],
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Golden Circle Tour",
        description: "Full-day tour of Golden Circle including Gullfoss waterfall, Geysir geothermal area, and Þingvellir National Park.",
        activities: ["Gullfoss", "Geysir", "Þingvellir"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 3,
        title: "South Coast Adventure",
        description: "South Coast tour with Seljalandsfoss and Skógafoss waterfalls, and black sand beach at Reynisfjara.",
        activities: ["Seljalandsfoss", "Skógafoss", "Reynisfjara"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 4,
        title: "Glacier & Northern Lights",
        description: "Glacier hiking on Sólheimajökull. Evening Northern Lights hunting tour.",
        activities: ["Glacier Hiking", "Northern Lights Hunt"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 5,
        title: "Departure",
        description: "Breakfast at hotel. Transfer to Keflavik Airport.",
        activities: ["Breakfast", "Check-out", "Airport Transfer"],
        meals: ["Breakfast"]
      }
    ],
    includes: [
      "4 nights accommodation",
      "Daily breakfast",
      "2 lunches",
      "2 dinners",
      "Blue Lagoon premium entry",
      "Golden Circle tour",
      "South Coast tour",
      "Glacier hiking",
      "Northern Lights tour",
      "All transfers"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Tips"
    ],
    inclusions: [
      "4 nights accommodation",
      "Daily breakfast",
      "2 lunches",
      "2 dinners",
      "Blue Lagoon premium entry",
      "Golden Circle tour",
      "South Coast tour",
      "Glacier hiking",
      "Northern Lights tour",
      "All transfers"
    ],
    availableDates: ["2024-10-15", "2024-11-20", "2024-12-05", "2025-01-10", "2025-02-15"],
    minTravelers: 2,
    maxTravelers: 6,
    pricing: {
      originalPrice: 2999,
      discountedPrice: 2499,
      discount: 17
    },
    destination: {
      city: "Reykjavik",
      country: "Iceland"
    },
    bestSeason: "Sep-Mar",
    amenities: ["Geothermal Pool", "Restaurant", "WiFi", "Northern Lights Wake-up Call"],
    faqs: [
      {
        question: "When is the best time to see Northern Lights?",
        answer: "September to March offers the best chances."
      },
      {
        question: "Do I need special clothing?",
        answer: "Warm, waterproof layers are essential."
      }
    ]
  },
  {
    id: 24,
    _id: 'sample24',
    packageId: 'sample24',
    name: "Dubai & Abu Dhabi Combo",
    title: "Dubai & Abu Dhabi Combo",
    destination: "Dubai & Abu Dhabi, UAE",
    location: "UAE",
    duration: "7 Days / 6 Nights",
    rating: 4.8,
    reviews: 2134,
    description: "Experience the best of both emirates with luxury stays and iconic attractions.",
    shortDescription: "Two emirates, double the luxury and adventure.",
    price: 1899,
    originalPrice: 2299,
    discount: 17,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
      "https://images.unsplash.com/photo-1548681528-6a5c45b66b9a?w=800",
      "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800",
      "https://images.unsplash.com/photo-1577147446927-e5c1c5d33b9e?w=800",
      "https://images.unsplash.com/photo-1566140967404-b8b3932483f5?w=800"
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800", caption: "Burj Khalifa" },
      { url: "https://images.unsplash.com/photo-1548681528-6a5c45b66b9a?w=800", caption: "Sheikh Zayed Mosque" },
      { url: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800", caption: "Ferrari World" },
      { url: "https://images.unsplash.com/photo-1577147446927-e5c1c5d33b9e?w=800", caption: "Desert Safari" },
      { url: "https://images.unsplash.com/photo-1566140967404-b8b3932483f5?w=800", caption: "Emirates Palace" }
    ],
    highlights: [
      "Burj Khalifa and Dubai Mall",
      "Sheikh Zayed Grand Mosque",
      "Ferrari World Abu Dhabi",
      "Desert safari with BBQ dinner",
      "Yas Island attractions"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Dubai",
        description: "Arrival at Dubai International Airport. Transfer to hotel. Evening at Dubai Marina.",
        activities: ["Airport Transfer", "Check-in", "Dubai Marina"],
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Dubai Modern Marvels",
        description: "Burj Khalifa observation deck, Dubai Mall, and Dubai Fountain show.",
        activities: ["Burj Khalifa", "Dubai Mall", "Fountain Show"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 3,
        title: "Desert Safari",
        description: "Afternoon desert safari with dune bashing, camel rides, and BBQ dinner.",
        activities: ["Dune Bashing", "Camel Ride", "BBQ Dinner", "Entertainment"],
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 4,
        title: "Dubai to Abu Dhabi",
        description: "Transfer to Abu Dhabi. Visit to Sheikh Zayed Grand Mosque. Check-in to hotel.",
        activities: ["Transfer", "Grand Mosque", "Check-in"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 5,
        title: "Yas Island Adventure",
        description: "Ferrari World or Yas Waterworld. Evening at Yas Marina.",
        activities: ["Ferrari World", "Yas Marina"],
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 6,
        title: "Abu Dhabi City Tour",
        description: "Qasr Al Watan, Louvre Abu Dhabi, and Corniche. Return to Dubai.",
        activities: ["Qasr Al Watan", "Louvre", "Corniche", "Return to Dubai"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 7,
        title: "Departure",
        description: "Breakfast at hotel. Transfer to Dubai airport for departure.",
        activities: ["Breakfast", "Check-out", "Airport Transfer"],
        meals: ["Breakfast"]
      }
    ],
    includes: [
      "6 nights accommodation (4 in Dubai, 2 in Abu Dhabi)",
      "Daily breakfast",
      "2 lunches",
      "3 dinners",
      "Burj Khalifa tickets",
      "Desert safari",
      "Ferrari World tickets",
      "Grand Mosque tour",
      "All transfers between cities"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Tips"
    ],
    inclusions: [
      "6 nights accommodation (4 in Dubai, 2 in Abu Dhabi)",
      "Daily breakfast",
      "2 lunches",
      "3 dinners",
      "Burj Khalifa tickets",
      "Desert safari",
      "Ferrari World tickets",
      "Grand Mosque tour",
      "All transfers between cities"
    ],
    availableDates: ["2024-05-10", "2024-06-15", "2024-07-20", "2024-08-25", "2024-09-30"],
    minTravelers: 2,
    maxTravelers: 6,
    pricing: {
      originalPrice: 2299,
      discountedPrice: 1899,
      discount: 17
    },
    destination: {
      city: "Dubai & Abu Dhabi",
      country: "UAE"
    },
    bestSeason: "Nov-Mar",
    amenities: ["Pool", "Spa", "Restaurant", "Gym", "Beach Access"],
    faqs: [
      {
        question: "Is it easy to travel between Dubai and Abu Dhabi?",
        answer: "Yes, it's about 1.5 hours by car."
      },
      {
        question: "Which is better, Ferrari World or Yas Waterworld?",
        answer: "Both are excellent - Ferrari World for rides, Yas Waterworld for water fun."
      }
    ]
  },
  {
    id: 25,
    _id: 'sample25',
    packageId: 'sample25',
    name: "Vietnam Discovery",
    title: "Vietnam Discovery",
    destination: "Vietnam",
    location: "Southeast Asia",
    duration: "10 Days / 9 Nights",
    rating: 4.8,
    reviews: 1765,
    description: "Journey through Vietnam from Hanoi's old quarter to Halong Bay's emerald waters.",
    shortDescription: "Rich history, stunning landscapes, and delicious cuisine.",
    price: 1599,
    originalPrice: 1899,
    discount: 16,
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800",
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800",
      "https://images.unsplash.com/photo-1528458909336-e7a0adfed0a5?w=800",
      "https://images.unsplash.com/photo-1557754896-ca9f7e8e69cd?w=800"
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800", caption: "Halong Bay" },
      { url: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800", caption: "Hanoi" },
      { url: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800", caption: "Hoi An" },
      { url: "https://images.unsplash.com/photo-1528458909336-e7a0adfed0a5?w=800", caption: "Ho Chi Minh City" },
      { url: "https://images.unsplash.com/photo-1557754896-ca9f7e8e69cd?w=800", caption: "Mekong Delta" }
    ],
    highlights: [
      "Halong Bay overnight cruise",
      "Hanoi street food tour",
      "Hoi An ancient town",
      "Cu Chi Tunnels",
      "Mekong Delta boat trip"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Hanoi",
        description: "Arrival at Noi Bai Airport. Transfer to hotel. Evening water puppet show.",
        activities: ["Airport Transfer", "Check-in", "Water Puppet Show"],
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Hanoi City Tour",
        description: "Ho Chi Minh Mausoleum, Temple of Literature, and Old Quarter exploration.",
        activities: ["Ho Chi Minh Complex", "Temple of Literature", "Old Quarter"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 3,
        title: "Halong Bay Cruise",
        description: "Drive to Halong Bay. Board overnight cruise with kayaking and cave visit.",
        activities: ["Transfer", "Cruise Check-in", "Kayaking", "Cave Visit"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 4,
        title: "Halong to Hanoi",
        description: "Morning tai chi, brunch on cruise. Return to Hanoi. Free evening.",
        activities: ["Tai Chi", "Brunch", "Return to Hanoi"],
        meals: ["Breakfast", "Brunch"]
      },
      {
        day: 5,
        title: "Fly to Da Nang & Hoi An",
        description: "Flight to Da Nang. Transfer to Hoi An. Evening lantern town exploration.",
        activities: ["Flight", "Transfer", "Hoi An Ancient Town"],
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 6,
        title: "Hoi An Discovery",
        description: "Hoi An walking tour, Japanese Covered Bridge, and tailor experience.",
        activities: ["Walking Tour", "Japanese Bridge", "Tailor Visit"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 7,
        title: "Hoi An Free Day",
        description: "Free day for beach, cooking class, or cycling.",
        activities: ["Optional Activities"],
        meals: ["Breakfast"]
      },
      {
        day: 8,
        title: "Fly to Ho Chi Minh City",
        description: "Flight to Saigon. Afternoon city tour including Notre Dame and Central Post Office.",
        activities: ["Flight", "City Tour", "Notre Dame"],
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 9,
        title: "Cu Chi Tunnels & Mekong Delta",
        description: "Morning Cu Chi Tunnels. Afternoon Mekong Delta boat trip.",
        activities: ["Cu Chi Tunnels", "Mekong Delta", "Boat Trip"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 10,
        title: "Departure",
        description: "Breakfast at hotel. Transfer to Tan Son Nhat Airport.",
        activities: ["Breakfast", "Check-out", "Airport Transfer"],
        meals: ["Breakfast"]
      }
    ],
    includes: [
      "9 nights accommodation",
      "Daily breakfast",
      "4 lunches",
      "4 dinners",
      "Halong Bay overnight cruise",
      "Domestic flights (Hanoi-Da Nang, Da Nang-Saigon)",
      "All tours and transfers",
      "English-speaking guide"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Tips",
      "Drinks"
    ],
    inclusions: [
      "9 nights accommodation",
      "Daily breakfast",
      "4 lunches",
      "4 dinners",
      "Halong Bay overnight cruise",
      "Domestic flights (Hanoi-Da Nang, Da Nang-Saigon)",
      "All tours and transfers",
      "English-speaking guide"
    ],
    availableDates: ["2024-05-10", "2024-06-15", "2024-07-20", "2024-08-25", "2024-09-30", "2024-10-15"],
    minTravelers: 2,
    maxTravelers: 8,
    pricing: {
      originalPrice: 1899,
      discountedPrice: 1599,
      discount: 16
    },
    destination: {
      city: "Multiple Cities",
      country: "Vietnam"
    },
    bestSeason: "Feb-Apr, Sep-Dec",
    amenities: ["Cruise", "Pool", "Spa", "Restaurant", "WiFi"],
    faqs: [
      {
        question: "Do I need a visa for Vietnam?",
        answer: "Many nationalities need a visa - e-visa available."
      },
      {
        question: "What is the best time to visit?",
        answer: "Spring (Feb-Apr) and Fall (Sep-Dec) are ideal."
      }
    ]
  },
  {
    id: 26,
    _id: 'sample26',
    packageId: 'sample26',
    name: "Egyptian Wonders",
    title: "Egyptian Wonders",
    destination: "Egypt",
    location: "North Africa",
    duration: "8 Days / 7 Nights",
    rating: 4.8,
    reviews: 1987,
    description: "Explore ancient pyramids, temples, and Nile River on this Egyptian adventure.",
    shortDescription: "Pyramids, temples, and Nile cruise through ancient history.",
    price: 1799,
    originalPrice: 2199,
    discount: 18,
    image: "https://images.unsplash.com/photo-1539650119574-8ff9c5b0b9d3?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1539650119574-8ff9c5b0b9d3?w=800",
      "https://images.unsplash.com/photo-1542314831-9cd31ff9b4c5?w=800",
      "https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=800",
      "https://images.unsplash.com/photo-1572252009286-268acec5ca9a?w=800",
      "https://images.unsplash.com/photo-1589792924380-1c0d4e1e9b8a?w=800"
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1539650119574-8ff9c5b0b9d3?w=800", caption: "Pyramids of Giza" },
      { url: "https://images.unsplash.com/photo-1542314831-9cd31ff9b4c5?w=800", caption: "Sphinx" },
      { url: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=800", caption: "Nile Cruise" },
      { url: "https://images.unsplash.com/photo-1572252009286-268acec5ca9a?w=800", caption: "Karnak Temple" },
      { url: "https://images.unsplash.com/photo-1589792924380-1c0d4e1e9b8a?w=800", caption: "Valley of the Kings" }
    ],
    highlights: [
      "Pyramids of Giza and Sphinx",
      "Egyptian Museum with King Tut's treasures",
      "4-night Nile River cruise",
      "Valley of the Kings and Karnak Temple",
      "Abu Simbel temples excursion"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Cairo",
        description: "Arrival at Cairo International Airport. Transfer to hotel. Welcome dinner.",
        activities: ["Airport Transfer", "Check-in", "Welcome Dinner"],
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Pyramids & Sphinx",
        description: "Full day at Giza Plateau visiting the Great Pyramids and Sphinx. Optional camel ride.",
        activities: ["Pyramids", "Sphinx", "Camel Ride"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 3,
        title: "Egyptian Museum & Old Cairo",
        description: "Visit Egyptian Museum, Khan el-Khalili bazaar, and Old Cairo churches.",
        activities: ["Egyptian Museum", "Khan el-Khalili", "Old Cairo"],
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 4,
        title: "Fly to Luxor & Nile Cruise",
        description: "Morning flight to Luxor. Visit Karnak and Luxor Temples. Embark on Nile cruise.",
        activities: ["Flight to Luxor", "Karnak Temple", "Luxor Temple", "Cruise Embarkation"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 5,
        title: "Valley of the Kings",
        description: "Visit West Bank including Valley of the Kings, Hatshepsut Temple, and Colossi of Memnon. Sail to Edfu.",
        activities: ["Valley of the Kings", "Hatshepsut Temple", "Colossi of Memnon", "Sailing"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 6,
        title: "Edfu & Kom Ombo",
        description: "Visit Edfu Temple and Kom Ombo Temple. Sail to Aswan.",
        activities: ["Edfu Temple", "Kom Ombo Temple", "Sailing"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 7,
        title: "Aswan Excursions",
        description: "Optional Abu Simbel trip. Visit Philae Temple and unfinished obelisk. Felucca ride.",
        activities: ["Abu Simbel (optional)", "Philae Temple", "Unfinished Obelisk", "Felucca Ride"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 8,
        title: "Departure",
        description: "Disembark cruise. Transfer to Aswan airport for flight to Cairo and connection home.",
        activities: ["Disembark", "Check-out", "Airport Transfer"],
        meals: ["Breakfast"]
      }
    ],
    includes: [
      "7 nights accommodation (3 in Cairo, 4 on Nile cruise)",
      "Daily breakfast",
      "4 lunches",
      "5 dinners",
      "Domestic flights (Cairo-Luxor, Aswan-Cairo)",
      "4-night Nile cruise full board",
      "All entrance fees as per itinerary",
      "Egyptologist guide",
      "All transfers"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Tips",
      "Abu Simbel optional excursion"
    ],
    inclusions: [
      "7 nights accommodation (3 in Cairo, 4 on Nile cruise)",
      "Daily breakfast",
      "4 lunches",
      "5 dinners",
      "Domestic flights (Cairo-Luxor, Aswan-Cairo)",
      "4-night Nile cruise full board",
      "All entrance fees as per itinerary",
      "Egyptologist guide",
      "All transfers"
    ],
    availableDates: ["2024-05-10", "2024-06-15", "2024-07-20", "2024-08-25", "2024-09-30", "2024-10-15", "2024-11-20"],
    minTravelers: 2,
    maxTravelers: 8,
    pricing: {
      originalPrice: 2199,
      discountedPrice: 1799,
      discount: 18
    },
    destination: {
      city: "Cairo",
      country: "Egypt"
    },
    bestSeason: "Oct-Apr",
    amenities: ["Nile Cruise", "Pool", "Restaurant", "WiFi", "Guide"],
    faqs: [
      {
        question: "Do I need a visa for Egypt?",
        answer: "Yes, visa on arrival or e-visa available for many nationalities."
      },
      {
        question: "Is it safe to travel in Egypt?",
        answer: "Yes, tourist sites are well-protected and tours are guided."
      }
    ]
  },
  {
    id: 27,
    _id: 'sample27',
    packageId: 'sample27',
    name: "Kenya Wildlife Safari",
    title: "Kenya Wildlife Safari",
    destination: "Kenya",
    location: "East Africa",
    duration: "7 Days / 6 Nights",
    rating: 4.9,
    reviews: 1654,
    description: "Witness the Great Migration and Big Five in Kenya's world-famous national reserves.",
    shortDescription: "Maasai Mara, Amboseli elephants, and breathtaking savannahs.",
    price: 2899,
    originalPrice: 3399,
    discount: 15,
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800",
      "https://images.unsplash.com/photo-1547976155-1a6445b9b2b3?w=800",
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800",
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800",
      "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=800"
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800", caption: "Lion in Maasai Mara" },
      { url: "https://images.unsplash.com/photo-1547976155-1a6445b9b2b3?w=800", caption: "Elephants" },
      { url: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800", caption: "Giraffe" },
      { url: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800", caption: "Zebra Migration" },
      { url: "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=800", caption: "Mount Kilimanjaro" }
    ],
    highlights: [
      "Maasai Mara game drives",
      "Great Migration river crossing (July-Oct)",
      "Amboseli with Kilimanjaro views",
      "Lake Nakuru flamingos",
      "Maasai village visit"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Nairobi",
        description: "Arrival at Jomo Kenyatta Airport. Transfer to hotel. Evening briefing.",
        activities: ["Airport Transfer", "Check-in", "Safari Briefing"],
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Nairobi to Amboseli",
        description: "Drive to Amboseli National Park. Afternoon game drive with views of Kilimanjaro.",
        activities: ["Transfer", "Afternoon Game Drive"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 3,
        title: "Amboseli Safari",
        description: "Morning and evening game drives in search of elephants and other wildlife.",
        activities: ["Morning Game Drive", "Evening Game Drive"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 4,
        title: "Amboseli to Lake Nakuru",
        description: "Drive to Lake Nakuru National Park. Afternoon game drive to see flamingos and rhinos.",
        activities: ["Transfer", "Lake Nakuru Game Drive"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 5,
        title: "Lake Nakuru to Maasai Mara",
        description: "Drive to Maasai Mara. Evening game drive.",
        activities: ["Transfer", "Evening Game Drive"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 6,
        title: "Maasai Mara Safari",
        description: "Full day in Maasai Mara with picnic lunch. Optional hot air balloon safari (extra cost).",
        activities: ["Full Day Game Drive", "Optional Balloon Safari"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 7,
        title: "Departure",
        description: "Morning game drive. Return to Nairobi for evening flight.",
        activities: ["Morning Game Drive", "Transfer to Nairobi", "Airport Drop"],
        meals: ["Breakfast", "Lunch"]
      }
    ],
    includes: [
      "6 nights safari lodge/camp accommodation",
      "All meals on safari",
      "Game drives in 4x4 safari vehicle",
      "Park entrance fees",
      "Professional safari guide",
      "Bottled water during game drives",
      "All transfers"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Visa fees",
      "Tips",
      "Drinks",
      "Hot air balloon safari"
    ],
    inclusions: [
      "6 nights safari lodge/camp accommodation",
      "All meals on safari",
      "Game drives in 4x4 safari vehicle",
      "Park entrance fees",
      "Professional safari guide",
      "Bottled water during game drives",
      "All transfers"
    ],
    availableDates: ["2024-06-10", "2024-07-15", "2024-08-20", "2024-09-25", "2024-10-30"],
    minTravelers: 2,
    maxTravelers: 6,
    pricing: {
      originalPrice: 3399,
      discountedPrice: 2899,
      discount: 15
    },
    destination: {
      city: "Nairobi",
      country: "Kenya"
    },
    bestSeason: "Jul-Oct (Migration), Jan-Feb (Calving)",
    amenities: ["Safari Lodge", "Restaurant", "Bar", "WiFi in common areas"],
    faqs: [
      {
        question: "What is the best time to see the Migration?",
        answer: "July to October offers the best chances for river crossings."
      },
      {
        question: "Do I need vaccinations?",
        answer: "Yellow fever vaccination is required. Consult your doctor."
      }
    ]
  },
  {
    id: 28,
    _id: 'sample28',
    packageId: 'sample28',
    name: "Machu Picchu Explorer",
    title: "Machu Picchu Explorer",
    destination: "Peru",
    location: "South America",
    duration: "7 Days / 6 Nights",
    rating: 4.9,
    reviews: 1432,
    description: "Discover the ancient Inca citadel of Machu Picchu and explore the Sacred Valley.",
    shortDescription: "Inca ruins, Andean landscapes, and Peruvian culture.",
    price: 2399,
    originalPrice: 2799,
    discount: 14,
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800",
      "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800",
      "https://images.unsplash.com/photo-1582639510494-c80b5de9f148?w=800",
      "https://images.unsplash.com/photo-1579399671503-1159f1b4f47f?w=800",
      "https://images.unsplash.com/photo-1536708880921-62a930c4e0e6?w=800"
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800", caption: "Machu Picchu" },
      { url: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800", caption: "Sacred Valley" },
      { url: "https://images.unsplash.com/photo-1582639510494-c80b5de9f148?w=800", caption: "Cusco" },
      { url: "https://images.unsplash.com/photo-1579399671503-1159f1b4f47f?w=800", caption: "Rainbow Mountain" },
      { url: "https://images.unsplash.com/photo-1536708880921-62a930c4e0e6?w=800", caption: "Llama" }
    ],
    highlights: [
      "Machu Picchu guided tour",
      "Sacred Valley exploration",
      "Cusco city tour",
      "Rainbow Mountain excursion",
      "Peruvian cooking class"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Lima",
        description: "Arrival at Jorge Chavez Airport. Transfer to hotel. Evening free.",
        activities: ["Airport Transfer", "Check-in"],
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Lima to Cusco",
        description: "Flight to Cusco. Afternoon acclimatization and light exploration.",
        activities: ["Flight", "Cusco Orientation"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 3,
        title: "Sacred Valley",
        description: "Full day Sacred Valley tour visiting Pisac market and Ollantaytambo fortress.",
        activities: ["Pisac Market", "Ollantaytambo", "Sacred Valley"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 4,
        title: "Machu Picchu Day",
        description: "Train to Aguas Calientes. Guided tour of Machu Picchu. Return to Cusco.",
        activities: ["Train Journey", "Machu Picchu Tour", "Return to Cusco"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 5,
        title: "Cusco City Tour",
        description: "Visit Qorikancha, Sacsayhuamán, and other Inca sites around Cusco.",
        activities: ["Qorikancha", "Sacsayhuamán", "Inca Sites"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 6,
        title: "Rainbow Mountain",
        description: "Early departure for Rainbow Mountain trek with stunning views.",
        activities: ["Rainbow Mountain Trek"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 7,
        title: "Departure",
        description: "Breakfast at hotel. Transfer to Cusco airport for flight to Lima and connection home.",
        activities: ["Breakfast", "Check-out", "Airport Transfer"],
        meals: ["Breakfast"]
      }
    ],
    includes: [
      "6 nights accommodation",
      "Daily breakfast",
      "4 lunches",
      "3 dinners",
      "Domestic flights (Lima-Cusco-Lima)",
      "Machu Picchu entrance and train",
      "Sacred Valley tour",
      "Rainbow Mountain trek",
      "All transfers",
      "English-speaking guide"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Tips",
      "Huayna Picchu upgrade"
    ],
    inclusions: [
      "6 nights accommodation",
      "Daily breakfast",
      "4 lunches",
      "3 dinners",
      "Domestic flights (Lima-Cusco-Lima)",
      "Machu Picchu entrance and train",
      "Sacred Valley tour",
      "Rainbow Mountain trek",
      "All transfers",
      "English-speaking guide"
    ],
    availableDates: ["2024-05-10", "2024-06-15", "2024-07-20", "2024-08-25", "2024-09-30"],
    minTravelers: 2,
    maxTravelers: 8,
    pricing: {
      originalPrice: 2799,
      discountedPrice: 2399,
      discount: 14
    },
    destination: {
      city: "Cusco",
      country: "Peru"
    },
    bestSeason: "May-Sep",
    amenities: ["Restaurant", "WiFi", "Oxygen", "Altitude Sickness Assistance"],
    faqs: [
      {
        question: "Do I need altitude medication?",
        answer: "Consult your doctor about altitude sickness prevention."
      },
      {
        question: "Can I climb Huayna Picchu?",
        answer: "Yes, with advance booking at additional cost."
      }
    ]
  },
  {
    id: 29,
    _id: 'sample29',
    packageId: 'sample29',
    name: "Croatia Island Hopping",
    title: "Croatia Island Hopping",
    destination: "Croatia",
    location: "Europe",
    duration: "8 Days / 7 Nights",
    rating: 4.8,
    reviews: 1543,
    description: "Sail through the Adriatic Sea visiting Dubrovnik, Hvar, and stunning Croatian islands.",
    shortDescription: "Mediterranean paradise with crystal clear waters and historic towns.",
    price: 1999,
    originalPrice: 2399,
    discount: 17,
    image: "https://images.unsplash.com/photo-1555992828-ca4dbe41d50b?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1555992828-ca4dbe41d50b?w=800",
      "https://images.unsplash.com/photo-1536708880921-62a930c4e0e6?w=800",
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800",
      "https://images.unsplash.com/photo-1555992828-ca4dbe41d50b?w=800",
      "https://images.unsplash.com/photo-1536708880921-62a930c4e0e6?w=800"
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1555992828-ca4dbe41d50b?w=800", caption: "Dubrovnik Old Town" },
      { url: "https://images.unsplash.com/photo-1536708880921-62a930c4e0e6?w=800", caption: "Hvar Town" },
      { url: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800", caption: "Korčula" },
      { url: "https://images.unsplash.com/photo-1555992828-ca4dbe41d50b?w=800", caption: "Adriatic Sea" },
      { url: "https://images.unsplash.com/photo-1536708880921-62a930c4e0e6?w=800", caption: "Beach" }
    ],
    highlights: [
      "Dubrovnik city walls walk",
      "Hvar island nightlife",
      "Korčula wine tasting",
      "Mljet National Park",
      "Island-hopping boat tours"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Dubrovnik",
        description: "Arrival at Dubrovnik Airport. Transfer to hotel. Evening Old Town exploration.",
        activities: ["Airport Transfer", "Check-in", "Old Town Walk"],
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Dubrovnik City Walls",
        description: "Walk the famous city walls. Visit to Lokrum Island.",
        activities: ["City Walls", "Lokrum Island"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 3,
        title: "Dubrovnik to Korčula",
        description: "Ferry to Korčula. Explore Korčula Town, birthplace of Marco Polo.",
        activities: ["Ferry", "Korčula Town"],
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 4,
        title: "Korčula Wine Tasting",
        description: "Wine tasting tour in Pelješac peninsula. Beach time.",
        activities: ["Wine Tasting", "Beach"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 5,
        title: "Korčula to Hvar",
        description: "Ferry to Hvar. Explore Hvar Town and Spanish Fortress.",
        activities: ["Ferry", "Hvar Town", "Fortress"],
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 6,
        title: "Pakleni Islands Excursion",
        description: "Boat tour to Pakleni Islands for swimming and snorkeling.",
        activities: ["Pakleni Islands", "Swimming", "Snorkeling"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 7,
        title: "Hvar to Split via Brač",
        description: "Ferry to Split with stop at Brač's Zlatni Rat beach.",
        activities: ["Ferry", "Zlatni Rat", "Split Check-in"],
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 8,
        title: "Departure",
        description: "Diocletian's Palace tour. Transfer to Split Airport.",
        activities: ["Diocletian's Palace", "Check-out", "Airport Transfer"],
        meals: ["Breakfast"]
      }
    ],
    includes: [
      "7 nights boutique hotel accommodation",
      "Daily breakfast",
      "2 lunches",
      "4 dinners",
      "All ferry tickets",
      "Island-hopping boat tours",
      "City Walls entrance",
      "Wine tasting tour",
      "English-speaking guide"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Tips",
      "Drinks"
    ],
    inclusions: [
      "7 nights boutique hotel accommodation",
      "Daily breakfast",
      "2 lunches",
      "4 dinners",
      "All ferry tickets",
      "Island-hopping boat tours",
      "City Walls entrance",
      "Wine tasting tour",
      "English-speaking guide"
    ],
    availableDates: ["2024-06-01", "2024-07-05", "2024-08-10", "2024-09-15"],
    minTravelers: 2,
    maxTravelers: 8,
    pricing: {
      originalPrice: 2399,
      discountedPrice: 1999,
      discount: 17
    },
    destination: {
      city: "Dubrovnik",
      country: "Croatia"
    },
    bestSeason: "Jun-Sep",
    amenities: ["Beach Access", "Restaurant", "WiFi", "Boat Tours"],
    faqs: [
      {
        question: "Do I need a visa for Croatia?",
        answer: "Croatia is part of the EU/Schengen zone."
      },
      {
        question: "What is the best way to island hop?",
        answer: "Ferries and catamarans connect the main islands."
      }
    ]
  },
  {
    id: 30,
    _id: 'sample30',
    packageId: 'sample30',
    name: "Jordan & Petra Discovery",
    title: "Jordan & Petra Discovery",
    destination: "Jordan",
    location: "Middle East",
    duration: "6 Days / 5 Nights",
    rating: 4.9,
    reviews: 1321,
    description: "Explore the ancient Nabatean city of Petra, float in the Dead Sea, and camp in Wadi Rum.",
    shortDescription: "Ancient wonders, desert landscapes, and Dead Sea floating.",
    price: 1699,
    originalPrice: 1999,
    discount: 15,
    image: "https://images.unsplash.com/photo-1579606032821-4e4a22c3a8c1?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1579606032821-4e4a22c3a8c1?w=800",
      "https://images.unsplash.com/photo-1589792924380-1c0d4e1e9b8a?w=800",
      "https://images.unsplash.com/photo-1579606032821-4e4a22c3a8c1?w=800",
      "https://images.unsplash.com/photo-1589792924380-1c0d4e1e9b8a?w=800"
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1579606032821-4e4a22c3a8c1?w=800", caption: "Petra Treasury" },
      { url: "https://images.unsplash.com/photo-1589792924380-1c0d4e1e9b8a?w=800", caption: "Wadi Rum" },
      { url: "https://images.unsplash.com/photo-1579606032821-4e4a22c3a8c1?w=800", caption: "Dead Sea" },
      { url: "https://images.unsplash.com/photo-1589792924380-1c0d4e1e9b8a?w=800", caption: "Jerash" }
    ],
    highlights: [
      "Full day in Petra including Treasury and Monastery",
      "Wadi Rum desert jeep tour and Bedouin camp",
      "Floating in the Dead Sea",
      "Jerash Roman ruins",
      "Amman city tour"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Amman",
        description: "Arrival at Queen Alia Airport. Transfer to hotel. Evening at leisure.",
        activities: ["Airport Transfer", "Check-in"],
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Amman & Jerash",
        description: "Amman Citadel tour. Afternoon visit to Jerash Roman ruins.",
        activities: ["Amman Citadel", "Jerash Ruins"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 3,
        title: "Petra Exploration",
        description: "Drive to Petra. Full day exploring the ancient Nabatean city.",
        activities: ["Drive to Petra", "Petra Tour"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 4,
        title: "Wadi Rum Desert",
        description: "Morning in Petra. Afternoon drive to Wadi Rum for jeep tour and Bedouin camp.",
        activities: ["Morning Petra", "Wadi Rum Jeep Tour", "Bedouin Camp"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 5,
        title: "Dead Sea Experience",
        description: "Drive to Dead Sea. Resort stay with mud treatments and floating.",
        activities: ["Dead Sea Resort", "Mud Bath", "Floating"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 6,
        title: "Departure",
        description: "Breakfast at resort. Transfer to Amman airport.",
        activities: ["Breakfast", "Check-out", "Airport Transfer"],
        meals: ["Breakfast"]
      }
    ],
    includes: [
      "5 nights accommodation (hotels + desert camp)",
      "Daily breakfast",
      "3 lunches",
      "4 dinners",
      "Petra entrance fees",
      "Wadi Rum jeep tour",
      "Dead Sea resort access",
      "All transfers",
      "English-speaking guide"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Tips",
      "Drinks"
    ],
    inclusions: [
      "5 nights accommodation (hotels + desert camp)",
      "Daily breakfast",
      "3 lunches",
      "4 dinners",
      "Petra entrance fees",
      "Wadi Rum jeep tour",
      "Dead Sea resort access",
      "All transfers",
      "English-speaking guide"
    ],
    availableDates: ["2024-04-10", "2024-05-15", "2024-09-20", "2024-10-25"],
    minTravelers: 2,
    maxTravelers: 6,
    pricing: {
      originalPrice: 1999,
      discountedPrice: 1699,
      discount: 15
    },
    destination: {
      city: "Amman",
      country: "Jordan"
    },
    bestSeason: "Mar-May, Sep-Nov",
    amenities: ["Desert Camp", "Resort", "Restaurant", "WiFi"],
    faqs: [
      {
        question: "Do I need a visa for Jordan?",
        answer: "Jordan Pass includes visa for most nationalities."
      },
      {
        question: "Is it safe to travel in Jordan?",
        answer: "Yes, Jordan is very safe and welcoming to tourists."
      }
    ]
  }
];

// Helper functions
export const packagesData = samplePackages;

export const getPackageById = (id) => {
  return samplePackages.find(pkg => 
    pkg.id === parseInt(id) || 
    pkg._id === id || 
    pkg.packageId === id ||
    pkg.id === id
  );
};

export const filterPackages = (filters) => {
  return samplePackages.filter(pkg => {
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const nameMatch = pkg.name?.toLowerCase().includes(searchTerm);
      const titleMatch = pkg.title?.toLowerCase().includes(searchTerm);
      const destMatch = pkg.destination?.toLowerCase().includes(searchTerm);
      const locationMatch = pkg.location?.toLowerCase().includes(searchTerm);
      const cityMatch = pkg.destination?.city?.toLowerCase().includes(searchTerm);
      const countryMatch = pkg.destination?.country?.toLowerCase().includes(searchTerm);
      
      if (!(nameMatch || titleMatch || destMatch || locationMatch || cityMatch || countryMatch)) {
        return false;
      }
    }
    
    if (filters.minPrice) {
      const price = pkg.price || pkg.pricing?.discountedPrice;
      if (price && price < filters.minPrice) return false;
    }
    
    if (filters.maxPrice) {
      const price = pkg.price || pkg.pricing?.discountedPrice;
      if (price && price > filters.maxPrice) return false;
    }
    
    if (filters.minRating) {
      const rating = pkg.rating || pkg.rating?.average;
      if (rating && rating < filters.minRating) return false;
    }
    
    if (filters.duration) {
      const durationStr = pkg.duration || (pkg.duration?.days ? `${pkg.duration.days} Days / ${pkg.duration.nights} Nights` : '');
      const days = parseInt(durationStr.split(' ')[0]) || 0;
      
      if (filters.duration === 'short' && days > 5) return false;
      if (filters.duration === 'medium' && (days <= 5 || days > 8)) return false;
      if (filters.duration === 'long' && days <= 8) return false;
    }
    
    return true;
  });
};

export const sortPackages = (packages, sortBy) => {
  const sorted = [...packages];
  switch(sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => {
        const priceA = a.price || a.pricing?.discountedPrice || 0;
        const priceB = b.price || b.pricing?.discountedPrice || 0;
        return priceA - priceB;
      });
    case 'price-high':
      return sorted.sort((a, b) => {
        const priceA = a.price || a.pricing?.discountedPrice || 0;
        const priceB = b.price || b.pricing?.discountedPrice || 0;
        return priceB - priceA;
      });
    case 'duration-short':
      return sorted.sort((a, b) => {
        const daysA = parseInt((a.duration || '').split(' ')[0]) || a.duration?.days || 0;
        const daysB = parseInt((b.duration || '').split(' ')[0]) || b.duration?.days || 0;
        return daysA - daysB;
      });
    case 'duration-long':
      return sorted.sort((a, b) => {
        const daysA = parseInt((a.duration || '').split(' ')[0]) || a.duration?.days || 0;
        const daysB = parseInt((b.duration || '').split(' ')[0]) || b.duration?.days || 0;
        return daysB - daysA;
      });
    case 'rating':
      return sorted.sort((a, b) => {
        const ratingA = a.rating || a.rating?.average || 0;
        const ratingB = b.rating || b.rating?.average || 0;
        return ratingB - ratingA;
      });
    default:
      return sorted;
  }
};