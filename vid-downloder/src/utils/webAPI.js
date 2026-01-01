// Web API client to replace Electron APIs

const API_BASE = '/api'

export const webAPI = {
  // Dependency management
  checkDeps: async () => {
    const response = await fetch(`${API_BASE}/deps`)
    return response.json()
  },

  installYtDlp: async () => {
    const response = await fetch(`${API_BASE}/install-ytdlp`, { method: 'POST' })
    return response.json()
  },

  // File operations
  selectFile: async (filters) => {
    // Web version uses file input instead of dialog
    return new Promise((resolve) => {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = filters?.map(f => f.extensions?.map(ext => `.${ext}`).join(',')).join(',') || 'video/*'
      
      input.onchange = async (e) => {
        const file = e.target.files[0]
        if (file) {
          // Upload file to server
          const formData = new FormData()
          formData.append('video', file)
          
          const response = await fetch(`${API_BASE}/upload`, {
            method: 'POST',
            body: formData
          })
          
          const result = await response.json()
          if (result.success) {
            resolve({ filePaths: [result.filePath], originalName: result.originalName })
          } else {
            resolve({ canceled: true })
          }
        } else {
          resolve({ canceled: true })
        }
      }
      
      input.click()
    })
  },

  selectDirectory: async (defaultPath = null) => {
    try {
      const response = await fetch(`${API_BASE}/select-directory`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ defaultPath })
      })
      
      const result = await response.json()
      if (result.success) {
        return { filePaths: [result.selectedPath], canceled: false }
      } else {
        console.error('Directory selection failed:', result.error)
        return { canceled: true }
      }
    } catch (error) {
      console.error('Directory selection error:', error)
      return { canceled: true }
    }
  },

  openDirectory: async (directoryPath) => {
    try {
      const response = await fetch(`${API_BASE}/open-directory`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ directoryPath })
      })
      
      const result = await response.json()
      return result
    } catch (error) {
      console.error('Open directory error:', error)
      return { success: false, error: error.message }
    }
  },

  getFileMetadata: async (filePath) => {
    const response = await fetch(`${API_BASE}/metadata`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filePath })
    })
    return response.json()
  },

  // YouTube operations
  getYouTubeInfo: async (url) => {
    const response = await fetch(`${API_BASE}/youtube-info`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    })
    return response.json()
  },

  downloadYouTube: async (data) => {
    const response = await fetch(`${API_BASE}/download-youtube`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return response.json()
  },

  // Video processing
  extractClips: async (data) => {
    const response = await fetch(`${API_BASE}/extract-clips`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return response.json()
  },

  // Event listeners (simplified for web)
  onDownloadProgress: (callback) => {
    // For web version, we'll use polling or WebSocket in future
    return () => {} // No-op cleanup
  },
  
  onDownloadLog: (callback) => {
    return () => {}
  },
  
  onExtractLog: (callback) => {
    return () => {}
  },
  
  onExtractProgress: (callback) => {
    return () => {}
  }
}
