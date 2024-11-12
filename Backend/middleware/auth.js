const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = (req,resp,next) => {
    try{
        const token = req.cookies.token;

        if(!token || token == undefined){
            return resp.status(401).json({
                success : false,
                msg : "Token Missing",
            });
        }

        try{
            const payload = jwt.verify(token, process.env.SECRET_KEY);
            req.user = payload;
        }
        catch(error){
            resp.status(500).json({
                success : false,
                msg : "Token Mismatch",
            });
        };

        next();
    }
    catch(error){
        resp.status(500).json({
            success : false,
            msg : "Internal Server Error",
        });
    };
}