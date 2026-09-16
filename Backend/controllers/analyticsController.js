const Order = require("../model/Order");
const Product = require("../model/Product");
const UserModel = require("../model/User.model")




const getAdminStats = async(req,res)=>{
        console.log("Analytics API Hit");
    try{
        const totalUser = await UserModel.countDocuments({role:"user"});
        const totalOrders = await Order.countDocuments();
        const totalProducts = await Product.countDocuments();
        const orders = await Order.find({});
        const totalRevenueData = orders.reduce((acc,order)=>acc+order.totalAmount,0)
        res.json({
            totalUser,
            totalOrders,
            totalProducts,
            totalRevenue:totalRevenueData
        })
    }catch(error){
            res.status(500).json({message: "Error While Fetching Stats"});
            console.log("Error While Fetching Stats" , error.message);
            
        }
};

module.exports = {getAdminStats};
