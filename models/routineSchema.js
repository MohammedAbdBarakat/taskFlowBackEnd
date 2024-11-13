const mongoose  = require("mongoose")

const Schema = mongoose.Schema

const routineSchema = new Schema({
    day: {
        type: String,
        required: true
    },
    routines:[
        {
            title: {
                type: String,
                required: true,
            },
            startDate: {
                type: Date,
                required: true,
            },
            endDate: {
                type: Date,
                required: true,
            }
        }
    ],
    week: {
        type: Schema.Types.ObjectId,
        ref: "Week",
        required: true,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
},{timestamps:true})

routineSchema.statics.isOverlap = async function (day, startDate, endDate) {
    // Query to check if there any overlapping routine for the given day
    const routine = await this.findOne({
        day,
        routines: {
            $elemMatch: {
                startDate: { $lt: endDate },  // Existing routine starts before the new one ends
                endDate: { $gt: startDate }   // Existing routine ends after the new one starts
            }
        }
    });
    
    // Return true if an overlap is found, otherwise false
    return !!routine;
};


//add or create routine
routineSchema.statics.addRoutine = async function (day, newRoutine, user_id, week) {
    const { startDate, endDate } = newRoutine;

    // Check if there's an overlap
    const hasOverlap = await this.isOverlap(day, startDate, endDate);

    if (hasOverlap) {
        throw new Error('Overlapping routine detected');
    }

    // If no overlap, proceed with adding the routine
    const routine = await this.findOneAndUpdate(
        { day, user_id },
        { $push: { routines: newRoutine }, week },
        { new: true, upsert: true }  // upsert: true creates a new document if none exists for that day
    );

    return routine;
}

module.exports = mongoose.model('Routine', routineSchema)