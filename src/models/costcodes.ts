import { Schema, model } from "mongoose";
import { ICostCodes } from "../types.js";

const CostCodeSchema = new Schema<ICostCodes>(
  {
    budget: {
      type: Number,
    },
    laborCode: {
      type: String,
    },
    costCode: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model<ICostCodes>("CostCodes", CostCodeSchema);
