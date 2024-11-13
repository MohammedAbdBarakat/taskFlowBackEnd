const express = require('express')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

const {  getRoutines, 
    getRoutine, 
    addRoutine,
    updateRoutine,
    deleteRoutine,
    deleteSpecificRoutine } = require('../controllers/routineController')

//require auth for all task routes
router.use(requireAuth)

//get all routines
router.get('/', getRoutines)

//get single routine
router.get('/:id', getRoutine)

//add routine
router.post('/',addRoutine)

//update routine
router.patch('/:id', updateRoutine)

//delete routine
router.delete("/:id", deleteRoutine)

// delete a specific routine in routines array
router.delete('/:id/routine/:routineId', deleteSpecificRoutine);



module.exports = router

