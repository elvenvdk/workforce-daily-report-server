import AWS from "aws-sdk";
import fs from "fs";
import { TypedRequestBody, TypedResponse, RegisterUserType, EmailChecklistType, EmailChecklistLinkType, RegisterUserResponseType } from "../types.ts";

const s3 = new AWS.S3();

export const uploadJobImage = async (req: TypedRequestBody<any>, res: TypedResponse<any>) => {
  // req.files is array of `photos` files
  // req.body will contain the text fields

  console.log("REQUEST BODY: ", req.body);
  // const params: any = {
  //   Bucket: req.body.bucketName,
  //   key: req.body.jobname || "NoName",
  //   body: req.files,
  // };

  // s3.upload(params, (err: any, data: any) => {
  //   if (err) {
  //     console.log("Error uploading file: ", err);
  //   } else {
  //     console.log(`File uploaded successfully. ${data.location}`);
  //   }
  // });
};
