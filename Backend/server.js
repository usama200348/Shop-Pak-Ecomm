const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');

// AllConfiguration
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    "http://localhost:3000",
    process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin) || allowedOrigins.includes(origin.replace(/\/$/, ''))) {
            return callback(null, true);
        }
        if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
            return callback(null, true);
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();



// Api calling
app.get("/",(req,res)=>{
    res.send("Hello Api Working")
})

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products',require('./routes/productRoutes'));
app.use('/api/order',require('./routes/orderRoutes.js'));
app.use('/api/payment', require('./routes/paymentRoutes.js'));  
app.use('/api/admin',require('./routes/adminRoutes.js')); 


app.listen(PORT,()=>{
    console.log(`Server Is Working On ${PORT}`);
    
})