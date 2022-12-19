import { Schema, model } from "mongoose";
const WorksiteEmployeesSchema = new Schema({
    employees: {
        type: [Schema.Types.ObjectId],
        ref: "Worker",
        required: true,
    },
    foremanId: {
        type: Schema.Types.ObjectId,
        ref: "Worker",
    },
    jobId: {
        type: Schema.Types.ObjectId,
        ref: "Job",
        required: true,
    },
});
export default model("WorksiteEmployees", WorksiteEmployeesSchema);
