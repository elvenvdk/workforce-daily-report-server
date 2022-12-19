import { Schema, model } from "mongoose";
import { IWorksiteEmployees } from "../types.ts";



const WorksiteEmployeesSchema = new Schema<IWorksiteEmployees>({
  employees: {
    type: [Schema.Types.ObjectId],
    ref: "Worker",
    required: true,
  },
  foremanId: {
    type: Schema.Types.ObjectId,
    ref: "Worker",
  },
  jobId: {
    type: Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
});

export default model<IWorksiteEmployees>(
  "WorksiteEmployees",
  WorksiteEmployeesSchema
);
