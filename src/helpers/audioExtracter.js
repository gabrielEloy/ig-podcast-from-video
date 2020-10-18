const Path = require('path')
const extractAudio = require('ffmpeg-extract-audio')

//omg

async function getAudio(sourcePath) {
    const path = Path.resolve(__dirname, '..', '..', 'media', 'audio', `${new Date().getTime()}.mp3`)
    
    await extractAudio({
        input: sourcePath,
        output: path,
        format: 'mp3'
    });
}

module.exports = getAudio;

