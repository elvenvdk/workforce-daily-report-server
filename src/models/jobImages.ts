import { Schema, model } from "mongoose";
import { IJobImages } from "../types.ts";
import { timeStamp } from "console";

const JobImagesSchema = new Schema<IJobImages>(
  {
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
  },
  { timestamps: true }
);

export default model<IJobImages>("JobImages", JobImagesSchema);
