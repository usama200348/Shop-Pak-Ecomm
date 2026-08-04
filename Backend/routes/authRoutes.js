    const express = require('express');
    const Authrouter = express.Router();
const {RegisterUser,LoginUser,GetUsers, GetProfile, UpdateProfile} = require("../controllers/authController.js");
const {protect} = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware.js');
// Making Routes For Creating User/Post

Authrouter.post("/register",RegisterUser);
Authrouter.post("/login",LoginUser);
Authrouter.get("/profile",protect,GetProfile);
Authrouter.put("/profile",protect,UpdateProfile);
Authrouter.get("/users",protect,admin,GetUsers);
// Authrouter.post("/logout",LogoutUser);


module.exports = Authrouter;