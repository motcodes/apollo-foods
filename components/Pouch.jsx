import { useRef } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'

export default function PouchModel({
  textureUrl,
  position = [0, -1, 0],
  rotation = [0.05, 0, 0],
  scale = [0.0275, 0.0275, 0.0275],
  metalness = 0.88,
  roughness = 0.188,
  castShadow = false,
  receiveShadow = true,
  ...rest
}) {
  const group = useRef()
  const { nodes } = useGLTF('/gltf/pouchDefault.gltf')
  const texture = useTexture(textureUrl)
  texture.flipY = false
  return (
    <group ref={group} {...rest} dispose={null}>
      <mesh
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
    </group>
  )
}

useGLTF.preload('/gltf/pouchDefault.gltf')
