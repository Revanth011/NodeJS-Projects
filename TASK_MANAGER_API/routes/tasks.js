const express = require('express');
const router = express.Router();
const {
    createTask,
    getAllTasks,
    getTask,
    deleteTask
} = require("../controllers/tasks");

router.post('/', createTask);
router.get('/', getAllTasks);
router.get('/:name', getTask);
router.delete('/:name', deleteTask);

module.exports = router;