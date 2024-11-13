const mongoose = require('mongoose')

const Schema = mongoose.Schema

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    importance: {
        type: String,
        required: false, //filled according to the technique
    },
    complex: {
        type: String,
        required: false //filled according to the technique
    },
    isDone: {
        type:Boolean,
        required: false
    },
    startDate: {
        type: Date,
        required: false //filled according to the user desire
    },
    startTime: {
        type: String,
        required: false //filled according to the user desire
    },
    endTime: {
        type: String,
        required: false //filled according to the user desire
    },
    completeDate: {
        type: Date,
        required: false //filled with IsDone Date
    },
    completeTime: {
        type: String,
        required: false //filled with IsDone Date
    },
    week: {
        type: Schema.Types.ObjectId,
        ref: "Week",
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
    
},{ timestamps: true})

module.exports = mongoose.model('Task',taskSchema)