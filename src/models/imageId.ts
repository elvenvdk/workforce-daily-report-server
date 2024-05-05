import { Schema, model } from "mongoose";
import { IImageId } from "'../types'.ts";

const imageIdSchema = new Schema<IImageId>(
  {
    imageName: {
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
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Worker",
    },
  },
  { timestamps: true }
);

export default model<IImageId>("ImageId", imageIdSchema);
