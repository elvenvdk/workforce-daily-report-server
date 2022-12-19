import { Schema, model } from "mongoose";
import { IChecklist } from "../types.ts";

const ChecklistSchema = new Schema<IChecklist>({
  type: {
    type: String
  },
  agency: {
    id: {
      type: String
    },
    agencyName: {
      type: String
    }
  },
  location: {
    type: String
  },
  fieldTasks: {
    type: Map,
    of: {
      id: String,
      question: String,
      answer: String
    }
  },
  contractNo: {
    type: String
  },
  description: {
    type: String
  },
  contractor: {
    type: String
  },
  sub_contractor: {
    type: String
  },
  locationOfWork: {
    type: String
  },
  date: {
    type: Date
  },
  preparedBy: {
    type: String
  },
  datePrepared: {
    type: String
  },
  inspectorName: {
    type: String
  },
  surveillanceReport: {
    type: String
  },
  drawing: {
    type: String
  },
  additionalRemarks: {
    type: Map,
    of: {
      text: { type: String },
      name1: { type: String },
      signature1: { type: String },
      title1: { type: String },
      date1: { type: String },
      name2: { type: String },
      signature2: { type: String },
      title2: { type: String },
      date2: { type: String },
      name3: { type: String },
      signature3: { type: String },
      title3: { type: String },
      date3: { type: String },
    }
  }
})

export default model<IChecklist>("Checklist", ChecklistSchema);
