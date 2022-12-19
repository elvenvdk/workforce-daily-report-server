import { Schema, model } from "mongoose";
const ProjectMgrSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    signature: {
        type: String,
    },
    job: {
        type: Schema.Types.ObjectId,
        ref: "Job",
    },
});
export default model("ProjectMgr", ProjectMgrSchema);
