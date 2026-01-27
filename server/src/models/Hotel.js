import mongoose from 'mongoose'

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide hotel name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide description'],
    maxlength: 2000
  },
  location: {
    type: String,
    required: [true, 'Please provide location']
  },
  city: {
    type: String,
    required: [true, 'Please provide city'],
    trim: true
  },
  country: {
    type: String,
    required: [true, 'Please provide country'],
    trim: true
  },
  address: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 4.0
  },
  reviews: {
    type: Number,
    default: 0
  },
  pricePerNight: {
    type: Number,
    required: [true, 'Please provide price per night'],
    min: 0
  },
  images: [{
    type: String
  }],
  amenities: [{
    type: String,
    trim: true
  }],
  rooms: {
    total: {
      type: Number,
      required: true,
      min: 0
    },
    available: {
      type: Number,
      required: true,
      min: 0
    }
  },
  featured: {
    type: Boolean,
    default: false
  },
  discount: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, {
  timestamps: true
})

// Index for searching
hotelSchema.index({ city: 1, pricePerNight: 1 })
hotelSchema.index({ rating: -1 })

const Hotel = mongoose.model('Hotel', hotelSchema)

export default Hotel