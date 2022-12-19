import { Schema, model } from "mongoose";
const WorkTypeSchema = new Schema({
    typeContract: {
        type: String,
        required: true,
    },
    typeChangeOrder: {
        type: String,
        required: true,
    },
    typeTandM: {
        type: String,
        required: true,
    },
    typeExtraWork: {
        type: String,
        required: true,
    },
});
export default model("WorkType", WorkTypeSchema);
