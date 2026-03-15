/**
 * FloatingCubes.jsx
 * Skills section: Animated 3D floating, rotating cubes — one per skill category.
 * Hover to expand with intensified glow.
 */
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Html } from '@react-three/drei';
import * as THREE from 'three';


function FloatingCube({ position, color, label, index }) {
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);
    const targetScale = useRef(1);

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.getElapsedTime() + index * 1.2;
        // Float up and down
        meshRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.15;
        // Rotate slowly
        meshRef.current.rotation.x = Math.sin(t * 0.4) * 0.3;
        meshRef.current.rotation.y += 0.008;
        meshRef.current.rotation.z = Math.cos(t * 0.3) * 0.2;
        // Scale lerp on hover
        targetScale.current = hovered ? 1.25 : 1.0;
        meshRef.current.scale.setScalar(
            THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale.current, 0.1)
        );
    });

    return (
        <group position={position}>
            <RoundedBox
                ref={meshRef}
                args={[0.9, 0.9, 0.9]}
                radius={0.1}
                smoothness={4}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={hovered ? 0.9 : 0.35}
                    metalness={0.3}
                    roughness={0.2}
                    transparent
                    opacity={0.88}
                />
            </RoundedBox>

            {/* Label always visible */}
            <Html center position={[0, -0.75, 0]} distanceFactor={5}>
                <div style={{
                    color: color,
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '10px',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    textShadow: `0 0 8px ${color}`,
                    pointerEvents: 'none',
                }}>
                    {label}
                </div>
            </Html>
        </group>
    );
}

const cubeData = [
    { label: 'Programming', color: '#6c63ff', position: [-2.5, 0, 0] },
    { label: 'AI/ML', color: '#00f5d4', position: [-1.2, 0.3, 0] },
    { label: 'Development', color: '#f59e0b', position: [0.1, -0.2, 0] },
    { label: 'Cybersecurity', color: '#ef4444', position: [1.4, 0.1, 0] },
    { label: 'Tools', color: '#a78bfa', position: [2.7, -0.1, 0] },
];

export default function FloatingCubes({ activeTab }) {
    return (
        <div style={{ width: '100%', height: '260px' }}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 60 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 1.5]}
            >
                <ambientLight intensity={0.4} />
                <pointLight position={[5, 5, 5]} intensity={1} color="#6c63ff" />
                <pointLight position={[-5, -3, -5]} intensity={0.5} color="#00f5d4" />

                {cubeData.map((cube, i) => {
                    // Dim cubes that aren't the active tab — use hex for THREE.js compatibility
                    const isActive = !activeTab || cube.label === activeTab;
                    return (
                        <FloatingCube
                            key={cube.label}
                            index={i}
                            position={cube.position}
                            color={isActive ? cube.color : '#2a2a3a'}
                            label={cube.label}
                        />
                    );
                })}
            </Canvas>
        </div>
    );
}
