const express = require('express');
const router = express.Router();
const { videoDownload } = require('../../controllers/videoDownload')
const getVideoFromInstagramLink = require('../../middlewares/getVideoFromInstagramLink')

router.get('/download-video', (req, res) => {
    console.log(process.env.QUERY_HASH)
    
    res.send({true: true})
})
router.post('/download-video', getVideoFromInstagramLink, videoDownload);

module.exports = router;
