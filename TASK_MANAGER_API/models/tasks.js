const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Name Required"]
    },
    completed: {
        type: Boolean,
        default: false
    }
})
module.exports = mongoose.model("Task", TaskSchema);