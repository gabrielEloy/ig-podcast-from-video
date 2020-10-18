const Path = require('path')
const extractAudio = require('ffmpeg-extract-audio')

const getAudio = async () => {
    const t = await extractAudio({
        input: '/home/gabrieleloy/Documentos/ig-download/media/video/1603035432723.mp4',
        output: '/home/gabrieleloy/Documentos/ig-download/media/audio/1603035432723.mp3',
        format: 'mp3'
    })

    console.log({t})
}

(async () => {getAudio()})();