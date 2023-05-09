import express from 'express';
import { createPdf, savePdf } from '../controllers/pdf.ts';
import { emailChecklistReport } from '../controllers/reportControllers.ts'

const router = express.Router();

router.get('/checklist-pdf', savePdf);

router.post('/create-checklist-pdf', createPdf);

router.post('/send-checklist-email', emailChecklistReport);

export default router;