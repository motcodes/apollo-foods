/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
import { useRef } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'

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
