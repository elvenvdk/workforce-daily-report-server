import { Schema, model } from "mongoose";
const EmployeeRatesSchema = new Schema({
    jobName: {
        type: String,
    },
    jobId: {
        type: Schema.Types.ObjectId,
        ref: "Job",
    },
    date: {
        type: Date,
    },
    employeeRates: [
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
    ],
}, { timestamps: true });
export default model("EmployeeRates", EmployeeRatesSchema);
