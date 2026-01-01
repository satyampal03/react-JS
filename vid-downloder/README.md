# YouTube Video Cropper - Web Version

**🎉 No more installer issues! No more uninstall problems!**

This web-based version eliminates all the Windows installer and uninstaller issues while keeping the exact same functionality and beautiful UI.

## ✨ Features

- **Local Processing**: All video processing happens on your computer - no cloud uploads
- **Same UI**: Identical interface to the desktop version
- **Cross-Platform**: Works on Windows, Mac, and Linux
- **No Installation**: Just run a script - no complex installers
- **Easy Sharing**: Share as a simple ZIP file
- **YouTube & Local Files**: Download from YouTube or process local video files
- **Batch Clip Extraction**: Extract multiple clips with custom start/end times

## 🚀 Quick Start

### Windows Users
1. **Double-click**: `START-WINDOWS.bat`
2. **Wait**: Server starts and browser opens automatically
3. **Use**: Same interface you're familiar with!

### macOS Users
1. **Double-click**: `START-MAC.command` (or run in Terminal: `bash START-MAC.command`)
2. **Wait**: Server starts and browser opens automatically  
3. **Use**: Same interface you're familiar with!

### Linux Users
Use the Manual Start steps below.

### Manual Start (Any OS)
```bash
npm install               # First time only
npm run build             # Build frontend
npm start                 # Starts server on http://localhost:3000

# Custom port examples:
# macOS/Linux
PORT=3001 npm start
# Windows (cmd)
set PORT=3001 && npm start
```

## 📋 Requirements

- **Node.js** (Download from: https://nodejs.org)
- **Internet connection** (for YouTube downloads and yt-dlp installation)

## 🔧 How It Works

1. **Local Server**: Runs Node.js server on `localhost:3000` (or `PORT` env)
2. **Browser UI**: Your browser becomes the interface
3. **Local Processing**: FFmpeg and yt-dlp run locally on your machine
4. **Same Features**: YouTube downloads, local file processing, batch clip extraction

## 🎯 Key Benefits vs Desktop Version

| Feature | Desktop App | Web Version |
|---------|-------------|-------------|
| **Installation** | Complex installer | Just run script |
| **Uninstall** | Often fails on Windows | Delete folder |
| **Updates** | Download new installer | Git pull or new ZIP |
| **Cross-Platform** | Separate builds | One codebase |
| **Debugging** | Hard to troubleshoot | Standard browser tools |
| **Sharing** | Large installer files | Simple ZIP |

## 📁 File Structure

```
YouTube-Video-Cropper-Web/
├── START-WINDOWS.bat     # Windows launcher
├── START-MAC.command     # macOS launcher  
├── server.js             # Backend server
├── package.json          # Dependencies
├── dist/                 # Built frontend
├── src/                  # Source code
├── uploads/              # Temporary uploads
└── bin/                  # Downloaded tools (yt-dlp)
```

## 🔒 Privacy & Security

- **100% Local**: Nothing is sent to external servers
- **No Tracking**: No analytics or data collection
- **No Cloud**: Videos never leave your computer
- **Same Privacy**: Identical to desktop version

## 🛠️ Troubleshooting

### Server Won't Start
- Install Node.js from https://nodejs.org
- Run `npm install` in the project folder
- Check if port 3000 is available

### Browser Doesn't Open
- Manually go to: http://localhost:3000
- Try a different browser

### yt-dlp Issues
- Click "Install yt-dlp" button in the app
- Or manually install: `npm install -g yt-dlp`

### Health Check
- Visit `http://localhost:3000/health` (or your custom port) to verify the server and tools are available.

### FFmpeg Issues
- FFmpeg is bundled automatically
- No manual installation needed

## 🆚 Comparison: Web vs Desktop

**Web Version Advantages:**
- ✅ No Windows installer/uninstaller issues
- ✅ Easier to share and distribute
- ✅ Cross-platform without separate builds
- ✅ Easier debugging with browser dev tools
- ✅ No code signing or notarization needed

**Desktop Version Advantages:**
- ✅ No need to keep terminal/command prompt open
- ✅ Native file dialogs
- ✅ Can run without Node.js

## 📞 Support

If you encounter any issues:
1. Check the console/terminal output for error messages  
2. Try refreshing the browser page
3. Restart the server (Ctrl+C, then run start script again)
4. Make sure Node.js is properly installed

---

**🎉 Enjoy your installer-free video cropping experience!**
