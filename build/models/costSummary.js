import { Schema, model } from "mongoose";
const EmployeeRatesSchema = new Schema({}, { timestamps: true });
export default model("EmployeeRates", EmployeeRatesSchema);
