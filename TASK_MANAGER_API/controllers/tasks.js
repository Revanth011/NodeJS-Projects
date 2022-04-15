const Task = require("../models/tasks")

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body).exec();
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json(err);
    }
}
const getAllTasks = async (req, res) => {
    try {
        console.log(req);
        const tasks = await Task.find({}).exec();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(404).json(err);
    }
}
const getTask = async (req, res) => {
    try {
        const task = await Task.findOne({ name: req.params.name }).exec();
        res.status(200).json(task);
    } catch (err) {
        res.status(404).json(err);
    }
}
const deleteTask = async (req, res) => {
    try {
        const task = await Task.deleteOne({ name: req.params.name }).exec();
        res.status(200).json(task);
    } catch (err) {
        res.status(404).json(err);
    }
}
module.exports = {
    createTask,
    getAllTasks,
    getTask,
    deleteTask,
}
