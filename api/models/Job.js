const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  salary: {
    type: String,
    required: false
  },
  jobType: {
    type: String,
    required: true,
    enum: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship']
  },
  experienceLevel: {
    type: String,
    required: true,
    enum: ['Entry', 'Mid', 'Senior', 'Executive']
  },
  postedDate: {
    type: Date,
    default: Date.now
  },
  closingDate: {
    type: Date,
    required: false
  }
});

module.exports = mongoose.model('Job', jobSchema);