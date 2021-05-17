import { useEffect, useRef } from 'react'
import { useGLTF, useTexture, Center } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

export default function PouchModel({
  textureUrl,
  position = [0, 0, 0],
  rotation = [0.05, 0, 0],
  scale = 1,
  metalness = 0.88,
  roughness = 0.188,
  castShadow = true,
  receiveShadow = true,
  ...rest
}) {
  const group = useRef()
  const { camera } = useThree()
  const { nodes } = useGLTF('/gltf/pouchDefault.gltf')
  const texture = useTexture(textureUrl)
  texture.flipY = false

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
      scale={scale}
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
