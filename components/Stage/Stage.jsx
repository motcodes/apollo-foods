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
import useMedia from 'use-media'
import { StageLoader } from './StageLoader'
import { StageControls } from './StageControls'
import { fetcher } from '../../lib'

export default function Stage({
  canvasProps = {
    id: 'pouchCanvas',
  },
  mealProps = {},
  bookmark = false,
  needsPlaceholderImage = false,
  isMealSaved = false,
  enableFullscreen = true,
  children,
}) {
  const controlsRef = useRef()

  const { loaded, progress } = useProgress()
  const [isAutoRotating, setAutoRotate] = useState(false)
  const [mealData, setMealData] = useState(mealProps)
  const { pathname } = useRouter()
  const isLarge = useMedia({ minWidth: 1024 })

  useEffect(() => {
    if (pathname === '/') {
      setAutoRotate(true)
    }
  }, [pathname])

  useEffect(() => {
    const canvasContainer = document.getElementById(canvasProps.id)
    const canvasRef = canvasContainer.firstChild

    if (loaded && canvasRef && progress === 100) {
      setAutoRotate(true)
      setTimeout(() => {
        const modelImage = canvasRef.toDataURL('image/jpeg', 0.65)
        setMealData((prev) => ({ ...prev, placeholderImage: modelImage }))
      }, Math.floor(Math.random() * 1000) + 1000)
    }
  }, [canvasProps.id, loaded, progress])

  useEffect(() => {
    async function createPlaceholderImage() {
      const json = await fetcher('/api/meal/save', {
        method: 'POST',
        body: JSON.stringify(mealData),
      })
      if (json.success === true) {
        console.log('created image')
      }
    }

    if (needsPlaceholderImage) {
      createPlaceholderImage()
    }
  }, [mealData, needsPlaceholderImage])

  return (
    <Container
      id="canvasContainer"
      width={canvasProps.style?.width}
      height={canvasProps.style?.height}
    >
      <Canvas
        id={canvasProps.id}
        gl={{ preserveDrawingBuffer: true }}
        dpr={[1, 1.5]}
        style={{
          height: pathname.includes('cook') && isLarge ? '100vh' : '100%',
        }}
      >
        <ambientLight ambientIntensity={0.65} />
        <OrbitControls ref={controlsRef} autoRotate={isAutoRotating} />
        <Suspense
          fallback={
            <StageLoader
              height={canvasProps.style?.height}
              progress={progress}
            />
          }
        >
          <DreiStage controls={controlsRef} intensity={1.5} environment="night">
            {children}
          </DreiStage>
        </Suspense>
      </Canvas>
      {mealData.placeholderImage && (
        <StageControls
          elementId={canvasProps.id}
          mealProps={mealData}
          bookmark={bookmark}
          isMealSaved={isMealSaved}
          enableFullscreen={enableFullscreen}
        />
      )}
    </Container>
  )
}

const Container = styled.section`
  width: 100%;
  position: relative;
  height: ${({ height }) => height || 'initial'};
  cursor: pointer;
  z-index: 10;
  @media (min-width: 1024px) {
    margin-bottom: 11rem;
  }
`
