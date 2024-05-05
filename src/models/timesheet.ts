import { Schema, model } from "mongoose";
import { ITimesheet } from "'../types'.ts";

const TimesheetSchema = new Schema<ITimesheet>(
  {
    jobName: {
      type: String,
    },
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Job",
    },
    weekEnding: {
      type: Date,
    },
    reportDate: {
      type: Date,
    },
    reportNumber: {
      type: String,
    },
    reportHours: [
      {
        name: {
          type: String,
        },
        id: {
          type: Schema.Types.ObjectId,
          ref: "Worker",
        },
        laborCode: {
          type: String,
        },
        costCode: {
          type: String,
        },
        regHours: {
          type: Number,
        },
        otHours: {
          type: Number,
        },
        regRate: {
          type: Number,
        },
        otRate: {
          type: Number,
        },
        regWages: {
          type: Number,
        },
        otWages: {
          type: Number,
        },
        workerClass: {
          type: String,
        },
        percentage: {
          type: Number,
        },
        wagesOAndPOT: {
          type: Number,
        },
        wagesOAndPRT: {
          type: Number,
        },
        wagesTotalRT: {
          type: Number,
        },
        wagesTotalOT: {
          type: Number,
        },
        total: {
          type: Number,
        },
        date: {
          type: Date,
        },
      },
    ],
  },
  { timestamps: true }
);

export default model<ITimesheet>("Timesheet", TimesheetSchema);
