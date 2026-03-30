import { useEffect, useState, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { PointerLockControls } from '@react-three/drei'
import * as THREE from 'three'

export default function FirstPersonControls() {
  const { camera } = useThree()
  const [moveForward, setMoveForward] = useState(false)
  const [moveBackward, setMoveBackward] = useState(false)
  const [moveLeft, setMoveLeft] = useState(false)
  const [moveRight, setMoveRight] = useState(false)

  const velocity = useRef(new THREE.Vector3())
  const direction = useRef(new THREE.Vector3())

  useEffect(() => {
    const onKeyDown = (event) => {
      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
          setMoveForward(true)
          break
        case 'ArrowLeft':
        case 'KeyA':
          setMoveLeft(true)
          break
        case 'ArrowDown':
        case 'KeyS':
          setMoveBackward(true)
          break
        case 'ArrowRight':
        case 'KeyD':
          setMoveRight(true)
          break
      }
    }

    const onKeyUp = (event) => {
      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
          setMoveForward(false)
          break
        case 'ArrowLeft':
        case 'KeyA':
          setMoveLeft(false)
          break
        case 'ArrowDown':
        case 'KeyS':
          setMoveBackward(false)
          break
        case 'ArrowRight':
        case 'KeyD':
          setMoveRight(false)
          break
      }
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  useFrame((state, delta) => {
    velocity.current.x -= velocity.current.x * 10.0 * delta
    velocity.current.z -= velocity.current.z * 10.0 * delta

    direction.current.z = Number(moveForward) - Number(moveBackward)
    direction.current.x = Number(moveRight) - Number(moveLeft)
    direction.current.normalize()

    if (moveForward || moveBackward) velocity.current.z -= direction.current.z * 40.0 * delta
    if (moveLeft || moveRight) velocity.current.x -= direction.current.x * 40.0 * delta

    camera.translateX(-velocity.current.x * delta)
    camera.translateZ(-velocity.current.z * delta)
    camera.position.y = 1.6 // Maintain eye height
  })

  return <PointerLockControls makeDefault />
}
