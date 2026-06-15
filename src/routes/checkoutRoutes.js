const express = require('express');
const CheckoutController = require('../controllers/CheckoutController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/checkout', authMiddleware, CheckoutController.checkout);

module.exports = router;
