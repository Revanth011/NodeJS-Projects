const mongoose = require("mongoose");
const { Schema } = mongoose;
const JobSchema = new Schema({
    company: {
        type: String,
        trim: true,
        required: [true, 'Company Name Required'],
        maxlength: 50,
    },
    position: {
        type: String,
        trim: true,
        required: [true, 'Position Required'],
        maxlength: 100
    },
    status: {
        type: String,
        enum: ['Interview', 'Declined', 'Pending'],
        default: 'Pending',
    },
    skills: {
        type: Array,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please Provide User'],
    },
},
    { timestamps: true }
)

module.exports = mongoose.model('Job', JobSchema);
