const mongoose = require('mongoose');

const parcelSchema = new mongoose.Schema({
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  itemName: { type: String, required: true },
  weight: { type: Number, default: 0 },
  quantity: { type: Number, default: 1 },
  pickupAddress: { type: String, default: '' },
  deliveryAddress: { type: String, default: '' },
  status: {
    type: String,
    enum: ['pending', 'picked_up', 'in_transit', 'delivered'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Parcel', parcelSchema);
