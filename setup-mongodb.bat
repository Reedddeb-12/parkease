@echo off
echo ========================================
echo   MongoDB Atlas Setup Helper
echo ========================================
echo.

echo This script will help you configure MongoDB Atlas
echo.
echo 📋 Before continuing, make sure you have:
echo    1. Created a MongoDB Atlas account
echo    2. Created a cluster
echo    3. Created a database user
echo    4. Configured network access (0.0.0.0/0)
echo    5. Copied your connection string
echo.
echo If you haven't done these steps, press Ctrl+C to exit
echo and follow the MONGODB_SETUP_GUIDE.md file
echo.
pause

echo.
echo Opening MongoDB Atlas Setup Guide...
start MONGODB_SETUP_GUIDE.md

echo.
echo Opening MongoDB Atlas website...
timeout /t 2 /nobreak >nul
start https://www.mongodb.com/cloud/atlas

echo.
echo ========================================
echo   Enter Your MongoDB Connection String
echo ========================================
echo.
echo Your connection string should look like:
echo mongodb+srv://username:password@cluster.xxxxx.mongodb.net/parkease?retryWrites=true^&w=majority
echo.
echo IMPORTANT: Make sure to:
echo  - Replace ^<password^> with your actual password
echo  - Add /parkease before the ? in the URL
echo.

set /p MONGODB_URI="Paste your connection string here: "

echo.
echo Updating .env file...

(
echo # MongoDB Atlas Configuration
echo MONGODB_URI=%MONGODB_URI%
echo.
echo # Server Configuration
echo PORT=3000
echo NODE_ENV=development
echo.
echo # CORS Configuration
echo FRONTEND_URL=http://localhost:8000
echo.
echo # Rate Limiting
echo RATE_LIMIT_WINDOW_MS=900000
echo RATE_LIMIT_MAX_REQUESTS=100
) > .env

echo.
echo ✅ .env file updated successfully!
echo.
echo ========================================
echo   Testing MongoDB Connection
echo ========================================
echo.

echo Starting backend server to test connection...
echo.

start cmd /k "npm run dev"

echo.
echo ⏳ Waiting for server to start...
timeout /t 5 /nobreak >nul

echo.
echo Check the Node.js window that just opened:
echo  ✅ If you see "Connected to MongoDB Atlas" - SUCCESS!
echo  ❌ If you see "MongoDB connection error" - Check your connection string
echo.
echo ========================================
echo   Next Steps
echo ========================================
echo.
echo 1. Verify the backend server connected successfully
echo 2. Go to http://localhost:8000
echo 3. Test the feedback form or contact form
echo 4. Check MongoDB Atlas dashboard to see your data
echo.
echo Press any key to exit...
pause >nul