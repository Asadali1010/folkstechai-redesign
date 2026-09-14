import { useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, Sphere } from "@react-three/drei";
import * as THREE from "three";

let cachedThemeColors: { iris: THREE.Color; ember: THREE.Color } | null = null;

/**
 * Reads the iris/ember accent colors straight from the CSS `@theme` tokens
 * defined once in `index.css` (`--color-electric-iris` / `--color-ember-pulse`),
 * so this scene never carries its own separate hardcoded copy of those hex
 * values. Computed lazily (DOM must exist) and cached after the first call.
 */
function getThemeColors() {
  if (cachedThemeColors) return cachedThemeColors;
  const styles = getComputedStyle(document.documentElement);
  const iris = styles.getPropertyValue("--color-electric-iris").trim() || "#5683da";
  const ember = styles.getPropertyValue("--color-ember-pulse").trim() || "#ff8964";
  cachedThemeColors = { iris: new THREE.Color(iris), ember: new THREE.Color(ember) };
  return cachedThemeColors;
}

/**
 * Paints a per-vertex color attribute on `mesh`'s geometry, fading from iris
 * (top) to ember (bottom).
 *
 * This runs in a `useEffect` keyed on the mesh instance itself (via a
 * callback ref + state), not inside `useMemo` reading `ref.current` during
 * render — drei's `<Sphere>`/`<Icosahedron>` attach the ref from a child
 * layout effect, so `ref.current` is still `null` the first time a
 * render-phase `useMemo` runs and the gradient would never actually be set.
 */
function useGradientColors(mesh: THREE.Mesh | null, radius: number) {
  useEffect(() => {
    if (!mesh) return;
    const position = mesh.geometry.getAttribute("position");
    const { iris, ember } = getThemeColors();
    const colors = new Float32Array(position.count * 3);
    const tmp = new THREE.Color();
    for (let i = 0; i < position.count; i++) {
      const y = position.getY(i);
      const t = THREE.MathUtils.clamp((y + radius) / (radius * 2), 0, 1);
      tmp.copy(iris).lerp(ember, t);
      colors[i * 3] = tmp.r;
      colors[i * 3 + 1] = tmp.g;
      colors[i * 3 + 2] = tmp.b;
    }
    mesh.geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  }, [mesh, radius]);
}

function GradientIcosahedron({
  radius,
  detail,
}: {
  radius: number;
  detail: number;
}) {
  const [mesh, setMesh] = useState<THREE.Mesh | null>(null);
  useGradientColors(mesh, radius);
  return (
    <Icosahedron ref={setMesh} args={[radius, detail]}>
      <meshBasicMaterial
        vertexColors
        wireframe
        transparent
        opacity={0.75}
        toneMapped={false}
      />
    </Icosahedron>
  );
}

function GradientCore({ radius }: { radius: number }) {
  const [mesh, setMesh] = useState<THREE.Mesh | null>(null);
  useGradientColors(mesh, radius);
  return (
    <Sphere ref={setMesh} args={[radius, 48, 48]}>
      <meshStandardMaterial
        vertexColors
        transparent
        opacity={0.22}
        roughness={0.35}
        metalness={0.1}
        depthWrite={false}
      />
    </Sphere>
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function RotatingRig() {
  const [group, setGroup] = useState<THREE.Group | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useFrame((state, delta) => {
    if (reducedMotion || !group) return;
    // Continuous, delta-driven rotation — frame-rate independent, no fixed-step ticking.
    group.rotation.y += delta * 0.18;
    group.rotation.x = Math.sin(state.clock.elapsedTime * 0.22) * 0.18;
    group.rotation.z = Math.cos(state.clock.elapsedTime * 0.15) * 0.05;
  });

  return (
    <group ref={setGroup} rotation={[0.3, 0.5, 0]}>
      <GradientCore radius={1.15} />
      <GradientIcosahedron radius={1.6} detail={1} />
    </group>
  );
}

export function HeroSphere() {
  const { iris, ember } = getThemeColors();

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.55} />
      <pointLight position={[3, 2, 4]} intensity={45} color={iris} />
      <pointLight position={[-3, -2, -3]} intensity={35} color={ember} />
      <RotatingRig />
    </Canvas>
  );
}
