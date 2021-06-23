import { useRef } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import useMedia from 'use-media'

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
  const group = useRef()
  const { nodes } = useGLTF('/gltf/pouchDefault.gltf')
  const texture = useTexture(textureUrl)
  texture.flipY = false
  const isLarge = useMedia({ minWidth: 1024 })
  useFrame(() => {
    group.current.scale.x = isLarge ? 1.5 : scale
    group.current.scale.y = isLarge ? 1.5 : scale
    group.current.scale.z = isLarge ? 1.5 : scale

    group.current.position.y = isLarge ? -40 : -10
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
