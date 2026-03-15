/**
 * SkillGlobe.jsx
 * About section: Interactive 3D wireframe globe with orbiting skill labels.
 * Users can drag/rotate the globe with OrbitControls.
 */
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const SKILLS = [
    { label: 'React', color: '#61dafb', angle: 0, elevation: 0.4 },
    { label: 'Node.js', color: '#4CAF50', angle: 1.2, elevation: -0.3 },
    { label: 'Three.js', color: '#6c63ff', angle: 2.4, elevation: 0.7 },
    { label: 'Python', color: '#FFD43B', angle: 3.6, elevation: -0.5 },
    { label: 'Java', color: '#f89820', angle: 4.8, elevation: 0.1 },
    { label: 'C++', color: '#00599C', angle: 0.6, elevation: -0.8 },
    { label: 'MongoDB', color: '#4DB33D', angle: 1.8, elevation: 0.9 },
    { label: 'AI/ML', color: '#00f5d4', angle: 3.0, elevation: 0.3 },
    { label: 'Git', color: '#F05032', angle: 4.2, elevation: -0.6 },
    { label: 'Linux', color: '#FCC624', angle: 5.4, elevation: 0.5 },
];

function OrbitingSkills({ radius = 2.2 }) {
    const groupRef = useRef();
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <group ref={groupRef}>
            {SKILLS.map((skill, i) => {
                const x = Math.cos(skill.angle) * radius * Math.cos(skill.elevation);
                const y = Math.sin(skill.elevation) * radius;
                const z = Math.sin(skill.angle) * radius * Math.cos(skill.elevation);
                return (
                    <group key={i} position={[x, y, z]}>
                        {/* Orbiting dot */}
                        <mesh>
                            <sphereGeometry args={[0.06, 8, 8]} />
                            <meshStandardMaterial color={skill.color} emissive={skill.color} emissiveIntensity={1} />
                        </mesh>
                        {/* Label */}
                        <Html center distanceFactor={6}>
                            <div style={{
                                background: 'rgba(18, 18, 26, 0.85)',
                                border: `1px solid ${skill.color}`,
                                color: skill.color,
                                padding: '3px 8px',
                                borderRadius: '20px',
                                fontSize: '10px',
                                fontFamily: 'JetBrains Mono, monospace',
                                whiteSpace: 'nowrap',
                                boxShadow: `0 0 8px ${skill.color}60`,
                                pointerEvents: 'none',
                            }}>
                                {skill.label}
                            </div>
                        </Html>
                    </group>
                );
            })}
        </group>
    );
}

function GlobeScene() {
    return (
        <>
            <ambientLight intensity={0.3} />
            <pointLight position={[5, 5, 5]} intensity={0.8} color="#6c63ff" />
            <pointLight position={[-5, -5, -5]} intensity={0.5} color="#00f5d4" />

            {/* Wireframe sphere */}
            <Sphere args={[1.5, 32, 32]}>
                <meshStandardMaterial
                    color="#6c63ff"
                    wireframe
                    transparent
                    opacity={0.25}
                    emissive="#6c63ff"
                    emissiveIntensity={0.3}
                />
            </Sphere>

            {/* Inner glow sphere */}
            <Sphere args={[1.48, 16, 16]}>
                <meshStandardMaterial
                    color="#6c63ff"
                    transparent
                    opacity={0.04}
                    emissive="#6c63ff"
                    emissiveIntensity={0.1}
                />
            </Sphere>

            <OrbitingSkills radius={2.4} />

            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.5}
                minPolarAngle={Math.PI * 0.15}
                maxPolarAngle={Math.PI * 0.85}
            />
        </>
    );
}

export default function SkillGlobe() {
    return (
        <div style={{ width: '100%', height: '420px' }}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 60 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 1.5]}
            >
                <GlobeScene />
            </Canvas>
        </div>
    );
}
