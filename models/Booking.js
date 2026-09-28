const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingCode: { type: String, unique: true, required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  tripType: {
    type: String,
    enum: ['ride', 'parcel', 'airport', 'tour'],
    default: 'ride'
  },
  routeFrom: { type: String, required: true },
  routeTo: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, default: '' },
  passengers: { type: Number, default: 1 },
  amount: { type: Number, default: 0 },
  paidAmount: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  notes: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
