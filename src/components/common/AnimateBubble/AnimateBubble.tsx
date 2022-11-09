import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { forwardRef } from 'react'

import s from './AnimateBubble.module.scss'
import vertexShader from './vertexShader'
import fragmentShader from './fragmentShader'

const options = {
  time: { value: 0.2 },
  pointscale: { value: 1.0 },
  decay: { value: 1.0 },
  size: { value: 0.5 },
  displace: { value: 0.1 },
  complex: { value: 0.01 },
  waves: { value: 40.0 },
  eqcolor: { value: 4.0 },
  rcolor: { value: -0.1 },
  gcolor: { value: 0.5 },
  bcolor: { value: 2.0 },
  fragment: { value: true },
  redhell: { value: true },
}

// было до
//   decay: { value: 1.2 },
//   eqcolor: { value: 2.1 },
//   rcolor: { value: 1.03 },
//   gcolor: { value: 0.5 },
//   bcolor: { value: 2.0 },

interface Props {}
export type Ref = HTMLDivElement

function BlobSphere() {
  useFrame((state) => (options.time.value = state.clock.elapsedTime / 15))
  return (
    <mesh>
      <icosahedronGeometry args={[2, 6]} />
      <shaderMaterial
        side={THREE.DoubleSide}
        uniforms={options}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  )
}
function BlobSphere2() {
  useFrame((state) => (options.time.value = state.clock.elapsedTime / 12))
  return (
    <mesh>
      <icosahedronGeometry args={[2, 76]} />
      <shaderMaterial
        side={THREE.DoubleSide}
        uniforms={options}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        // wireframe
      />
    </mesh>
  )
}

export const AnimateBubble = forwardRef<Ref, Props>((props, ref) => (
  <div id="canvas">
    <div className="circle" ref={ref}>
      <Canvas camera={{ position: [8, 8, 5] }}>
        <BlobSphere2 />
        <BlobSphere />
      </Canvas>
    </div>
  </div>
))
