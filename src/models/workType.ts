import { Schema, model } from "mongoose";
import { IWorkType } from "../types.ts";

const WorkTypeSchema = new Schema<IWorkType>({
  typeContract: {
    type: String,
    required: true,
  },
  typeChangeOrder: {
    type: String,
    required: true,
  },
  typeTandM: {
    type: String,
    required: true,
  },
  typeExtraWork: {
    type: String,
    required: true,
  },
});

export default model<IWorkType>("WorkType", WorkTypeSchema);
