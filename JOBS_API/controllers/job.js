const Job = require("../models/Job");
const createJob = async (req, res) => {
    try {
        req.body.createdBy = req.user.userId;
        const job = await Job.create(req.body);
        res.status(201).json(job);
    } catch (err) {
        res.status(400).json(err);
    }
}
const getAllJobs = async (req, res) => {
    try {
        req.body.createdBy = req.user.userId;
        const jobs = await Job.find(req.body, ["-__v"]).sort("-createdAt");
        res.status(200).json(jobs);
    } catch (err) {
        res.status(400).json(err);
    }
}
const getJob = async (req, res) => {
    try {
        const job = await Job.find({ "_id": req.params.id });
        res.status(200).json(job);
    } catch (err) {
        res.status(400).json(err);
    }
}
const updateJob = async (req, res) => {
    try {
        const job = await Job.updateOne({ _id: req.params.id }, req.body);
        res.status(200).json(job);
    } catch (err) {
        res.status(400).json(err);
    }
}
module.exports = {
    createJob,
    getAllJobs,
    getJob,
    updateJob
}
