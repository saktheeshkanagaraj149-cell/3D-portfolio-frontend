import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Gear outline with trapezoid teeth and a centre hole.
function gearShape(teeth, module) {
    const pitch = (module * teeth) / 2;
    const tip = pitch + module;
    const root = pitch - 1.25 * module;
    const step = (Math.PI * 2) / teeth;
    const shape = new THREE.Shape();

    for (let i = 0; i < teeth; i++) {
        const a = i * step;
        // root → flank up → tip land → flank down, as fractions of one tooth pitch
        const pts = [
            [root, a - step * 0.5],
            [root, a - step * 0.27],
            [tip, a - step * 0.15],
            [tip, a + step * 0.15],
            [root, a + step * 0.27],
        ];
        pts.forEach(([r, t], j) => {
            const x = Math.cos(t) * r;
            const y = Math.sin(t) * r;
            if (i === 0 && j === 0) shape.moveTo(x, y);
            else shape.lineTo(x, y);
        });
    }
    shape.closePath();

    const hole = new THREE.Path();
    hole.absarc(0, 0, root * 0.32, 0, Math.PI * 2, true);
    shape.holes.push(hole);

    // spokes: cut four windows between hub and rim
    const inner = root * 0.45;
    const outer = root * 0.78;
    for (let k = 0; k < 4; k++) {
        const c = (k * Math.PI) / 2 + Math.PI / 4;
        const w = 0.42;
        const win = new THREE.Path();
        win.absarc(0, 0, outer, c + w, c - w, true);
        win.absarc(0, 0, inner, c - w * 0.7, c + w * 0.7, false);
        win.closePath();
        shape.holes.push(win);
    }
    return shape;
}

function Gear({ teeth, module, color, speedRef, ratio, phase = 0, ...props }) {
    const ref = useRef();
    const geometry = useMemo(() => {
        const g = new THREE.ExtrudeGeometry(gearShape(teeth, module), {
            depth: 0.35,
            bevelEnabled: true,
            bevelThickness: 0.06,
            bevelSize: 0.04,
            bevelSegments: 2,
            curveSegments: 24,
        });
        g.center();
        return g;
    }, [teeth, module]);

    useFrame(() => {
        if (ref.current) ref.current.rotation.z = speedRef.current.angle * ratio + phase;
    });

    return (
        <mesh ref={ref} geometry={geometry} {...props}>
            <meshStandardMaterial color={color} roughness={0.55} metalness={0.25} />
        </mesh>
    );
}

function Rig({ colors, reduced }) {
    const group = useRef();
    const speed = useRef({ angle: 0, boost: 0 });
    const pointer = useRef({ x: 0, y: 0 });
    const lastScroll = useRef(typeof window !== 'undefined' ? window.scrollY : 0);

    useEffect(() => {
        const onMove = e => {
            pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
        };
        const onScroll = () => {
            const dy = window.scrollY - lastScroll.current;
            lastScroll.current = window.scrollY;
            speed.current.boost += dy * 0.002;
        };
        window.addEventListener('pointermove', onMove);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    useFrame((_, dt) => {
        const s = speed.current;
        if (!reduced) {
            s.angle += (0.25 + s.boost) * Math.min(dt, 0.05);
            s.boost *= 0.92;
        }
        if (group.current) {
            group.current.rotation.y += (pointer.current.x * 0.35 - group.current.rotation.y) * 0.05;
            group.current.rotation.x += (pointer.current.y * 0.25 - 0.35 - group.current.rotation.x) * 0.05;
        }
    });

    // Big gear: 14 teeth. Small gear: 9 teeth. Same module, so they mesh at distance m*(14+9)/2.
    const m = 0.22;
    const d = (m * (14 + 9)) / 2;

    return (
        <group ref={group} rotation={[-0.35, 0, -0.5]}>
            <group position={[-d * 0.36, 0, 0]}>
                <Gear teeth={14} module={m} color={colors.a} speedRef={speed} ratio={1} />
                <Gear
                    teeth={9}
                    module={m}
                    color={colors.b}
                    speedRef={speed}
                    ratio={-14 / 9}
                    position={[d, 0, 0]}
                />
            </group>
        </group>
    );
}

function readColors() {
    const s = getComputedStyle(document.documentElement);
    return {
        a: s.getPropertyValue('--gear-a').trim() || '#c2410c',
        b: s.getPropertyValue('--gear-b').trim() || '#2b2925',
    };
}

export default function Gears() {
    const [colors, setColors] = useState(readColors);
    const [reduced, setReduced] = useState(
        () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );

    useEffect(() => {
        const dark = window.matchMedia('(prefers-color-scheme: dark)');
        const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const onTheme = () => setColors(readColors());
        const onMotion = () => setReduced(motion.matches);
        dark.addEventListener('change', onTheme);
        motion.addEventListener('change', onMotion);
        return () => {
            dark.removeEventListener('change', onTheme);
            motion.removeEventListener('change', onMotion);
        };
    }, []);

    return (
        <Canvas
            camera={{ position: [0, 0, 7.8], fov: 40 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
            aria-hidden="true"
        >
            <ambientLight intensity={0.55} />
            <directionalLight position={[3, 4, 5]} intensity={1.6} />
            <directionalLight position={[-4, -2, 2]} intensity={0.4} />
            <Rig colors={colors} reduced={reduced} />
        </Canvas>
    );
}
