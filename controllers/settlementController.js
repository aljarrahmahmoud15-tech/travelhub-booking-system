const Settlement = require('../models/Settlement');
const Booking = require('../models/Booking');

exports.createSettlement = async (req, res) => {
  try {
    const { bookingId, driverName, totalAmount, paidAmount } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'الحجز غير موجود' });
    }

    const remainingAmount = totalAmount - paidAmount;

    const settlement = await Settlement.create({
      booking: bookingId,
      driverName,
      totalAmount,
      paidAmount,
      remainingAmount,
      status: remainingAmount > 0 ? 'partial' : 'completed'
    });

    res.status(201).json({ success: true, message: 'تم تسجيل التسوية بنجاح', data: settlement });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllSettlements = async (req, res) => {
  try {
    const settlements = await Settlement.find().populate('booking').sort({ createdAt: -1 });
    res.json({ success: true, data: settlements });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
