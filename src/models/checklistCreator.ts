import { Schema, model } from "mongoose";
import { IChecklistCreator } from "../types.ts";

const ChecklistCreatorSchema = new Schema<IChecklistCreator>({
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
}, { timestamps: true })

export default model<IChecklistCreator>("ChecklistCreator", ChecklistCreatorSchema);
