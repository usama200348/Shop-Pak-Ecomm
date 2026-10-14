const express = require('express');
const {createdOrder , verifyPayment} = require('../controllers/paymentController.js')
const PaymentRouter = express.Router();

PaymentRouter.post("/order",createdOrder);
PaymentRouter.post('/verfy',verifyPayment);


module.exports = PaymentRouter;

