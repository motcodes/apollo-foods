import React, { useState, useRef, useEffect, Suspense } from 'react'
import router from 'next/router'
import styled from 'styled-components'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage } from '@react-three/drei'
import Layout from '../components/Layout'
import { fetcher, mealDbRandom } from '../lib'
import { PouchModel } from '../components/Pouch'
import { Button, Typography } from '../utils'

export async function getServerSideProps() {
  const { meals } = await fetcher(mealDbRandom)
  const data = meals[0]
  return {
    props: {
      data,
    },
  }
}

const Index = (props) => {
  function handleGenerate() {
    router.push(`/cook/[id]`, `/cook/${props.data.idMeal}`)
  }

  useEffect(() => {
    router.prefetch(`/cook/[id]`, `/cook/${props.data.idMeal}`)
  }, [])

  const controlsRef = useRef()

  return (
    <Layout>
      <main>
        <Canvas
          gl={{ preserveDrawingBuffer: true }}
          shadows
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 10], fov: 45 }}
          style={{ width: '100%', height: '60vh', background: 'black' }}
        >
          <ambientLight intensity={0.35} />
          <OrbitControls ref={controlsRef} autoRotate enableZoom={false} />
          <Suspense fallback={null}>
            <Stage
              contactShadow // Optional: creates a contactshadow underneath the content (default=true)
              shadows // Optional: lights cast shadow (default=true)
              adjustCamera // Optional: zooms the content in (default=true)
              intensity={1.5} // Optional: light intensity (default=1)
              environment="night" // Optional: environment (default=city)
              preset="rembrandt" // Optional: rembrandt (default) | portrait | upfront | soft
              controls={controlsRef} // Optional: recalculates control target for correctness
            >
              <PouchModel />
            </Stage>
          </Suspense>
        </Canvas>
        <Container>
          <Typography variant="h2">
            A random astronaut food generatorfor your outer space missons. Or
            create your own meals.
          </Typography>
          <GenButton onClick={handleGenerate}>Generate Now</GenButton>
        </Container>
      </main>
    </Layout>
  )
}

export default Index

const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding-bottom: 4rem;
  color: white;
  h2 {
    font-weight: 400;
    font-size: 3rem;
    margin-bottom: 1rem;
  }
`

const GenButton = styled(Button)`
  width: 320px;
`
