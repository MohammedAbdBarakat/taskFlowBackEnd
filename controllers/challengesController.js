const Challenge = require("../models/challengeSchema")
const Week = require("../models/weekSchema")
const { findOrCreateWeek } = require('./weekHelperFuncs')
const mongoose = require('mongoose')


//get all challenges
const getChallenges = async (req, res) => {
    const user_id = req.user._id;
    const challenge = await Challenge.find({user_id}).sort({createdAt: -1})

    res.status(200).json(challenge)
}

//get a single challenge
const getChallenge = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid challenge ID format" });
    }

    try {
        const challenge = await Challenge.findById(id);
        if (!challenge) {
            return res.status(404).json({ error: "Challenge not found" });
        }
        res.status(200).json(challenge);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while retrieving the challenge" });
    }
};


//create challenge
const createChallenge = async (req, res) => {
    const { title, description} = req.body;
    const user_id = req.user._id;

    if (!title || !description) {
        return res.status(400).json({message:"Please fill all the fields."});
    }

    // Determine the current week range and find or create the Week document
    const currentDate = new Date()
    const week = await findOrCreateWeek(currentDate, user_id);

    try {
        const challenge = await Challenge.create({
            title,
            description,
            isDone: false,
            completeDate: null,
            user_id,
            week: week._id
        })
        // find the week and update the Week document
        await Week.findByIdAndUpdate(
            week._id,
            { $push: { 'challenges': {ref: challenge._id}}}
        );
        res.status(200).json(challenge)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


//update challenge
const updateChallenge = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Invalid challenge ID format"})
    }

    try {
        const challenge = await Challenge.findByIdAndUpdate(
            {_id: id}, 
            {...req.body}, 
            {returnOriginal: false}
        )
    
        if (!challenge) {
            return res.status(404).json({error: "did not find the challenge"})
        }
    
        res.status(200).json(challenge);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while updating the challenge" });
    }
}

//delete challenge
const deleteChallenge = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id; 

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid challenge ID format" });
    }

    try {
        // Delete the challenge doc
        const challenge = await Challenge.findByIdAndDelete(id);
        
        if (!challenge) {
            return res.status(404).json({ error: "Challenge not found" });
        }
        
        // update the week doc to remove only the specific challenge ref
        const currentDate = new Date();
        const week = await Week.findOneAndUpdate(
            { endWeek: { $gt: currentDate }, user_id: userId },
            { $pull: { challenges: { ref: challenge._id } } }
        );

        if (!week) {
            return res.status(404).json({ error: "Week not found" });
        }

        res.status(200).json({ message: "Challenge deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    getChallenges,
    getChallenge,
    createChallenge,
    updateChallenge,
    deleteChallenge
}