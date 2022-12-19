import { Schema, model } from "mongoose";
import { IAgency } from "../types.ts";

const AgencySchema = new Schema<IAgency>({
  agencyName: {
    type: String,
    required: true,
  },
});

export default model<IAgency>("Agency", AgencySchema);
