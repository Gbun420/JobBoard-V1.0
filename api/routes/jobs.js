const express = require('express');
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob
} = require('../controllers/jobController');

const router = express.Router();

router.route('/')
  .get(getAllJobs)
  .post(createJob);

router.route('/:id')
  .get(getJobById)
  .put(updateJob)
  .delete(deleteJob);

module.exports = router;