const express = require('express');
const { uploadChannelVideo, localUpload, localVideoUpload, getChannelVideo, getChannelVideoById, deleteChannelVideoById } = require('../controllers/channelVideoController');

const router = express.Router();

router.post('/localUpload', localUpload);
router.post('/localVideoUpload', localVideoUpload);

router.post('/uploadVideo', uploadChannelVideo);

router.get('/getVideo', getChannelVideo);

router.get('/channelVideos/:userId', getChannelVideoById);

router.delete('/deleteVideo/:userId', deleteChannelVideoById);

module.exports = router;