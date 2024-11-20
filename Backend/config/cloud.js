const cloudinary = require('cloudinary').v2;                // Importing Cloudinary package

require('dotenv').config();                                 // Getting environment varaibles fromenv file

exports.cloudinaryConnect = () => {                         // Connecting function for Cloudinary
    try{
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
    }
    catch(err){
        console.log(err);
    }
}