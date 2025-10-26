const mongoose = require('mongoose');
const validator = require('validator');

const contactSchema = new mongoose.Schema({
  // Personal information
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email address'
    }
  },
  
  phone: {
    type: String,
    trim: true,
    validate: {
      validator: function(phone) {
        // Allow empty or validate if provided (more lenient)
        if (!phone || phone === '') return true;
        // Accept phone numbers with +, -, spaces, and digits (10-15 chars)
        return /^[\d\s\-\+\(\)]{10,20}$/.test(phone);
      },
      message: 'Please provide a valid phone number'
    }
  },
  
  // Location
  city: {
    type: String,
    trim: true,
    enum: ['', 'mumbai', 'delhi', 'bangalore', 'hyderabad', 'pune', 'chennai', 'kolkata', 'ahmedabad', 'other'],
    default: ''
  },
  
  // Inquiry details
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    enum: ['general', 'partnership', 'support', 'feedback', 'media'],
    trim: true
  },
  
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    minlength: [20, 'Message must be at least 20 characters long'],
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  
  // Metadata
  userAgent: {
    type: String,
    default: ''
  },
  
  ipAddress: {
    type: String,
    default: ''
  },
  
  // Status tracking
  status: {
    type: String,
    enum: ['new', 'contacted', 'in-progress', 'resolved', 'closed'],
    default: 'new'
  },
  
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  
  // Admin fields
  assignedTo: {
    type: String,
    default: ''
  },
  
  adminNotes: {
    type: String,
    default: ''
  },
  
  // Response tracking
  responseRequired: {
    type: Boolean,
    default: true
  },
  
  respondedAt: {
    type: Date,
    default: null
  },
  
  // Timestamps
  submittedAt: {
    type: Date,
    default: Date.now
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  collection: 'contacts'
});

// Indexes for better query performance
contactSchema.index({ email: 1 });
contactSchema.index({ subject: 1, submittedAt: -1 });
contactSchema.index({ status: 1 });
contactSchema.index({ city: 1 });
contactSchema.index({ priority: 1 });

// Update the updatedAt field before saving
contactSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Instance method to get contact summary
contactSchema.methods.getSummary = function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    subject: this.subject,
    city: this.city,
    status: this.status,
    priority: this.priority,
    submittedAt: this.submittedAt,
    responseRequired: this.responseRequired
  };
};

// Static method to get contact statistics
contactSchema.statics.getStats = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: null,
        totalContacts: { $sum: 1 },
        pendingContacts: {
          $sum: {
            $cond: [{ $in: ['$status', ['new', 'contacted', 'in-progress']] }, 1, 0]
          }
        },
        subjectBreakdown: {
          $push: {
            subject: '$subject',
            count: 1
          }
        }
      }
    }
  ]);
  
  return stats[0] || { totalContacts: 0, pendingContacts: 0, subjectBreakdown: [] };
};

module.exports = mongoose.model('Contact', contactSchema);