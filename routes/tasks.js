const express = require('express')
const requireAuth = require("../middleware/requireAuth")



const router = express.Router()

const {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
} = require('../controllers/tasksController')

//require auth for all task routes
router.use(requireAuth)

//get all tasks
router.get("/", getTasks)

//get single task
router.get("/:id", getTask)

//create task
router.post("/", createTask)

//update task
router.patch("/:id", updateTask)

//delete task
router.delete("/:id", deleteTask)


module.exports = router