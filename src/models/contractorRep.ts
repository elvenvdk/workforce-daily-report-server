import { Schema, model } from "mongoose";
import { IContractRep } from "'../types'.ts";

const ContractRepSchema = new Schema<IContractRep>({
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
  jobId: {
    type: Schema.Types.ObjectId,
    ref: "Job",
  },
});

export default model<IContractRep>("ContractRep", ContractRepSchema);
