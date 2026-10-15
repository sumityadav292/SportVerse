import { Float, MeshDistortMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { isMobileViewport, prefersReducedMotion } from "../../utils/format";

function StadiumBeams() {
  const group = useRef();
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.12;
  });
  return (
    <group ref={group}>
      {[0, 1, 2, 3].map((i) => (
        <spotLight
          key={i}
          position={[Math.cos((i * Math.PI) / 2) * 6, 4, Math.sin((i * Math.PI) / 2) * 6]}
          angle={0.35}
          intensity={12}
          color={i % 2 ? "#00FF87" : "#22D3EE"}
        />
      ))}
    </group>
  );
}

function Ball({ variant = "football" }) {
  const mesh = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += delta * 0.35;
    mesh.current.rotation.x += delta * 0.08;
    const targetX = state.pointer.x * 0.35;
    const targetY = state.pointer.y * 0.2;
    mouse.current.x += (targetX - mouse.current.x) * 0.05;
    mouse.current.y += (targetY - mouse.current.y) * 0.05;
    state.camera.position.x = mouse.current.x;
    state.camera.position.y = 0.2 + mouse.current.y;
    state.camera.lookAt(0, 0, 0);
  });

  const color = variant === "basketball" ? "#FF6B2D" : variant === "cricket" ? "#E8E4D8" : "#f4f4f4";

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={mesh}>
        <sphereGeometry args={[1.35, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          emissive={new THREE.Color("#00FF87")}
          emissiveIntensity={0.18}
          roughness={0.25}
          metalness={0.4}
          distort={0.12}
          speed={1.5}
        />
      </mesh>
      <mesh>
        <torusGeometry args={[1.7, 0.012, 16, 80]} />
        <meshBasicMaterial color="#22D3EE" transparent opacity={0.5} />
      </mesh>
    </Float>
  );
}

function Dust() {
  const count = 90;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      arr[i * 3] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, []);
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.06;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#8B5CF6" size={0.03} />
    </points>
  );
}

export default function SportsBall3D({ variant = "football", className = "h-full w-full" }) {
  if (prefersReducedMotion() || isMobileViewport()) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,135,0.2),transparent_55%)]" />
        <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-live/50 shadow-glow" />
      </div>
    );
  }

  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0.4, 5], fov: 45 }}>
        <color attach="background" args={["#05060A"]} />
        <ambientLight intensity={0.35} />
        <StadiumBeams />
        <Ball variant={variant} />
        <Dust />
      </Canvas>
    </div>
  );
}
