import AWS from "aws-sdk";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
// const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import jobImages from "../models/jobImages.ts";
import dotenv from "dotenv";
import ImageId from "../models/imageId.ts";
import Worker from "../models/worker.ts";
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
export const uploadJobImages = async (req, res) => {
    const { body, files } = req;
    Object.keys(body).map((k, idx) => {
        let file = body[k];
        const params = {
            Bucket: "bl-job-image-s3",
            Key: k,
            Body: file,
            ContentEncoding: "utf-8",
        };
        s3.upload(params, (err, data) => {
            if (err) {
                console.log("Error uploading file: ", err);
                process.exitCode = 1;
            }
            else {
                console.log(`File uploaded successfully. ${data}`);
            }
        });
    });
};
export const uploadJobImage = async (req, res) => {
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
export const uploadImageId = async (req, res) => {
    const data = { ...req.body };
    // console.log("REQ BODY: ", { img: data.img, name: data.name, id: data.employeeId });
    const employee = await Worker.findById(data.employeeId);
    let imgBuffer = Buffer.from(data.img, "base64");
    const newImgFile = new ImageId({
        imgName: `${data.name}/image`,
        imgBuffer: imgBuffer,
        employee: data.employeeId,
    });
    const employeeImgId = await newImgFile.save();
    employee.imageId = employeeImgId.id;
    const img64 = Buffer.from(imgBuffer).toString("base64");
    const img64Arr = [...img64];
    img64Arr.splice(4, 0, ":");
    img64Arr.splice(15, 0, ";");
    img64Arr.splice(22, 0, ",");
    const imgStr = img64Arr.join("");
    newImgFile.imgString = imgStr;
    res.send(newImgFile);
};
export const getImageId = async (req, res) => {
    const { id } = req.params;
    console.log("EMPLOYEE ID: ", id);
    try {
        const [employeeImg] = await ImageId.find({
            employee: id,
        });
        if (!employeeImg) {
            res.status(404).send({ message: "Image not found" });
        }
        const img64 = Buffer.from(employeeImg.imgBuffer).toString("base64");
        const img64Arr = [...img64];
        img64Arr.splice(4, 0, ":");
        img64Arr.splice(15, 0, ";");
        img64Arr.splice(22, 0, ",");
        const imgStr = img64Arr.join("");
        employeeImg.imgString = imgStr;
        res.send(imgStr);
    }
    catch (err) {
        console.error("GET IMAGE ERROR: ", err);
    }
};
export const listJobImages = async (req, res) => {
    const images = await jobImages.find();
    const images64 = [...images];
    images64.forEach((image, idx) => {
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
export const jobImagesList = async (req, res) => {
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
export const getJobImage = async (req, res) => {
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
    }
    catch (err) {
        console.error("GET IMAGE ERROR: ", err);
    }
};
