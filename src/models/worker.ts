import { Schema, model } from "mongoose";
import { IWorker } from "../types.ts";


const workerSchema = new Schema<IWorker>({
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
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  userToken: {
    type: String || null
  },
  authorization: {
    type: Schema.Types.ObjectId,
    ref: 'Auth'
  }
});

export default model<IWorker>("Worker", workerSchema);
