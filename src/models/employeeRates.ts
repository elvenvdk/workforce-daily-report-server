import { Schema, model } from "mongoose";
import { IEmployeeRates } from "../types.js";

const EmployeeRatesSchema = new Schema<IEmployeeRates>({
  jobName: {
    type: String
  },
  jobId: {
    type: Schema.Types.ObjectId
  },
  date: {
    type: Date
  },
  employeeRates: [
    {
      employee: {
        type: String
      },
      employeeId: {
        type: Schema.Types.ObjectId
      },
      stPay: {
        type: Number
      },
      dtPay: {
        type: Number
      }
    }
  ]
}, { timestamps: true });

export default model<IEmployeeRates>("EmployeeRates", EmployeeRatesSchema);
