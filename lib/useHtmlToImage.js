/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
// https://github.com/motcodes/html-to-png/blob/main/src/useHtmlToPng.js
import { useState, useRef } from 'react'
import { toJpeg } from 'html-to-image'

export const useHtmlToImage = (size = 1024) => {
  const captureRef = useRef(null)
  const [imageUrl, setImageUrl] = useState('')
  const [isLoading, setLoading] = useState(true)
  const [status, setStatus] = useState('idle')

  async function generateImage() {
    setStatus('rendering')
    // e.preventDefault()
    if (!captureRef?.current) {
      return
    }
    try {
      const imgBase64 = await toJpeg(captureRef.current, {
        width: size,
        height: size,
        quality: 0.75,
      })
      setImageUrl(imgBase64)
      setLoading(false)
      setStatus('succes')
    } catch (error) {
      setStatus('error')
      console.error(error)
    }
  }

  return [generateImage, captureRef, imageUrl, isLoading, status]
}
