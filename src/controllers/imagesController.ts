import AWS from "aws-sdk";
import { PutObjectCommand, GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
// const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
import { getSignedUrl, S3RequestPresigner } from "@aws-sdk/s3-request-presigner";
import { Sha256 } from "@aws-crypto/sha256-browser";
import { Hash } from "@smithy/hash-node";
import fs from "fs";
import mime from "mime-types";
import { TypedRequestBody, TypedResponse, RegisterUserType, EmailChecklistType, EmailChecklistLinkType, RegisterUserResponseType, IJobImages } from "../types.ts";
import jobImages from "../models/jobImages.ts";
import dotenv from "dotenv";

dotenv.config();

const accessKey = `${process.env.AWS_ACCESS_KEY_ID}`;
const secretAccessKey = `${process.env.AWS_SECRET_ACCESS_KEY}`;

const s3 = new AWS.S3();
const client = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: "us-east-1",
});

export const uploadJobImages = async (req: TypedRequestBody<any>, res: TypedResponse<any>) => {
  const { body, files } = req;
  Object.keys(body).map((k: any, idx: number) => {
    let file = body[k];
    const params: any = {
      Bucket: "bl-job-image-s3",
      Key: k,
      Body: file,
      ContentEncoding: "utf-8",
    };

    s3.upload(params, (err: any, data: any) => {
      if (err) {
        console.log("Error uploading file: ", err);
        process.exitCode = 1;
      } else {
        console.log(`File uploaded successfully. ${data}`);
      }
    });
  });
};

export const uploadJobImage = async (req: TypedRequestBody<any>, res: TypedResponse<any>) => {
  const data = { ...req.body };
  console.log("REQ BODY: ", req.body);

  let imgBuffer = Buffer.from(data.image, "base64");

  const newImgFile = new jobImages({
    job: data.job,
    shift: parseInt(data.shift),
    date: data.date,
    foreman: data.foreman,
    details: {
      date: data.date,
      txt: data.txt,
      imgName: `${data.job}/image`,
      imgBuffer: imgBuffer,
    },
  });

  await newImgFile.save();

  const img64 = Buffer.from(imgBuffer).toString("base64");

  const img64Arr = [...img64];

  img64Arr.splice(4, 0, ":");
  img64Arr.splice(15, 0, ";");
  img64Arr.splice(22, 0, ",");
  const imgStr = img64Arr.join("");

  newImgFile.details.imgString = imgStr;
  res.send(newImgFile);
};

export const listJobImages = async (req: TypedRequestBody<any>, res: TypedResponse<any>) => {
  const images = await jobImages.find();
  const images64 = [...images];
  images64.forEach((image: IJobImages, idx: number) => {
    const img64 = Buffer.from(image.details.imgBuffer).toString("base64");
    const img64Arr = [...img64];
    img64Arr.splice(4, 0, ":");
    img64Arr.splice(15, 0, ";");
    img64Arr.splice(22, 0, ",");
    const imgStr = img64Arr.join("");
    image.details.imgString = imgStr;
  });
  res.send(images64);
};

export const jobImagesList = async (req: TypedRequestBody<any>, res: TypedResponse<any>) => {
  const images = await jobImages.find();
  for (let image of images) {
    const getObjectParams = {
      Bucket: "bl-job-image-s3",
      Key: `${image.details.imgName}`,
    };
    const command = new GetObjectCommand(getObjectParams);
    const uri = await getSignedUrl(client, command, { expiresIn: 3600 });

    image.details.imgUri = uri;
  }
  res.send(images);
};

export const getJobImage = async (req: TypedRequestBody<any>, res: TypedResponse<any>) => {
  const command = new GetObjectCommand({
    Bucket: "bl-job-image-s3",
    Key: "img2",
  });

  try {
    const response = await client.send(command);
    // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
    if (response.Body) {
      const str = await response.Body.transformToString();
      res.send(str);
    }
  } catch (err) {
    console.error("GET IMAGE ERROR: ", err);
  }
};
