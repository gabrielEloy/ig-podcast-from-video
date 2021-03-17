import main from "./main";
import { Router } from "express";

const router = Router();

router.use("/", main);

export default router;
