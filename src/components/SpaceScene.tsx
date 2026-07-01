import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Sphere, Stars } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function AstronautFigure() {
  const astronaut = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!astronaut.current) return;
    astronaut.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.45) * 0.35;
    astronaut.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.1}>
      <group ref={astronaut} position={[5.3, 2.2, -4.4]} rotation={[0.3, -0.6, 0.25]} scale={0.72}>
        <mesh position={[0, 1.2, 0]}>
          <sphereGeometry args={[0.44, 32, 32]} />
          <meshStandardMaterial color="#eef6ff" emissive="#8b5cf6" emissiveIntensity={0.18} />
        </mesh>
        <mesh position={[0, 1.2, 0.28]} scale={[0.72, 0.72, 0.72]}>
          <sphereGeometry args={[0.28, 32, 32]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.55} transparent opacity={0.88} />
        </mesh>
        <mesh position={[0, 0.35, 0]} scale={[0.95, 1.2, 0.65]}>
          <capsuleGeometry args={[0.42, 1.1, 8, 16]} />
          <meshStandardMaterial color="#f8fafc" emissive="#ffffff" emissiveIntensity={0.08} />
        </mesh>
        <mesh position={[-0.75, 0.5, 0]} rotation={[0, 0, 0.75]} scale={[0.22, 0.85, 0.22]}>
          <capsuleGeometry args={[0.18, 0.9, 6, 12]} />
          <meshStandardMaterial color="#dbeafe" />
        </mesh>
        <mesh position={[0.75, 0.5, 0]} rotation={[0, 0, -0.45]} scale={[0.22, 0.85, 0.22]}>
          <capsuleGeometry args={[0.18, 0.9, 6, 12]} />
          <meshStandardMaterial color="#dbeafe" />
        </mesh>
        <mesh position={[-0.3, -0.95, 0]} rotation={[0, 0, 0.12]} scale={[0.22, 1, 0.22]}>
          <capsuleGeometry args={[0.18, 0.9, 6, 12]} />
          <meshStandardMaterial color="#dbeafe" />
        </mesh>
        <mesh position={[0.32, -0.95, 0]} rotation={[0, 0, -0.2]} scale={[0.22, 1, 0.22]}>
          <capsuleGeometry args={[0.18, 0.9, 6, 12]} />
          <meshStandardMaterial color="#dbeafe" />
        </mesh>
        <mesh position={[-1.18, 0.72, -0.12]} rotation={[0.5, 0.15, -0.1]} scale={[0.05, 0.05, 1.7]}>
          <cylinderGeometry args={[1, 1, 1, 12]} />
          <meshStandardMaterial color="#c084fc" emissive="#8b5cf6" emissiveIntensity={0.45} />
        </mesh>
      </group>
    </Float>
  );
}

function OrbitalBodies() {
  const group = useRef<THREE.Group>(null);
  const asteroids = useMemo(
    () =>
      Array.from({ length: 45 }, (_, index) => ({
        position: [
          Math.sin(index * 0.7) * (8 + (index % 6)),
          Math.cos(index * 1.2) * (3 + (index % 4)),
          -8 - (index % 9),
        ] as [number, number, number],
        scale: 0.08 + ((index * 3) % 7) * 0.03,
      })),
    [],
  );

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.04;
    group.current.position.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.4;
  });

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
        <Sphere args={[1.5, 64, 64]} position={[-5, 1, -8]}>
          <meshStandardMaterial color="#4f46e5" emissive="#4f46e5" emissiveIntensity={0.6} />
        </Sphere>
      </Float>
      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere args={[0.8, 48, 48]} position={[4, -1.5, -6]}>
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.7} />
        </Sphere>
      </Float>
      <Float speed={2.2} rotationIntensity={0.8} floatIntensity={1.2}>
        <mesh position={[0, 2.5, -5]} rotation={[0.2, 0.8, 0]}>
          <boxGeometry args={[0.8, 0.2, 2.4]} />
          <meshStandardMaterial color="#cbd5e1" emissive="#8b5cf6" emissiveIntensity={0.4} />
        </mesh>
      </Float>
      {asteroids.map((asteroid, index) => (
        <mesh key={index} position={asteroid.position} scale={asteroid.scale}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.8} metalness={0.15} />
        </mesh>
      ))}
    </group>
  );
}

export function SpaceScene() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(79,70,229,0.35),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(34,211,238,0.18),transparent_25%),radial-gradient(circle_at_50%_80%,rgba(139,92,246,0.2),transparent_28%),linear-gradient(180deg,#030712_0%,#020617_100%)]" />
      <Canvas camera={{ position: [0, 0, 9], fov: 55 }}>
        <ambientLight intensity={0.9} />
        <pointLight position={[0, 0, 0]} intensity={18} color="#8b5cf6" />
        <pointLight position={[6, 4, 5]} intensity={14} color="#22d3ee" />
        <fog attach="fog" args={['#030712', 8, 22]} />
        <Stars radius={160} depth={80} count={6000} factor={5} saturation={0} fade speed={0.8} />
        <Sparkles count={140} scale={18} size={2.6} speed={0.35} color="#e0f2fe" />
        <AstronautFigure />
        <OrbitalBodies />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,7,18,0.1)_55%,rgba(3,7,18,0.7)_100%)]" />
    </div>
  );
}
