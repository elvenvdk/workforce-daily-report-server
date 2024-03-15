import express from "express";
import multer from "multer";
import { uploadJobImage } from "../controllers/imagesController.ts";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/upload", upload.array("jobname", 12), uploadJobImage);

export default router;
