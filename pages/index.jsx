import router from 'next/router'
import React, { useEffect, Suspense } from 'react'
import Layout from '../components/Layout'
import { fetcher, mealDbRandom } from '../lib'
import { Canvas } from '@react-three/fiber'
import { LogoModel } from '../components/Logo'
import {
  useGLTF,
  OrthographicCamera,
  PerspectiveCamera,
  OrbitControls,
} from '@react-three/drei'
import { useState } from 'react'
import { useRef } from 'react'

export async function getServerSideProps(context) {
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

  const [sizes, setSizes] = useState({ width: 0, height: 0 })
  useEffect(() => {
    if (window) {
      setSizes({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
  }, [])

  const myCamera = useRef()

  return (
    <Layout>
      <div className="page">
        <main>
          <Canvas
            style={{ width: '100vw', height: '100vh', background: 'black' }}
          >
            {/* <OrthographicCamera
              makeDefault
              left={0}
              right={document.body.offsetWidth}
              top={0}
              bottom={document.body.offsetHeight}
              // far={50000}
              // near={-50000}
              position={[0, 0, -20]}
            >
          </OrthographicCamera> */}
            <PerspectiveCamera
              ref={myCamera}
              fov={75}
              aspect={sizes.width / sizes.height}
            ></PerspectiveCamera>
            <OrbitControls camera={myCamera.current} />
            <directionalLight
              intensity={0.75}
              decay={2}
              position={[850000, 1300000, 1000000]}
              rotation={[-0.92, 0.48, -0.34]}
            />
            <Suspense fallback={null}>
              <LogoModel scale={[0.1, 0.1, 0.1]} />
            </Suspense>
          </Canvas>
          <h2>
            A random astronaut food generatorfor your outer space missons. Or
            create your own meals.
          </h2>
          <button onClick={handleGenerate}>Generate Now</button>
        </main>
      </div>
    </Layout>
  )
}

export default Index
