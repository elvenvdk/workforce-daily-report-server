import { Schema, model } from "mongoose";
const CostCodeSchema = new Schema({
    laborCode: {
        type: String
    },
    costCode: {
        type: String
    },
    description: {
        type: String
    },
}, { timestamps: true });
export default model("CostCodes", CostCodeSchema);
