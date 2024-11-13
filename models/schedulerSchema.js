const mongoose = require('mongoose')

const Schema = mongoose.Schema


//for scheduling the start and the end of the day.
//this model helps in the distributing system.

const schedulerSchema = new Schema ({
    day: {
        type:String,
        required: true
    },
    times: [
        {
            startAt: Number,
            endAt: Number
        }
    ],
    week: {
        type: Schema.Types.ObjectId,
        ref: "Week"
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
})


module.exports = mongoose.model('Scheduler',schedulerSchema)