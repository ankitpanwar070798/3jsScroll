
import {  useFrame } from "@react-three/fiber"
import {
  ScrollControls,
  Sky,
  useScroll,
  Float,
  Text,
} from "@react-three/drei"
import * as THREE from "three"

export default function Demo() {
  return (
    <>
      <ambientLight intensity={0.03} />
      <Sky scale={1000} sunPosition={[2, 0.4, 10]} />

      <ScrollControls pages={4}>
       {/*<RotatingCamera /> */}
       <MovingCamera />
        <mesh position-x={0} position-y={0.2} scale={0.8}>
          <torusGeometry />
          <meshBasicMaterial color="#ff5cef" wireframe />
        </mesh>
        <Float speed={4}>
          <Text
            font="./bangers-v20-latin-regular.woff"
            position-y={2}
            color="white"
          >
            Welcome to React three js
          </Text>
        </Float>
      </ScrollControls>
    </>
  )
}



function MovingCamera() {
  const scroll = useScroll()
  useFrame((state) => {
    const offset = scroll.offset
    const totalPages = 4
    const rotationPages = 3 // Number of pages for rotation
    const rotationEndOffset = rotationPages / totalPages
    const movementStartOffset = rotationEndOffset
    const movementEndOffset = 1

    const startPosition = [0, 2, 10] // Initial position of the camera
    const endPosition = [0, 1, 2] // Final position of the camera near the object

    if (offset <= rotationEndOffset) {
      // Rotate the camera around the object for the rotation phase
      const radius = 10
      const angle = (offset / rotationEndOffset) * 2 * Math.PI // Full rotation over the rotation phase
      state.camera.position.set(
        Math.sin(angle) * radius,
        2, // Height of the camera
        Math.cos(angle) * radius
      )
    } else if (offset > movementStartOffset) {
      // Move the camera towards the object for the movement phase
      const t = (offset - movementStartOffset) / (movementEndOffset - movementStartOffset) // Normalize to range from 0 to 1
      const x = THREE.MathUtils.lerp(startPosition[0], endPosition[0], t)
      const y = THREE.MathUtils.lerp(startPosition[1], endPosition[1], t)
      const z = THREE.MathUtils.lerp(startPosition[2], endPosition[2], t)
      state.camera.position.set(x, y, z)
    }

    state.camera.lookAt(0, 0, 0) // Always look at the center
  })
  return null
}