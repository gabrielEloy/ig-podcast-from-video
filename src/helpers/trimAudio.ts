import ffmpeg from 'fluent-ffmpeg';
import Path from 'path';
import getFileNameFromPath from './getFileNameFromPath';



async function trimAudio({ filePath, startTime = '00:00:00', duration }) {
    const { file: fileName } = getFileNameFromPath(filePath)
    const path = Path.resolve(__dirname, '..', '..', 'media', 'audio', `edited_${fileName}.mp3`)

    return new Promise((resolve, reject) => {
        if (duration) {
            ffmpeg(filePath)
                .output(path)
                .setStartTime(startTime)
                .duration(duration)
                .on('end', () => resolve(path))
                .on('error', () => reject())
                .run()
        } else {
            ffmpeg(filePath)
                .output(path)
                .setStartTime(startTime)
                .on('end', () => resolve(path))
                .on('error', () => reject())
                .run()
        }
    })
}

export default trimAudio;