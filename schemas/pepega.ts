import { model, Schema } from "mongoose";

const schema = new Schema({
    userid: {type: String, required: true},
    times: {type: Number, required: true}
})

// @ts-ignore
const db = new model('pepega', schema)

export default db;