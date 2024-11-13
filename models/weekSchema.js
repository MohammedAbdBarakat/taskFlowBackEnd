const mongoose = require('mongoose')

const {Schema, SchemaTypes} = mongoose

const weekSchema = new Schema({
    weekNum: {
        type:Number,
    },
    startWeek: {
        type: Date,
    },
    endWeek: {
        type: Date,
    },
    day1: {
        Tasks: [
            {
                task_ref: {
                    type: SchemaTypes.ObjectId,
                    ref: 'Task'
                }
            }
        ],
        Routines: [
            {
                routine_ref: {
                    type: SchemaTypes.ObjectId,
                    ref: 'Routine'
                }
            }
        ]
    },
    day2: {
        Tasks: [
            {
                task_ref: {
                    type: SchemaTypes.ObjectId,
                    ref: 'Task'
                }
            }
        ],
        Routines: [
            {
                routine_ref: {
                    type: SchemaTypes.ObjectId,
                    ref: 'Routine'
                }
            }
        ]
    },
    day3: {
        Tasks: [
            {
                task_ref: {
                    type: SchemaTypes.ObjectId,
                    ref: 'Task'
                }
            }
        ],
        Routines: [
            {
                routine_ref: {
                    type: SchemaTypes.ObjectId,
                    ref: 'Routine'
                }
            }
        ]
    },
    day4: {
        Tasks: [
            {
                task_ref: {
                    type: SchemaTypes.ObjectId,
                    ref: 'Task'
                }
            }
        ],
        Routines: [
            {
                routine_ref: {
                    type: SchemaTypes.ObjectId,
                    ref: 'Routine'
                }
            }
        ]
    },
    day5: {
        Tasks: [
            {
                task_ref: {
                    type: SchemaTypes.ObjectId,
                    ref: 'Task'
                }
            }
        ],
        Routines: [
            {
                routine_ref: {
                    type: SchemaTypes.ObjectId,
                    ref: 'Routine'
                }
            }
        ]
    },
    day6: {
        Tasks: [
            {
                task_ref: {
                    type: SchemaTypes.ObjectId,
                    ref: 'Task'
                }
            }
        ],
        Routines: [
            {
                routine_ref: {
                    type: SchemaTypes.ObjectId,
                    ref: 'Routine'
                }
            }
        ]
    },
    day7: {
        Tasks: [
            {
                task_ref: {
                    type: SchemaTypes.ObjectId,
                    ref: 'Task'
                }
            }
        ],
        Routines: [
            {
                routine_ref: {
                    type: SchemaTypes.ObjectId,
                    ref: 'Routine'
                }
            }
        ]
    },
    journaling: [
        { 
            ref: {
                type: SchemaTypes.ObjectId,
                ref: 'Journaling'
            }
        }
    ],
    performance:[
        {
            ref: {
                type: SchemaTypes.ObjectId,
                ref: 'Performance'
            }
        }
    ],
    challenges: [
        {
            ref: {
                type: SchemaTypes.ObjectId,
                ref: 'Challenges'
            }
        }
    ],
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
})


module.exports = mongoose.model('Week',weekSchema)