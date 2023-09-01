import { sendEmailWithAttachment } from "../aws/emailService.ts";
import SigninSignout from "../models/signinSignout.ts";
import Checklist from "../models/checklist.ts";
export const getReportCount = async (req, res) => {
    try {
        const count = await SigninSignout.estimatedDocumentCount();
        res.send({ reportCount: count });
    }
    catch (error) {
        res.send(error);
    }
};
export const getChecklistCount = async (req, res) => {
    try {
        const count = await Checklist.estimatedDocumentCount();
        res.send({ checklistCount: count });
    }
    catch (error) {
        res.send(error);
    }
};
export const emailChecklistReport = async (req, res) => {
    try {
        const { attachment, emailBody, recipient } = req.body;
        console.log('EMAIL BODY: ', emailBody, 'RECIPIENT: ', recipient);
        const emailRes = await sendEmailWithAttachment(await attachment, emailBody, recipient);
        console.log('EMAIL RES: ', emailRes);
        res.send(emailRes);
    }
    catch (error) {
        if (error) {
            console.log('CHECKLIST REPORT EMAIL ERROR: ', error);
        }
    }
};
export const emailChecklistReportLink = async (req, res) => {
    try {
        const { attachment, emailBody, link, recipient } = req.body;
        console.log('EMAIL BODY: ', emailBody, 'RECIPIENT: ', recipient, 'LINK: ', link);
        const emailRes = await sendEmailWithAttachment(await attachment, emailBody, recipient, link);
        console.log('EMAIL RES: ', emailRes);
        res.send(emailRes);
    }
    catch (error) {
        if (error) {
            console.log('CHECKLIST REPORT EMAIL ERROR: ', error);
        }
    }
};
