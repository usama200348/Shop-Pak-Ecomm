const jwt = require('jsonwebtoken');
const User = require('../model/User.model');



const protect = async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token,process.env.JWT_SECERT);
            req.user = await User.findById(decoded.id).select('-password');
           return  next()
        }
        catch(error){
            res.status(401).json({message:"Not Authorized , Token Failed"});
            console.log("Token Failed While Authorization ", error.message);
        }
        if (!token) {
            res.status(401).json({message:"Not Authorized , no Token Found"});
        }
    }
}


module.exports={protect};