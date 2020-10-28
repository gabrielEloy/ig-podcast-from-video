const download = require('../../helpers/fileDownloader');
const extractAudio = require('../../helpers/audioExtracter');
const trimAudio = require('../../helpers/trimAudio');
const uploadToS3 = require('../../helpers/uploadFileToS3');
const handleSendMail = require('../../helpers/sendMail');

const alertStatus = require('./sendSocketRequisition');
const { redisSet } = require('../../db/redis');


module.exports = {
    key: 'DownloadVideo',
    async handle({ data }) {
        const { url, startTime, duration, email, fileName } = data;

        await redisSet(fileName, { url, s3Link: '', status: 'DOWNLOADING' })
        await alertStatus(fileName, { status: 'DOWNLOADING' });

        const videoPath = await download(url, fileName);

        await redisSet(fileName, { status: 'EXTRACTING_AUDIO' });
        await alertStatus(fileName, { status: 'EXTRACTING_AUDIO' });

        const audioPath = await extractAudio(videoPath);

        if (startTime || duration) {
            const editedAudioPath = await trimAudio({ filePath: audioPath, startTime, duration });
            await deleteFile(audioPath)
            await rename(editedAudioPath)
        }

        await redisSet(fileName, { status: 'UPLOADING_TO_S3' });
        await alertStatus(fileName, { status: 'UPLOADING_TO_S3' });

        const s3Link = await uploadToS3(audioPath);

        await redisSet(fileName, { status: 'DONE', s3Link: s3Link.Location })
        await alertStatus(fileName, { status: 'DONE', s3Link: s3Link.Location });
    }
}