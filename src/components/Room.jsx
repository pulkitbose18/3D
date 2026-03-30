import { useMemo, useEffect } from 'react'
import * as THREE from 'three'
import { useTexture } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'

export default function Room({ area = 10, shape = 'square', floorType = 'wood', wallType = 'paint', wallTextureUrl }) {
  // Load interior grass texture
  const grassTexture = useTexture('/textures/grass.jpg', (texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(2, 2)
  })

  // Dynamically load the product material from sidebar
  // Using useLoader as per instruction
  const dynamicTexture = useLoader(
    THREE.TextureLoader, 
    wallTextureUrl || '/textures/acoustic_panel.jpg'
  )

  useEffect(() => {
    if (dynamicTexture) {
      dynamicTexture.wrapS = dynamicTexture.wrapT = THREE.RepeatWrapping
      dynamicTexture.repeat.set(4, 1)
      dynamicTexture.needsUpdate = true
    }
  }, [dynamicTexture])

  const dimensions = useMemo(() => {
    let width, length
    if (shape === 'square') {
      width = length = Math.sqrt(area)
    } else {
      width = Math.sqrt(area / 1.5)
      length = width * 1.5
    }
    return { width, length }
  }, [area, shape])

  const wallHeight = 2.5
  const wallThickness = 0.1

  // Determine Materials
  const floorMaterial = floorType === 'grass' 
    ? <meshStandardMaterial map={grassTexture} />
    : <meshStandardMaterial color="#d2b48c" roughness={0.6} metalness={0.1} />

  // If wallType is acoustic, we use the sidebar's dynamic texture
  const wallMaterial = wallType === 'acoustic'
    ? <meshStandardMaterial map={dynamicTexture} metalness={0.1} roughness={0.6} />
    : <meshStandardMaterial color="#ffffff" />

  return (
    <group>
      {/* Floor */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[dimensions.width, dimensions.length]} />
        {floorMaterial}
      </mesh>

      {/* 4 Walls */}
      <mesh position={[0, wallHeight / 2, -dimensions.length / 2]} castShadow receiveShadow>
        <boxGeometry args={[dimensions.width, wallHeight, wallThickness]} />
        {wallMaterial}
      </mesh>
      <mesh position={[0, wallHeight / 2, dimensions.length / 2]} castShadow receiveShadow>
        <boxGeometry args={[dimensions.width, wallHeight, wallThickness]} />
        {wallMaterial}
      </mesh>
      <mesh position={[dimensions.width / 2, wallHeight / 2, 0]} rotation-y={Math.PI / 2} castShadow receiveShadow>
        <boxGeometry args={[dimensions.length, wallHeight, wallThickness]} />
        {wallMaterial}
      </mesh>
      <mesh position={[-dimensions.width / 2, wallHeight / 2, 0]} rotation-y={Math.PI / 2} castShadow receiveShadow>
        <boxGeometry args={[dimensions.length, wallHeight, wallThickness]} />
        {wallMaterial}
      </mesh>
    </group>
  )
}
