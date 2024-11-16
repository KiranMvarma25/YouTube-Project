const signupSchema = require('../model/signupSchema')
const cloudinary = require('cloudinary').v2;
const channelVideoSchema = require('../model/channelVideoSchema');  


async function uploadToCloudinary(file, folder) {
    const options = {
        folder: folder,
        resource_type: 'auto', 
    };

    try{
        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        return result;
    } 
    catch(error){
        throw new Error('Error uploading to Cloudinary');
    }
}


exports.localUpload = async (req, resp) => {
    try {
        const file = req.files.image;
        console.log("File", file);

        const path = __dirname + "/files/" + Date.now() + "SBIN." + file.name.split('.').pop();
        file.mv(path, (err) => {
            if (err){
                return resp.status(500).json({ success: false, msg: "File upload failed", err });
            }
        });

        resp.status(200).json({
            success: true,
            msg: "Uploaded Successfully",
        });
    } 
    catch(error){
        resp.status(500).json({
            success: false,
            msg: "Internal Server Error",
            error: error.message,
        });
    }
};


exports.localVideoUpload = async (req, resp) => {
    try{
        const file = req.files.video;
        console.log("File", file);

        const path = __dirname + "/files/" + Date.now() + "SBIN." + file.name.split('.').pop();
        file.mv(path, (err) => {
            if(err){
                return resp.status(500).json({ success: false, msg: "File upload failed", err });
            }
        });

        resp.status(200).json({
            success: true,
            msg: "Uploaded Successfully",
        });
    } 
    catch(error){
        resp.status(500).json({
            success: false,
            msg: "Internal Server Error",
            error: error.message,
        });
    }
};


exports.uploadChannelVideo = async (req, resp) => {
    try {
        const { channelVideoName, channelVideoDescription, channelVideoUploader } = req.body;

        const user = await signupSchema.findById(channelVideoUploader);
        console.log("USER", user);

        if(!channelVideoName || !channelVideoDescription){
            return resp.status(400).json({
                success: false,
                msg: "Please Fill all the Details",
            });
        }

        const channelThumbnail = req.files?.image;
        if(!channelThumbnail){
            return resp.status(400).json({
                success: false,
                msg: "Please upload an image",
            });
        }

        const imageSupportedFiles = ['jpg', 'jpeg', 'png'];
        const imageFileExtension = channelThumbnail.name.split('.').pop().toLowerCase();

        if(!imageSupportedFiles.includes(imageFileExtension)){
            return resp.status(400).json({
                success: false,
                msg: "Invalid image format. Only jpg, jpeg, png allowed.",
            });
        }

        console.log("Image upload started");

        const thumbnailResponse = await uploadToCloudinary(channelThumbnail, 'channel_Images');

        const channelVideo = req.files?.video;
        if (!channelVideo) {
            return resp.status(400).json({
                success: false,
                msg: "Please upload a video",
            });
        }

        const videoSupportedFiles = ['mp4', 'mov', 'avi', 'mkv'];
        const videoFileExtension = channelVideo.name.split('.').pop().toLowerCase();

        if(!videoSupportedFiles.includes(videoFileExtension)){
            return resp.status(400).json({
                success: false,
                msg: "Invalid video format. Only mp4, mov, avi, mkv allowed.",
            });
        }

        console.log("Video upload started");

        const videoResponse = await uploadToCloudinary(channelVideo, 'channel_Videos');

        const videoData = await channelVideoSchema.create({
            channelVideoName,
            channelVideoDescription,
            channelVideoThumbnail: thumbnailResponse.secure_url,
            channelVideourl: videoResponse.secure_url,
            channelVideoUploader,
        });

        resp.status(200).json({
            success: true,
            msg: "Video uploaded successfully",
            Channel: videoData,
        });
    } 
    catch(error){
        console.log(error);
        resp.status(500).json({
            success: false,
            msg: "Internal Server Error",
            error: error.message,
        });
    }
};

exports.getChannelVideo = async(req,resp) => {
    try{
        const getVideo = await channelVideoSchema.find();
        resp.status(200).json({
            success : true,
            msg : "Fetched Videos Successfully",
            Data : getVideo,
        })
    }
    catch(error){
        resp.status(500).json({
            success : false,
            msg : "Internal Server Error",
        })
    }
}

exports.getChannelVideoById = async (req, resp) => {
    try {
        const { userId } = req.params;

        if(!userId){
            return resp.status(400).json({
                success: false,
                msg: "User ID is required",
            });
        }

        const userVideos = await channelVideoSchema.find({ channelVideoUploader: userId });

        if(userVideos.length === 0){
            return resp.status(404).json({
                success: false,
                msg: "No videos found for the specified user",
            });
        }

        resp.status(200).json({
            success: true,
            msg: "Fetched videos successfully",
            data: userVideos,
        });
    } 
    catch(error){
        console.error("Error fetching videos:", error);
        resp.status(500).json({
            success: false,
            msg: "Internal Server Error",
            error: error.message,
        });
    }
};


exports.deleteChannelVideoById = async (req, resp) => {
    try {
        const { videoId } = req.body;

        if(!videoId){
            return resp.status(400).json({
                success: false,
                msg: "Video ID is required",
            });
        }

        const deleteResult = await channelVideoSchema.findByIdAndDelete(videoId);

        if(!deleteResult){
            return resp.status(404).json({
                success: false,
                msg: "Video not found",
            });
        }

        resp.status(200).json({
            success: true,
            msg: "Video deleted successfully",
        });
    } 
    catch(error){
        console.error("Error deleting video:", error);
        resp.status(500).json({
            success: false,
            msg: "Internal Server Error",
            error: error.message,
        });
    }
};