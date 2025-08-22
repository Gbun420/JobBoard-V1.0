const express = require('express');
const csrfMiddleware = require('../../middleware/csrfMiddleware');
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob
} = require('../controllers/jobController');

const router = express.Router();

// Apply CSRF middleware to routes that modify data
router.use(csrfMiddleware);

router.route('/')
  .get(getAllJobs)
  .post(createJob);

router.route('/:id')
  .get(getJobById)
  .put(updateJob)
  .delete(deleteJob);

module.exports = router;