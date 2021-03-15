const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

async function uploadToS3(filePath){    
    AWS.config.update({
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    });
    const s3 = new AWS.S3();
    const uploadParams = {Bucket: 'ig-podcasts', ACL:'public-read'};

    const fileStream = fs.createReadStream(filePath);
    
    fileStream.on('error', err => {
        console.log({err})
    });

    uploadParams.Body = fileStream;
    uploadParams.Key = path.basename(filePath)

    return new Promise((resolve, reject) => {
        s3.upload(uploadParams, (err, data) => {
            if(err) console.log({err})

            resolve(data)
        })
    })
}

module.exports = uploadToS3;