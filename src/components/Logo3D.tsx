import { Suspense, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { Canvas, useLoader, useThree } from '@react-three/fiber'
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js'
import * as THREE from 'three'

/** עומק/bevel מתונים — פחות משולשים מאשר bevelSegments גבוה */
const EXTRUDE_SETTINGS: THREE.ExtrudeGeometryOptions = {
  depth: 0.1,
  bevelEnabled: true,
  bevelThickness: 0.018,
  bevelSize: 0.012,
  bevelSegments: 1,
  curveSegments: 4,
}

function LogoMesh({ svgSrc, inView }: { svgSrc: string; inView: boolean }) {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  const { invalidate } = useThree()

  const data = useLoader(SVGLoader, svgSrc)

  const scale = 0.008
  const offsetX = -(95 + 1690 / 2) * scale
  const offsetY = (795 + 890 / 2) * scale

  const shapes = useMemo(
    () => data.paths.flatMap((path) => SVGLoader.createShapes(path)),
    [data],
  )

  useEffect(() => {
    if (isHome && inView) invalidate()
  }, [inView, isHome, invalidate])

  return (
    <group scale={[scale, -scale, scale]} position={[offsetX, offsetY, 0]}>
      {shapes.map((shape, i) => (
        <mesh key={i} castShadow>
          <extrudeGeometry args={[shape, EXTRUDE_SETTINGS]} />
          <meshStandardMaterial
            color="#f8fafc"
            metalness={0.4}
            roughness={0.35}
            emissive="#e2e8f0"
            emissiveIntensity={0.22}
          />
        </mesh>
      ))}
    </group>
  )
}

type Logo3DProps = {
  className?: string
  /** נתיב ל-SVG לטעינה עם SVGLoader */
  logoSvgSrc?: string
}

export function Logo3D({ className, logoSvgSrc = '/logo.svg' }: Logo3DProps) {
  const { ref: inViewRootRef, inView } = useInView({ threshold: 0.1 })

  return (
    <div
      ref={inViewRootRef}
      className={['w-full overflow-hidden', className].filter(Boolean).join(' ')}
    >
      <Canvas
        className="h-full w-full"
        frameloop="demand"
        camera={{ position: [0, 0, 12], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.2]}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[8, 6, 10]} intensity={0.85} />
        <Suspense fallback={null}>
          <LogoMesh svgSrc={logoSvgSrc} inView={inView} />
        </Suspense>
      </Canvas>
    </div>
  )
}
