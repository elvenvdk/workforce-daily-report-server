import { Schema, model } from "mongoose";
const authSchema = new Schema({
    userName: {
        type: String
    },
    password: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Worker'
    },
    active: {
        type: Boolean
    },
    userToken: {
        type: String
    }
});
export default model('Auth', authSchema);
