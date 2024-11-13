const express = require('express')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

const { getJournals,
    getJournal,
    createJournal,
    updateJournal,
    deleteJournal} = require("../controllers/journalingController")

//auth for all routes
router.use(requireAuth)

//get all journals
router.get('/', getJournals)

//get single journal
router.get("/:id",getJournal)

//create journal
router.post("/", createJournal)

//update journal
router.patch("/:id", updateJournal)

//delete journal
router.delete("/:id", deleteJournal)


module.exports = router