const express = require('express');
const {getAdminStats} = require('../controllers/analyticsController.js');
const { protect } = require('../middleware/authMiddleware.js');
const AdminRoute = express.Router();


AdminRoute.get('/',protect,getAdminStats);


module.exports = AdminRoute;