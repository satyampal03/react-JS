const express = require('express')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { exec, spawn } = require('child_process')
const glob = require('glob')
const { https } = require('follow-redirects')
const extract = require('extract-zip')
const ffmpegPath = require('ffmpeg-static')
const os = require('os')

const app = express()
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

// Storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads')
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage })

// Global paths
let ytDlpPath = null

// Utility functions
function getConfigPath() {
  const configDir = path.join(os.homedir(), '.youtube-cropper')
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true })
  }
  return path.join(configDir, 'config.json')
}

function loadConfig() {
  try {
    const configPath = getConfigPath()
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
      console.log('📂 Loaded config:', config)
      return config
    }
  } catch (error) {
    console.log('⚠️ Error loading config:', error.message)
  }
  return {}
}

function saveConfig(config) {
  try {
    const configPath = getConfigPath()
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2))
    console.log('💾 Saved config:', config)
  } catch (error) {
    console.error('❌ Error saving config:', error.message)
  }
}

function which(cmd) {
  return new Promise((resolve) => {
    const check = process.platform === 'win32' ? 'where' : 'which'
    const proc = spawn(check, [cmd])
    let output = ''
    proc.stdout.on('data', (data) => (output += data.toString()))
    proc.on('close', (code) => {
      resolve(code === 0 ? output.trim().split('\n')[0] : null)
    })
  })
}

async function findYtDlp() {
  if (ytDlpPath) return ytDlpPath

  const config = loadConfig()
  if (config.ytDlpPath && fs.existsSync(config.ytDlpPath)) {
    console.log('✅ Found yt-dlp from config:', config.ytDlpPath)
    ytDlpPath = config.ytDlpPath
    return ytDlpPath
  }

  const systemYtDlp = await which('yt-dlp')
  if (systemYtDlp) {
    console.log('✅ Found system yt-dlp:', systemYtDlp)
    ytDlpPath = systemYtDlp
    return ytDlpPath
  }

  console.log('❌ yt-dlp not found')
  return null
}

async function downloadYtDlp() {
  return new Promise((resolve, reject) => {
    const isWindows = process.platform === 'win32'
    const fileName = isWindows ? 'yt-dlp.exe' : 'yt-dlp'
    const targetPath = path.join(__dirname, 'bin', fileName)
    const url = isWindows 
      ? 'https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe'
      : 'https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp'

    const targetDir = path.dirname(targetPath)
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true })
    }

    console.log('⬇️ Downloading yt-dlp...')
    const file = fs.createWriteStream(targetPath)
    
    https.get(url, (response) => {
      response.pipe(file)
      file.on('finish', () => {
        file.close()
        if (!isWindows) {
          fs.chmodSync(targetPath, '755')
        }
        
        const config = loadConfig()
        config.ytDlpPath = targetPath
        saveConfig(config)
        
        ytDlpPath = targetPath
        console.log('✅ yt-dlp downloaded successfully')
        resolve(targetPath)
      })
    }).on('error', (err) => {
      console.error('❌ Error downloading yt-dlp:', err.message)
      reject(err)
    })
  })
}

// API Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

// Check dependencies
app.get('/api/deps', async (req, res) => {
  try {
    const ffmpeg = ffmpegPath // Always available via ffmpeg-static
    const ytdlp = await findYtDlp()
    
    res.json({
      ffmpeg: {
        installed: !!ffmpeg,
        path: ffmpeg,
        status: ffmpeg ? 'Ready' : 'Not found'
      },
      ytdlp: {
        installed: !!ytdlp,
        path: ytdlp,
        status: ytdlp ? 'Ready' : 'Not found'
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Install yt-dlp
app.post('/api/install-ytdlp', async (req, res) => {
  try {
    const path = await downloadYtDlp()
    res.json({ success: true, path, message: 'yt-dlp installed successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Upload local file
app.post('/api/upload', upload.single('video'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' })
  }
  res.json({ 
    success: true, 
    filePath: req.file.path,
    originalName: req.file.originalname
  })
})

// Get file metadata
app.post('/api/metadata', (req, res) => {
  const { filePath } = req.body
  
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' })
  }

  const cmd = `"${ffmpegPath}" -i "${filePath}" -f null - 2>&1`
  
  exec(cmd, (error, stdout, stderr) => {
    const output = stderr || stdout
    const durationMatch = output.match(/Duration: (\d{2}:\d{2}:\d{2}\.\d{2})/)
    const sizeMatch = output.match(/Stream.*Video.*?(\d+x\d+)/)
    
    const duration = durationMatch ? durationMatch[1] : 'Unknown'
    const resolution = sizeMatch ? sizeMatch[1] : 'Unknown'
    
    // Get file size
    const stats = fs.statSync(filePath)
    const fileSizeInBytes = stats.size
    const fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(2)
    
    res.json({
      duration,
      resolution,
      size: `${fileSizeInMB} MB`,
      sizeBytes: fileSizeInBytes
    })
  })
})

// Get YouTube info
app.post('/api/youtube-info', async (req, res) => {
  try {
    const { url } = req.body
    const ytdlp = await findYtDlp()
    
    if (!ytdlp) {
      return res.status(400).json({ error: 'yt-dlp not found. Please install it first.' })
    }

    // Prefer robust JSON output to avoid 'NA' duration
    const cmd = `"${ytdlp}" -j --no-playlist "${url}"`
    const formatSeconds = (sec) => {
      const s = Number(sec)
      if (!isFinite(s) || s <= 0) return 'Unknown'
      const h = Math.floor(s / 3600)
      const m = Math.floor((s % 3600) / 60)
      const ss = Math.floor(s % 60)
      return `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${ss.toString().padStart(2,'0')}`
    }

    exec(cmd, (error, stdout, stderr) => {
      // Fallback to old printer if JSON fails entirely
      const fallback = () => {
        const alt = `"${ytdlp}" --print "%(title)s|%(duration)s|%(filesize,filesize_approx)s" "${url}"`
        exec(alt, (err2, out2, err2s) => {
          if (err2) {
            return res.status(500).json({ error: err2s || err2.message })
          }
          const [title, durationRaw, filesize] = (out2 || '').trim().split('|')
          const durNum = Number(durationRaw)
          const durationFormatted = isFinite(durNum) && durNum > 0 ? formatSeconds(durNum) : 'Unknown'
          const sizeMb = (Number(filesize) / (1024*1024))
          const filesizeFormatted = isFinite(sizeMb) && sizeMb > 0 ? `${sizeMb.toFixed(2)} MB` : 'Unknown'
          return res.json({ title: title || 'Unknown', duration: durationFormatted, durationSeconds: isFinite(durNum)? durNum : undefined, size: filesizeFormatted })
        })
      }

      if (error) {
        return fallback()
      }

      try {
        // Some wrappers may prepend logs; find first JSON line
        const jsonLine = (stdout || '').split('\n').find(l => l.trim().startsWith('{')) || '{}'
        const info = JSON.parse(jsonLine)
        const title = info.title || 'Unknown'
        const durationSeconds = Number(info.duration)
        const duration = isFinite(durationSeconds) && durationSeconds > 0 ? formatSeconds(durationSeconds) : (info.duration_string || 'Unknown')
        return res.json({ title, duration, durationSeconds })
      } catch (_) {
        return fallback()
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Download YouTube video
app.post('/api/download-youtube', async (req, res) => {
  try {
    const { url, outputDir, sourceId } = req.body
    const ytdlp = await findYtDlp()
    
    if (!ytdlp) {
      return res.status(400).json({ error: 'yt-dlp not found. Please install it first.' })
    }

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    const outputTemplate = path.join(outputDir, `Combined_${sourceId}_%(title)s.%(ext)s`)
    const cmd = `"${ytdlp}" --ffmpeg-location "${ffmpegPath}" -f "bestvideo[height<=1080]+bestaudio/best[height<=1080]" --merge-output-format mp4 -o "${outputTemplate}" "${url}"`
    
    console.log('🎬 Starting YouTube download:', cmd)
    
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error('❌ Download error:', stderr)
        return res.status(500).json({ error: stderr || error.message })
      }
      
      // Find the downloaded file
      const pattern = path.join(outputDir, `Combined_${sourceId}_*.mp4`)
      const files = glob.sync(pattern)
      
      if (files.length > 0) {
        console.log('✅ Download completed:', files[0])
        let sizeBytes = null
        try { sizeBytes = fs.statSync(files[0]).size } catch (_) {}
        res.json({ success: true, filePath: files[0], sizeBytes })
      } else {
        res.status(500).json({ error: 'Download completed but file not found' })
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Directory selection (native OS dialog)
app.post('/api/select-directory', (req, res) => {
  try {
    const { defaultPath } = req.body || {}
    const homeDir = os.homedir()
    const startDir = defaultPath && typeof defaultPath === 'string' && fs.existsSync(defaultPath)
      ? defaultPath
      : path.join(homeDir, 'Downloads')

    if (process.platform === 'darwin') {
      // macOS: one-liner AppleScript to avoid multiline quoting issues
      const escDouble = (p) => (p || '').replace(/"/g, '\\"')
      const oneliner = `POSIX path of (choose folder with prompt "Select a directory" default location POSIX file "${escDouble(startDir)}")`
      const singleQuoted = oneliner.replace(/'/g, "'\\''")
      exec(`osascript -e '${singleQuoted}'`, (err, stdout, stderr) => {
        if (err) {
          const msg = (stderr || err.message || '').toString()
          if (/\(-128\)/.test(msg) || /User canceled/i.test(msg)) {
            return res.json({ success: false, canceled: true })
          }
          console.error('osascript error:', msg)
          return res.json({ success: false, error: msg })
        }
        const selectedPath = (stdout || '').toString().trim().replace(/\n/g, '')
        if (!selectedPath) {
          return res.json({ success: false, canceled: true })
        }
        if (!fs.existsSync(selectedPath)) {
          try { fs.mkdirSync(selectedPath, { recursive: true }) } catch (_) {}
        }
        return res.json({ success: true, selectedPath })
      })
      return
    }

    if (process.platform === 'win32') {
      // Windows: use PowerShell FolderBrowserDialog
      const esc = (s) => (s || '').replace(/`/g, '``').replace(/\"/g, '"').replace(/\$/g, '`$')
      const ps = `Add-Type -AssemblyName System.Windows.Forms; $fbd = New-Object System.Windows.Forms.FolderBrowserDialog; $fbd.Description = "Select a directory"; $fbd.SelectedPath = "${esc(startDir)}"; $res = $fbd.ShowDialog(); if ($res -eq [System.Windows.Forms.DialogResult]::OK) { Write-Output $fbd.SelectedPath } else { Write-Output "USER_CANCELLED" }`
      exec(`powershell -NoProfile -Command "${ps}"`, (err, stdout, stderr) => {
        if (err) {
          console.error('PowerShell error:', stderr || err.message)
          return res.json({ success: false, error: err.message })
        }
        const output = (stdout || '').toString().trim()
        if (output === 'USER_CANCELLED' || output === '') {
          return res.json({ success: false, canceled: true })
        }
        const selectedPath = output.replace(/\r?\n/g, '')
        if (!fs.existsSync(selectedPath)) {
          try { fs.mkdirSync(selectedPath, { recursive: true }) } catch (_) {}
        }
        return res.json({ success: true, selectedPath })
      })
      return
    }

    // Linux: try zenity, fall back to kdialog, else default
    const cmd = `which zenity >/dev/null 2>&1 && zenity --file-selection --directory --title="Select a directory" || (which kdialog >/dev/null 2>&1 && kdialog --getexistingdirectory "$HOME" || echo USER_CANCELLED)`
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        console.error('Directory picker error:', stderr || err.message)
        // Fallback to startDir if picker unavailable
        if (!fs.existsSync(startDir)) {
          try { fs.mkdirSync(startDir, { recursive: true }) } catch (_) {}
        }
        return res.json({ success: true, selectedPath: startDir })
      }
      const output = (stdout || '').toString().trim()
      if (output === 'USER_CANCELLED' || output === '') {
        return res.json({ success: false, canceled: true })
      }
      const selectedPath = output.replace(/\r?\n/g, '')
      if (!fs.existsSync(selectedPath)) {
        try { fs.mkdirSync(selectedPath, { recursive: true }) } catch (_) {}
      }
      return res.json({ success: true, selectedPath })
    })
  } catch (error) {
    console.error('Directory selection error:', error)
    res.json({ success: false, error: error.message })
  }
})

// Open directory in system file manager
app.post('/api/open-directory', (req, res) => {
  try {
    const { directoryPath } = req.body
    if (!directoryPath || !fs.existsSync(directoryPath)) {
      return res.json({ success: false, error: 'Directory does not exist' })
    }
    
    // Open directory in system file manager
    const command = process.platform === 'darwin' ? 'open' : 
                   process.platform === 'win32' ? 'explorer' : 'xdg-open'
    
    require('child_process').spawn(command, [directoryPath], { detached: true })
    res.json({ success: true, message: `Opened ${directoryPath}` })
  } catch (error) {
    console.error('Open directory error:', error)
    res.json({ success: false, error: error.message })
  }
})

// Extract clips
app.post('/api/extract-clips', (req, res) => {
  try {
    const { clips, sources, outputDir } = req.body

    if (!Array.isArray(clips) || !Array.isArray(sources) || !outputDir) {
      return res.status(400).json({ success: false, error: 'Invalid payload' })
    }

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    // Build a source map for quick lookup and path normalization
    const sourceMap = new Map()
    sources.forEach((s) => {
      const p = s.filePath || s.path
      if (s.id && p) sourceMap.set(s.id, p)
    })

    const results = []
    let processed = 0

    const finish = () => {
      const allOk = results.length === clips.length && results.every(r => r.success)
      res.json({ success: allOk, results })
    }

    // Helper: convert HH:MM:SS (or MM:SS) to seconds
    const toSeconds = (hms) => {
      try {
        if (typeof hms !== 'string') return 0
        const parts = hms.split(':').map(Number)
        if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2]
        if (parts.length === 2) return parts[0] * 60 + parts[1]
        return Number(hms) || 0
      } catch (_) {
        return 0
      }
    }

    clips.forEach((clip, index) => {
      const clipName = (clip.title || clip.name || `Clip_${index + 1}`).toString()
      const safeName = clipName.replace(/[^\w-]+/g, '_')
      const startTime = clip.startTime
      const endTime = clip.endTime
      const outputFile = path.join(outputDir, `${safeName}.mp4`)

      // Resolve source path
      let inputFile = sourceMap.get(clip.sourceId)

      // Fallback for YouTube sources: look for Combined_<sourceId>_*.mp4 in outputDir
      if ((!inputFile || !fs.existsSync(inputFile)) && clip.sourceId) {
        try {
          const pattern = path.join(outputDir, `Combined_${clip.sourceId}_*.mp4`)
          const found = glob.sync(pattern)
          if (found && found.length > 0) {
            inputFile = found[0]
          }
        } catch (_) {}
      }

      if (!inputFile || !fs.existsSync(inputFile)) {
        results.push({ name: clipName, success: false, error: `Source file not found for clip '${clipName}'` })
        processed++
        if (processed === clips.length) finish()
        return
      }

      // Build ffmpeg args: input-seek with -ss (before -i) and use -t duration to avoid black frames
      // See: https://video.stackexchange.com/questions/18284/cutting-with-ffmpeg-results-in-few-seconds-of-black-screen-how-do-i-fix-this
      const durationSeconds = Math.max(0, toSeconds(endTime) - toSeconds(startTime))
      const args = [
        '-ss', startTime,
        '-i', inputFile,
        '-t', durationSeconds.toString(),
        '-map', '0:v:0',
        '-map', '0:a?',
        '-c:v', 'copy',
        '-c:a', 'copy',
        '-avoid_negative_ts', 'make_zero',
        '-movflags', '+faststart',
        '-y',
        outputFile
      ]

      console.log('🎬 Extracting:', { inputFile, outputFile, startTime, endTime })

      const proc = spawn(ffmpegPath, args)
      let stderr = ''
      proc.stderr.on('data', (d) => { stderr += d.toString() })
      proc.on('close', (code) => {
        if (code === 0 && fs.existsSync(outputFile)) {
          results.push({ name: clipName, success: true, path: outputFile })
        } else {
          results.push({ name: clipName, success: false, error: stderr || `ffmpeg exited with code ${code}` })
        }
        processed++
        if (processed === clips.length) finish()
      })
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Health check
app.get('/health', async (req, res) => {
  try {
    const ytdlp = await findYtDlp()
    res.json({
      ok: true,
      port: PORT,
      ffmpeg: Boolean(ffmpegPath),
      ytDlp: Boolean(ytdlp),
      timestamp: new Date().toISOString()
    })
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message })
  }
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 YouTube Cropper Server running at http://localhost:${PORT}`)
  console.log(`📂 FFmpeg bundled: ${ffmpegPath}`)
  
  // Try to open browser automatically
  const start = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open'
  exec(`${start} http://localhost:${PORT}`, (error) => {
    if (error) {
      console.log(`💡 Open your browser and go to: http://localhost:${PORT}`)
    }
  })
})
