const jwt = require('jsonwebtoken');                                // Importing JWT for Creating Token
require('dotenv').config();                                         // Tmporting environment varaiable from env File

exports.auth = (req,resp,next) => {                                 // Function for Authentication of Token
    try{
        const token = req.cookies.token;

        if(!token || token == undefined){
            return resp.status(401).json({
                success : false,
                msg : "Token Missing",
            });
        }

        try{
            const payload = jwt.verify(token, process.env.SECRET_KEY);      // Matching the Token with Secret Key
            req.user = payload;
        }
        catch(error){
            resp.status(500).json({
                success : false,
                msg : "Token Mismatch",
            });
        };

        next();                                                         // If the Function is Succeeded moves further
    }
    catch(error){
        resp.status(500).json({
            success : false,
            msg : "Internal Server Error",
        });
    };
}