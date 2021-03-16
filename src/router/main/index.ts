import express from "express";

const router = express.Router();
import {
  videoDownload,
  getVideoInfo,
  queuedVideoDownload,
  getProcessStatus,
} from "../../controllers/videoDownload";

import getVideoFromInstagramLink from "../../middlewares/getVideoFromInstagramLink";

router.post("/video-info", getVideoFromInstagramLink, getVideoInfo);
router.post("/download-video", getVideoFromInstagramLink, videoDownload);
router.post("/queue-download-video",getVideoFromInstagramLink,queuedVideoDownload);

router.get("/status/:id", getProcessStatus);
export default router;
