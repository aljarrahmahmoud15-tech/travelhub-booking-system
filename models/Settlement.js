const mongoose = require('mongoose');

const settlementSchema = new mongoose.Schema({
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  driverName: { type: String, default: '' },
  totalAmount: { type: Number, default: 0 },
  paidAmount: { type: Number, default: 0 },
  remainingAmount: { type: Number, default: 0 },
  settlementDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['pending', 'partial', 'completed'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Settlement', settlementSchema);
