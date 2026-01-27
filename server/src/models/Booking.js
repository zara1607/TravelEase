import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['flight', 'hotel', 'package'],
    required: true
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    // This will reference either Flight, Hotel, or Tour based on type
  },
  itemDetails: {
    type: mongoose.Schema.Types.Mixed,
    // Store snapshot of item at booking time
  },
  passengerDetails: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  travelDate: {
    checkIn: Date,
    checkOut: Date
  },
  guests: {
    type: Number,
    default: 1,
    min: 1
  },
  specialRequests: {
    type: String,
    maxlength: 1000
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'upi', 'netbanking', 'wallet'],
    default: 'card'
  },
  transactionId: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  bookingReference: {
    type: String,
    unique: true
  },
  cancelledAt: {
    type: Date
  },
  cancellationReason: {
    type: String
  }
}, {
  timestamps: true
})

// Generate unique booking reference before saving
bookingSchema.pre('save', function(next) {
  if (!this.bookingReference) {
    this.bookingReference = `BK${Date.now()}${Math.floor(Math.random() * 1000)}`
  }
  next()
})

// Index for searching
bookingSchema.index({ user: 1, createdAt: -1 })
bookingSchema.index({ bookingReference: 1 })

const Booking = mongoose.model('Booking', bookingSchema)

export default Booking