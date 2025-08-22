const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  company: {
    type: String,
    required: [true, 'Company is required'],
    trim: true,
    maxlength: [50, 'Company name cannot be more than 50 characters']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
    maxlength: [50, 'Location cannot be more than 50 characters']
  },
  salary: {
    type: String,
    required: false,
    trim: true
  },
  jobType: {
    type: String,
    required: [true, 'Job type is required'],
    enum: {
      values: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'],
      message: 'Please select a valid job type'
    }
  },
  experienceLevel: {
    type: String,
    required: [true, 'Experience level is required'],
    enum: {
      values: ['Entry', 'Mid', 'Senior', 'Executive'],
      message: 'Please select a valid experience level'
    }
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

// Add indexes for better query performance
jobSchema.index({ title: 'text', company: 'text', location: 'text' });
jobSchema.index({ jobType: 1 });
jobSchema.index({ experienceLevel: 1 });
jobSchema.index({ postedDate: -1 });

module.exports = mongoose.model('Job', jobSchema);