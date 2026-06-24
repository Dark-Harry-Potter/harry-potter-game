'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Plane, Box } from '@react-three/drei'
import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'

function GameScene() {
  const sceneRef = useRef<THREE.Scene | null>(null)

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 5, 10]} />
      <OrbitControls />

      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, 10, -10]} intensity={0.5} />

      {/* Ground */}
      <Plane args={[50, 50]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1a3a3a" />
      </Plane>

      {/* Castle Main Building */}
      <Box args={[5, 8, 5]} position={[0, 4, 0]}>
        <meshStandardMaterial color="#4a4a4a" />
      </Box>

      {/* Castle Tower 1 */}
      <Box args={[2, 10, 2]} position={[-3, 5, -3]}>
        <meshStandardMaterial color="#3a3a3a" />
      </Box>

      {/* Castle Tower 2 */}
      <Box args={[2, 10, 2]} position={[3, 5, -3]}>
        <meshStandardMaterial color="#3a3a3a" />
      </Box>

      {/* Training Grounds */}
      <Box args={[8, 0.5, 8]} position={[0, 0.25, -15]}>
        <meshStandardMaterial color="#5a5a3a" />
      </Box>

      {/* Forest area marker */}
      <Box args={[3, 0.5, 3]} position={[-20, 0.25, 0]}>
        <meshStandardMaterial color="#2a5a2a" />
      </Box>

      {/* Village area marker */}
      <Box args={[5, 0.5, 5]} position={[20, 0.25, 0]}>
        <meshStandardMaterial color="#5a5a2a" />
      </Box>

      {/* Fog for atmosphere */}
      <fog attach="fog" args={['#000', 20, 100]} />
    </>
  )
}

interface GameWorldProps {
  onInteractLocation?: (location: string) => void
}

export function GameWorld({ onInteractLocation }: GameWorldProps) {
  return (
    <div className="w-full h-full">
      <Canvas>
        <GameScene />
      </Canvas>
    </div>
  )
}
