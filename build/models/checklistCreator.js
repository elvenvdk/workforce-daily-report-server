import { Schema, model } from "mongoose";
const ChecklistCreatorSchema = new Schema({
    type: {
        type: String
    },
    fieldTasks: [
        {
            id: {
                type: Number
            },
            question: {
                type: String
            },
            answer: {
                type: String
            }
        }
    ]
}, { timestamps: true });
export default model("ChecklistCreator", ChecklistCreatorSchema);
