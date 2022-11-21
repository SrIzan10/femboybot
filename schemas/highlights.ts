import { model, Schema } from "mongoose";

const schema = new Schema({
    authorid: {type: String, required: true},
    channelid: {type: String, required: true},
    msgid: {type: String, required: true}
})

// @ts-ignore
const db = new model('highlights', schema)

export default db;