const mongoose = require("mongoose");

const ProductScheme = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    images:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    ratings:{
        type:Number,
        default:0
    },
    numReviews:{
        type:Number,
        default:0
    },
});


const Product = mongoose.model('Product',ProductScheme);

module.exports = Product;
