const download = require('../helpers/fileDownloader');
const extractAudio = require('../helpers/audioExtracter');

async function videoDownload (req, res){
    const { url } = req.body;

    try{
        const videoPath = await download(url);
        console.log({videoPath})
        await extractAudio(videoPath)
        res.send({success: videoPath})
    } catch (err){
        res.send({err})
    }
}

module.exports = {
    videoDownload
}