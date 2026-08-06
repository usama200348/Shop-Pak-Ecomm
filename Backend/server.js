const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');

// AllConfiguration
dotenv.config();
const PORT = process.env.PORT || 3200;
const app=express();

console.log("FRONTEND_URL:", process.env.FRONTEND_URL);

app.use(cors(
    {
        origin:["http://localhost:5173",process.env.FRONTEND_URL,],
        methods:['GET','POST','PUT','DELETE'],
        allowedHeaders:['Content-Type','Authorization'],
        credentials:true
    }
))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
connectDB();



// Api calling
app.get("/",(req,res)=>{
    res.send("Hello Api Working")
})

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products',require('./routes/productRoutes'));
app.use('/api/order',require('./routes/orderRoutes.js'));
// app.use('/api/payment',require('./routes/paymentRoutes.js'));  
app.use('/api/admin',require('./routes/adminRoutes.js')); 


app.listen(PORT,()=>{
    console.log(`Server Is Working On ${PORT}`);
    
})