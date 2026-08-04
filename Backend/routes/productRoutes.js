const express = require('express');
const productRoutes = express.Router();
const {RegisterUser,LoginUser,GetUsers} = require("../controllers/authController.js");
const {protect} = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware.js');
const {getProducts,getProductsbyId,updateProduct,deleteProduct,createProduct} = require('../controllers/productController.js');
const multer = require('multer');
const upload = multer({dest:'uploads/'});


// For Getting All Product
productRoutes.route('/').get(getProducts).post(protect,admin,upload.single('image'),createProduct);
// For Getting Specific Product
productRoutes.route('/:id').get(getProductsbyId).put(protect,admin,upload.single('image'),updateProduct).delete(protect,admin,deleteProduct)


module.exports = productRoutes;

