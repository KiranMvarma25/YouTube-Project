const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
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
        type : mongoose.Schema.Types.ObjectId,
        ref : "channelVideo",
        required : true,
    },
});

module.exports = mongoose.model('Comment', commentSchema);