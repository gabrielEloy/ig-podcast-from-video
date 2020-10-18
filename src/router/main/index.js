const express = require('express');
const router = express.Router();
const { videoDownload } = require('../../controllers/videoDownload')

router.get('/download-video', (req, res) => {
    res.send({true: true})
})
router.post('/download-video', videoDownload);

module.exports = router;
