/**
 * TorusKnot.jsx
 * Contact section background: Slowly rotating, glowing torus knot.
 */
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function KnotMesh() {
    const meshRef = useRef();

    useFrame((state, delta) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.x += delta * 0.12;
        meshRef.current.rotation.y += delta * 0.18;
        meshRef.current.rotation.z += delta * 0.06;
    });

    return (
        <mesh ref={meshRef}>
            <torusKnotGeometry args={[1.4, 0.38, 200, 18, 2, 3]} />
            <meshStandardMaterial
                color="#6c63ff"
                emissive="#4c46cc"
                emissiveIntensity={0.6}
                metalness={0.8}
                roughness={0.1}
                wireframe={false}
                transparent
                opacity={0.65}
            />
        </mesh>
    );
}

export default function TorusKnot() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 60 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 1.5]}
            >
                <ambientLight intensity={0.2} />
                <pointLight position={[5, 5, 5]} intensity={1.5} color="#6c63ff" />
                <pointLight position={[-5, -5, -5]} intensity={0.8} color="#00f5d4" />
                <KnotMesh />
            </Canvas>
        </div>
    );
}
