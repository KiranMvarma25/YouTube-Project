const mongoose = require('mongoose');

const signup = new mongoose.Schema({
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

module.exports = mongoose.model('Signing_Up', signup);