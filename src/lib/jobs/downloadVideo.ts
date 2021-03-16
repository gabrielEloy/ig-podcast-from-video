
const download = require('src/helpers/fileDownloader');
const extractAudio = require('src/helpers/audioExtracter');
const trimAudio = require('src/helpers/trimAudio');
const uploadToS3 = require('src/helpers/uploadFileToS3');
const handleSendMail = require('src/helpers/sendMail');
const { rename, deleteFile } = require('../helpers/updateFile')

export default {
    key: 'DownloadVideo',
    async handle({ data }) {
        const { url, startTime, duration, email } = data;

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

        const s3Link = await uploadToS3(audioPath);


        console.log('sending email...')
        
        await handleSendMail(email, 'teste', JSON.stringify(s3Link))
        console.log('Done')
    }
}