import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage as DreiStage } from '@react-three/drei'
import { Button } from '../utils'
import styled from 'styled-components'

export function Stage({
  canvasProps = {},
  lightProps = {},
  controlsProps = {},
  stageProps = {},
  children,
  ...rest
}) {
  const [isFullscreenEnabled, setFullscreenEnabled] = useState(false)
  const [isInFullscreen, setInFullscreen] = useState(false)

  // canvas
  const defaultCanvasProps = {
    gl: { preserveDrawingBuffer: true },
    shadows: true,
    dpr: [1, 1.5],
    camera: {
      position: [0, 0, 10],
      fov: 45,
    },
  }
  // } = canvasProps

  // ambientLight
  const defaultLightProps = { ambientIntensity: 0.35 }

  // controls
  const defaultControlsProps = {
    autoRotate: true,
    enableDamping: true,
    enablePan: true,
    enableZoom: false,
  }

  // stage
  const defaultStageProps = {
    contactShadow: true, // Optional: creates a contactshadow underneath the content (default=true)
    shadows: true, // Optional: lights cast shadow (default=true)
    adjustCamera: true, // Optional: zooms the content in (default=true)
    intensity: 1.5, // Optional: light intensity (default=1)
    environment: 'night', // Optional: environment (default=city)
    preset: 'rembrandt', // Optional: rembrandt (default) | portrait | upfront | soft
  }

  const controlsRef = useRef()

  useEffect(() => {
    if (document.fullscreenEnabled) {
      setFullscreenEnabled(true)
    }
  }, [])

  function handleFullScreen(e) {
    const pouchCanvas = document.getElementById('pouchCanvas')
    const fullscreenElement =
      document.fullscreenElement || document.webkitFullscreenElement

    if (!fullscreenElement) {
      if (pouchCanvas.requestFullscreen) {
        pouchCanvas.requestFullscreen()
      } else if (pouchCanvas.webkitRequestFullscreen) {
        pouchCanvas.webkitRequestFullscreen()
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

  return (
    <Container>
      <Canvas
        gl={canvasProps.gl || defaultCanvasProps.gl}
        shadows={canvasProps.shadows || defaultCanvasProps.shadows}
        dpr={canvasProps.dpr || defaultCanvasProps.dpr}
        camera={canvasProps.camera || defaultCanvasProps.camera}
        style={canvasProps.style}
        id={canvasProps.id}
        {...canvasProps}
      >
        <ambientLight
          intensity={
            lightProps.ambientIntensity || defaultLightProps.ambientIntensity
          }
          {...lightProps}
        />
        <OrbitControls
          ref={controlsRef}
          autoRotate={
            controlsProps.autoRotate || defaultControlsProps.autoRotate
          }
          enableDamping={
            controlsProps.enableDamping || defaultControlsProps.enableDamping
          }
          enableZoom={
            controlsProps.enableZoom || defaultControlsProps.enableZoom
          }
          enablePan={controlsProps.enablePan || defaultControlsProps.enablePan}
          {...controlsProps}
        />
        <Suspense fallback={null}>
          <DreiStage
            contactShadow={stageProps.contactShadow}
            shadows={stageProps.shadows}
            adjustCamera={stageProps.adjustCamera}
            intensity={stageProps.intensity}
            environment={stageProps.environment}
            preset={stageProps.preset}
            controls={controlsRef}
            {...stageProps}
          >
            {children}
          </DreiStage>
        </Suspense>
      </Canvas>
      {isFullscreenEnabled && (
        <FullscreenButton onClick={handleFullScreen}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            width={24}
            height={24}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
            />
          </svg>
        </FullscreenButton>
      )}
    </Container>
  )
}

const Container = styled.section`
  width: 100%;
  position: relative;
  margin-bottom: 1rem;
`
const FullscreenButton = styled(Button)`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
`
