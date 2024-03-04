import { Schema, model } from "mongoose";
import { IProjectMgr } from "../types.ts";

const ProjectMgrSchema = new Schema<IProjectMgr>({
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

export default model<IProjectMgr>("ProjectMgr", ProjectMgrSchema);
