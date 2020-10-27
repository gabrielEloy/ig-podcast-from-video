const Fs = require('fs')
const Path = require('path')
const Axios = require('axios')

async function download(url, fileName) {
    const path = Path.resolve(__dirname, '..','..',  'media', 'video', `${fileName}.mp4`)

    const response = await Axios({
        method: 'GET',
        url: url,
        responseType: 'stream'
    })

    response.data.pipe(Fs.createWriteStream(path))

    return new Promise((resolve, reject) => {
        response.data.on('end', () => {
            resolve(path)
        })

        response.data.on('error', err => {
            reject(err)
        })
    })
}

module.exports = download;