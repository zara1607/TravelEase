// server/src/models/Booking.js
// ES Module version

import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    itemType: {
      type: String,
      enum: ['flight', 'hotel', 'tour'],
      required: [true, 'Booking type is required'],
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'itemType',
      required: [true, 'Item ID is required'],
    },
    itemDetails: {
      name: String,
      image: String,
      location: String,
    },
    customerInfo: {
      firstName: {
        type: String,
        required: [true, 'First name is required'],
      },
      lastName: {
        type: String,
        required: [true, 'Last name is required'],
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
      },
      phone: {
        type: String,
        required: [true, 'Phone number is required'],
      },
    },
    travelDetails: {
      checkIn: Date,
      checkOut: Date,
      departureDate: Date,
      returnDate: Date,
      numberOfAdults: {
        type: Number,
        default: 1,
        min: 1,
      },
      numberOfChildren: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
    specialRequests: {
      type: String,
      maxlength: 500,
    },
    pricing: {
      basePrice: {
        type: Number,
        required: true,
      },
      serviceFee: {
        type: Number,
        default: 0,
      },
      taxes: {
        type: Number,
        default: 0,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'refunded', 'failed'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      enum: ['credit_card', 'debit_card', 'upi', 'net_banking', 'wallet'],
    },
    transactionId: String,
    bookingReference: {
      type: String,
      unique: true,
    },
    cancelledAt: Date,
    cancellationReason: String,
  },
  {
    timestamps: true,
  }
);

// Generate booking reference before saving
bookingSchema.pre('save', async function (next) {
  if (!this.bookingReference) {
    const prefix = this.itemType.substring(0, 3).toUpperCase();
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    this.bookingReference = `${prefix}-${timestamp}-${random}`;
  }
  next();
});

// Index for faster queries
bookingSchema.index({ user: 1, status: 1 });
bookingSchema.index({ bookingReference: 1 });
bookingSchema.index({ createdAt: -1 });

// Virtual for total travelers
bookingSchema.virtual('totalTravelers').get(function () {
  return (this.travelDetails.numberOfAdults || 0) + (this.travelDetails.numberOfChildren || 0);
});

// Ensure virtuals are included in JSON
bookingSchema.set('toJSON', { virtuals: true });
bookingSchema.set('toObject', { virtuals: true });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;