import { Schema, model } from "mongoose";
import { IAuth } from "../type.ts";

const authSchema = new Schema<IAuth>({
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
  },

})

export default model<IAuth>('Auth', authSchema);