const express = require('express');
const { createSettlement, getAllSettlements } = require('../controllers/settlementController');

const router = express.Router();

router.get('/', getAllSettlements);
router.post('/', createSettlement);

module.exports = router;
