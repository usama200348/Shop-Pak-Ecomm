const express = require('express');
const {protect} = require('../middleware/authMiddleware');
const {admin} = require('../middleware/adminMiddleware');
const {getOrders,myorders,UpdateOrderStatus,createOrder} = require('../controllers/orderController.js');
const OrderRouter = express.Router();

OrderRouter.route('/').post(protect,createOrder).get(protect,admin,getOrders);
OrderRouter.route('/myorders').get(protect,myorders);
OrderRouter.route('/:id/status').put(protect,admin,UpdateOrderStatus);

module.exports = OrderRouter;
