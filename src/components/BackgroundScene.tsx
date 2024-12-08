'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useEffect, useState, useMemo } from 'react'
import * as THREE from 'three'

function Scene() {
  const materialRef = useRef<THREE.ShaderMaterial>(null!)
  const { size } = useThree()
  const [resolution, setResolution] = useState<THREE.Vector2>(new THREE.Vector2(size.width, size.height))
  
  useEffect(() => {
    const updateResolution = () => {
      setResolution(new THREE.Vector2(size.width, size.height))
    }
    updateResolution()
    window.addEventListener('resize', updateResolution)
    return () => window.removeEventListener('resize', updateResolution)
  }, [size])

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = clock.getElapsedTime()
    }
  })

  const uniforms = useMemo(() => ({
    u_time: { value: 0 },
    u_resolution: { value: resolution },
  }), [resolution])

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  )
}

export default function BackgroundScene() {
  return (
    <Canvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        width: '100vw',
        height: '100vh'
      }}
      camera={{ position: [0,0,1] }}
    >
      <ambientLight intensity={1} />
      <Scene />
    </Canvas>
  )
}

// シェーダーコード（変更なし）
const vertexShader = `
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
}
`

const fragmentShader = `
uniform float u_time;
uniform vec2 u_resolution;

varying vec2 vUv;

float noise(vec2 p) {
  return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);
}

void main() {
  vec2 st = vUv * u_resolution.xy / min(u_resolution.x, u_resolution.y);
  
  float lines = sin(st.y * 10.0 + u_time * 2.0);
  float n = noise(st * 10.0 + u_time);
  
  float intensity = smoothstep(0.8, 1.0, abs(lines + n * 0.2));
  vec3 color = mix(vec3(0.0), vec3(1.0), intensity);
  
  gl_FragColor = vec4(color, 1.0);
}
`

