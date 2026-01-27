import mongoose from 'mongoose'

const flightSchema = new mongoose.Schema({
  airline: {
    type: String,
    required: [true, 'Please provide airline name'],
    trim: true
  },
  flightNumber: {
    type: String,
    required: [true, 'Please provide flight number'],
    trim: true,
    uppercase: true
  },
  departure: {
    airport: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    time: {
      type: Date,
      required: true
    }
  },
  arrival: {
    airport: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    time: {
      type: Date,
      required: true
    }
  },
  duration: {
    type: Number, // in minutes
    required: true
  },
  price: {
    type: Number,
    required: [true, 'Please provide price'],
    min: 0
  },
  class: {
    type: String,
    enum: ['economy', 'premium_economy', 'business', 'first'],
    default: 'economy'
  },
  stops: {
    type: Number,
    default: 0,
    min: 0
  },
  availableSeats: {
    type: Number,
    required: true,
    min: 0
  },
  amenities: {
    wifi: {
      type: Boolean,
      default: false
    },
    meals: {
      type: Boolean,
      default: false
    },
    entertainment: {
      type: Boolean,
      default: false
    }
  },
  baggage: {
    cabin: {
      type: String,
      default: '7 kg'
    },
    checkin: {
      type: String,
      default: '15 kg'
    }
  },
  refundable: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['active', 'cancelled', 'completed'],
    default: 'active'
  }
}, {
  timestamps: true
})

// Index for searching
flightSchema.index({ 'departure.city': 1, 'arrival.city': 1, 'departure.time': 1 })

const Flight = mongoose.model('Flight', flightSchema)

export default Flight