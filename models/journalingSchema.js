const mongoose  = require("mongoose")

const Schema = mongoose.Schema

const journalingSchema = new Schema ({
    goodEvents: {
        event1: {
            type: String
        },
        event2: {
            type: String
        },
        event3: {
            type: String
        },
    },
    badEvents: {
        event1: {
            type: String
        },
        event2: {
            type: String
        },
        event3: {
            type: String
        },
    },
    notes: {
        type: String
    },
    week: {
        type: Schema.Types.ObjectId, //ref to week schema
        ref: 'Week',
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId, // Link each journaling entry to a specific user
        ref: "User",
        required: true,
    }
},{timestamps:true})

module.exports = mongoose.model("Journaling", journalingSchema)