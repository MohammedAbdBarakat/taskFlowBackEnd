const express = require('express')
const requireAuth = require("../middleware/requireAuth")



const router = express.Router()

const { getWeeks } = require('../controllers/weekController')

//require auth for all task routes
router.use(requireAuth)

//get all weeks
router.get("/", getWeeks)


module.exports = router