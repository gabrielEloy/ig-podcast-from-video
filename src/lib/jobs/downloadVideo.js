const download = require('../../helpers/fileDownloader');
const extractAudio = require('../../helpers/audioExtracter');
const trimAudio = require('../../helpers/trimAudio');
const uploadToS3 = require('../../helpers/uploadFileToS3');


module.exports = {
    key: 'DownloadVideo',
    async handle({ data }) {
        const { url, startTime, duration } = data;

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

        await uploadToS3(audioPath);

        console.log('Done')
    }
}