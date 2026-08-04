const UserData = require('../model/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');



// Method For Generating OTP

const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECERT,{expiresIn:'10d'}) 
}

const GetProfile = async(req,res)=>{
    try{
            const user = await UserData.findById(req.user._id).select("-password");
              if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json(user);
    }catch(error){
            console.log("Error While Getting Profile:", error.message);
res.status(500).json({
      message: "Internal Server Error While Getting Profile",
    });
    };
};


const UpdateProfile = async (req, res) => {
  try {
    const user = await UserData.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const { name, email, password } = req.body;

    // Update Name
    if (name) {
      user.name = name;
    }

    // Update Email
    if (email) {
      user.email = email;
    }

    // Update Password (optional)
    if (password && password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      token: generateToken(updatedUser._id),
      message: "Profile Updated Successfully",
    });
  } catch (error) {
    console.log("Error While Updating Profile:", error.message);

    res.status(500).json({
      message: "Internal Server Error While Updating Profile",
    });
  }
};


// Function My Registering User
const RegisterUser = async (req,res)=>{
    const {name,email,password,role} = req.body;
    try{
        const exisitngUser = await UserData.findOne({email});
        if (exisitngUser) {
            return res.status(400).json({message:"Entered Email Already Exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password,salt);
        const newUser = await UserData.create({
            name,
            email,
            password:hashedpassword,
            role
        });
        // Method For Creating OPT
        if (newUser) {
        const otp = Math.floor(100000 + Math.random()*90000).toString();
        const email_msg = `
        Welcome To Shop-Pak-Ecom-Mern ! Thank You From Your Choosing Us We Are Excited to Have You OnBoard Your Email Confirmation Opt : ${otp}`;
        // This Method Is Passing Three Thing Email , Subject and message
        await sendEmail(email, 'Welcome To Shop-Pak-Ecom-Mern',email_msg);
        res.status(201).json({
            _id:newUser._id,
            name:newUser.name,
            email:newUser.email,
            role:newUser.role,
            token:generateToken(newUser._id)
        });            
        res.status(201).json({message:"User Registered Successfully"});
        }
        else{
            res.status(400).json({message:"Invlaid User Data Entered"})
            
        }
   
    }
    catch(error){
        res.status(400).json({message:"Internal Server Error While Registering The User"})
        console.log("Error While Adding The New User" , error.message);
    }
};


// Method For Getting Users

const GetUsers = async(req,res)=>{
    try{
        const users =  await UserData.find({}).select('-password');
        res.json(users);
    }catch(error){
        res.status(500).json({message: "Internal Server Error While Getting Users"})
    }
}

// Login User
const LoginUser = async (req,res)=>{
    const{email,password}=req.body;
    try{
        const user = await UserData.findOne({email});
        if(user && (await bcrypt.compare(password,user.password))){
            res.json({
                _id:user._id,
                name:user.name,
                role:user.role,
                token:generateToken(user._id)
            });
        }
        else{
            res.status(400).json({message: "Invalid User Credentianls Entered !"})
        }
    }catch(error){
        res.status(500).json({
            message:"Internal Server Error"
        })
        console.log("Server Error While Login User " , error.message);
    }
}



module.exports={
    RegisterUser,
    LoginUser,
    GetUsers,
    GetProfile,
    UpdateProfile
}