const mongoose = require('mongoose');           // Importing Mongoose package

const channelVideo = new mongoose.Schema({      // Creating Collection
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
        type : mongoose.Schema.Types.ObjectId,      // Setting Id with the Id of Signing_up
        ref : "Signing_Up",
        required : true,
    } 
})

module.exports = mongoose.model('channelVideo', channelVideo);      // Exporting Collection