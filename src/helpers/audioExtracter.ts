import Path from 'path';
import extractAudio from 'ffmpeg-extract-audio';
import getFileNameFromPath from './getFileNameFromPath';

async function getAudio(sourcePath) {
    const splittedSource = sourcePath;
    const { file: fileName } = getFileNameFromPath(splittedSource)

    const path = Path.resolve(__dirname, '..', '..', 'media', 'audio', `${fileName}.mp3`)

    await extractAudio({
        input: sourcePath,
        output: path,
        format: 'mp3'
    });

    return path;
}

export default  getAudio;

