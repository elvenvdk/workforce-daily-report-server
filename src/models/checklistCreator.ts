import { Schema, model } from "mongoose";
import { IChecklistCreator } from "../types.ts";

const ChecklistCreatorSchema = new Schema<IChecklistCreator>({
  name: {
    type: String
  },
  questions: [
    {
      question: {
        type: String
      }
    }
  ]
}, { timestamps: true })

export default model<IChecklistCreator>("ChecklistCreator", ChecklistCreatorSchema);
