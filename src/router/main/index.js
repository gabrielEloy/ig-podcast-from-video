const express = require('express');
const router = express.Router();
const { videoDownload, getVideoInfo } = require('../../controllers/videoDownload')
const getVideoFromInstagramLink = require('../../middlewares/getVideoFromInstagramLink')

router.post('/video-info', getVideoFromInstagramLink, getVideoInfo);
router.post('/download-video', getVideoFromInstagramLink, videoDownload);

module.exports = router;
