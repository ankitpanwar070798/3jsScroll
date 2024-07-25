//experience.jsx
import {
    AccumulativeShadows,
    Sky,
  MeshReflectorMaterial,
  SoftShadows,
  Float,
  Text,
  Html,
  PivotControls,
  TransformControls,
  OrbitControls,
  Sphere,
  useHelper
} from "@react-three/drei"
import { useRef } from "react"
import { useControls } from "leva"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"



export default function Experience() {
  const cube = useRef()
  const Sphere = useRef()
  const torus = useRef()
  const directionalLight = useRef()

  useHelper(directionalLight, THREE.DirectionalLightHelper,1)

  const {position, color, visible} = useControls({
    position: {
        value:{x:-2.9 , y:0},
        step:0.1,
        joystick:'invertY'
    },
    color: {
      value: '#ff9206',
    },
    visible:{
        value:true,
    }
  })

const {sunPosition, sunColor, sunIntensity} = useControls('Sky',{
    sunPosition: {
       value:[1,2,3]

    },

  })

  useFrame((state, delta) => {
// cube.current.rotation.x += 0.01
cube.current.rotation.y +=   0.02
torus.current.rotation.y += 0.01

  })

  return (
    <>
    <color attach="background" args={["black"]} />
      <OrbitControls makeDefault />
      <SoftShadows size={ 25 } samples={ 10 } focus={ 0 } />
      <directionalLight ref={directionalLight} castShadow position={sunPosition} intensity={4.5} />
      <ambientLight intensity={1.5} />
     <Sky sunPosition={sunPosition} sunColor={sunColor} sunIntensity={sunIntensity} />
        <mesh castShadow position={[position.x, position.y, 0]}>
          <sphereGeometry />
          <meshStandardMaterial color={color} visible= {visible} wireframe/>
          <Html
            position={[1, 1, 0]}
            wrapperClass="label"
            center
            distanceFactor={8}
          >
            This is a sphere
          </Html>
        </mesh>
     
        <mesh ref={torus} castShadow position-x={0} rotation-x={-Math.PI * 0.1} position-y={0.2} scale={0.8}>
        <torusGeometry />
        <meshStandardMaterial color="#ff5cef" wireframe/>
        <Html
        position={[1.3, 1.4, 0]}
        wrapperClass="label"
        center
        distanceFactor={8}
      >
        This is a Donut
      </Html>
      </mesh>

      <mesh castShadow ref={cube} position-x={2.8}  scale={0.6} >
        <torusKnotGeometry />
        <meshStandardMaterial color="mediumpurple" radius={10}   wireframe/>
        <Html
        position={[0.8, 0.7, 0]}
        wrapperClass="label"
        center
        distanceFactor={8}
      >
        This is a Cube
      </Html>
      </mesh>
     

      <mesh receiveShadow position-y={-1} rotation-x={-Math.PI * 0.5} scale={10} >
        <planeGeometry />
        <MeshReflectorMaterial
          resolution={512}
          blur={[1000, 1000]}
          mixBlur={1}
          mirror={0.75}
        //   color={0x00000022}
        />

      </mesh>
      <Float speed={4}>
        <Text font="./bangers-v20-latin-regular.woff" position-y={2}  color="#05b4ff">
          Hello Three js
        </Text>
      </Float>
    </>
  )
}
