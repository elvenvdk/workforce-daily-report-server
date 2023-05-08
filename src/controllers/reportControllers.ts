import { TypedRequestBody, TypedResponse, RegisterUserType, EmailChecklistType, RegisterUserResponseType } from "../types.ts";
import { sendEmailWithAttachment } from "../aws/emailService";
import SigninSignout from "../models/signinSignout.ts";
import Checklist from "../models/checklist.ts";

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


const emailChecklistReport = async (req: TypedRequestBody<EmailChecklistType>, res: TypedResponse<RegisterUserResponseType>) => {
  try {
    const { email, attachment, recipient } = req.body;
  }
  catch (error) {
    if (error) {
      console.log('CHECKLIST REPORT EMAIL ERROR: ', error);
    }
  }
}
