const mongoose = require('mongoose');


// Making Function For Connecting MongoDB Database

const connectDB = async ()=>{
    try{
         await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongo DB Data Base Connected Successfully");
    }
    catch(error){
        console.log("Error In Connecting DataBase " , error.message);
        process.exit(1);
    };
};

module.exports = connectDB; 