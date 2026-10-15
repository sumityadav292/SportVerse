import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { isMobileViewport, prefersReducedMotion } from "../../utils/format";

function Particles() {
  const ref = useRef();
  const count = isMobileViewport() ? 80 : 220;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#22D3EE" transparent opacity={0.7} />
    </points>
  );
}

export default function ParticleBackground() {
  if (prefersReducedMotion() || isMobileViewport()) {
    return (
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,255,135,0.12),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(139,92,246,0.12),transparent_42%)]" />
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0">
      <Canvas camera={{ position: [0, 0, 6] }}>
        <color attach="background" args={["#05060A"]} />
        <Particles />
      </Canvas>
    </div>
  );
}
