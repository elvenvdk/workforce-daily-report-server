import { Schema, model } from "mongoose";
import { IWorker } from "../types.ts";

const workerSchema = new Schema<IWorker>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    middleInitial: {
      type: String,
    },
    last4SSN: {
      type: String,
    },
    class: {
      type: String,
    },
    userToken: {
      type: String || null,
    },
    authorization: {
      type: Schema.Types.ObjectId,
      ref: "Auth",
    },
    level: {
      type: Number,
    },
    role: {
      type: String,
    },
    email: {
      type: String,
    },
    active: {
      type: Boolean,
    },
    phone: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model<IWorker>("Worker", workerSchema);
