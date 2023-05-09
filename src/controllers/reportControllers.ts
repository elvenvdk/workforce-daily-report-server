import { TypedRequestBody, TypedResponse, RegisterUserType, EmailChecklistType, RegisterUserResponseType } from "../types.ts";
import { sendEmailWithAttachment } from "../aws/emailService.ts";
import SigninSignout from "../models/signinSignout.ts";
import Checklist from "../models/checklist.ts";
import fs from 'fs/promises';

export const getReportCount = async (req: TypedRequestBody<RegisterUserType>, res: TypedResponse<RegisterUserResponseType>) => {
  try {
    const count = await SigninSignout.estimatedDocumentCount();
    res.send({ reportCount: count });
  }
  catch (error) {
    res.send(error);
  }
}


export const getChecklistCount = async (req: TypedRequestBody<RegisterUserType>, res: TypedResponse<RegisterUserResponseType>) => {
  try {
    const count = await Checklist.estimatedDocumentCount();
    res.send({ checklistCount: count });
  }
  catch (error) {
    res.send(error);
  }
}


export const emailChecklistReport = async (req: TypedRequestBody<EmailChecklistType>, res: TypedResponse<RegisterUserResponseType>) => {
  try {
    const { attachment, recipient } = req.body;
    const emailRes = await sendEmailWithAttachment(attachment, recipient);
    console.log('EMAIL RES: ', emailRes);
    res.send(emailRes);
  }
  catch (error) {
    if (error) {
      console.log('CHECKLIST REPORT EMAIL ERROR: ', error);

    }
  }
}
