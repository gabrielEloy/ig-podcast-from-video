const download = require('../helpers/fileDownloader');
const extractAudio = require('../helpers/audioExtracter');
const trimAudio = require('../helpers/trimAudio');
const uploadToS3 = require('../helpers/uploadFileToS3');
const Queue = require('../lib/Queue');

const { rename, deleteFile } = require('../helpers/updateFile')

async function videoDownload(req, res) {
    const { startTime, duration } = req.body;
    const { url } = req.videoInfo

    try {
        console.log('starting download...')
        const videoPath = await download(url);
        console.log('starting audio extraction...')
        const audioPath = await extractAudio(videoPath);

        if (startTime || duration) {
            const editedAudioPath = await trimAudio({ filePath: audioPath, startTime, duration });
            await deleteFile(audioPath)
            await rename(editedAudioPath)
        }
        
        console.log('Starting s3 upload...')

        const s3Info = await uploadToS3(audioPath);
        res.send(s3Info)
    } catch (err) {
        res.send({ err })
    }
};

async function getVideoInfo(req, res) {
    const { videoInfo } = req;

    res.send({videoInfo});
}


async function queuedVideoDownload (req, res) {
    const { url } = req.videoInfo;
    const { startTime, duration } = req.body;
    
    Queue.add('DownloadVideo', {url, startTime, duration})

    res.send({ta_na_fila: 'tá na fila'})
}

module.exports = {
    videoDownload,
    getVideoInfo,
    queuedVideoDownload
}