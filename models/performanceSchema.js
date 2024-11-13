const mongoose  = require("mongoose")

const Schema = mongoose.Schema

const performanceSchema = new Schema({
    completionRate: { type: Number },
    importanceCompletionRate: { type: Number },
    timeManagementRate: { type: Number },
    complicatedCompletionRate: { type: Number },
    onTimeCompletionRate: { type: Number },
    streak: { type: Number },
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
});

module.exports = mongoose.model("Performance", performanceSchema)