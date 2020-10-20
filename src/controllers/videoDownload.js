const download = require('../helpers/fileDownloader');
const extractAudio = require('../helpers/audioExtracter');
const trimAudio = require('../helpers/trimAudio');
const  uploadToS3 = require('../helpers/uploadFileToS3');

const { rename, deleteFile } = require('../helpers/updateFile')

async function videoDownload(req, res) {
    const { startTime, duration } = req.body;
    const { url } = req.videoInfo

    try {
        const videoPath = await download(url);
        const audioPath = await extractAudio(videoPath);

        if (startTime || duration) {
            const editedAudioPath = await trimAudio({ filePath: audioPath, startTime, duration });
            await deleteFile(audioPath)
            await rename(editedAudioPath)
        }
        
        const teste = await uploadToS3(audioPath);
        res.send({teste})
    } catch (err) {
        res.send({ err })
    }
}

module.exports = {
    videoDownload
}