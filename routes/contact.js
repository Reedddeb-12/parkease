const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// Submit contact form
router.post('/', async (req, res) => {
  try {
    console.log('📧 Contact form submission received:', req.body);
    const { name, email, phone, city, subject, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.log('❌ Validation failed: missing required fields');
      return res.status(400).json({
        success: false,
        error: 'Name, email, subject, and message are required'
      });
    }
    
    // Create new contact
    const contact = new Contact({
      name,
      email,
      phone: phone || '',
      city: city || '',
      subject,
      message,
      userAgent: req.get('User-Agent') || '',
      ipAddress: req.ip || req.connection.remoteAddress || ''
    });
    
    // Save to database
    const savedContact = await contact.save();
    console.log('✅ Contact saved successfully:', savedContact._id);
    
    res.status(201).json({
      success: true,
      message: 'Thank you for contacting us! We\'ll get back to you within 24 hours.',
      data: {
        id: savedContact._id,
        name: savedContact.name,
        subject: savedContact.subject,
        submittedAt: savedContact.submittedAt
      }
    });
    
  } catch (error) {
    console.error('Contact submission error:', error);
    
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
      error: 'Failed to submit contact form. Please try again later.'
    });
  }
});

// Get contact statistics (admin endpoint)
router.get('/stats', async (req, res) => {
  try {
    const stats = await Contact.getStats();
    
    res.json({
      success: true,
      data: stats
    });
    
  } catch (error) {
    console.error('Contact stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve contact statistics'
    });
  }
});

// Get all contacts (admin endpoint with pagination)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const filter = {};
    
    // Add filters if provided
    if (req.query.subject) {
      filter.subject = req.query.subject;
    }
    
    if (req.query.status) {
      filter.status = req.query.status;
    }
    
    if (req.query.city) {
      filter.city = req.query.city;
    }
    
    if (req.query.priority) {
      filter.priority = req.query.priority;
    }
    
    // Get contacts with pagination
    const contacts = await Contact.find(filter)
      .sort({ submittedAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-userAgent -ipAddress'); // Exclude sensitive data
    
    const total = await Contact.countDocuments(filter);
    
    res.json({
      success: true,
      data: {
        contacts,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
    
  } catch (error) {
    console.error('Contact retrieval error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve contacts'
    });
  }
});

// Update contact status (admin endpoint)
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, priority, assignedTo, adminNotes, responseRequired } = req.body;
    
    if (!status) {
      return res.status(400).json({
        success: false,
        error: 'Status is required'
      });
    }
    
    const updateData = { 
      status,
      updatedAt: new Date()
    };
    
    if (priority) updateData.priority = priority;
    if (assignedTo !== undefined) updateData.assignedTo = assignedTo;
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes;
    if (responseRequired !== undefined) updateData.responseRequired = responseRequired;
    
    // If status is being set to 'resolved' or 'closed', mark as responded
    if (status === 'resolved' || status === 'closed') {
      updateData.respondedAt = new Date();
    }
    
    const contact = await Contact.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Contact status updated successfully',
      data: contact.getSummary()
    });
    
  } catch (error) {
    console.error('Contact update error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update contact status'
    });
  }
});

// Get contact by ID (admin endpoint)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const contact = await Contact.findById(id)
      .select('-userAgent -ipAddress'); // Exclude sensitive data
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found'
      });
    }
    
    res.json({
      success: true,
      data: contact
    });
    
  } catch (error) {
    console.error('Contact retrieval error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve contact'
    });
  }
});

module.exports = router;