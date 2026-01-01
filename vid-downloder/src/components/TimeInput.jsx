import { useRef } from 'react'

const TimeInput = ({ 
  value = "00:00:00", 
  onChange, 
  placeholder = "00:00:00",
  className = "",
  label = "",
  error = false,
  disabled = false 
}) => {
  const hoursRef = useRef()
  const minutesRef = useRef()
  const secondsRef = useRef()

  // Parse current value for display (no state, no loops!)
  const parts = value.split(':')
  const hours = parts[0]?.padStart(2, '0') || '00'
  const minutes = parts[1]?.padStart(2, '0') || '00' 
  const seconds = parts[2]?.padStart(2, '0') || '00'

  const handleSegmentChange = (segmentType, newValue, maxValue, nextRef) => {
    // Only allow digits
    const numericValue = newValue.replace(/[^0-9]/g, '')
    
    // Limit to 2 digits
    if (numericValue.length > 2) return
    
    // Validate range - but don't force padding yet
    const intValue = parseInt(numericValue || '0')
    let finalValue = numericValue
    
    if (intValue > maxValue) {
      finalValue = maxValue.toString()
    }
    
    // Only pad when we have 2 digits or when moving to next field
    if (finalValue.length === 1 && numericValue.length === 2) {
      finalValue = finalValue.padStart(2, '0')
    } else if (finalValue.length === 1 && !document.activeElement?.contains) {
      // Pad when losing focus
      finalValue = finalValue.padStart(2, '0') 
    }
    
    // Build new time string
    const newParts = value.split(':')
    if (segmentType === 'hours') newParts[0] = finalValue.padStart(2, '0')
    else if (segmentType === 'minutes') newParts[1] = finalValue.padStart(2, '0')
    else if (segmentType === 'seconds') newParts[2] = finalValue.padStart(2, '0')
    
    const newTimeString = newParts.join(':')
    if (onChange) onChange(newTimeString)
    
    // Auto-advance to next field when 2 digits entered
    if (numericValue.length === 2 && nextRef?.current) {
      setTimeout(() => {
        nextRef.current.focus()
        nextRef.current.select()
      }, 10)
    }
  }

  const handleKeyDown = (e, segmentType, maxValue, prevRef, nextRef) => {
    const { key } = e
    
    // Handle arrow keys
    if (key === 'ArrowLeft' && prevRef?.current) {
      e.preventDefault()
      prevRef.current.focus()
      prevRef.current.select()
    } else if (key === 'ArrowRight' && nextRef?.current) {
      e.preventDefault()
      nextRef.current.focus()
      nextRef.current.select()
    }
    
    // Block non-numeric input (except backspace, delete, arrow keys, tab)
    if (!/[0-9]/.test(key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(key)) {
      e.preventDefault()
    }
  }

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <div className={`
        inline-flex items-center bg-white border rounded-lg px-3 py-2 text-sm font-mono
        focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent
        transition-all duration-200
        ${error ? 'border-red-500 focus-within:ring-red-500' : 'border-gray-300'}
        ${disabled ? 'bg-gray-50 opacity-60 cursor-not-allowed' : ''}
      `}>
        {/* Hours */}
        <input
          ref={hoursRef}
          type="text"
          value={hours}
          onChange={(e) => handleSegmentChange('hours', e.target.value, 23, minutesRef)}
          onKeyDown={(e) => handleKeyDown(e, 'hours', 23, null, minutesRef)}
          onFocus={(e) => e.target.select()}
          disabled={disabled}
          className="w-6 text-center bg-transparent border-none outline-none focus:bg-blue-50 focus:text-blue-900"
          placeholder="00"
          maxLength={2}
        />
        
        <span className="mx-1 text-gray-400">:</span>
        
        {/* Minutes */}
        <input
          ref={minutesRef}
          type="text"
          value={minutes}
          onChange={(e) => handleSegmentChange('minutes', e.target.value, 59, secondsRef)}
          onKeyDown={(e) => handleKeyDown(e, 'minutes', 59, hoursRef, secondsRef)}
          onFocus={(e) => e.target.select()}
          disabled={disabled}
          className="w-6 text-center bg-transparent border-none outline-none focus:bg-blue-50 focus:text-blue-900"
          placeholder="00"
          maxLength={2}
        />
        
        <span className="mx-1 text-gray-400">:</span>
        
        {/* Seconds */}
        <input
          ref={secondsRef}
          type="text"
          value={seconds}
          onChange={(e) => handleSegmentChange('seconds', e.target.value, 59, null)}
          onKeyDown={(e) => handleKeyDown(e, 'seconds', 59, minutesRef, null)}
          onFocus={(e) => e.target.select()}
          disabled={disabled}
          className="w-6 text-center bg-transparent border-none outline-none focus:bg-blue-50 focus:text-blue-900"
          placeholder="00"
          maxLength={2}
        />
      </div>
    </div>
  )
}

export default TimeInput
