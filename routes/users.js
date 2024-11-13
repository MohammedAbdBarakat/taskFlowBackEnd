const express = require('express')
const requireAuth = require('../middleware/requireAuth')

const { loginUser, signupUser, updateTechnique } = require('../controllers/usersController')

let router = express.Router()


//login user
router.post("/login",loginUser)

//signup user
router.post("/signup", signupUser)


//require auth for choosing technique request
router.use(requireAuth)

//update or choose technique
router.post("/chooseTechnique", updateTechnique)

module.exports = router