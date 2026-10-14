const RazorPay = require('razorpay');
const crypto = require('crypto');

// Making Instance OF Razor Pat

const createdOrder = async(req,res)=>{
    try{
        const Instance = new RazorPay({
            key_id:process.env.RAZORPAY_KEY_ID,
            key_secret:process.env.RAZORPAY_KEY_SECRET,
        });
        const option = {
            amount : req.body.amount*100,
            currency:"PKR",
            receipt:crypto.randomBytes(10).toString('hex')
        };
        const order = await Instance.orders.create(option);
        res.status(200).json(order);
    }catch(error){
        res.status(500).json({message : "Internal Server Error While Razor"})
        console.log("Razor Server Error " , error.message);
        
    }
}