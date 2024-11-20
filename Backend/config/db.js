const mongoose = require('mongoose');       // Importing Mongoose package

require('dotenv').config();                 // Getting environment varaible URL fromenv file
let Url = process.env.Url;

const dbConnect = () => {                   // Connecting function for MongoDB Database (compass)
    mongoose.connect(Url)
    .then(() => console.log("Connected to DB"))
    .catch(error => console.log(error))
}

module.exports = dbConnect;