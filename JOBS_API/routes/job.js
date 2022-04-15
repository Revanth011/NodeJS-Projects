const express = require("express");
const { createJob, getAllJobs, getJob, updateJob } = require("../controllers/job");
const router = express.Router();

router.post('/createJob', createJob);
router.get('/', getAllJobs);
router.get('/:id', getJob);
router.patch('/:id', updateJob);

module.exports = router;
