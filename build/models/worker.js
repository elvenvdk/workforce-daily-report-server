import { Schema, model } from "mongoose";
const workerSchema = new Schema({
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
        type: String || null
    },
    authorization: {
        type: Schema.Types.ObjectId,
        ref: 'Auth'
    },
    level: {
        type: Number
    },
    role: {
        type: String
    },
    email: {
        type: String
    }
}, { timestamps: true });
export default model("Worker", workerSchema);
