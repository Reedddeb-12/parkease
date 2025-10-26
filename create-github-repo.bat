@echo off
echo ========================================
echo   Create GitHub Repository
echo ========================================
echo.

echo This script will help you push ParkEase to GitHub
echo.
echo 📋 Before continuing, you need to:
echo    1. Have a GitHub account
echo    2. Create a new repository on GitHub.com
echo.
echo ========================================
echo   Step 1: Create Repository on GitHub
echo ========================================
echo.
echo Opening GitHub in your browser...
timeout /t 2 /nobreak >nul
start https://github.com/new

echo.
echo On GitHub:
echo  1. Repository name: parkease
echo  2. Description: Smart Parking Solutions for India
echo  3. Visibility: Public or Private (your choice)
echo  4. DO NOT initialize with README (we already have one)
echo  5. Click "Create repository"
echo.
echo After creating the repository, come back here.
echo.
pause

echo.
echo ========================================
echo   Step 2: Enter Repository URL
echo ========================================
echo.
echo Your repository URL should look like:
echo https://github.com/YOUR_USERNAME/parkease.git
echo.

set /p REPO_URL="Paste your repository URL here: "

echo.
echo Adding remote repository...
git remote add origin %REPO_URL%

echo.
echo Renaming branch to main...
git branch -M main

echo.
echo ========================================
echo   Step 3: Push to GitHub
echo ========================================
echo.
echo Pushing code to GitHub...
echo.

git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo   ✅ SUCCESS!
    echo ========================================
    echo.
    echo Your ParkEase code is now on GitHub!
    echo.
    echo Opening your repository...
    timeout /t 2 /nobreak >nul
    start %REPO_URL:.git=%
    echo.
) else (
    echo.
    echo ========================================
    echo   ❌ Push Failed
    echo ========================================
    echo.
    echo You may need to authenticate with GitHub.
    echo.
    echo Options:
    echo  1. Use GitHub Desktop
    echo  2. Set up SSH keys
    echo  3. Use Personal Access Token
    echo.
    echo Visit: https://docs.github.com/en/authentication
    echo.
)

echo Press any key to exit...
pause >nul