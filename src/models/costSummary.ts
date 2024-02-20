import { Schema, model } from "mongoose";
import { IEmployeeRates } from "../types.ts";

const EmployeeRatesSchema = new Schema<IEmployeeRates>({}, { timestamps: true });

export default model<IEmployeeRates>("EmployeeRates", EmployeeRatesSchema);
