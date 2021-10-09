/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
import { useRef, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import styled from 'styled-components'
import Layout from '../components/Layout'
import PouchModel from '../components/Pouch'

const StagePage = () => {
  const controlsRef = useRef()
  return (
    <Layout2>
      <Container id="canvasContainer" width="100vw" height="100vh">
        <Canvas
          id="pouchCanvas"
          gl={{ preserveDrawingBuffer: true }}
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, -500] }}
        >
          <ambientLight ambientIntensity={0.65} />
          <OrbitControls ref={controlsRef} autoRotate={false} />
          <pointLight position={[-100, 300, -400]} intensity={1.5} />
          <pointLight position={[-600, 200, -500]} intensity={1} />
          <pointLight position={[600, 200, -500]} intensity={1.5} />
          <Suspense fallback={null}>
            <PouchModel textureUrl="./LabelBlue.png" position={[400, 0, 0]} />
          </Suspense>
          <Suspense fallback={null}>
            <PouchModel
              textureUrl="./LabelPurple.png"
              position={[-400, 0, 0]}
            />
          </Suspense>
          <Suspense fallback={null}>
            <PouchModel textureUrl="./LabelOrange.png" position={[0, 0, 0]} />
          </Suspense>
        </Canvas>
      </Container>
    </Layout2>
  )
}

export default StagePage

const Layout2 = styled(Layout)`
  max-width: 100vw;
`
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

useGLTF.preload('/gltf/pouchDefault.gltf')
