const mongoose = require('mongoose');               // Importing Mongoose package

const commentSchema = new mongoose.Schema({         // Creating Collection
    comment : {
        type : String,
        required : true,
    },
    commentedUser : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Signing_Up",
        required : true,
    },
    commentedVideo : {
        type : mongoose.Schema.Types.ObjectId,      // Setting Id with the Id of channelVideo
        ref : "channelVideo",
        required : true,
    },
});

module.exports = mongoose.model('Comment', commentSchema);      // Exporting Collection