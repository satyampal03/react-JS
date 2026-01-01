@echo off
color 0A
cls
echo.
echo 🎬========================================
echo   YouTube Video Cropper - Web Version
echo ========================================
echo.

REM Change to script directory
cd /d "%~dp0"

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed!
    echo.
    echo 🔗 Opening Node.js download page...
    start https://nodejs.org
    echo.
    echo 📋 After installing Node.js:
    echo    1. Close this window
    echo    2. Double-click START-WINDOWS.bat again
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js found!
for /f "tokens=*" %%i in ('node --version') do echo    Version: %%i
echo.

REM Auto-install dependencies if needed
if not exist "node_modules" (
    echo 📦 First time setup - installing dependencies...
    echo    This will take a moment...
    echo.
    npm install --silent
    if %errorlevel% neq 0 (
        echo.
        echo ❌ Setup failed! Please check your internet connection.
        pause
        exit /b 1
    )
    echo ✅ Setup complete!
    echo.
)

echo 🚀 Starting YouTube Video Cropper...
echo 🌐 Opening browser automatically...
echo.
echo 💡 To stop: Close this window or press Ctrl+C
echo.
echo ==========================================
echo.

REM Start the server
npm start
