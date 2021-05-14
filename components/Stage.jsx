import { Suspense, useRef } from 'react'
import styled from 'styled-components'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage as DreiStage } from '@react-three/drei'
import { useFullscreen } from '../lib'
import { FullscreenButton } from './fullscreenButton'

export default function Stage({
  canvasProps = {},
  lightProps = {},
  controlsProps = {},
  stageProps = {},
  children,
  ...rest
}) {
  const {
    canvasProps: cProps,
    lightProps: lProps,
    controlProps: ctrlProps,
    stageProps: sProps,
  } = setStageProps(canvasProps, lightProps, controlsProps, stageProps)

  const { isFullscreenEnabled, toggleFullscreen } = useFullscreen(cProps.id)

  const controlsRef = useRef()

  return (
    <Container>
      <Canvas //
        {...cProps}
        {...canvasProps}
      >
        <ambientLight //
          {...lProps}
          {...lightProps}
        />
        <OrbitControls //
          ref={controlsRef}
          {...ctrlProps}
        />
        <Suspense fallback={null}>
          <DreiStage //
            controls={controlsRef}
            {...sProps}
          >
            {children}
          </DreiStage>
        </Suspense>
      </Canvas>
      <ControlContainer>
        {isFullscreenEnabled && (
          <FullscreenButton toggleFullscreen={toggleFullscreen} />
        )}
      </ControlContainer>
    </Container>
  )
}

const Container = styled.section`
  width: 100%;
  position: relative;
  margin-bottom: 1rem;
`

const ControlContainer = styled.div`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
`

// default props
function setStageProps(canProps, lProps, ctrlProps, sProps) {
  const canvasProps = {
    gl: canProps.gl || defaultCanvasProps.gl,
    shadows: canProps.shadows || defaultCanvasProps.shadows,
    dpr: canProps.dpr || defaultCanvasProps.dpr,
    camera: canProps.camera || defaultCanvasProps.camera,
    style: canProps.style,
    id: canProps.id,
  }
  const lightProps = {
    intensity: lProps.ambientIntensity || defaultLightProps.ambientIntensity,
  }
  const controlProps = {
    autoRotate: ctrlProps.autoRotate || defaultControlsProps.autoRotate,
    enableDamping:
      ctrlProps.enableDamping || defaultControlsProps.enableDamping,
    enableZoom: ctrlProps.enableZoom || defaultControlsProps.enableZoom,
    enablePan: ctrlProps.enablePan || defaultControlsProps.enablePan,
  }
  const stageProps = {
    contactShadow: sProps.contactShadow || defaultStageProps.contactShadow,
    shadows: sProps.shadows || defaultStageProps.shadows,
    adjustCamera: sProps.adjustCamera || defaultStageProps.adjustCamera,
    intensity: sProps.intensity || defaultStageProps.intensity,
    environment: sProps.environment || defaultStageProps.environment,
    preset: sProps.preset || defaultStageProps.preset,
  }

  return { canvasProps, lightProps, controlProps, stageProps }
}

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

// ambientLight
const defaultLightProps = { ambientIntensity: 0.65 }

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
