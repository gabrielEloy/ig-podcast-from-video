import download from '../helpers/fileDownloader'
import extractAudio from '../helpers/audioExtracter'
import trimAudio from '../helpers/trimAudio'
import uploadToS3 from '../helpers/uploadFileToS3'
import Queue from '../lib/Queue'

import { rename, deleteFile } from '../helpers/updateFile'
import { redisGet } from '../db/redis';

export async function videoDownload(req, res) {
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
        
        console.log('Starting s3 upload...')

        const s3Info = await uploadToS3(audioPath);
        res.send(s3Info)
    } catch (err) {
        res.send({ err })
    }
};

export async function getVideoInfo(req, res) {
    try {
        const { videoInfo } = req;

        res.send({videoInfo});
    } catch (err){
        res.status(500).send({err});
    }
}


export async function queuedVideoDownload (req, res) {
    const { url } = req.videoInfo;
    const { startTime, duration, email } = req.body;
    
    const fileName = new Date().getTime();
    
    Queue.add('DownloadVideo', {url, startTime, duration, email, fileName});

    res.send({redis_id: fileName});
}

export async function getProcessStatus(req, res){
    const { id } = req.params;

    const status = await redisGet(id, true);

    res.send({status});
}
