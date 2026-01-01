// Time validation utilities for professional time inputs

/**
 * Convert time string (hh:mm:ss) to total seconds - CRASH-SAFE VERSION
 */
export const timeToSeconds = (timeString) => {
  // Handle invalid input safely
  if (!timeString || typeof timeString !== 'string') {
    return 0
  }
  
  try {
    const parts = timeString.split(':')
    if (parts.length !== 3) return 0
    
    const hours = parseInt(parts[0] || '0') || 0
    const minutes = parseInt(parts[1] || '0') || 0 
    const seconds = parseInt(parts[2] || '0') || 0
    
    return (hours * 3600) + (minutes * 60) + seconds
  } catch (error) {
    console.warn('timeToSeconds error:', error, 'input:', timeString)
    return 0
  }
}

/**
 * Convert seconds to time string (hh:mm:ss) - CRASH-SAFE VERSION
 */
export const secondsToTime = (totalSeconds) => {
  // Handle invalid input safely
  if (typeof totalSeconds !== 'number' || isNaN(totalSeconds) || totalSeconds < 0) {
    return '00:00:00'
  }
  
  try {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = Math.floor(totalSeconds % 60)
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  } catch (error) {
    console.warn('secondsToTime error:', error, 'input:', totalSeconds)
    return '00:00:00'
  }
}

/**
 * Validate time format and values - CRASH-SAFE VERSION
 */
export const isValidTime = (timeString) => {
  // Handle invalid input safely
  if (!timeString || typeof timeString !== 'string') {
    return false
  }
  
  try {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9]):([0-5]?[0-9])$/
    return timeRegex.test(timeString)
  } catch (error) {
    console.warn('isValidTime error:', error, 'input:', timeString)
    return false
  }
}

/**
 * SIMPLE BULLETPROOF Validation - exactly as user requested
 * Rule 1: Start time should always be smaller than end time
 * Rule 2: End time can't be larger than the whole duration of the video
 */
export const validateClipTimes = (startTime, endTime, sourceDurationSeconds) => {
  console.log(' SIMPLE VALIDATION:', { startTime, endTime, sourceDurationSeconds })
  
  const startSeconds = timeToSeconds(startTime)
  const endSeconds = timeToSeconds(endTime)
  
  console.log(' Converted times:', { startSeconds, endSeconds, sourceDurationSeconds })
  
  // Rule 1: Start time should always be smaller than end time
  if (startSeconds >= endSeconds) {
    console.log(' Rule 1 failed: Start time >= End time')
    return {
      isValid: false,
      errors: ['Start time must be before end time']
    }
  }
  
  // Rule 2: End time can't be larger than the whole duration 
  // Fixed: Now properly handles duration detection
  if (sourceDurationSeconds && sourceDurationSeconds > 0 && endSeconds > sourceDurationSeconds) {
    console.log(' Rule 2 failed: End time > Duration', { endSeconds, sourceDurationSeconds })
    return {
      isValid: false,
      errors: [`End time (${secondsToTime(endSeconds)}) exceeds video duration (${secondsToTime(sourceDurationSeconds)})`]
    }
  }
  
  console.log(' All validation rules passed!')
  return {
    isValid: true,
    errors: []
  }
}

/**
 * Auto-correct invalid time values - CRASH-SAFE VERSION
 */
export const autoCorrectTime = (timeString, maxSeconds = null) => {
  // Handle empty or invalid input safely
  if (!timeString || typeof timeString !== 'string') {
    return '00:00:00'
  }
  
  // Handle partial input gracefully (e.g., "1", "1:", "1:2", etc.)
  const parts = timeString.split(':')
  let hours = 0
  let minutes = 0  
  let seconds = 0
  
  try {
    // Parse each part safely
    if (parts[0]) hours = parseInt(parts[0]) || 0
    if (parts[1]) minutes = parseInt(parts[1]) || 0
    if (parts[2]) seconds = parseInt(parts[2]) || 0
    
    // Clamp values to valid ranges
    hours = Math.max(0, Math.min(23, hours))
    minutes = Math.max(0, Math.min(59, minutes))
    seconds = Math.max(0, Math.min(59, seconds))
    
    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds
    
    // If max seconds provided, clamp total time
    if (maxSeconds && totalSeconds > maxSeconds) {
      return secondsToTime(maxSeconds)
    }
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  } catch (error) {
    // Fallback to safe default if anything goes wrong
    console.warn('autoCorrectTime error:', error, 'input:', timeString)
    return '00:00:00'
  }
}

/**
 * Get duration between two times in human readable format
 */
export const getClipDuration = (startTime, endTime) => {
  const startSeconds = timeToSeconds(startTime)
  const endSeconds = timeToSeconds(endTime)
  const durationSeconds = endSeconds - startSeconds
  
  if (durationSeconds <= 0) return '0s'
  
  const hours = Math.floor(durationSeconds / 3600)
  const minutes = Math.floor((durationSeconds % 3600) / 60)
  const seconds = durationSeconds % 60
  
  const parts = []
  if (hours > 0) parts.push(`${hours}h`)
  if (minutes > 0) parts.push(`${minutes}m`) 
  if (seconds > 0) parts.push(`${seconds}s`)
  
  return parts.join(' ') || '0s'
}
