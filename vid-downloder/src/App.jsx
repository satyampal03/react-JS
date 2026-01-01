import { useState, useEffect } from 'react'
import { validateClipTimes, autoCorrectTime, timeToSeconds, getClipDuration, secondsToTime } from './utils/timeValidation'
import { webAPI } from './utils/webAPI'

function App() {
  const [deps, setDeps] = useState({ ffmpegPath: null, ytDlpPath: null })
  const [sources, setSources] = useState([])
  const [clips, setClips] = useState([])
  const [outputDir, setOutputDir] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [showYouTubeInput, setShowYouTubeInput] = useState(false)
  const [youtubeUrlInput, setYoutubeUrlInput] = useState('')
  const [youtubeDownloadDir, setYoutubeDownloadDir] = useState('')
  const [installing, setInstalling] = useState(false)
  const [logs, setLogs] = useState([])
  const [downloadProgress, setDownloadProgress] = useState({})

  // Check dependencies on startup
  useEffect(() => {
    checkDependencies()
    
    // Set up event listeners for web API (simplified)
    const unsubDownloadProgress = webAPI.onDownloadProgress((event, data) => {
      setDownloadProgress(prev => ({ ...prev, [data.sourceId]: data.progress }))
      
      // Update source download progress
      setSources(prev => prev.map(source => 
        source.id === data.sourceId 
          ? { 
              ...source, 
              downloadProgress: data.progress,
              downloadSpeed: data.speed || 0
            }
          : source
      ))
    })
    
    const unsubDownloadLog = webAPI.onDownloadLog((event, data) => {
      setLogs(prev => [...prev, { type: 'download', message: data }])
    })
    
    const unsubExtractLog = webAPI.onExtractLog((event, data) => {
      setLogs(prev => [...prev, { type: 'extract', message: data.line, clipIndex: data.clipIndex }])
    })
    
    const unsubExtractProgress = webAPI.onExtractProgress((event, data) => {
      if (data.completed) {
        setLogs(prev => [...prev, { type: 'extract', message: `Clip ${data.clipIndex + 1} completed!` }])
      }
    })

    // Cleanup on unmount
    return () => {
      unsubDownloadProgress()
      unsubDownloadLog()
      unsubExtractLog()
      unsubExtractProgress()
    }
  }, [])

  async function checkDependencies() {
    try {
      const result = await webAPI.checkDeps()
      setDeps({
        ffmpegPath: result.ffmpeg.path,
        ytDlpPath: result.ytdlp.path
      })
    } catch (error) {
      console.error('Error checking dependencies:', error)
    }
  }

  async function installYtDlp() {
    setInstalling(true)
    setDownloadProgress({ 'yt-dlp': 0 })
    try {
      const result = await webAPI.installYtDlp()
      if (result.success) {
        await checkDependencies()
        alert('yt-dlp installed successfully!')
      } else {
        alert('Failed to install yt-dlp: ' + result.error)
      }
    } catch (error) {
      alert('Failed to install yt-dlp: ' + error.message)
    } finally {
      setInstalling(false)
      setDownloadProgress({})
    }
  }

  function showYouTubeDialog() {
    console.log('showYouTubeDialog clicked')
    
    // Check if yt-dlp is available
    if (!deps.ytDlpPath) {
      alert('yt-dlp is not installed. Please install it first using the "Install yt-dlp" button.')
      return
    }

    setShowYouTubeInput(true)
    setYoutubeUrlInput('')
    // Don't reset the download directory - keep it for reuse
  }

  async function addYouTubeSource() {
    if (!youtubeUrlInput || !youtubeUrlInput.trim() || !youtubeDownloadDir) {
      alert('Please provide both YouTube URL and download directory.')
      return
    }

    console.log('YouTube URL entered:', youtubeUrlInput.trim())

    const newSource = {
      id: Date.now(),
      type: 'youtube',
      url: youtubeUrlInput.trim(),
      title: 'Loading...',
      status: 'loading'
    }
    setSources(prev => [...prev, newSource])
    setShowYouTubeInput(false)

    try {
      console.log('Fetching YouTube info...')
      // Get video info
      const youtubeInfo = await webAPI.getYouTubeInfo(youtubeUrlInput.trim())
      console.log('YouTube info received:', youtubeInfo)
      
      // Update with metadata and start downloading
      setSources(prev => prev.map(s => 
        s.id === newSource.id 
          ? { 
              ...s, 
              title: youtubeInfo.title, 
              status: 'downloading', 
              duration: youtubeInfo.duration,
              durationSeconds: youtubeInfo.durationSeconds || (typeof youtubeInfo.duration === 'string' ? timeToSeconds(youtubeInfo.duration) : undefined),
              downloadProgress: 0,
              downloadSpeed: 0
            }
          : s
      ))

      // Use the pre-selected YouTube download directory

      // Start downloading the video
      console.log('Starting YouTube download...')
      const downloadResult = await webAPI.downloadYouTube({
        url: youtubeUrlInput,
        outputDir: youtubeDownloadDir,
        sourceId: newSource.id
      })

      // After download, attempt to read local metadata to ensure duration is available
      let meta = null
      try {
        if (downloadResult.filePath) {
          meta = await webAPI.getFileMetadata(downloadResult.filePath)
        }
      } catch (_) {}

      // Mark as ready when download completes, update duration if available
      setSources(prev => prev.map(s => 
        s.id === newSource.id 
          ? { 
              ...s, 
              status: 'ready', 
              filePath: downloadResult.filePath,
              fileSize: downloadResult.sizeBytes || 0,
              downloadProgress: 100,
              ...(meta ? { duration: meta.duration, durationSeconds: timeToSeconds(meta.duration) } : {})
            }
          : s
      ))

    } catch (error) {
      console.error('YouTube download error:', error)
      setSources(prev => prev.map(s => 
        s.id === newSource.id 
          ? { ...s, title: 'Failed to download', status: 'error', error: error.message }
          : s
      ))
      alert('Failed to download video: ' + error.message)
    }
  }

  async function downloadYouTubeSource(source) {
    if (!outputDir) {
      alert('Please select an output directory first')
      return
    }

    setSources(prev => prev.map(s => 
      s.id === source.id ? { ...s, status: 'downloading' } : s
    ))

    try {
      const result = await webAPI.downloadYouTube({
        url: source.url,
        outputDir: outputDir,
        sourceId: source.id  // CRITICAL: Pass sourceId for progress tracking
      })
      
      // Fetch metadata post-download to ensure duration is filled
      let meta = null
      try {
        if (result.filePath) {
          meta = await webAPI.getFileMetadata(result.filePath)
        }
      } catch (_) {}

      setSources(prev => prev.map(s => 
        s.id === source.id 
          ? { 
              ...s, 
              status: 'ready', 
              filePath: result.filePath, 
              fileSize: result.sizeBytes || 0,
              ...(meta ? { duration: meta.duration, durationSeconds: timeToSeconds(meta.duration) } : {})
            }
          : s
      ))
    } catch (error) {
      setSources(prev => prev.map(s => 
        s.id === source.id ? { ...s, status: 'error' } : s
      ))
      alert('Download failed: ' + error.message)
    }
  }

  async function handleAddLocalFile() {
    try {
      const result = await webAPI.selectFile([
        { name: 'Video files', extensions: ['mp4', 'avi', 'mov', 'mkv', 'webm'] }
      ])
      
      if (result.canceled || !result.filePaths || result.filePaths.length === 0) {
        return
      }

      const filePath = result.filePaths[0]
      
      // Get metadata
      const metadata = await webAPI.getFileMetadata(filePath)
      
      const newSource = {
        id: Date.now(),
        type: 'local',
        title: result.originalName || filePath.split(/[\\/]/).pop(),
        filePath: filePath,
        duration: metadata.duration,
        fileSize: metadata.sizeBytes || 0,
        status: 'ready'
      }
      
      setSources(prev => [...prev, newSource])
    } catch (error) {
      console.error('Error adding local file:', error)
    }
  }

  function removeSource(sourceId) {
    setSources(prev => prev.filter(s => s.id !== sourceId))
    // Also remove clips that reference this source
    setClips(prev => prev.filter(c => c.sourceId !== sourceId))
  }

  function formatFileSize(bytes) {
    if (!bytes) return 'Unknown size'
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }

  function parseTimeString(timeStr) {
    const parts = timeStr.split(':')
    if (parts.length !== 3) return 0
    const hours = parseInt(parts[0]) || 0
    const minutes = parseInt(parts[1]) || 0
    const seconds = parseInt(parts[2]) || 0
    return hours * 3600 + minutes * 60 + seconds
  }

  function formatTimeString(seconds) {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  function validateTimeInput(value) {
    // Allow only digits and colons
    return value.replace(/[^0-9:]/g, '')
  }

  function normalizeTimeInput(value) {
    const cleaned = validateTimeInput(value)
    const parts = cleaned.split(':')
    
    // Ensure we have 3 parts and each is max 2 digits
    const normalizedParts = parts.slice(0, 3).map((part, index) => {
      if (part.length > 2) part = part.slice(0, 2)
      if (index === 0) return part // Hours can be any 2-digit number
      if (index === 1 && parseInt(part) > 59) return '59' // Minutes max 59
      if (index === 2 && parseInt(part) > 59) return '59' // Seconds max 59
      return part
    })

    // Pad to 3 parts
    while (normalizedParts.length < 3) {
      normalizedParts.push('')
    }

    return normalizedParts.join(':')
  }

  function validateClipTimes(clip, source) {
    if (!source || !source.duration) return true
    
    const startSeconds = parseTimeString(clip.startTime)
    const endSeconds = parseTimeString(clip.endTime)
    const sourceDuration = source.duration
    
    return startSeconds < endSeconds && endSeconds <= sourceDuration
  }

  function formatDuration(durationInput) {
    // Handle both string format ('00:00:51') and number format (51.43)
    let seconds
    if (typeof durationInput === 'string') {
      seconds = timeToSeconds(durationInput)
    } else if (typeof durationInput === 'number') {
      seconds = durationInput
    } else {
      return 'Unknown duration'
    }
    
    if (!seconds || seconds <= 0) return 'Unknown duration'
    
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  function addClip() {
    const newClip = {
      id: Date.now(),
      sourceId: sources.length > 0 ? sources[0].id : null,
      title: `Clip ${clips.length + 1}`,
      startTime: '00:00:00',
      endTime: '00:00:10'
    }
    setClips(prev => [...prev, newClip])
  }

  function removeClip(clipId) {
    setClips(prev => prev.filter(c => c.id !== clipId))
  }

  function updateClipTime(clipId, field, value) {
    // SIMPLE VERSION: Just store the raw value, validate later
    setClips(prev => prev.map(clip => {
      if (clip.id !== clipId) return clip
      return { ...clip, [field]: value }
    }))
  }

  function validateAndCorrectClipTime(clipId, field, value) {
    // Clean, simple validation - just auto-correct format and store
    const correctedValue = autoCorrectTime(value)
    
    setClips(prev => prev.map(clip => {
      if (clip.id !== clipId) return clip
      return { ...clip, [field]: correctedValue }
    }))
  }

  function updateClip(clipId, updates) {
    setClips(prev => prev.map(c => c.id === clipId ? { ...c, ...updates } : c))
  }

  async function handleSelectOutputDirectory() {
    try {
      const result = await webAPI.selectDirectory()
      if (!result.canceled && result.filePaths && result.filePaths.length > 0) {
        setOutputDir(result.filePaths[0])
      }
    } catch (error) {
      console.error('Error selecting directory:', error)
    }
  }

  async function processClips() {
    if (clips.length === 0) {
      alert('Please add at least one clip')
      return
    }
    if (!outputDir) {
      alert('Please select an output directory')
      return
    }

    // Validate clips have sources
    const invalidClips = clips.filter(clip => !clip.sourceId)
    if (invalidClips.length > 0) {
      alert('Some clips don\'t have sources selected. Please select a source for each clip.')
      return
    }

    // Check if any YouTube sources are not ready
    const youtubeSourcesNotReady = sources.filter(s => 
      s.type === 'youtube' && s.status !== 'ready' && 
      clips.some(c => c.sourceId === s.id)
    )
    
    if (youtubeSourcesNotReady.length > 0) {
      alert('Some YouTube sources are still downloading or failed. Please wait for downloads to complete before processing clips.')
      return
    }

    // REVERTED TO ORIGINAL SIMPLE VALIDATION - WAS WORKING BEFORE OVER-ENGINEERING
    // RCA: I broke this by overcomplicating when user only asked for error handling improvements
    // Original logic: Just check basic time format and simple start < end validation
    
    const clipsWithBadTimes = clips.filter(clip => {
      const start = timeToSeconds(clip.startTime)
      const end = timeToSeconds(clip.endTime)
      
      // DEBUG: Log exact values being validated
      console.log('🔍 RCA DEBUG - Validating clip:', {
        title: clip.title,
        startTime: clip.startTime,
        endTime: clip.endTime,
        startSeconds: start,
        endSeconds: end,
        isInvalid: start >= end || start < 0 || end <= 0
      })
      
      // Simple validation: start must be before end
      return start >= end || start < 0 || end <= 0
    })
    
    if (clipsWithBadTimes.length > 0) {
      alert('Please ensure all clips have valid start and end times (start must be before end)')
      return
    }

    setIsProcessing(true)
    setLogs([])
    
    try {
      // Prepare sources with paths for processing
      const sourcesWithPaths = sources.map(source => ({
        ...source,
        path: source.path || source.filePath
      }))

      const result = await webAPI.extractClips({
        clips,
        sources: sourcesWithPaths,
        outputDir
      })
      
      if (result && result.success) {
        alert(`Successfully extracted ${clips.length} clips to ${outputDir}`)
      } else if (result && Array.isArray(result.results)) {
        const failed = result.results.filter(r => !r.success)
        if (failed.length === 0) {
          alert(`Successfully extracted ${clips.length} clips to ${outputDir}`)
        } else {
          const msg = failed.slice(0, 5).map(r => `- ${r.name || 'Clip'}: ${r.error || 'Unknown error'}`).join('\n')
          alert(`Some clips failed to extract (${failed.length}/${clips.length}).\n${msg}${failed.length > 5 ? '\n...more' : ''}`)
        }
      } else {
        alert('Processing finished, but could not verify results. Please check the output directory.')
      }
    } catch (error) {
      alert('Processing failed: ' + error.message)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg border border-white/20 backdrop-blur-sm p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-2xl">✂️</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  YouTube Video Cropper
                </h1>
                <p className="text-gray-500 text-sm mt-1">Extract clips from your videos with precision</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">ffmpeg:</span>
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
                    deps.ffmpegPath 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    <span>{deps.ffmpegPath ? '✓' : '⚠'}</span>
                    <span>{deps.ffmpegPath ? 'Ready' : 'Missing'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">yt-dlp:</span>
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
                    deps.ytDlpPath 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    <span>{deps.ytDlpPath ? '✓' : '⚠'}</span>
                    <span>{deps.ytDlpPath ? 'Ready' : 'Missing'}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {/* FFmpeg is bundled automatically in web version via ffmpeg-static */}
                {!deps.ytDlpPath && (
                  <button
                    onClick={installYtDlp}
                    disabled={installing}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {installing ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Installing...
                      </div>
                    ) : 'Install yt-dlp'}
                  </button>
                )}
              </div>
            </div>
          </div>
          {installing && downloadProgress['yt-dlp'] !== undefined && (
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Installing yt-dlp...</span>
                <span>{downloadProgress['yt-dlp']}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${downloadProgress['yt-dlp'] || 0}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Sources Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">📁</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Video Sources</h2>
                <p className="text-gray-500 text-sm">Add your video files to get started</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={showYouTubeDialog}
                className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2.5 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-md hover:shadow-lg font-medium text-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Add YouTube URL
              </button>
              <button 
                onClick={handleAddLocalFile}
                className="flex items-center gap-2 bg-gradient-to-r from-gray-700 to-gray-800 text-white px-4 py-2.5 rounded-lg hover:from-gray-800 hover:to-gray-900 transition-all duration-200 shadow-md hover:shadow-lg font-medium text-sm"
              >
                <span>📹</span>
                Add Local File
              </button>
            </div>
          </div>
          
          {sources.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 text-4xl mb-3">📁</div>
              <p className="text-gray-500 mb-2">No video sources added yet</p>
              <p className="text-gray-400 text-sm">Add a local video file to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sources.map(source => (
                <div key={source.id} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-2xl">
                          {source.type === 'youtube' ? '🎥' : '📹'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">{source.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                            <span className="capitalize">{source.type}</span>
                            {source.resolution && (
                              <>
                                <span>•</span>
                                <span>{source.resolution}</span>
                              </>
                            )}
                            {(source.duration || source.durationSeconds) && (
                              <>
                                <span className="text-gray-400">Duration:</span>
                                <span>{formatDuration(source.durationSeconds || source.duration)}</span>
                              </>
                            )}
                            {source.fileSize && (
                              <>
                                <span>•</span>
                                <span>{formatFileSize(source.fileSize)}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <div className="flex items-center gap-2">
                        {source.status === 'downloading' && (
                          <div className="flex flex-col items-end text-xs text-gray-600 mr-2">
                            <span className="font-medium">
                              {source.downloadProgress || 0}%
                            </span>
                            {source.downloadSpeed && source.downloadSpeed !== '0B/s' && (
                              <span className="text-gray-500">
                                {source.downloadSpeed}
                              </span>
                            )}
                          </div>
                        )}
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          source.status === 'ready' ? 'bg-green-100 text-green-800' : 
                          source.status === 'loading' ? 'bg-yellow-100 text-yellow-800' :
                          source.status === 'downloading' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {source.status === 'ready' ? '✓ Downloaded' :
                           source.status === 'loading' ? '⏳ Loading' :
                           source.status === 'downloading' ? '⬇ Downloading' : 
                           '⚠ Error'}
                        </span>
                        {source.status === 'downloading' && (
                          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500 transition-all duration-300"
                              style={{ width: `${source.downloadProgress || 0}%` }}
                            />
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => removeSource(source.id)}
                        className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Remove source"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* YouTube Download Directory Selection */}
          {deps.ytDlpPath && (
            <div className="bg-red-50 rounded-xl p-6 border border-red-200 mt-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    <h3 className="text-sm font-semibold text-gray-700">YouTube Download Directory</h3>
                  </div>
                  {youtubeDownloadDir ? (
                    <div className="flex items-center gap-3">
                      <span className="text-gray-600 text-sm bg-white px-3 py-2 rounded-lg font-mono truncate border">
                        {youtubeDownloadDir}
                      </span>
                      <button
                        onClick={async () => {
                          const result = await webAPI.openDirectory(youtubeDownloadDir)
                          if (result.success) {
                            console.log('Opened folder:', youtubeDownloadDir)
                          } else {
                            console.error('Failed to open folder:', result.error)
                          }
                        }}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        title="Open in Finder"
                      >
                        📁 Open
                      </button>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No YouTube download directory selected</p>
                  )}
                </div>
                <button 
                  onClick={async () => {
                    const result = await webAPI.selectDirectory()
                    if (!result.canceled && result.filePaths && result.filePaths.length > 0) {
                      setYoutubeDownloadDir(result.filePaths[0])
                    }
                  }}
                  className="ml-4 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2.5 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-md hover:shadow-lg font-medium text-sm"
                >
                  {youtubeDownloadDir ? 'Change' : 'Select'} Directory
                </button>
              </div>
            </div>
          )}
        </div>

        {/* YouTube URL Input Modal */}
        {showYouTubeInput && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full mx-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Add YouTube Video</h3>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">YouTube URL</label>
                <input
                  type="url"
                  value={youtubeUrlInput}
                  onChange={(e) => setYoutubeUrlInput(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && youtubeUrlInput.trim() && youtubeDownloadDir) {
                      addYouTubeSource()
                    }
                  }}
                  autoFocus
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Download Directory</label>
                {youtubeDownloadDir ? (
                  <div className="flex items-center gap-3">
                    <span className="flex-1 text-gray-700 text-sm bg-gray-50 px-3 py-2 rounded-lg font-mono truncate border">
                      {youtubeDownloadDir}
                    </span>
                    <button
                      type="button"
                      onClick={async () => {
                        const result = await webAPI.selectDirectory()
                        if (!result.canceled && result.filePaths && result.filePaths.length > 0) {
                          setYoutubeDownloadDir(result.filePaths[0])
                        }
                      }}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Change
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={async () => {
                      const result = await webAPI.selectDirectory()
                      if (!result.canceled && result.filePaths && result.filePaths.length > 0) {
                        setYoutubeDownloadDir(result.filePaths[0])
                      }
                    }}
                    className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors"
                  >
                    📁 Select Download Directory
                  </button>
                )}
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowYouTubeInput(false)
                    setYoutubeUrlInput('')
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    const result = await webAPI.selectDirectory()
                    if (!result.canceled && result.filePaths && result.filePaths.length > 0) {
                      setYoutubeDownloadDir(result.filePaths[0])
                    }
                  }}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Select Directory
                </button>
                <button
                  onClick={addYouTubeSource}
                  disabled={!youtubeUrlInput.trim() || !youtubeDownloadDir}
                  className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  Add & Download Video
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Clips Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">✂️</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Clips to Extract</h2>
                <p className="text-gray-500 text-sm">Define the clips you want to extract from your videos</p>
              </div>
            </div>
            <button 
              onClick={addClip}
              disabled={sources.length === 0}
              className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2.5 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>➕</span>
              Add Clip
            </button>
          </div>
          
          {clips.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-300 text-6xl mb-4">✂️</div>
              <p className="text-gray-500 text-lg mb-2">No clips defined yet</p>
              <p className="text-gray-400 text-sm">Add clips to extract from your video sources</p>
              {sources.length === 0 && (
                <p className="text-orange-500 text-sm mt-4 bg-orange-50 px-4 py-2 rounded-lg inline-block">
                  💡 Add video sources first, then define clips to extract
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {clips.map((clip, index) => (
                <div key={clip.id} className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-md">
                        {sources.find(s => s.id === clip.sourceId)?.type === 'youtube' ? (
                          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                        ) : (
                          <span>📹</span>
                        )}
                      </div>
                      <span className="text-sm font-medium text-gray-600">Clip #{index + 1}</span>
                    </div>
                    <button 
                      onClick={() => removeClip(clip.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                      title="Remove clip"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Video Source</label>
                      <select 
                        value={clip.sourceId || ''} 
                        onChange={(e) => updateClip(clip.id, { sourceId: parseInt(e.target.value) || null })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      >
                        <option value="">Select source...</option>
                        {sources.filter(s => s.status === 'ready').map(source => (
                          <option key={source.id} value={source.id}>{source.title}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Clip Name</label>
                      <input
                        type="text"
                        value={clip.title}
                        onChange={(e) => updateClip(clip.id, { title: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        placeholder="My awesome clip"
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-gray-700 min-w-0">Start:</label>
                        <input
                          type="text"
                          value={clip.startTime}
                          onChange={(e) => updateClipTime(clip.id, 'startTime', e.target.value)}
                          onBlur={(e) => validateAndCorrectClipTime(clip.id, 'startTime', e.target.value)}
                          placeholder="00:00:00"
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono w-28 text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                          maxLength={8}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-gray-700 min-w-0">End:</label>
                        <input
                          type="text"
                          value={clip.endTime}
                          onChange={(e) => updateClipTime(clip.id, 'endTime', e.target.value)}
                          onBlur={(e) => validateAndCorrectClipTime(clip.id, 'endTime', e.target.value)}
                          placeholder="00:00:10"
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono w-28 text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                          maxLength={8}
                        />
                      </div>
                      <div className="text-sm text-gray-500 font-medium">
                        Duration: {getClipDuration(clip.startTime, clip.endTime)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Output Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">📤</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Output & Processing</h2>
              <p className="text-gray-500 text-sm">Configure where to save your extracted clips</p>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Output Directory Selection */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Output Directory</h3>
                  {outputDir ? (
                    <div className="flex items-center gap-3">
                      <span className="text-gray-600 text-sm bg-white px-3 py-2 rounded-lg font-mono truncate border">
                        {outputDir}
                      </span>
                      <button
                        onClick={async () => {
                          const result = await webAPI.openDirectory(outputDir)
                          if (result.success) {
                            console.log('Opened folder:', outputDir)
                          } else {
                            console.error('Failed to open folder:', result.error)
                          }
                        }}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        title="Open in Finder"
                      >
                        📁 Open
                      </button>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No output directory selected</p>
                  )}
                </div>
                <button 
                  onClick={handleSelectOutputDirectory}
                  className="ml-4 bg-gradient-to-r from-gray-700 to-gray-800 text-white px-4 py-2.5 rounded-lg hover:from-gray-800 hover:to-gray-900 transition-all duration-200 shadow-md hover:shadow-lg font-medium text-sm"
                >
                  {outputDir ? 'Change' : 'Select'} Directory
                </button>
              </div>
            </div>



            {/* Processing Summary */}
            {clips.length > 0 && (
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-sm font-semibold text-blue-900 mb-3">Processing Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{clips.length}</div>
                    <div className="text-xs text-blue-700">Clips to extract</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{sources.filter(s => s.status === 'ready').length}</div>
                    <div className="text-xs text-green-700">Sources ready</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">{new Set(clips.map(c => c.sourceId)).size}</div>
                    <div className="text-xs text-purple-700">Unique sources</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">
                      {sources.filter(s => s.fileSize).reduce((acc, s) => acc + s.fileSize, 0) > 0 
                        ? formatFileSize(sources.filter(s => s.fileSize).reduce((acc, s) => acc + s.fileSize, 0))
                        : '—'}
                    </div>
                    <div className="text-xs text-orange-700">Total input size</div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Extract Button */}
            <button 
              onClick={processClips}
              disabled={isProcessing || clips.length === 0 || !outputDir}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                isProcessing || clips.length === 0 || !outputDir
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg'
              }`}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-6 h-6 border-3 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                  Processing Clips...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <span>🚀</span>
                  Extract {clips.length} Clip{clips.length !== 1 ? 's' : ''}
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
