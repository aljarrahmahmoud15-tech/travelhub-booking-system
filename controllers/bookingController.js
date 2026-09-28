const Booking = require('../models/Booking');
const Customer = require('../models/Customer');
const whatsappService = require('../services/whatsappService');

exports.createBooking = async (req, res) => {
  try {
    const { customerId, tripType, routeFrom, routeTo, date, time, passengers, amount, notes } = req.body;

    if (!customerId || !routeFrom || !routeTo || !date) {
      return res.status(400).json({ success: false, message: 'البيانات المطلوبة ناقصة' });
    }

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ success: false, message: 'العميل غير موجود' });
    }

    const bookingCode = `TH-${Date.now().toString().slice(-6)}`;

    const booking = await Booking.create({
      bookingCode,
      customer: customerId,
      tripType,
      routeFrom,
      routeTo,
      date,
      time,
      passengers,
      amount,
      notes
    });

    await whatsappService.sendBookingMessage({
      customerName: customer.name,
      customerPhone: customer.phone,
      bookingCode,
      tripType,
      routeFrom,
      routeTo,
      date,
      time,
      amount
    });

    res.status(201).json({ success: true, message: 'تم إنشاء الحجز بنجاح', data: booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message || 'حدث خطأ أثناء إنشاء الحجز' });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('customer').sort({ createdAt: -1 });
    res.json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('customer');
    if (!booking) {
      return res.status(404).json({ success: false, message: 'الحجز غير موجود' });
    }

    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
