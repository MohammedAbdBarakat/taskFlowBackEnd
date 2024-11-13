const mongoose = require('mongoose')

const {Schema, SchemaTypes} = mongoose

const monthSchema = new Schema({
    month: { type: String }, // e.g., "January"
    week1: {
        ref: {
            type: SchemaTypes.ObjectId,
            ref:'Week'
        }
    },
    week2: {
        ref: {
            type: SchemaTypes.ObjectId,
            ref:'Week'
        }
    },
    week3: {
        ref: {
            type: SchemaTypes.ObjectId,
            ref:'Week'
        }
    },
    week4: {
        ref: {
            type: SchemaTypes.ObjectId,
            ref:'Week'
        }
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
})


module.exports = mongoose.model('Month',monthSchema)