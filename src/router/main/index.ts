const express = require('express');
const router = express.Router();
const { videoDownload, getVideoInfo, queuedVideoDownload } = require('../../controllers/videoDownload')
const getVideoFromInstagramLink = require('../../middlewares/getVideoFromInstagramLink')


router.post('/video-info', getVideoFromInstagramLink, getVideoInfo);
router.post('/download-video', getVideoFromInstagramLink, videoDownload);
router.post('/queue-download-video', getVideoFromInstagramLink, queuedVideoDownload)

export default router;
