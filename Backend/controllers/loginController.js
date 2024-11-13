const signup = require('../model/signupSchema');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.loginUser = async (req,resp) => {
    try{
        const { email, pass } = req.body;

        if(!email || !pass){
            return resp.status(400).json({
                success : false,
                msg : "Please Fill all the Details",
            });
        }

        const user = await signup.findOne({email : email});

        if(!user){
            return resp.status(404).json({
                success : false,
                msg : "Account not Exists",
            });
        }

        const isMatched = await bcrypt.compare(pass, user.pass);
        if(isMatched){
            const payload = {
                name : user.name,
                email : user.email,
                _id: user._id
            }
            const options = {
                httpOnly : true,
                expires : new Date(Date.now() + 5 * 60 * 1000)
            }

            let token = jwt.sign(payload, process.env.SECRET_KEY);
            resp.cookie("token", token, options).status(200).json({
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