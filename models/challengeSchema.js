const mongoose = require('mongoose')

const Schema = mongoose.Schema

const challengeSchema = new Schema ({
    title: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required:false
    },
    isDone: {
        type: Boolean,
        required:false
    },
    completeDate: {
        type: Date,
        required:false
    },
    week: {
        type: Schema.Types.ObjectId,
        ref: 'Week',
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
},{timestamps:true})

module.exports = mongoose.model("Challenge", challengeSchema)