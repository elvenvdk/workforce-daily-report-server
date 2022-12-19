import { Schema, model } from "mongoose";
import { IJob } from "../types.ts";

const JobSchema = new Schema<IJob>({
  jobName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  contractNo: {
    type: String,
  },
  agencyId: {
    type: Schema.Types.ObjectId,
    ref: "Agency",
  },
  laborTicketAbv: {
    type: String,
  },
  contractorRepId: {
    type: Schema.Types.ObjectId,
    ref: "ContractorRep",
  },
  projectMgrId: {
    type: Schema.Types.ObjectId,
    ref: "ProjectManager",
  },
  worksiteId: {
    type: Schema.Types.ObjectId,
    ref: 'WorksiteEmployees'
  },
  startDate: {
    type: Date
  },
  taskCompletion: {
    type: Date
  }
});

export default model<IJob>("Job", JobSchema);
