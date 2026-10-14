const Order = require('../model/Order');
const sendEmail = require('../utils/sendEmail');

// Creating New Order
const createOrder = async (req, res) => {
    try {
        const { items, totalAmount, address, paymentId } = req.body;
        if (!items || !totalAmount || !address) {
            return res.status(400).json({ message: "Incomplete Order Data Entered" });
        }
        const order = new Order({
            user: req.user._id,
            items,
            totalAmount,
            address,
            paymentId
        });
        await order.save();
        return res.status(201).json({ message: "Order Placed Successfully", order });
    } catch (error) {
        console.error("Internal Server Error While Creating New Order:", error.message);
        return res.status(500).json({ message: "Error While Creating Order: " + error.message });
    }
};


// Getting My Orders

const myorders = async(req,res)=>{
    try{
        const orders = await Order.find({user:req.user._id}).populate('items.productId','name price');
        res.json(orders);
        console.log(orders);
        
    }catch(error){
        res.status(500).json({message:"Internal Server Error While getting My Orders"});
        console.log("Internal Server Error While Getting My Order's Message :" , error.message);
    }
}

// Get Orders For Admin


const getOrders = async(req,res)=>{
    try{
        const orders = await Order.find({}).populate('user','id name');
        res.json(orders);
    }catch(error){
        res.status(500).json(
            {message:"Internal Server Error While Getting All Products For Admin Profile"}
        )
        console.log("Getting Internal Server Error While Fetching All Order Details" , error.message);
    }
}

// Update Order Structure

const UpdateOrderStatus = async(req,res)=>{
    try{
        const {status} = req.body;
        const order = await Order.findById(req.params.id);
        if(order){
            order.status = status;
            await order.save();
            res.json({message : "Order Status Has Been Saved Successfully", order});
        }
        else{
            res.status(404).json({message:"Enterd Order Details Not Found"});

        }
    }catch(error){
        res.status(500).json({message:"Internal Server Error While Updating Order"});
        console.log("Getting Server Error While Updating Order: ", error.message);        
    }
}

module.exports={
    createOrder,
    myorders,
    getOrders,
    UpdateOrderStatus
};