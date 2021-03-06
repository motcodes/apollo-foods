/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
import { useEffect, useState } from 'react'

// only works if fullscreen is available
export const useFullscreen = (elementId) => {
  const [isFullscreenEnabled, setFullscreenEnabled] = useState(false)
  const [isFullscreen, setInFullscreen] = useState(false)

  function toggleFullscreen() {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    isFullscreen,
    isFullscreenEnabled,
    toggleFullscreen,
  }
}
