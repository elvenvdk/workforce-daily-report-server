import { Schema, model } from "mongoose";
import { ISigninSignout } from "'../types'.ts";

const SigninSignoutSchema = new Schema<ISigninSignout>(
  {
    agency: {
      id: {
        type: Schema.Types.ObjectId,
        ref: "Agency",
      },
      agencyName: {
        type: String,
      },
    },
    contractNo: {
      type: String,
      // required: true,
    },
    shift: {
      type: String,
      // required: true,
    },
    contractStartDate: {
      type: Date,
      // required: true,
    },
    startDate: {
      type: Date,
      //   required: true,
    },
    taskCompletionDate: {
      type: Date,
      // required: true,
    },
    laborTicketAvb: {
      type: String,
    },
    jobName: {
      type: String,
      // required: true,
    },
    location: {
      type: String,
    },
    workLocation: [
      {
        name: {
          type: String,
        },
      },
    ],
    workType: {
      type: String,
      // required: true,
    },
    workDescription: {
      type: String,
    },
    incidentReport: {
      type: String,
    },
    incidentReportText: {
      type: String,
    },
    remarks: {
      type: String,
    },
    percentage: {
      type: Number,
    },
    siteEmployees: [
      {
        id: {
          type: Schema.Types.ObjectId,
          ref: "Worker",
        },
        firstName: {
          type: String,
          // required: true,
        },
        middleInitial: {
          type: String,
        },
        lastName: {
          type: String,
          // required: true,
        },
        last4SSN: {
          type: String,
          // required: true,
        },
        class: {
          type: String,
        },
        timeIn: {
          type: Date,
          // required: true,
        },
        timeOut: {
          type: Date,
          // required: true,
        },
        timeInSignature: {
          type: String,
          // required: true,
        },
        timeOutSignature: {
          type: String,
          // required: true,
        },
        regularTime: {
          type: Number,
        },
        doubleTime: {
          type: Number,
        },
        doubletimeSignature: {
          type: Number,
        },
        imageCapture: {
          type: String,
        },
        notes: {
          type: String,
        },
        costcode: {
          type: String,
        },
        laborcode: {
          type: String,
        },
      },
    ],

    foreman: {
      type: String,
      // required: true,
    },
    projectMgr: {
      type: String,
    },
    agencyRep: {
      type: String,
    },
    contractorRep: {
      type: String,
    },
    foremanSignature: {
      type: String,
      // required: true,
    },
    projectMgrSignature: {
      type: String,
    },
    agencyRepSignature: {
      type: String,
    },
    contractorRepSignature: {
      type: String,
    },
    signatureDate: {
      type: Date,
    },
    temperature: {
      type: Number,
    },
    forcast: {
      type: String,
    },
    materialsDesc: [
      {
        qty: {
          type: Number,
        },
        item: {
          type: String,
        },
        um: {
          type: String,
        },
        unitCost: {
          type: Number,
        },
        totalCost: {
          type: Number,
        },
        description: {
          type: String,
        },
      },
    ],
    tasks: [
      {
        details: {
          type: String,
        },
        progress: {
          type: String,
        },
        status: {
          type: String,
        },
        title: {
          type: String,
        },
      },
    ],
    canRecall: {
      type: Boolean,
    },
    hasBeenRecalled: {
      type: Boolean,
    },
    reportNo: {
      type: String,
    },
    titleOfChangeOrder: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model<ISigninSignout>("SigninSignout", SigninSignoutSchema);
