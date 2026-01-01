#!/bin/bash

clear
echo ""
echo "🎬========================================"
echo "   YouTube Video Cropper - Web Version"
echo "========================================"
echo ""

# Change to the script's directory
cd "$(dirname "$0")"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo ""
    echo "🔗 Opening Node.js download page..."
    open "https://nodejs.org"
    echo ""
    echo "📋 After installing Node.js:"
    echo "   1. Close this window"
    echo "   2. Double-click START-MAC.command again"
    echo ""
    read -p "Press Enter to exit..."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Auto-install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 First time setup - installing dependencies..."
    echo "   This will take a moment..."
    echo ""
    npm install --silent
    if [ $? -ne 0 ]; then
        echo ""
        echo "❌ Setup failed! Please check your internet connection."
        read -p "Press Enter to exit..."
        exit 1
    fi
    echo "✅ Setup complete!"
    echo ""
fi

echo "🚀 Starting YouTube Video Cropper..."
echo "🌐 Opening browser automatically..."
echo ""
echo "💡 To stop: Close this window or press Ctrl+C"
echo ""
echo "=========================================="
echo ""

# Start the server
npm start
