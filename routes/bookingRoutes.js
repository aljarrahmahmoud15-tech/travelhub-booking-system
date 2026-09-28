const express = require('express');
const { createBooking, getAllBookings, getBookingById } = require('../controllers/bookingController');
const { createCustomer, getAllCustomers } = require('../controllers/customerController');
const { createSettlement, getAllSettlements } = require('../controllers/settlementController');

const router = express.Router();

router.get('/', getAllBookings);
router.get('/:id', getBookingById);
router.post('/', createBooking);

module.exports = router;
