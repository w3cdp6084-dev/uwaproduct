import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { useRef, useMemo, useState, useEffect } from 'react'
import * as THREE from 'three'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

function MorphingParticles() {
  const points = useRef<THREE.Points>(null)
  const [morphing, setMorphing] = useState(false)
  const [textGeometry, setTextGeometry] = useState<THREE.BufferGeometry | null>(null)
  
  // パーティクルの数を定義
  const particleCount = 10000
  
  // フォントを読み込む
  const font = useLoader(FontLoader, '/fonts/Geist_Regular.json')

  useEffect(() => {
    if (font) {
      const geometry = new TextGeometry('2024', {
        font: font,
        size: 2,
        height: 0,
        curveSegments: 12,
      })
      geometry.center()
      setTextGeometry(geometry)
    }
  }, [font])
  
  // 3つの異なる形状のパーティクル位置を生成
  const [textPositions, spherePositions, randomPositions] = useMemo(() => {
    if (!textGeometry) return [new Float32Array(particleCount * 3), new Float32Array(particleCount * 3), new Float32Array(particleCount * 3)]

    const textPositions = new Float32Array(particleCount * 3)
    const spherePositions = new Float32Array(particleCount * 3)
    const randomPositions = new Float32Array(particleCount * 3)
    
    // テキストの頂点からパーティクル位置を生成
    const textPoints = textGeometry.attributes.position.array
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      const pointIndex = (i % (textPoints.length / 3)) * 3
      
      textPositions[i3] = textPoints[pointIndex]
      textPositions[i3 + 1] = textPoints[pointIndex + 1]
      textPositions[i3 + 2] = textPoints[pointIndex + 2]
      
      // 球体の位置を計算
      const phi = Math.random() * Math.PI * 2
      const costheta = Math.random() * 2 - 1
      const u = Math.random()
      const theta = Math.acos(costheta)
      const r = 2 * Math.cbrt(u)
      
      spherePositions[i3] = r * Math.sin(theta) * Math.cos(phi)
      spherePositions[i3 + 1] = r * Math.sin(theta) * Math.sin(phi)
      spherePositions[i3 + 2] = r * Math.cos(theta)
      
      // ランダムな位置
      randomPositions[i3] = (Math.random() - 0.5) * 10
      randomPositions[i3 + 1] = (Math.random() - 0.5) * 10
      randomPositions[i3 + 2] = (Math.random() - 0.5) * 4
    }
    
    return [textPositions, spherePositions, randomPositions]
  }, [textGeometry])

  // アニメーションの進行状況
  const progress = useRef(0)
  const currentShape = useRef(0)
  
  // アニメーションフレームごとにパーティクルを更新
  useFrame((state) => {
    if (!points.current || !textGeometry) return
    
    const time = state.clock.getElapsedTime()
    const positions = points.current.geometry.attributes.position.array as Float32Array
    
    // 5秒ごとに形状を変更
    if (time % 5 < 0.1 && !morphing) {
      setMorphing(true)
      currentShape.current = (currentShape.current + 1) % 3
    }
    
    if (morphing) {
      progress.current += 0.02
      if (progress.current >= 1) {
        progress.current = 0
        setMorphing(false)
      }
    }
    
    // 現在の形状と次の形状の間でモーフィング
    const currentPositions = currentShape.current === 0 ? textPositions :
                           currentShape.current === 1 ? spherePositions :
                           randomPositions
    const nextPositions = currentShape.current === 0 ? spherePositions :
                         currentShape.current === 1 ? randomPositions :
                         textPositions
    
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = THREE.MathUtils.lerp(
        currentPositions[i],
        nextPositions[i],
        morphing ? progress.current : 0
      )
      
      // パーティクルに揺らぎを追加
      positions[i] += Math.sin(time + i) * 0.02
    }
    
    points.current.geometry.attributes.position.needsUpdate = true
  })

  if (!textGeometry) return null

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={randomPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        sizeAttenuation={true}
        color="#4a90e2"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function MorphingParticleScene() {
  return (
    <div className="fixed inset-0 bg-black">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <MorphingParticles />
        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}

