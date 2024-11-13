const express = require('express')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

const { getChallenges,
    getChallenge,
    createChallenge,
    updateChallenge,
    deleteChallenge } = require('../controllers/challengesController');

//auth for all routes
router.use(requireAuth)

//get all challenges
router.get('/', getChallenges)

//get single challenge
router.get("/:id", getChallenge)

//create challenge
router.post("/", createChallenge)

//update challenge
router.patch("/:id", updateChallenge)

//delete challenge
router.delete("/:id", deleteChallenge)


module.exports = router