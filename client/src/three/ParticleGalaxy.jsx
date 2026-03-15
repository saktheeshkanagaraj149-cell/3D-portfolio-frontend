/**
 * ParticleGalaxy.jsx
 * Hero section background: 8000+ particles forming a star-field galaxy
 * with mouse parallax effect using React Three Fiber.
 */
import { useRef, useMemo, useCallback, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ── Inner scene ────────────────────────────────────────────────
function GalaxyParticles() {
    const meshRef = useRef();
    const mouse = useRef({ x: 0, y: 0 });

    // Track mouse globally — useEffect for side-effects with cleanup
    const handleMouseMove = useCallback((e) => {
        mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
        mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [handleMouseMove]);

    // Generate galaxy geometry once
    const { positions, colors } = useMemo(() => {
        const COUNT = 8000;
        const positions = new Float32Array(COUNT * 3);
        const colors = new Float32Array(COUNT * 3);

        const colorInner = new THREE.Color('#6c63ff');
        const colorOuter = new THREE.Color('#00f5d4');
        const colorMid = new THREE.Color('#a78bfa');

        for (let i = 0; i < COUNT; i++) {
            const i3 = i * 3;
            // Galaxy spiral arms
            const radius = Math.random() * 8;
            const spinAngle = radius * 3;
            const branchAngle = ((i % 3) / 3) * Math.PI * 2;

            const randX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.6;
            const randY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.2;
            const randZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.6;

            positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randX;
            positions[i3 + 1] = randY;
            positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randZ;

            // Color lerp: inner → mid → outer
            const mixedColor = colorInner.clone();
            const t = radius / 8;
            if (t < 0.5) {
                mixedColor.lerp(colorMid, t * 2);
            } else {
                mixedColor.lerpColors(colorMid, colorOuter, (t - 0.5) * 2);
            }
            colors[i3] = mixedColor.r;
            colors[i3 + 1] = mixedColor.g;
            colors[i3 + 2] = mixedColor.b;
        }
        return { positions, colors };
    }, []);

    // Animate
    useFrame((state, delta) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.y += delta * 0.05;
        // Mouse parallax
        meshRef.current.rotation.x = THREE.MathUtils.lerp(
            meshRef.current.rotation.x, mouse.current.y * 0.15, 0.02
        );
        meshRef.current.rotation.z = THREE.MathUtils.lerp(
            meshRef.current.rotation.z, mouse.current.x * 0.08, 0.02
        );
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    array={positions}
                    count={positions.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    array={colors}
                    count={colors.length / 3}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.025}
                sizeAttenuation
                vertexColors
                transparent
                alphaMap={null}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

// ── Exported Canvas ─────────────────────────────────────────────
export default function ParticleGalaxy() {
    return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <Canvas
                camera={{ position: [0, 2, 6], fov: 75 }}
                gl={{ antialias: false, powerPreference: 'high-performance' }}
                dpr={[1, 1.5]}
            >
                <GalaxyParticles />
            </Canvas>
        </div>
    );
}
