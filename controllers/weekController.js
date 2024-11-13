const Week = require("../models/weekSchema")
const mongoose = require('mongoose')


//get all weeks
const getWeeks = async (req, res) => {
    const user_id = req.user._id
    const week = await Week.find({ user_id }).sort({createdAt: -1})

    res.status(200).json(week)
}


module.exports = {getWeeks}