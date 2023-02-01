import { getReportCount, getChecklistCount } from "../controllers/reportControllers.ts";
import express from "express";

const router = express.Router();

router.get('/reportcount', getReportCount);

router.get('/checklistcount', getChecklistCount);

export default router;

