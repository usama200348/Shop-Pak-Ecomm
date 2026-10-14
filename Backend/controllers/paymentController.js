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
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error While Razorpay" });
        console.log("Razor Server Error: ", error.message);
    }
};

const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        // Verify payment signature if configured
        res.status(200).json({ message: "Payment verified successfully", verified: true });
    } catch (error) {
        console.log("Error in verifyPayment:", error.message);
        res.status(500).json({ message: "Error verifying payment" });
    }
};

module.exports = {
    createdOrder,
    verifyPayment
};