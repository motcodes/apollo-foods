import { useEffect, useRef, useState } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import useMedia from 'use-media'
import router from 'next/router'

export default function PouchModel({
  textureUrl,
  position = [0, 0, 0],
  rotation = [0.05, 0, 0],
  scale = 1.6,
  metalness = 0.88,
  roughness = 0.188,
  castShadow = true,
  receiveShadow = true,
  ...rest
}) {
  const isLarge = useMedia({ minWidth: 1024 })
  const [scaleXYZ, setScale] = useState(scale)
  const [posY, setPosY] = useState(-10)

  const group = useRef()
  const { nodes } = useGLTF('/gltf/pouchDefault.gltf')
  const texture = useTexture(textureUrl)
  texture.flipY = false

  useEffect(() => {
    if (router.pathname.includes('cook') && isLarge) {
      setScale(1.5)
    }
    if (router.pathname.includes('cook') && isLarge) {
      setPosY(-40)
    }
  }, [isLarge])

  useFrame(() => {
    group.current.scale.x = scaleXYZ
    group.current.scale.y = scaleXYZ
    group.current.scale.z = scaleXYZ

    group.current.position.y = posY
  })

  return (
    <mesh
      {...rest}
      ref={group}
      dispose={null}
      geometry={nodes.pouch.geometry}
      castShadow={castShadow}
      receiveShadow={receiveShadow}
      position={position}
      rotation={rotation}
      scale={1}
    >
      <meshStandardMaterial
        map={texture}
        attatch="material"
        metalness={metalness}
        roughness={roughness}
      />
    </mesh>
  )
}

useGLTF.preload('/gltf/pouchDefault.gltf')
