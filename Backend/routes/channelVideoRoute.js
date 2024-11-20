const express = require('express');         // Importing Express package
const { uploadChannelVideo, localUpload, localVideoUpload, getChannelVideo, getChannelVideoById, deleteChannelVideoById } = require('../controllers/channelVideoController');

// Importing all the created Functions and completion of API with HTTP Methods

const router = express.Router();            // With the common name using Router

router.post('/localUpload', localUpload);
router.post('/localVideoUpload', localVideoUpload);

router.post('/uploadVideo', uploadChannelVideo);

router.get('/getVideo', getChannelVideo);

router.get('/channelVideos/:userId', getChannelVideoById);

router.delete('/deleteVideo/:userId', deleteChannelVideoById);

module.exports = router;