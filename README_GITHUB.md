# 🚗 ParkEase - Smart Parking Solutions for India

![ParkEase](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)
![Node](https://img.shields.io/badge/Node.js-16+-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)

**India's first AI-powered smart parking solution** - Find your perfect parking spot in seconds!

## 🌟 Features

- 🎨 **Modern UI/UX** - Beautiful dark theme with orange accents
- 📱 **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- 🔄 **Real-time Updates** - Live parking availability tracking
- 💳 **Digital Payments** - UPI, Paytm, PhonePe integration ready
- 🗺️ **Smart Navigation** - Turn-by-turn directions in Hindi and regional languages
- ⭐ **Advance Booking** - Reserve parking spots ahead of time
- 📊 **MongoDB Integration** - Feedback and contact forms save to database
- 🔒 **Secure** - Rate limiting, CORS protection, input validation

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ installed
- Python 3.x installed
- MongoDB Atlas account (free tier)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/parkease.git
   cd parkease
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your MongoDB Atlas connection string

4. **Start the application**
   
   **Windows:**
   ```bash
   start-parkease.bat
   ```
   
   **Manual:**
   ```bash
   # Terminal 1 - Backend
   npm run dev
   
   # Terminal 2 - Frontend
   python -m http.server 8000
   ```

5. **Open in browser**
   ```
   http://localhost:8000
   ```

## 📁 Project Structure

```
parkease/
├── index.html              # Main website file
├── server.js               # Express backend server
├── package.json            # Node.js dependencies
├── .env.example            # Environment variables template
├── models/                 # MongoDB schemas
│   ├── Feedback.js         # Feedback model
│   └── Contact.js          # Contact form model
├── routes/                 # API routes
│   ├── feedback.js         # Feedback endpoints
│   └── contact.js          # Contact endpoints
├── assets/                 # Static assets
│   └── images/             # Profile pictures
├── start-parkease.bat      # Windows startup script
└── README.md               # This file
```

## 🔧 Configuration

### MongoDB Atlas Setup

1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free M0 cluster
3. Create database user with read/write permissions
4. Add IP address `0.0.0.0/0` to Network Access
5. Get connection string and add to `.env`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/parkease?retryWrites=true&w=majority
PORT=3000
FRONTEND_URL=http://localhost:8000
```

See `MONGODB_SETUP_GUIDE.md` for detailed instructions.

## 📡 API Endpoints

### Feedback API
- `POST /api/feedback` - Submit feedback
- `GET /api/feedback` - Get all feedback (admin)
- `GET /api/feedback/stats` - Get statistics
- `PATCH /api/feedback/:id/status` - Update status

### Contact API
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (admin)
- `GET /api/contact/stats` - Get statistics
- `GET /api/contact/:id` - Get specific contact
- `PATCH /api/contact/:id/status` - Update status

### Health Check
- `GET /api/health` - Check API status

## 👥 Team

### CEO
- **Reeddhijit Deb** - Founder & Tech Lead

### Co-Founders
- **Faizan Farooqui** - Marketing & Growth Strategist
- **Tanisha Phukan** - UI/UX Designer & AI-ML Engineer
- **Arpan Baul** - Full Stack Lead & CTO

## 🎨 Tech Stack

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Responsive Design
- SVG Icons
- Fetch API

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS, Helmet, Rate Limiting

### Database
- MongoDB Atlas (Cloud)
- Two collections: `feedback`, `contacts`

## 🔒 Security Features

- Rate limiting (100 requests per 15 minutes)
- CORS protection
- Input validation with Validator.js
- Helmet security headers
- Environment variable protection
- IP address logging

## 📊 Database Schema

### Feedback Collection
```javascript
{
  type: String,        // suggestion|bug|feature|general|compliment
  message: String,     // User feedback
  rating: Number,      // 1-5 stars
  email: String,       // Optional
  status: String,      // new|reviewed|in-progress|resolved|closed
  submittedAt: Date
}
```

### Contact Collection
```javascript
{
  name: String,
  email: String,
  phone: String,
  city: String,
  subject: String,     // general|partnership|support|feedback|media
  message: String,
  status: String,      // new|contacted|in-progress|resolved|closed
  priority: String,    // low|medium|high|urgent
  submittedAt: Date
}
```

## 🚀 Deployment

### Frontend (Static Hosting)
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

### Backend (Node.js Hosting)
- Heroku
- Railway
- Render
- AWS EC2/Elastic Beanstalk

### Database
- MongoDB Atlas (already cloud-based)

## 📝 Environment Variables

```env
MONGODB_URI=          # MongoDB Atlas connection string
PORT=3000             # Backend server port
NODE_ENV=development  # Environment (development/production)
FRONTEND_URL=         # Frontend URL for CORS
RATE_LIMIT_WINDOW_MS= # Rate limit window
RATE_LIMIT_MAX_REQUESTS= # Max requests per window
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- MongoDB Atlas for database hosting
- Express.js community
- All contributors and supporters

## 📞 Contact

- Website: [ParkEase](http://localhost:8000)
- Email: hello@parkease.in
- Phone: +91-800-PARKEASE

## 🎯 Roadmap

- [ ] Mobile app (React Native)
- [ ] Payment gateway integration
- [ ] Real-time parking availability
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Multi-language support
- [ ] Analytics dashboard
- [ ] API documentation (Swagger)

---

**Made with ❤️ in India 🇮🇳**

**ParkEase** - Transforming everyday parking into an effortless experience.