@echo off
echo 🚀 Setting up ParkEase with MongoDB Atlas Integration
echo ==================================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    echo    Visit: https://nodejs.org/
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ Node.js and npm are installed

REM Install dependencies
echo 📦 Installing dependencies...
npm install

REM Create .env file if it doesn't exist
if not exist .env (
    echo 📝 Creating .env file...
    copy .env.example .env
    echo ⚠️  Please edit .env file with your MongoDB Atlas connection string
) else (
    echo ✅ .env file already exists
)

REM Create directories if they don't exist
if not exist models mkdir models
if not exist routes mkdir routes
if not exist assets mkdir assets
if not exist assets\images mkdir assets\images

echo.
echo 🎉 Setup complete!
echo.
echo Next steps:
echo 1. Edit .env file with your MongoDB Atlas connection string
echo 2. Start the backend server: npm run dev
echo 3. In another terminal, start frontend: python -m http.server 8000
echo 4. Open http://localhost:8000 in your browser
echo.
echo 📚 See README.md for detailed setup instructions
pause