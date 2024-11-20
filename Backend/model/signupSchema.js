const mongoose = require('mongoose');                   // Importing Mongoose package

const signup = new mongoose.Schema({                    // Creating Collection
    name : {    
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    pass : {
        type : String,
        required : true,
    },
    img : {
        type : String,
        required : true,
    },
});

module.exports = mongoose.model('Signing_Up', signup);  // Exporting Collection