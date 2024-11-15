const express = require('express');
const { uploadChannelVideo, localUpload, localVideoUpload, getChannelVideo } = require('../controllers/channelVideoController');

const router = express.Router();

router.post('/localUpload', localUpload);
router.post('/localVideoUpload', localVideoUpload);

router.post('/uploadVideo', uploadChannelVideo);

router.get('/getVideo', getChannelVideo);

module.exports = router;