const { z } = require('zod');
const Job = require('../models/Job');

// Helper function to check if database is connected
const isDatabaseConnected = () => {
  const mongoose = require('mongoose');
  return mongoose.connection.readyState === 1; // 1 means connected
};

// Get all jobs
const getAllJobs = async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      return res.status(503).json({
        success: false,
        error: 'Database connection unavailable'
      });
    }
    
    const jobs = await Job.find().sort({ postedDate: -1 });
    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Get single job
const getJobById = async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      return res.status(503).json({
        success: false,
        error: 'Database connection unavailable'
      });
    }
    
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        error: 'Job not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: job
    });
  } catch (error) {
    console.error('Error fetching job:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid job ID format'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Create new job
const createJob = async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      return res.status(503).json({
        success: false,
        error: 'Database connection unavailable'
      });
    }
    
    // Validate input using Zod
    const validatedData = JobSchema.parse(req.body);
    
    const job = await Job.create(validatedData);
    
    res.status(201).json({
      success: true,
      data: job
    });
  } catch (error) {
    console.error('Error creating job:', error);
    
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map(err => err.message);
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        details: errorMessages
      });
    }
    
    // Handle MongoDB duplicate key errors
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Duplicate field value entered'
      });
    }
    
    // Handle MongoDB validation errors
    if (error.name === 'ValidationError') {
      const message = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        details: message
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Update job
const updateJob = async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      return res.status(503).json({
        success: false,
        error: 'Database connection unavailable'
      });
    }
    
    // Validate input using Zod (partial validation for updates)
    const updateData = JobSchema.partial().parse(req.body);
    
    const job = await Job.findByIdAndUpdate(
      req.params.id, 
      updateData, 
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!job) {
      return res.status(404).json({
        success: false,
        error: 'Job not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: job
    });
  } catch (error) {
    console.error('Error updating job:', error);
    
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map(err => err.message);
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        details: errorMessages
      });
    }
    
    // Handle MongoDB duplicate key errors
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Duplicate field value entered'
      });
    }
    
    // Handle MongoDB validation errors
    if (error.name === 'ValidationError') {
      const message = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        details: message
      });
    }
    
    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid job ID format'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Delete job
const deleteJob = async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      return res.status(503).json({
        success: false,
        error: 'Database connection unavailable'
      });
    }
    
    const job = await Job.findByIdAndDelete(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        error: 'Job not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Error deleting job:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid job ID format'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Job schema for validation
const JobSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().min(1, "Location is required"),
  salary: z.string().optional(),
  jobType: z.enum(['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship']),
  experienceLevel: z.enum(['Entry', 'Mid', 'Senior', 'Executive']),
  closingDate: z.string().optional()
});

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob
};