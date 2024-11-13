const signup = require('../model/signupSchema');
const bcrypt = require('bcrypt');

exports.createUser = async (req,resp) => {
    try{
        const { name, email, pass } = req.body;

        if(!name || !email || !pass){
            return resp.status(400).json({
                success : false,
                msg : "Please Fill all the Details",
            });
        }

        isPresent = await signup.findOne({email : email});
        if(isPresent){
            return resp.status(400).json({
                success : false,
                msg : "Account Already Exists",
            });
        }

        let hashPass;
        try{
            hashPass = await bcrypt.hash(pass, 10);
        }
        catch(error){
            resp.status(400).json({
                success : false,
                msg : "Error in Hashing",
            });
        };

        const createdUser = await signup.create({ name, email, pass : hashPass, img : `https://api.dicebear.com/5.x/initials/svg?seed=${name}` });
        resp.status(200).json({
            success : true,
            msg : "User Created Successfully",
            User : createdUser,
        });
    }
    catch(error){
        resp.status(500).json({
            success : false,
            msg : "Internal Server Error",
        });
    };
};

exports.getUsers = async (req,resp) => {
    try{
        const user = await signup.find();

        resp.status(200).json({
            success : true,
            msg : "User Fetched Successfully",
            User : user,
        });
    }
    catch(error){
        resp.status(500).json({
            success : false,
            msg : "Internal Server Error",
        });
    };
}