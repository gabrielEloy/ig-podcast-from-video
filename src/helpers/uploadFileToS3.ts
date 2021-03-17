import AWS from "aws-sdk";
import fs from "fs";
import path from "path";

async function uploadToS3(filePath) {
  AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  });
  const s3 = new AWS.S3();
  //TODO: remove any from here
  const uploadParams: any = { Bucket: "ig-podcasts", ACL: "public-read" };

  const fileStream = fs.createReadStream(filePath);

  fileStream.on("error", (err) => {
    console.log({ err });
  });

  uploadParams.Body = fileStream;
  uploadParams.Key = path.basename(filePath);

  const data = await s3.upload(uploadParams).promise();
  console.log("terminou");
  return data;
}

export default uploadToS3;
