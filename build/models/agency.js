import { Schema, model } from "mongoose";
const AgencySchema = new Schema({
    agencyName: {
        type: String,
        required: true,
    },
});
export default model("Agency", AgencySchema);
