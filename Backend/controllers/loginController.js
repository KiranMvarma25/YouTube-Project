const signup = require('../model/signupSchema');                            // Importing Schema for Manipulating Data
const bcrypt = require('bcrypt');                                           // Importing Bcrypt for Hashing the Password

const jwt = require('jsonwebtoken');                                        // Importing JWT for Creating Token
require('dotenv').config();                                                 // Tmporting environment varaiable from env File

exports.loginUser = async (req,resp) => {                                   // Function for Fetching User's Id after Signing
    try{
        const { email, pass } = req.body;

        if(!email || !pass){
            return resp.status(400).json({
                success : false,
                msg : "Please Fill all the Details",
            });
        }

        const user = await signup.findOne({email : email});                 // Fetching by email

        if(!user){
            return resp.status(404).json({
                success : false,
                msg : "Account not Exists",
            });
        }

        const isMatched = await bcrypt.compare(pass, user.pass);            // Unhashing the password
        if(isMatched){
            const payload = {                                               
                name : user.name,
                email : user.email,
                _id: user._id,
                img : user.img
            }
            const options = {
                httpOnly : true,
                expires : new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
            }

            let token = jwt.sign(payload, process.env.SECRET_KEY);          // Creating a JWT Token
            resp.cookie("token", token, options).status(200).json({         // SSending in form of Cookie
                success : true,
                msg : "Login Successfully",
                Token : token,
                user: payload
            });
        }
        else{
            return resp.status(400).json({
                success : false,
                msg : "Incorrect Password",
            });
        }
    }
    catch(error){
        resp.status(500).json({
            success : false,
            msg : "Internal Server Error",
        });
    };
};