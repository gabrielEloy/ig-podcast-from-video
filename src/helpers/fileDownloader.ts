import Fs from 'fs';
import Path from 'path';
import Axios from 'axios';

async function download(url, fileName = new Date().getTime()) {
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

export default  download;