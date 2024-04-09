import { Schema, model } from "mongoose";
const JobImagesSchema = new Schema({
    job: {
        type: String,
    },
    shift: {
        type: Number,
    },
    date: {
        type: Date,
    },
    foreman: {
        type: String,
    },
    details: {
        date: {
            type: Date,
        },
        imgName: {
            type: String,
        },
        imgUri: {
            type: String,
        },
        imgBuffer: {
            type: Buffer,
        },
        imgString: {
            type: String,
        },
        txt: {
            type: String,
        },
    },
}, { timestamps: true });
export default model("JobImages", JobImagesSchema);
