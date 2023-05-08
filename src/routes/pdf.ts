import express from 'express';
import { createPdf, savePdf } from '../controllers/pdf.ts';

const router = express.Router();

router.get('/checklist-pdf', savePdf);

router.post('/create-checklist-pdf', createPdf);

export default router;