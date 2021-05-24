import { useEffect, useState } from 'react'

// only works if fullscreen is available
export const useFullscreen = (elementId) => {
  const [isFullscreenEnabled, setFullscreenEnabled] = useState(false)
  const [isFullscreen, setInFullscreen] = useState(false)

  useEffect(() => {
    if (document.fullscreenEnabled) {
      setFullscreenEnabled(true)
    }
  }, [])

  useEffect(() => {
    const element = document.getElementById(elementId)
    element.addEventListener('dblclick', toggleFullscreen)

    return () => {
      element.removeEventListener('dblclick', toggleFullscreen)
    }
  }, [])

  function toggleFullscreen(e) {
    if (isFullscreenEnabled) {
      const element = document.getElementById(elementId)
      const fullscreenElement =
        document.fullscreenElement || document.webkitFullscreenElement

      if (!fullscreenElement) {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen()
        }
        setInFullscreen(true)
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen()
        }
        setInFullscreen(false)
      }
    }
  }
  return {
    isFullscreen,
    isFullscreenEnabled,
    toggleFullscreen,
  }
}
