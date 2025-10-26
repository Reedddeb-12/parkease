# ParkEase Website with MongoDB Atlas Integration

## 🚀 Quick Setup Guide

### 1. MongoDB Atlas Setup

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for a free account
   - Create a new cluster (M0 Sandbox - Free tier)

2. **Configure Database Access**
   - Go to "Database Access" in Atlas dashboard
   - Click "Add New Database User"
   - Create username/password (save these!)
   - Set privileges to "Read and write to any database"

3. **Configure Network Access**
   - Go to "Network Access" in Atlas dashboard
   - Click "Add IP Address"
   - Add `0.0.0.0/0` (allow access from anywhere) for development
   - For production, add only your server's IP

4. **Get Connection String**
   - Go to "Clusters" and click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

### 2. Backend Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your MongoDB Atlas connection string:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/parkease?retryWrites=true&w=majority
   PORT=3000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:8000
   ```

3. **Start Backend Server**
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

### 3. Frontend Setup

1. **Start Frontend Server**
   ```bash
   # In the main directory (where index.html is located)
   python -m http.server 8000
   ```

2. **Test the Integration**
   - Open `http://localhost:8000` in your browser
   - Fill out the feedback form or contact form
   - Check your MongoDB Atlas dashboard to see the data

### 4. API Endpoints

#### Feedback API
- `POST /api/feedback` - Submit feedback
- `GET /api/feedback` - Get all feedback (admin)
- `GET /api/feedback/stats` - Get feedback statistics
- `PATCH /api/feedback/:id/status` - Update feedback status

#### Contact API
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (admin)
- `GET /api/contact/stats` - Get contact statistics
- `GET /api/contact/:id` - Get specific contact
- `PATCH /api/contact/:id/status` - Update contact status

#### Health Check
- `GET /api/health` - Check API status

### 5. Database Collections

The system creates two collections in MongoDB:

#### `feedback` Collection
```javascript
{
  type: "suggestion|bug|feature|general|compliment",
  message: "User feedback message",
  rating: 1-5, // Optional
  email: "user@example.com", // Optional
  status: "new|reviewed|in-progress|resolved|closed",
  submittedAt: Date,
  // ... metadata fields
}
```

#### `contacts` Collection
```javascript
{
  name: "User Name",
  email: "user@example.com",
  phone: "+1234567890", // Optional
  city: "mumbai|delhi|bangalore|...",
  subject: "general|partnership|support|feedback|media",
  message: "Contact message",
  status: "new|contacted|in-progress|resolved|closed",
  priority: "low|medium|high|urgent",
  submittedAt: Date,
  // ... metadata fields
}
```

### 6. Security Features

- ✅ **Rate Limiting**: 100 requests per 15 minutes per IP
- ✅ **CORS Protection**: Only allows requests from frontend URL
- ✅ **Input Validation**: Validates all form data
- ✅ **Helmet Security**: Adds security headers
- ✅ **Data Sanitization**: Prevents injection attacks

### 7. Production Deployment

#### Backend (Node.js)
- Deploy to Heroku, Vercel, Railway, or any Node.js hosting
- Set environment variables in hosting platform
- Update `FRONTEND_URL` to your production domain

#### Frontend (Static)
- Deploy to Netlify, Vercel, GitHub Pages, or any static hosting
- Update API URLs in JavaScript to point to production backend

### 8. Monitoring & Analytics

#### View Data in MongoDB Atlas
1. Go to your Atlas cluster
2. Click "Browse Collections"
3. Select `parkease` database
4. View `feedback` and `contacts` collections

#### API Statistics
- `GET /api/feedback/stats` - Feedback analytics
- `GET /api/contact/stats` - Contact form analytics

### 9. Troubleshooting

#### Common Issues:
1. **Connection Error**: Check MongoDB URI and network access
2. **CORS Error**: Verify `FRONTEND_URL` in `.env`
3. **Validation Error**: Check required fields in forms
4. **Rate Limit**: Wait 15 minutes or adjust limits in `server.js`

#### Debug Mode:
Set `NODE_ENV=development` in `.env` for detailed error messages.

### 10. Next Steps

- Set up email notifications for new submissions
- Create admin dashboard for managing feedback/contacts
- Add authentication for admin endpoints
- Implement data export functionality
- Set up automated backups

## 📞 Support

For issues or questions, contact the ParkEase development team.