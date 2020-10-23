const download = require('../../helpers/fileDownloader');
const extractAudio = require('../../helpers/audioExtracter');
const trimAudio = require('../../helpers/trimAudio');
const uploadToS3 = require('../../helpers/uploadFileToS3');
const handleSendMail = require('../../helpers/sendMail');


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

        const s3Link = await uploadToS3(audioPath);


        console.log('sending email...')
        
        await handleSendMail('test_mail@icloud.com', 'teste', JSON.stringify(s3Link))
        console.log('Done')
    }
}