const mongoose = require('mongoose')
const User = require("../models/userSchema")
const Task = require("../models/taskSchema")
const jwt = require('jsonwebtoken')


const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

//login
loginUser = async (req, res) => {
    const {userName, password} = req.body

    try {
        const user = await User.login(userName, password)

        //create a token
        const token = createToken(user._id)

        res.status(200).json({userName, token})
        
    } catch (error) {
        res.status(404).json({error: error.message})
    }

}

//signup
signupUser = async (req, res) => {
    const { firstName, lastName, userName, email, password } = req.body
    
    try {
        const user = await User.signup(firstName, lastName, userName,email, password)
        
        //create a token
        const token = createToken(user._id)

        res.status(200).json({userName, token})
        
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}


// 1- Helper function to check if user has any tasks this week
async function hasTasksThisWeek(userId) {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const tasksThisWeek = await Task.find({
        user_id: userId,
        createdAt: { $gte: oneWeekAgo }
    });

    return tasksThisWeek.length > 0;
}

// 2- Update or choose technique
const updateTechnique = async (req, res) => {
    const user_id = req.user._id
    const { technique } = req.body;

    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(404).json({ error: "User not found" });
    }

    try {
        const user = await User.findById(user_id);

        const hasTasks = await hasTasksThisWeek(user_id);
        console.log(hasTasks)

        if (hasTasks) {
            return res.status(400).json({ error: "Cannot change technique mid-week if tasks already exist" });
        }

        user.currentTechnique = technique;
        await user.save();

        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


module.exports = { loginUser, signupUser, updateTechnique }