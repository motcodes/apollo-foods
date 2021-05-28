import { Suspense, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Canvas } from '@react-three/fiber'
import {
  OrbitControls,
  Stage as DreiStage,
  useProgress,
} from '@react-three/drei'
import { StageLoader } from './StageLoader'
import { StageControls } from './StageControls'

export default function Stage({
  canvasProps = {},
  lightProps = {},
  controlsProps = {},
  stageProps = {},
  mealData = {},
  bookmark = false,
  isPlaceholderImage = false,
  isMealSaved = false,
  enableFullscreen = true,
  children,
}) {
  const {
    canvasProps: cProps,
    lightProps: lProps,
    controlProps: ctrlProps,
    stageProps: sProps,
  } = setStageProps(canvasProps, lightProps, controlsProps, stageProps)

  const { loaded, progress } = useProgress()
  const [isAutoRotating, setAutoRotate] = useState(false)

  const controlsRef = useRef()

  useEffect(() => {
    const canvasContainer = document.getElementById(cProps.id)
    const canvasRef = canvasContainer.firstChild

    if (isPlaceholderImage && loaded && canvasRef && progress === 100) {
      setAutoRotate(true)
      setTimeout(() => {
        // const destinationCanvas = document.createElement('canvas')
        // destinationCanvas.width = canvasRef.width
        // destinationCanvas.height = canvasRef.height

        // const destCtx = destinationCanvas.getContext('2d')

        // //create a rectangle with the desired color
        // destCtx.fillStyle = '#FFFFFF'
        // destCtx.fillRect(0, 0, canvasRef.width, canvasRef.height)

        // //draw the original canvas onto the destination canvas
        // destCtx.drawImage(canvasRef, 0, 0)
        // const modelImage = destinationCanvas.toDataURL('image/jpeg', 0.7)
        const modelImage = canvasRef.toDataURL('image/jpeg', 0.7)
        mealData.placeholderImage = modelImage
      }, Math.floor(Math.random() * 1000) + 1000)
    }
  }, [progress])

  return (
    <>
      <Container
        width={canvasProps.style?.width}
        height={canvasProps.style?.height}
      >
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
            {...controlsProps}
            autoRotate={false}
          />
          <Suspense
            fallback={<StageLoader height={canvasProps.style?.height} />}
          >
            <DreiStage //
              controls={controlsRef}
              {...sProps}
              {...stageProps}
            >
              {children}
            </DreiStage>
          </Suspense>
        </Canvas>
        <StageControls
          elementId={cProps.id}
          mealData={mealData}
          bookmark={bookmark}
          isMealSaved={isMealSaved}
          enableFullscreen={enableFullscreen}
        />
      </Container>
    </>
  )
}

const Container = styled.section`
  width: 100%;
  position: relative;
  margin-bottom: 1rem;
  height: ${({ height }) => (height ? height : 'initial')};
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
    position: [0, -10, 10],
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
