const express = require('express');
const { createCustomer, getAllCustomers } = require('../controllers/customerController');

const router = express.Router();

router.get('/', getAllCustomers);
router.post('/', createCustomer);

module.exports = router;
