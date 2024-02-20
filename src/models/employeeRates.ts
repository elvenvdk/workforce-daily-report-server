import { Schema, model } from "mongoose";
import { IEmployeeRates } from "../types.ts";

const EmployeeRatesSchema = new Schema<IEmployeeRates>(
  {
    employee: {
      type: String,
    },
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "Worker",
    },
    stPay: {
      type: Number,
    },
    dtPay: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default model<IEmployeeRates>("EmployeeRates", EmployeeRatesSchema);
