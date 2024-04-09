import { Schema, model } from "mongoose";
const EmployeeRatesSchema = new Schema({
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
}, { timestamps: true });
export default model("EmployeeRates", EmployeeRatesSchema);
