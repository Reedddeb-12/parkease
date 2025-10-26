const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// Submit feedback
router.post('/', async (req, res) => {
  try {
    const { type, message, rating, email } = req.body;
    
    // Validate required fields
    if (!type || !message) {
      return res.status(400).json({
        success: false,
        error: 'Feedback type and message are required'
      });
    }
    
    // Create new feedback
    const feedback = new Feedback({
      type,
      message,
      rating: rating || null,
      email: email || '',
      userAgent: req.get('User-Agent') || '',
      ipAddress: req.ip || req.connection.remoteAddress || ''
    });
    
    // Save to database
    const savedFeedback = await feedback.save();
    
    res.status(201).json({
      success: true,
      message: 'Thank you for your feedback! We appreciate your input.',
      data: {
        id: savedFeedback._id,
        type: savedFeedback.type,
        rating: savedFeedback.rating,
        submittedAt: savedFeedback.submittedAt
      }
    });
    
  } catch (error) {
    console.error('Feedback submission error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to submit feedback. Please try again later.'
    });
  }
});

// Get feedback statistics (admin endpoint)
router.get('/stats', async (req, res) => {
  try {
    const stats = await Feedback.getStats();
    
    res.json({
      success: true,
      data: stats
    });
    
  } catch (error) {
    console.error('Feedback stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve feedback statistics'
    });
  }
});

// Get all feedback (admin endpoint with pagination)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const filter = {};
    
    // Add filters if provided
    if (req.query.type) {
      filter.type = req.query.type;
    }
    
    if (req.query.status) {
      filter.status = req.query.status;
    }
    
    if (req.query.rating) {
      filter.rating = parseInt(req.query.rating);
    }
    
    // Get feedback with pagination
    const feedback = await Feedback.find(filter)
      .sort({ submittedAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-userAgent -ipAddress'); // Exclude sensitive data
    
    const total = await Feedback.countDocuments(filter);
    
    res.json({
      success: true,
      data: {
        feedback,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
    
  } catch (error) {
    console.error('Feedback retrieval error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve feedback'
    });
  }
});

// Update feedback status (admin endpoint)
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;
    
    if (!status) {
      return res.status(400).json({
        success: false,
        error: 'Status is required'
      });
    }
    
    const feedback = await Feedback.findByIdAndUpdate(
      id,
      { 
        status, 
        adminNotes: adminNotes || '',
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    );
    
    if (!feedback) {
      return res.status(404).json({
        success: false,
        error: 'Feedback not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Feedback status updated successfully',
      data: feedback.getSummary()
    });
    
  } catch (error) {
    console.error('Feedback update error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update feedback status'
    });
  }
});

module.exports = router;