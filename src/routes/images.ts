import express from "express";
import multer from "multer";
import { getJobImage, jobImagesList, listJobImages, uploadJobImage, uploadJobImages } from "../controllers/imagesController.ts";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.post("/upload", upload.array("body", 12), uploadJobImages);

router.post("/upload-one", upload.single("image"), uploadJobImage);

router.get("/list", listJobImages);

router.get("/job-image-list", jobImagesList);

router.get("/image", getJobImage);

export default router;
