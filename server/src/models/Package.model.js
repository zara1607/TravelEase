import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
  packageId: {
    type: String,
    required: true,
    unique: true,
    default: () => `PKG${Date.now()}${Math.floor(Math.random() * 1000)}`
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  destination: {
    city: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    continent: String
  },
  description: {
    type: String,
    required: true
  },
  highlights: [{
    type: String
  }],
  duration: {
    days: {
      type: Number,
      required: true
    },
    nights: {
      type: Number,
      required: true
    }
  },
  pricing: {
    originalPrice: {
      type: Number,
      required: true
    },
    discountedPrice: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'INR'
    },
    discount: {
      type: Number,
      default: 0
    }
  },
  inclusions: [{
    type: String
  }],
  exclusions: [{
    type: String
  }],
  itinerary: [{
    day: Number,
    title: String,
    description: String,
    activities: [String]
  }],
  images: [{
    url: String,
    caption: String
  }],
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  category: {
    type: String,
    enum: ['beach', 'adventure', 'cultural', 'luxury', 'family', 'honeymoon', 'wildlife', 'spiritual', 'cruise'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'moderate', 'challenging'],
    default: 'easy'
  },
  flightDetails: {
    included: {
      type: Boolean,
      default: true
    },
    from: String,
    airline: String
  },
  hotelDetails: {
    included: {
      type: Boolean,
      default: true
    },
    name: String,
    starRating: Number,
    roomType: String
  },
  availability: {
    startDate: Date,
    endDate: Date,
    maxBookings: Number,
    currentBookings: {
      type: Number,
      default: 0
    }
  },
  tags: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  bestSeason: String,
  minimumGuests: {
    type: Number,
    default: 1
  },
  maximumGuests: {
    type: Number,
    default: 10
  }
}, {
  timestamps: true
});

// Indexes
packageSchema.index({ 'destination.city': 1 });
packageSchema.index({ category: 1 });
packageSchema.index({ 'pricing.discountedPrice': 1 });
packageSchema.index({ 'rating.average': -1 });
packageSchema.index({ isFeatured: 1 });
packageSchema.index({ isActive: 1 });

// Virtual for discount percentage
packageSchema.virtual('discountPercentage').get(function() {
  if (this.pricing.originalPrice > 0) {
    return Math.round(((this.pricing.originalPrice - this.pricing.discountedPrice) / this.pricing.originalPrice) * 100);
  }
  return 0;
});

// Method to check availability
packageSchema.methods.isAvailable = function(requestedGuests = 1) {
  if (!this.isActive) return false;
  if (requestedGuests < this.minimumGuests || requestedGuests > this.maximumGuests) return false;
  
  if (this.availability.maxBookings) {
    return this.availability.currentBookings < this.availability.maxBookings;
  }
  
  return true;
};

const Package = mongoose.model('Package', packageSchema);

export default Package;