const Journaling = require("../models/journalingSchema")
const Week = require("../models/weekSchema")
const { findOrCreateWeek } = require('./weekHelperFuncs')
const mongoose = require('mongoose')


//get all journals
const getJournals = async (req, res) => {
    const user_id = req.user._id;
    const journals = await Journaling.find({user_id}).sort({createdAt: -1})

    res.status(200).json(journals)
}

//get single journal
const getJournal = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Invalid journal ID format"})
    }

    try {
        const journal = await Journaling.findById(id)
    
        if (!journal) {
            return res.status(404).json({error: 'did not find journal'})
        }
    
        res.status(200).json(journal)
    } catch (error) {
        res.status(500).json({ error: "An error occurred while retrieving the journal" });

    }
}

//create journal
const createJournal = async (req, res) => {
    const { goodEvents, badEvents, notes} = req.body;
    const user_id = req.user._id;

    // Determine the current week range and find or create the Week document
    const currentDate = new Date()
    const week = await findOrCreateWeek(currentDate, user_id);

    try {
        const journal = await Journaling.create({
            goodEvents,
            badEvents,
            notes,
            user_id,
            week: week._id
        })
        // find the week and update the Week document
        await Week.findByIdAndUpdate(
            week._id,
            { $push: { 'journaling': {ref: journal._id}}}
        );

        res.status(200).json(journal)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


//update journal
const updateJournal = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Invalid journal ID format"})
    }
    try {
        const journal = await Journaling.findByIdAndUpdate(
            {_id: id}, 
            {...req.body},
            {returnOriginal: false}
        )
        if (!journal) {
            return res.status(404).json({error: "did not find the journals"})
        }
        res.status(200).json(journal);
    } catch (error) {
        res.status(500).json({error: "An error occurred while updating the journal" });
    }

}

//delete journals
const deleteJournal = async (req, res) => {
    const { id } = req.params
    const userId = req.user._id; 

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Invalid journal ID format"})
    }

    try {
        // Delete the journal document
        const journal = await Journaling.findByIdAndDelete(id)
    
        if (!journal) {
            return res.status(404).json({error: "did not find the journal"})
        }

        // Update the Week document to remove only the specific journal ref
        const currentDate = new Date();
        const week = await Week.findOneAndUpdate(
            { endWeek: { $gt: currentDate }, user_id: userId },
            { $pull: { journaling: { ref: journal._id } } }
        );

        if (!week) {
            return res.status(404).json({ error: "Week not found" });
        }
        res.status(200).json({ message: "Challenge deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getJournals,
    getJournal,
    createJournal,
    updateJournal,
    deleteJournal
}