# Deploy ParkEase to Render - Complete Guide

## Prerequisites
- GitHub repository with your code (✅ Already done!)
- Render account (free tier available at https://render.com)
- MongoDB Atlas connection string

## Step 1: Sign Up / Log In to Render

1. Go to [https://render.com](https://render.com)
2. Sign up or log in (you can use your GitHub account)

## Step 2: Create New Web Service

1. Click "New +" button in the top right
2. Select "Web Service"
3. Connect your GitHub account if not already connected
4. Select your repository: `Reedddeb-12/parkease`
5. Click "Connect"

## Step 3: Configure Your Web Service

Fill in the following settings:

### Basic Settings
- **Name**: `parkease` (or your preferred name)
- **Region**: Choose closest to your location
- **Branch**: `main`
- **Root Directory**: Leave blank
- **Runtime**: `Node`

### Build & Deploy Settings
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### Instance Type
- **Free** (or choose paid plan for better performance)

## Step 4: Add Environment Variables

Click "Advanced" and add these environment variables:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `MONGODB_URI` | Your MongoDB Atlas connection string |
| `PORT` | `10000` (Render will set this automatically) |

**Important**: Use your actual MongoDB Atlas connection string:
```
mongodb+srv://username:password@cluster.mongodb.net/parkease?retryWrites=true&w=majority
```

## Step 5: Deploy

1. Click "Create Web Service"
2. Render will automatically:
   - Clone your repository
   - Install dependencies
   - Start your server
3. Wait 2-5 minutes for the first deployment

## Step 6: Access Your Website

Once deployed, you'll get a URL like:
```
https://parkease.onrender.com
```

Your website will be live with:
- ✅ Frontend (HTML/CSS/JS)
- ✅ Backend API
- ✅ MongoDB integration
- ✅ All forms working

## Important Notes

### Free Tier Limitations
- Service spins down after 15 minutes of inactivity
- First request after inactivity takes 30-60 seconds (cold start)
- 750 hours/month free (enough for one service running 24/7)

### MongoDB Atlas Setup
Make sure your MongoDB Atlas is configured:
1. Network Access: Add `0.0.0.0/0` to allow connections from anywhere
2. Database User: Has read/write permissions
3. Connection String: Updated in Render environment variables

### Automatic Deployments
Render automatically redeploys when you push to GitHub:
```bash
git add .
git commit -m "Update website"
git push origin main
```

## Troubleshooting

### Deployment Failed
- Check the logs in Render dashboard
- Verify all environment variables are set correctly
- Ensure MongoDB connection string is valid

### Website Not Loading
- Check if service is running (not sleeping)
- View logs for errors
- Verify PORT is set correctly

### Forms Not Working
- Check MongoDB Atlas network access settings
- Verify MONGODB_URI environment variable
- Check API logs in Render dashboard

### 503 Service Unavailable
- Service is starting up (cold start on free tier)
- Wait 30-60 seconds and refresh

## Monitoring Your Deployment

### View Logs
1. Go to your service in Render dashboard
2. Click "Logs" tab
3. See real-time server logs

### Check Health
Visit: `https://your-app.onrender.com/api/health`

Should return:
```json
{
  "status": "OK",
  "message": "ParkEase API is running",
  "timestamp": "2024-10-26T...",
  "environment": "production"
}
```

## Upgrading to Paid Plan

For better performance:
- No cold starts
- More resources
- Custom domains
- Starting at $7/month

## Custom Domain (Optional)

1. Go to Settings in Render dashboard
2. Click "Custom Domain"
3. Add your domain (e.g., parkease.com)
4. Update DNS records as instructed

## Support

- Render Docs: https://render.com/docs
- Render Community: https://community.render.com
- MongoDB Atlas Support: https://www.mongodb.com/docs/atlas/

## Next Steps After Deployment

1. Test all features on the live site
2. Share the URL with your team
3. Monitor logs for any errors
4. Set up custom domain (optional)
5. Consider upgrading for production use
