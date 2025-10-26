@echo off
echo ========================================
echo    ParkEase - Starting Full Stack
echo ========================================
echo.

REM Check if .env exists
if not exist .env (
    echo Creating .env file...
    copy .env.example .env
    echo.
    echo ⚠️  IMPORTANT: Edit .env file with your MongoDB Atlas connection string
    echo    Then run this script again.
    echo.
    pause
    exit /b 1
)

echo Starting Backend Server...
echo.
start cmd /k "npm run dev"

timeout /t 3 /nobreak >nul

echo Starting Frontend Server...
echo.
start cmd /k "python -m http.server 8000"

timeout /t 2 /nobreak >nul

echo.
echo ========================================
echo ✅ ParkEase is starting!
echo ========================================
echo.
echo 🌐 Frontend: http://localhost:8000
echo 🔧 Backend:  http://localhost:3000
echo.
echo Opening website in browser...
timeout /t 2 /nobreak >nul

start http://localhost:8000

echo.
echo 📝 Note: Two command windows will open
echo    - One for Backend (Node.js)
echo    - One for Frontend (Python)
echo.
echo ⚠️  Do NOT close those windows while using the website!
echo.
echo Press any key to exit this window...
pause >nul