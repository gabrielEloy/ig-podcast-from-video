import download from '../../helpers/fileDownloader'
import extractAudio from '../../helpers/audioExtracter';
import trimAudio from '../../helpers/trimAudio'
import uploadToS3 from '../../helpers/uploadFileToS3'
import { deleteFile, rename } from '../../helpers/updateFile'

import alertStatus from './sendSocketRequisition';
import {redisSet} from '../../db/redis';

export default {
  key: "DownloadVideo",
  async handle({ data }) {
    const { url, startTime, duration, email, fileName } = data;

    console.log("DOWNLOADING");
    await redisSet(fileName, { url, s3Link: "", status: "DOWNLOADING" });
    await alertStatus(fileName, { status: "DOWNLOADING" });

    const videoPath = await download(url, fileName);

    console.log("EXTRACTING_AUDIO");
    await redisSet(fileName, { status: "EXTRACTING_AUDIO" });
    await alertStatus(fileName, { status: "EXTRACTING_AUDIO" });

    const audioPath = await extractAudio(videoPath);

    if (startTime || duration) {
      const editedAudioPath = await trimAudio({
        filePath: audioPath,
        startTime,
        duration,
      });
      await deleteFile(audioPath);
      await rename(editedAudioPath);
    }

    console.log("UPLOADING_TO_S3");
    await redisSet(fileName, { status: "UPLOADING_TO_S3" });
    await alertStatus(fileName, { status: "UPLOADING_TO_S3" });

    const s3Link = await uploadToS3(audioPath);

    console.log("DONE");
    await redisSet(fileName, { status: "DONE", s3Link: s3Link.Location });
    await alertStatus(fileName, { status: "DONE", s3Link: s3Link.Location });
  },
};
