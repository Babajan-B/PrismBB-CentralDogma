"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Torus, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/* ── Color palette for each nucleotide base ── */
const BASE_COLORS: Record<string, string> = {
  A: "#ef4444", // Adenine  — red
  U: "#3b82f6", // Uracil   — blue
  T: "#3b82f6", // Thymine  — blue (DNA equiv)
  G: "#10b981", // Guanine  — green
  C: "#f59e0b", // Cytosine — amber
};

/* ── 3D Nucleotide Base (spinning, glowing) ── */
function NucleotideBase3D({
  base,
  size = 1,
}: {
  base: string;
  size?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const color = BASE_COLORS[base] ?? "#8b5cf6";

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.5;
      meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.08);
    }
  });

  // Different geometry per base
  if (base === "A" || base === "G") {
    // Purines — double ring → Torus
    return (
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
        <group>
          <mesh ref={meshRef}>
            <Torus args={[size * 0.5, size * 0.18, 16, 32]}>
              <MeshDistortMaterial
                color={color}
                speed={3}
                distort={0.15}
                roughness={0.2}
                metalness={0.6}
              />
            </Torus>
          </mesh>
          {/* Inner ring for purines */}
          <mesh rotation={[Math.PI / 4, 0, 0]} position={[0, 0, 0.1]}>
            <torusGeometry args={[size * 0.3, size * 0.12, 12, 24]} />
            <meshStandardMaterial
              color={color}
              transparent
              opacity={0.6}
              roughness={0.3}
              metalness={0.5}
            />
          </mesh>
          {/* Glow sphere */}
          <mesh ref={glowRef}>
            <Sphere args={[size * 0.8, 16, 16]}>
              <meshStandardMaterial
                color={color}
                transparent
                opacity={0.05}
                roughness={1}
              />
            </Sphere>
          </mesh>
        </group>
      </Float>
    );
  }

  // Pyrimidines (C, U/T) — single ring → RoundedBox
  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <group>
        <mesh ref={meshRef}>
          <RoundedBox args={[size * 0.7, size * 0.7, size * 0.2]} radius={0.1}>
            <MeshDistortMaterial
              color={color}
              speed={3}
              distort={0.12}
              roughness={0.2}
              metalness={0.6}
            />
          </RoundedBox>
        </mesh>
        {/* Glow */}
        <mesh ref={glowRef}>
          <Sphere args={[size * 0.7, 16, 16]}>
            <meshStandardMaterial
              color={color}
              transparent
              opacity={0.05}
              roughness={1}
            />
          </Sphere>
        </mesh>
      </group>
    </Float>
  );
}

/* ── Ribose Sugar molecule ── */
function SugarMolecule3D({ size = 1 }: { size?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.3;
      groupRef.current.rotation.z = Math.sin(t * 0.4) * 0.1;
    }
  });

  // Pentagon ring (sugar)
  const points: [number, number, number][] = [];
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
    points.push([
      Math.cos(angle) * size * 0.4,
      Math.sin(angle) * size * 0.4,
      0,
    ]);
  }

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
      <group ref={groupRef}>
        {/* Pentagon vertices as atoms */}
        {points.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[size * 0.08, 12, 12]} />
            <meshStandardMaterial
              color={i === 0 ? "#ef4444" : "#666666"}
              roughness={0.3}
              metalness={0.5}
            />
          </mesh>
        ))}
        {/* Bonds between atoms */}
        {points.map((pos, i) => {
          const next = points[(i + 1) % 5];
          const mid: [number, number, number] = [
            (pos[0] + next[0]) / 2,
            (pos[1] + next[1]) / 2,
            0,
          ];
          const len = Math.sqrt(
            (next[0] - pos[0]) ** 2 + (next[1] - pos[1]) ** 2,
          );
          const angle = Math.atan2(next[1] - pos[1], next[0] - pos[0]);
          return (
            <mesh
              key={`bond-${i}`}
              position={mid}
              rotation={[0, 0, angle]}
            >
              <boxGeometry args={[len, size * 0.03, size * 0.03]} />
              <meshStandardMaterial color="#999" roughness={0.4} metalness={0.3} />
            </mesh>
          );
        })}
        {/* Oxygen glow */}
        <mesh position={[0, 0, 0]}>
          <Sphere args={[size * 0.5, 12, 12]}>
            <meshStandardMaterial
              color="#f59e0b"
              transparent
              opacity={0.04}
            />
          </Sphere>
        </mesh>
      </group>
    </Float>
  );
}

/* ── Amino Acid 3D (ball-and-stick model) ── */
function AminoAcid3D({
  color = "#8b5cf6",
  size = 1,
}: {
  color?: string;
  size?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.4;
      groupRef.current.rotation.x = Math.sin(t * 0.5) * 0.15;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* Central carbon (alpha) */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[size * 0.14, 16, 16]} />
          <meshStandardMaterial color="#444" roughness={0.2} metalness={0.6} />
        </mesh>
        {/* Amino group — NH2 */}
        <mesh position={[-size * 0.35, size * 0.2, 0]}>
          <sphereGeometry args={[size * 0.11, 12, 12]} />
          <meshStandardMaterial color="#3b82f6" roughness={0.3} metalness={0.5} />
        </mesh>
        {/* Bond to amino */}
        <mesh position={[-size * 0.175, size * 0.1, 0]} rotation={[0, 0, 0.52]}>
          <boxGeometry args={[size * 0.35, size * 0.025, size * 0.025]} />
          <meshStandardMaterial color="#888" />
        </mesh>
        {/* Carboxyl group — COOH */}
        <mesh position={[size * 0.35, size * 0.2, 0]}>
          <sphereGeometry args={[size * 0.11, 12, 12]} />
          <meshStandardMaterial color="#ef4444" roughness={0.3} metalness={0.5} />
        </mesh>
        {/* Bond to carboxyl */}
        <mesh position={[size * 0.175, size * 0.1, 0]} rotation={[0, 0, -0.52]}>
          <boxGeometry args={[size * 0.35, size * 0.025, size * 0.025]} />
          <meshStandardMaterial color="#888" />
        </mesh>
        {/* R-group */}
        <mesh position={[0, -size * 0.35, 0]}>
          <sphereGeometry args={[size * 0.16, 16, 16]} />
          <MeshDistortMaterial
            color={color}
            speed={2}
            distort={0.2}
            roughness={0.3}
            metalness={0.5}
          />
        </mesh>
        {/* Bond to R */}
        <mesh position={[0, -size * 0.175, 0]}>
          <boxGeometry args={[size * 0.025, size * 0.35, size * 0.025]} />
          <meshStandardMaterial color="#888" />
        </mesh>
        {/* Hydrogen */}
        <mesh position={[0, size * 0.3, size * 0.15]}>
          <sphereGeometry args={[size * 0.07, 12, 12]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>
        {/* Bond to H */}
        <mesh position={[0, size * 0.15, size * 0.075]} rotation={[0.46, 0, 0]}>
          <boxGeometry args={[size * 0.02, size * 0.3, size * 0.02]} />
          <meshStandardMaterial color="#888" />
        </mesh>
        {/* Glow */}
        <mesh>
          <Sphere args={[size * 0.55, 12, 12]}>
            <meshStandardMaterial
              color={color}
              transparent
              opacity={0.04}
            />
          </Sphere>
        </mesh>
      </group>
    </Float>
  );
}

/* ── DNA Double Helix ── */
function DoubleHelix3D({ size = 1 }: { size?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.3;
    }
  });

  const helixPoints = 20;
  const height = size * 1.5;

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef}>
        {Array.from({ length: helixPoints }).map((_, i) => {
          const t = (i / helixPoints) * Math.PI * 3;
          const y = (i / helixPoints - 0.5) * height;
          const r = size * 0.3;
          const colors = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b"];
          return (
            <group key={i}>
              {/* Strand 1 */}
              <mesh position={[Math.cos(t) * r, y, Math.sin(t) * r]}>
                <sphereGeometry args={[size * 0.04, 8, 8]} />
                <meshStandardMaterial
                  color={colors[i % 4]}
                  roughness={0.3}
                  metalness={0.5}
                />
              </mesh>
              {/* Strand 2 */}
              <mesh position={[Math.cos(t + Math.PI) * r, y, Math.sin(t + Math.PI) * r]}>
                <sphereGeometry args={[size * 0.04, 8, 8]} />
                <meshStandardMaterial
                  color={colors[(i + 2) % 4]}
                  roughness={0.3}
                  metalness={0.5}
                />
              </mesh>
              {/* Base pair bond (every other) */}
              {i % 2 === 0 && (
                <mesh position={[0, y, 0]} rotation={[0, t, 0]}>
                  <boxGeometry args={[r * 2, size * 0.015, size * 0.015]} />
                  <meshStandardMaterial color="#666" transparent opacity={0.5} />
                </mesh>
              )}
            </group>
          );
        })}
      </group>
    </Float>
  );
}

/* ── Wrapper with Canvas ── */
interface MoleculeSceneProps {
  type: "base" | "sugar" | "aminoAcid" | "helix";
  base?: string;
  color?: string;
  size?: number;
  className?: string;
}

export function MoleculeScene({
  type,
  base = "A",
  color = "#8b5cf6",
  size = 1,
  className = "",
}: MoleculeSceneProps) {
  return (
    <div className={`${className}`} style={{ touchAction: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-3, -3, 2]} intensity={0.3} />
        <pointLight position={[0, 0, 3]} intensity={0.5} color={color} />

        {type === "base" && <NucleotideBase3D base={base} size={size} />}
        {type === "sugar" && <SugarMolecule3D size={size} />}
        {type === "aminoAcid" && <AminoAcid3D color={color} size={size} />}
        {type === "helix" && <DoubleHelix3D size={size} />}
      </Canvas>
    </div>
  );
}
