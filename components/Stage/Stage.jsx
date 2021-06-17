/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
import { Suspense, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Canvas } from '@react-three/fiber'
import {
  OrbitControls,
  Stage as DreiStage,
  useProgress,
} from '@react-three/drei'
import { StageLoader } from './StageLoader'
import { StageControls } from './StageControls'
import { setStageProps } from '../../lib'

export default function Stage({
  canvasProps = {},
  lightProps = {},
  controlsProps = {},
  stageProps = {},
  mealProps = {},
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
  const controlsRef = useRef()

  const { loaded, progress } = useProgress()
  const [isAutoRotating, setAutoRotate] = useState(false)
  const [mealData, setMealData] = useState(mealProps)
  const { pathname } = useRouter()

  useEffect(() => {
    if (pathname === '/') {
      setAutoRotate(true)
    }
  }, [pathname])

  useEffect(() => {
    const canvasContainer = document.getElementById(cProps.id)
    const canvasRef = canvasContainer.firstChild

    if (isPlaceholderImage && loaded && canvasRef && progress === 100) {
      setAutoRotate(true)
      setTimeout(() => {
        const modelImage = canvasRef.toDataURL('image/jpeg', 0.65)
        // mealProps.placeholderImage = modelImage
        setMealData((prev) => ({ ...prev, placeholderImage: modelImage }))
      }, Math.floor(Math.random() * 1000) + 1000)
    }
  }, [cProps.id, isPlaceholderImage, loaded, progress])

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
            autoRotate={isAutoRotating}
          />
          <Suspense
            fallback={
              <StageLoader
                height={canvasProps.style?.height}
                progress={progress}
              />
            }
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
        {mealData.placeholderImage && (
          <StageControls
            elementId={cProps.id}
            mealProps={mealData}
            bookmark={bookmark}
            isMealSaved={isMealSaved}
            enableFullscreen={enableFullscreen}
          />
        )}
      </Container>
    </>
  )
}

const Container = styled.section`
  width: 100%;
  position: relative;
  margin-bottom: 1rem;
  height: ${({ height }) => height || 'initial'};
`
