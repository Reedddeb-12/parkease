# Render Deployment Troubleshooting Guide

## Issue: Forms Not Saving to Database on Render

### Step 1: Check Render Logs

1. Go to your Render dashboard: https://dashboard.render.com
2. Click on your `parkease` service
3. Click on "Logs" tab
4. Look for errors when you submit a form

**Common errors to look for:**
- `MongoServerError: bad auth`
- `ECONNREFUSED`
- `404 Not Found`
- `CORS error`

### Step 2: Verify Environment Variables

1. In Render dashboard, go to your service
2. Click "Environment" in left sidebar
3. Verify these variables are set:

| Variable | Should Be Set To |
|----------|------------------|
| `MONGODB_URI` | Your full MongoDB connection string |
| `NODE_ENV` | `production` |

**Important:** Make sure `MONGODB_URI` includes:
- Username and password
- Cluster URL
- Database name (`parkease`)
- All query parameters

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/parkease?retryWrites=true&w=majority
```

### Step 3: Check MongoDB Atlas Network Access

1. Go to MongoDB Atlas: https://cloud.mongodb.com
2. Click on "Network Access" in left sidebar
3. Make sure you have one of these:
   - IP Address: `0.0.0.0/0` (Allow access from anywhere)
   - OR add Render's IP addresses

**To allow all IPs:**
- Click "Add IP Address"
- Click "Allow Access from Anywhere"
- Click "Confirm"

### Step 4: Test API Endpoints Directly

Open these URLs in your browser (replace with your actual Render URL):

**Health Check:**
```
https://parkease.onrender.com/api/health
```
Should return:
```json
{
  "status": "OK",
  "message": "ParkEase API is running",
  "timestamp": "...",
  "environment": "production"
}
```

**If health check fails:**
- Service is not running
- Check Render logs for startup errors

### Step 5: Test Form Submission with Browser Console

1. Open your Render site: `https://parkease.onrender.com`
2. Open browser DevTools (F12)
3. Go to "Console" tab
4. Submit a form
5. Look for errors

**Common console errors:**

**Error: "Failed to fetch"**
- API endpoint is wrong
- Server is not responding
- CORS issue

**Error: "404 Not Found"**
- API route doesn't exist
- Check server.js routes

**Error: "500 Internal Server Error"**
- Database connection failed
- Check Render logs
- Verify MONGODB_URI

### Step 6: Check Network Tab

1. Open DevTools → Network tab
2. Submit a form
3. Look for the API request (e.g., `/api/feedback`)
4. Click on it to see:
   - Request URL
   - Status code
   - Response

**Status Codes:**
- `201` = Success ✅
- `400` = Bad request (validation error)
- `404` = Route not found
- `500` = Server error
- `503` = Service unavailable (cold start)

### Step 7: Manual API Test with curl

Test your API directly:

```bash
curl -X POST https://parkease.onrender.com/api/feedback \
  -H "Content-Type: application/json" \
  -d '{
    "type": "suggestion",
    "message": "Test feedback from curl",
    "rating": 5,
    "email": "test@example.com"
  }'
```

Should return:
```json
{
  "success": true,
  "message": "Thank you for your feedback!",
  "data": { ... }
}
```

### Step 8: Verify Database User Permissions

1. Go to MongoDB Atlas
2. Click "Database Access"
3. Find your database user
4. Make sure it has:
   - Role: `Atlas admin` OR `Read and write to any database`
   - Status: Active (not expired)

### Step 9: Check if Service is Sleeping (Free Tier)

**Render Free Tier:**
- Services sleep after 15 minutes of inactivity
- First request takes 30-60 seconds to wake up
- You'll see "503 Service Unavailable" during cold start

**Solution:**
- Wait 30-60 seconds and try again
- Or upgrade to paid plan ($7/month)

### Step 10: Force Redeploy

Sometimes a fresh deployment helps:

1. Go to Render dashboard
2. Click your service
3. Click "Manual Deploy" → "Deploy latest commit"
4. Wait for deployment to complete
5. Test again

## Quick Checklist

- [ ] Environment variable `MONGODB_URI` is set correctly
- [ ] MongoDB Atlas allows connections from `0.0.0.0/0`
- [ ] Database user has read/write permissions
- [ ] Service is running (not sleeping)
- [ ] `/api/health` endpoint returns 200 OK
- [ ] Browser console shows no errors
- [ ] Network tab shows 201 status for form submissions
- [ ] Render logs show no errors

## Still Not Working?

### Get Detailed Logs

Add this to your form submission code temporarily to see what's happening:

```javascript
console.log('Submitting to:', apiUrl);
console.log('Data:', feedbackData);

const response = await fetch(apiUrl, { ... });
console.log('Response status:', response.status);
console.log('Response:', await response.json());
```

### Check Render Build Logs

1. Go to Render dashboard
2. Click "Events" tab
3. Look at the latest deployment
4. Check for build errors

### Contact Support

If nothing works:
- Render Support: https://render.com/docs/support
- MongoDB Support: https://www.mongodb.com/docs/atlas/support/

## Common Solutions

### Solution 1: Wrong MongoDB URI
```bash
# In Render Environment, update MONGODB_URI to:
mongodb+srv://username:password@cluster.mongodb.net/parkease?retryWrites=true&w=majority
```

### Solution 2: CORS Issue
Already handled in server.js, but verify:
```javascript
app.use(cors());
```

### Solution 3: Port Issue
Render sets PORT automatically, but verify in server.js:
```javascript
const PORT = process.env.PORT || 3000;
```

### Solution 4: Static Files Not Serving
Verify in server.js:
```javascript
app.use(express.static(__dirname));
```

## Test Locally First

Before debugging Render, test locally:

1. Start server: `npm start`
2. Open: `http://localhost:3000`
3. Submit forms
4. Run: `node test-db-connection.js`
5. Verify data appears in MongoDB

If it works locally but not on Render, it's a deployment/environment issue.
