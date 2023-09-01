import { Schema, model } from "mongoose";
import { ICostCodes } from "../types.ts";

const CostCodeSchema = new Schema<ICostCodes>({
  laborCode: {
    type: Number
  },
  costCode: {
    type: Number
  },
  description: {
    type: String
  },
}, { timestamps: true });

export default model<ICostCodes>("CostCodes", CostCodeSchema);
