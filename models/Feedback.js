const mongoose = require('mongoose');
const validator = require('validator');

const feedbackSchema = new mongoose.Schema({
  // Feedback details
  type: {
    type: String,
    required: [true, 'Feedback type is required'],
    enum: ['suggestion', 'bug', 'feature', 'general', 'compliment'],
    trim: true
  },
  
  message: {
    type: String,
    required: [true, 'Feedback message is required'],
    trim: true,
    minlength: [10, 'Message must be at least 10 characters long'],
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  
  rating: {
    type: Number,
    min: [1, 'Rating must be between 1 and 5'],
    max: [5, 'Rating must be between 1 and 5'],
    default: null
  },
  
  // Contact information (optional)
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(email) {
        return !email || validator.isEmail(email);
      },
      message: 'Please provide a valid email address'
    }
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
    enum: ['new', 'reviewed', 'in-progress', 'resolved', 'closed'],
    default: 'new'
  },
  
  // Admin notes
  adminNotes: {
    type: String,
    default: ''
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
  collection: 'feedback'
});

// Indexes for better query performance
feedbackSchema.index({ type: 1, submittedAt: -1 });
feedbackSchema.index({ status: 1 });
feedbackSchema.index({ rating: 1 });
feedbackSchema.index({ email: 1 });

// Update the updatedAt field before saving
feedbackSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Instance method to get feedback summary
feedbackSchema.methods.getSummary = function() {
  return {
    id: this._id,
    type: this.type,
    rating: this.rating,
    status: this.status,
    submittedAt: this.submittedAt,
    hasEmail: !!this.email
  };
};

// Static method to get feedback statistics
feedbackSchema.statics.getStats = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: null,
        totalFeedback: { $sum: 1 },
        averageRating: { $avg: '$rating' },
        typeBreakdown: {
          $push: {
            type: '$type',
            count: 1
          }
        }
      }
    }
  ]);
  
  return stats[0] || { totalFeedback: 0, averageRating: 0, typeBreakdown: [] };
};

module.exports = mongoose.model('Feedback', feedbackSchema);