# MongoDB Atlas Setup Guide for ParkEase

## 📋 Step-by-Step Instructions

### Step 1: Create MongoDB Atlas Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with your email or Google account
3. Choose the **FREE** tier (M0 Sandbox)

### Step 2: Create a Cluster
1. After login, click **"Build a Database"**
2. Choose **"M0 FREE"** tier
3. Select a cloud provider (AWS recommended)
4. Choose a region closest to you (e.g., Mumbai for India)
5. Name your cluster: `parkease-cluster`
6. Click **"Create"** (takes 3-5 minutes)

### Step 3: Create Database User
1. Click **"Database Access"** in left sidebar
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Username: `parkease-admin`
5. Password: Click **"Autogenerate Secure Password"** (SAVE THIS!)
6. Database User Privileges: **"Read and write to any database"**
7. Click **"Add User"**

### Step 4: Configure Network Access
1. Click **"Network Access"** in left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for development)
   - This adds `0.0.0.0/0`
4. Click **"Confirm"**

### Step 5: Get Connection String
1. Go back to **"Database"** (Clusters)
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Driver: **Node.js**
5. Version: **4.1 or later**
6. Copy the connection string (looks like):
   ```
   mongodb+srv://parkease-admin:<password>@parkease-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
7. **IMPORTANT**: Replace `<password>` with the password you saved earlier

### Step 6: Update .env File
1. Open the `.env` file in your project folder
2. Replace the `MONGODB_URI` line with your connection string
3. Make sure to replace `<password>` with your actual password
4. Add database name to the connection string:
   ```
   mongodb+srv://parkease-admin:YOUR_PASSWORD@parkease-cluster.xxxxx.mongodb.net/parkease?retryWrites=true&w=majority
   ```
   (Notice `/parkease` before the `?`)

### Step 7: Restart Backend Server
1. Close the Node.js command window
2. Open new terminal in project folder
3. Run: `npm run dev`
4. You should see: "✅ Connected to MongoDB Atlas"

### Step 8: Test the Integration
1. Go to http://localhost:8000
2. Fill out the feedback form or contact form
3. Submit the form
4. You should see a success message!

### Step 9: View Your Data in MongoDB Atlas
1. Go to MongoDB Atlas dashboard
2. Click **"Browse Collections"**
3. Select `parkease` database
4. You'll see two collections:
   - `feedback` - All feedback submissions
   - `contacts` - All contact form submissions

## 🔒 Security Notes

### For Production:
1. **Change Network Access**: Remove `0.0.0.0/0` and add only your server's IP
2. **Use Environment Variables**: Never commit `.env` file to Git
3. **Rotate Passwords**: Change database password regularly
4. **Enable Monitoring**: Set up Atlas alerts for unusual activity

## 🆘 Troubleshooting

### Error: "Authentication failed"
- Check if password in connection string is correct
- Make sure you replaced `<password>` with actual password
- Verify database user exists in "Database Access"

### Error: "Connection timeout"
- Check "Network Access" settings
- Make sure `0.0.0.0/0` is added
- Wait a few minutes for changes to propagate

### Error: "Cannot connect to cluster"
- Verify cluster is running (not paused)
- Check internet connection
- Try a different region if connection is slow

## 📊 Database Structure

### Feedback Collection
```javascript
{
  _id: ObjectId,
  type: "suggestion|bug|feature|general|compliment",
  message: "User feedback text",
  rating: 1-5,
  email: "user@example.com",
  status: "new",
  submittedAt: ISODate,
  userAgent: "Browser info",
  ipAddress: "User IP"
}
```

### Contacts Collection
```javascript
{
  _id: ObjectId,
  name: "User Name",
  email: "user@example.com",
  phone: "+1234567890",
  city: "mumbai",
  subject: "general|partnership|support|feedback|media",
  message: "Contact message",
  status: "new",
  priority: "medium",
  submittedAt: ISODate,
  userAgent: "Browser info",
  ipAddress: "User IP"
}
```

## 🎯 Next Steps After Setup

1. **Test Forms**: Submit test data through website
2. **View Data**: Check MongoDB Atlas dashboard
3. **Set Up Alerts**: Configure email notifications
4. **Create Indexes**: Optimize query performance
5. **Backup Strategy**: Enable automated backups

## 📞 Support

If you encounter issues:
1. Check MongoDB Atlas status page
2. Review connection string format
3. Verify all credentials
4. Check firewall settings

---

**Your ParkEase database is ready! 🎉**