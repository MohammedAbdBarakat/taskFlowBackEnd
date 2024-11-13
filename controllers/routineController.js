const Routine = require('../models/routineSchema')
const Week = require("../models/weekSchema")
const { findOrCreateWeek } = require('./weekHelperFuncs')
const mongoose = require('mongoose')


//get all routines
const getRoutines = async (req, res) => {
    const user_id = req.user._id;
    try {
        const routines = await Routine.find({ user_id }).sort({ createdAt: -1 });
        res.status(200).json(routines); 
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//get single routine
const getRoutine = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'did not find the routine'})
    }

    try {
        const routine = await Routine.findById(id)
    
        if (!routine) {
            return res.status(404).json({error: 'did not fine the routine'})
        }
    
        res.status(200).json(routine)
    } catch (error) {
        res.status(500).json({ error: "An error occurred while retrieving the routine" });
    }
}

//add routine
const addRoutine = async (req, res) => {
    const { day, newRoutine} = req.body 
    const user_id = req.user._id


    // Determine the current week range and find or create the Week document
    const startDateR = newRoutine.startDate
    const currentDate = startDateR ? new Date(startDateR) : new Date;
    const week = await findOrCreateWeek(currentDate, user_id);
    console.log(week);
    
    const week_id = week._id

    try {
        const routine = await Routine.addRoutine(day, newRoutine, user_id, week_id)

        // find the day of the week and update the Week document
        const dayOfWeek = currentDate.getDay() + 1; // 0 is Sunday, 1 is Monday, etc.
        const dayField = `day${dayOfWeek}.Routines`;
        console.log(dayField);
        
        
        await Week.findByIdAndUpdate(
            week._id,
            { $push: { [dayField]: { routine_ref: routine._id } } }
        );

        res.status(200).json(routine)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//update routine
const updateRoutine = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Invalid routine ID format"})
    }

    try {
        const routine = await Routine.findByIdAndUpdate(
            {_id: id}, 
            {...req.body},
            {returnOriginal: false}
        )
        if (!routine) {
            return res.status(404).json({error: "did not find the routine"})
        }
        res.status(200).json(routine);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while updating the routine" });
    }
}

// delete a specific routine from the routines array
const deleteSpecificRoutine = async (req, res) => {
    const { id, routineId } = req.params; 
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(routineId)) {
        return res.status(404).json({ error: "Invalid ID format" });
    }

    try {
        const routine = await Routine.findOneAndUpdate(
            { _id: id, user_id: userId },
            { $pull: { routines: { _id: routineId } } },
            { new: true }
        );

        if (!routine) {
            return res.status(404).json({ error: "Routine document or specified routine not found" });
        }

        res.status(200).json({ message: "Routine deleted successfully"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


//delete routine
const deleteRoutine = async (req, res) => {
    const { id } = req.params
    const userId = req.user._id; 

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Invalid routine ID format"})
    }

    try {
        // Delete the journal document
        const routine = await Routine.findByIdAndDelete(id)
    
        if (!routine) {
            return res.status(404).json({error: "did not find the journal"})
        }

        // Update the Week document to remove only the specific journal ref
        const currentDate = new Date();
        const week = await Week.findOneAndUpdate(
            { endWeek: { $gt: currentDate }, user_id: userId },
            { $pull: { Routine: { ref: routine._id } } }
        );

        if (!week) {
            return res.status(404).json({ error: "Week not found" });
        }
        res.status(200).json({ message: "routine deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    getRoutines, 
    getRoutine, 
    addRoutine,
    updateRoutine,
    deleteRoutine,
    deleteSpecificRoutine
}