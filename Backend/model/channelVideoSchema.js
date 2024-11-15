const mongoose = require('mongoose');

const channelVideo = new mongoose.Schema({
    channelVideoName : {
        type : String,
        required : true,
    },
    channelVideoThumbnail : {
        type : String,
        required : true,
    },
    channelVideourl : {
        type : String,
        required : true,
    },
    channelVideoDescription : {
        type : String,
        required : true,
    },
    channelVideoUploader : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Signing_Up",
        required : true,
    } 
})

module.exports = mongoose.model('channelVideo', channelVideo);