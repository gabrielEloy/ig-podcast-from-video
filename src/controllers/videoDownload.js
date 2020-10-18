const download = require('../helpers/fileDownloader');
const extractAudio = require('../helpers/audioExtracter');
const trimAudio = require('../helpers/trimAudio');

const { rename, deleteFile } = require('../helpers/updateFile')

async function videoDownload(req, res) {
    const { url, startTime, duration } = req.body;

    try {
        const videoPath = await download(url);
        const audioPath = await extractAudio(videoPath);

        if (startTime || duration) {
            const editedAudioPath = await trimAudio({ filePath: audioPath, startTime, duration });
            await deleteFile(audioPath)
            await rename(editedAudioPath)
        }

        res.send({ success: videoPath })
    } catch (err) {
        res.send({ err })
    }
}

module.exports = {
    videoDownload
}