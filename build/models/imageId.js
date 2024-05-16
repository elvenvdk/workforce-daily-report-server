import { Schema, model } from "mongoose";
const imageIdSchema = new Schema({
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
}, { timestamps: true });
export default model("ImageId", imageIdSchema);
