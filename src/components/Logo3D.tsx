import type { RefObject } from 'react'
import { Suspense, useEffect, useMemo, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
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

function LogoMesh({
  svgSrc,
  scrollRootRef,
  inView,
}: {
  svgSrc: string
  scrollRootRef?: RefObject<HTMLElement | null>
  inView: boolean
}) {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  const groupRef = useRef<THREE.Group>(null)
  /** כמה חומרים (אחד לכל צורה ב-SVG) — ref יחיד לא מספיק ב־map */
  const materialRefs = useRef<(THREE.MeshStandardMaterial | null)[]>([])
  const scrollProgress = useRef(0)
  const scrollTicking = useRef(false)
  const mouse = useRef({ x: 0, y: 0 })
  const mousePending = useRef({ x: 0, y: 0 })
  const mouseTicking = useRef(false)
  /** אחרי גלילה מלאה — בלי עדכון emissive כל פריים (חוסך CPU); טרנספורמציה + עכבר נשארים */
  const scrollGlowSettled = useRef(false)
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
    if (!isHome) {
      scrollProgress.current = 0
      return
    }

    let scrollRaf = 0

    const applyScroll = () => {
      const el = scrollRootRef?.current ?? null
      const root = document.scrollingElement ?? document.documentElement

      const scrollTop = el
        ? el.scrollTop
        : root.scrollTop ||
          document.documentElement.scrollTop ||
          document.body.scrollTop

      const maxScroll = el
        ? Math.max(0, el.scrollHeight - el.clientHeight)
        : Math.max(0, root.scrollHeight - root.clientHeight)

      const progress = maxScroll > 0 ? scrollTop / maxScroll : 0
      scrollProgress.current = Math.min(progress, 1)
      scrollTicking.current = false
      scrollRaf = 0
      if (inView) invalidate()
    }

    applyScroll()

    const onScroll = () => {
      if (scrollTicking.current) return
      scrollTicking.current = true
      scrollRaf = requestAnimationFrame(applyScroll)
    }

    const el = scrollRootRef?.current ?? null
    if (el) {
      el.addEventListener('scroll', onScroll, { passive: true })
      return () => {
        cancelAnimationFrame(scrollRaf)
        el.removeEventListener('scroll', onScroll)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(scrollRaf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [invalidate, inView, isHome, scrollRootRef])

  useEffect(() => {
    if (!isHome) return

    let mouseRaf = 0

    const applyMouse = () => {
      mouse.current.x = mousePending.current.x
      mouse.current.y = mousePending.current.y
      mouseTicking.current = false
      mouseRaf = 0
      if (inView) invalidate()
    }

    const onMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return
      if (!inView) return

      mousePending.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mousePending.current.y = (e.clientY / window.innerHeight) * 2 - 1

      if (mouseTicking.current) return
      mouseTicking.current = true
      mouseRaf = requestAnimationFrame(applyMouse)
    }

    window.addEventListener('mousemove', onMove, { passive: true })

    return () => {
      cancelAnimationFrame(mouseRaf)
      window.removeEventListener('mousemove', onMove)
    }
  }, [invalidate, inView, isHome])

  /** כשחוזרים ל־viewport או לדף הבית — פריים אחד לעדכון demand */
  useEffect(() => {
    if (isHome && inView) invalidate()
  }, [inView, isHome, invalidate])

  useFrame(() => {
    if (!groupRef.current || !isHome || !inView) return

    const progress = scrollProgress.current
    if (progress >= 1) {
      scrollGlowSettled.current = true
    } else {
      scrollGlowSettled.current = false
    }

    const baseRotation = progress * Math.PI * 1.5

    const mouseX = mouse.current.x * 0.25
    const mouseY = mouse.current.y * 0.15

    groupRef.current.rotation.y = baseRotation + mouseX
    groupRef.current.rotation.x = mouseY

    const zoomScale = 1 + progress * 0.5

    groupRef.current.scale.set(
      scale * zoomScale,
      -scale * zoomScale,
      scale * zoomScale,
    )

    if (scrollGlowSettled.current) return

    const glowStrength = Math.min(
      0.65,
      0.2 + Math.abs(mouse.current.x) * 0.4,
    )
    const hue = (270 + mouse.current.x * 20) / 360

    for (const mat of materialRefs.current) {
      if (!mat) continue
      mat.emissiveIntensity = glowStrength
      mat.emissive.setHSL(hue, 0.8, 0.4)
    }
  })

  return (
    <group
      ref={groupRef}
      scale={[scale, -scale, scale]}
      position={[offsetX, offsetY, 0]}
    >
      {shapes.map((shape, i) => (
        <mesh key={i} castShadow>
          <extrudeGeometry args={[shape, EXTRUDE_SETTINGS]} />
          <meshStandardMaterial
            ref={(m) => {
              materialRefs.current[i] = m
            }}
            color="#c084fc"
            metalness={0.75}
            roughness={0.15}
            emissive="#4c1d95"
            emissiveIntensity={0.25}
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
  /** אלמנט עם overflow שגלילתו מזיזה את הלוגו (אופציונלי; ברירת מחדל: גלילת המסמך) */
  scrollRootRef?: RefObject<HTMLElement | null>
}

export function Logo3D({
  className,
  logoSvgSrc = '/logo.svg',
  scrollRootRef,
}: Logo3DProps) {
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
          <LogoMesh
            svgSrc={logoSvgSrc}
            scrollRootRef={scrollRootRef}
            inView={inView}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
