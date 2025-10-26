@echo off
echo ========================================
echo ParkEase - Push to GitHub
echo ========================================
echo.

REM Check if repository URL is provided
if "%1"=="" (
    echo ERROR: Please provide your GitHub repository URL
    echo.
    echo Usage: push-to-github.bat YOUR_REPO_URL
    echo Example: push-to-github.bat https://github.com/yourusername/parkease.git
    echo.
    echo Steps to get your repository URL:
    echo 1. Go to https://github.com/new
    echo 2. Create a new repository (e.g., "parkease")
    echo 3. Don't initialize with README or .gitignore
    echo 4. Copy the repository URL from the setup page
    echo.
    pause
    exit /b 1
)

echo Setting up remote repository...
git remote add origin %1

echo.
echo Renaming branch to main...
git branch -M main

echo.
echo Pushing code to GitHub...
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo SUCCESS! Code pushed to GitHub
    echo ========================================
    echo.
    echo Your repository is now live at:
    echo %1
    echo.
) else (
    echo.
    echo ========================================
    echo ERROR: Failed to push to GitHub
    echo ========================================
    echo.
    echo Common issues:
    echo - Repository URL is incorrect
    echo - You don't have permission to push
    echo - Remote 'origin' already exists (run: git remote remove origin)
    echo.
)

pause
