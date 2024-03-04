import { Schema, model } from "mongoose";
import { IChecklist } from "../types.ts";

const ChecklistSchema = new Schema<IChecklist>(
  {
    type: {
      type: String,
    },
    checklistType: {
      type: String,
    },
    agency: {
      id: {
        type: String,
      },
      agencyName: {
        type: String,
      },
    },
    date: {
      type: String,
    },
    datePrepared: {
      type: String,
    },
    location: {
      type: String,
    },
    reportNo: {
      type: String,
    },
    // fieldTasks: {
    //   type: Map,
    //   of: {
    //     id: String,
    //     question: String,
    //     answer: String
    //   }
    // },
    fieldTasks: [
      {
        id: String,
        question: String,
        answer: String,
      },
    ],
    contractNo: {
      type: String,
    },
    specificationsNo: {
      type: String,
    },
    description: {
      type: String,
    },
    contractor: {
      type: String,
    },
    sub_contractor: {
      type: String,
    },
    locationOfWork: {
      type: String,
    },
    preparedBy: {
      type: String,
    },
    inspectorName: {
      type: String,
    },
    surveillanceReport: {
      type: String,
    },
    drawing: {
      type: String,
    },
    remarks: {
      type: String,
    },
    nonconformanceRemarks: {
      type: String,
    },
    additionalRemarks: {
      text: { type: String },
      name1: { type: String },
      signature1: { type: String },
      title1: { type: String },
      date1: { type: Date },
      name2: { type: String },
      signature2: { type: String },
      title2: { type: String },
      date2: { type: Date },
      name3: { type: String },
      signature3: { type: String },
      title3: { type: String },
      date3: { type: Date },
    },
  },
  { timestamps: true }
);

export default model<IChecklist>("Checklist", ChecklistSchema);
