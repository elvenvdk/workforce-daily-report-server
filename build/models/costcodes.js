import { Schema, model } from "mongoose";
const CostCodeSchema = new Schema({
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
export default model("CostCodes", CostCodeSchema);
