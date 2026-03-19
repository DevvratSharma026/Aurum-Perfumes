import { useRef, useMemo, useEffect, useState, memo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { addTick } from '../hooks/useTick'

// ── Scent data ────────────────────────────────────────────
const SCENTS = [
  {
    id: 'noir', name: 'Noir', number: '01',
    tagline: 'The unnamed hour',
    desc: 'Oud · Black Amber · Sacred Resin · Smoke',
    color: new THREE.Color('#0a0806'),
    emissive: new THREE.Color('#c9a84c').multiplyScalar(0.03),
    transmission: 0.88,
    roughness: 0.06,
    accent: '#888888',
  },
  {
    id: 'or', name: 'Or', number: '02',
    tagline: 'The illuminated self',
    desc: 'Rose Absolute · Saffron · Warm Amber · Incense',
    color: new THREE.Color('#2a1400'),
    emissive: new THREE.Color('#c9a84c').multiplyScalar(0.14),
    transmission: 0.82,
    roughness: 0.04,
    accent: '#c9a84c',
  },
  {
    id: 'blanc', name: 'Blanc', number: '03',
    tagline: 'The space before thought',
    desc: 'Iris · White Musk · Vetiver · Cool Patchouli',
    color: new THREE.Color('#d8d0bc'),
    emissive: new THREE.Color('#e8e0cc').multiplyScalar(0.06),
    transmission: 0.95,
    roughness: 0.02,
    accent: '#e8e0cc',
  },
]

// ── Square perfume bottle geometry ───────────────────────
// Box-based: wide flat square body, thin neck, square cap
function SquareBottle({ scent, visible }) {
  const groupRef  = useRef()
  const matRef    = useRef()

  // Animate in/out on visibility change
  useEffect(() => {
    if (!groupRef.current) return
    gsap.to(groupRef.current.scale, {
      x: visible ? 1 : 0.7,
      y: visible ? 1 : 0.7,
      z: visible ? 1 : 0.7,
      duration: 0.9,
      ease: 'power3.out',
    })
    gsap.to(groupRef.current.position, {
      y: visible ? 0 : -0.3,
      duration: 0.9,
      ease: 'power3.out',
    })
    if (matRef.current) {
      gsap.to(matRef.current, {
        opacity: visible ? 1 : 0,
        duration: 0.6,
        ease: 'power2.out',
      })
    }
  }, [visible])

  useFrame(({ clock }) => {
    if (!groupRef.current || !visible) return
    // Slow auto-rotate when active
    groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.18
  })

  return (
    <group ref={groupRef} scale={[0.7, 0.7, 0.7]} position={[0, -0.3, 0]}>

      {/* ── Main body — flat square bottle ── */}
      <mesh castShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.6, 2.4, 0.55, 1, 1, 1]} />
        <MeshTransmissionMaterial
          ref={matRef}
          color={scent.color}
          transmission={scent.transmission}
          thickness={0.6}
          roughness={scent.roughness}
          chromaticAberration={0.04}
          anisotropy={0.2}
          distortion={0.08}
          distortionScale={0.15}
          temporalDistortion={0.01}
          emissive={scent.emissive}
          transparent
          opacity={0}
        />
      </mesh>

      {/* ── Shoulder bevel — thin box sitting on top of body ── */}
      <mesh position={[0, 1.32, 0]}>
        <boxGeometry args={[1.3, 0.18, 0.44]} />
        <MeshTransmissionMaterial
          color={scent.color}
          transmission={scent.transmission}
          thickness={0.3}
          roughness={scent.roughness}
          transparent opacity={0}
        />
      </mesh>

      {/* ── Neck — thin rectangular column ── */}
      <mesh position={[0, 1.72, 0]}>
        <boxGeometry args={[0.38, 0.62, 0.34]} />
        <meshStandardMaterial
          color="#1a1510"
          metalness={0.3}
          roughness={0.4}
          transparent opacity={0}
        />
      </mesh>

      {/* ── Cap — gold square top ── */}
      <mesh position={[0, 2.14, 0]}>
        <boxGeometry args={[0.52, 0.28, 0.46]} />
        <meshStandardMaterial
          color="#c9a84c"
          metalness={0.95}
          roughness={0.05}
          transparent opacity={0}
        />
      </mesh>

      {/* ── Cap top detail ── */}
      <mesh position={[0, 2.32, 0]}>
        <boxGeometry args={[0.44, 0.06, 0.38]} />
        <meshStandardMaterial color="#e8d08a" metalness={1} roughness={0.02} transparent opacity={0} />
      </mesh>

      {/* ── Engraved label line on body ── */}
      <mesh position={[0, -0.1, 0.282]}>
        <planeGeometry args={[1.1, 0.8]} />
        <meshStandardMaterial
          color="#c9a84c"
          transparent opacity={0.06}
          metalness={0.8} roughness={0.2}
        />
      </mesh>

      {/* ── Base plate ── */}
      <mesh position={[0, -1.22, 0]}>
        <boxGeometry args={[1.62, 0.04, 0.57]} />
        <meshStandardMaterial color="#080808" metalness={0.4} roughness={0.6} transparent opacity={0} />
      </mesh>

    </group>
  )
}

// ── Scene with all 3 bottles, only active one shown ──────
function Scene({ activeIndex }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <spotLight position={[3, 6, 4]}   intensity={4.0} angle={0.35} penumbra={0.7} color="#c9a84c" castShadow />
      <spotLight position={[-3, 4, 3]}  intensity={1.5} angle={0.5}  penumbra={1.0} color="#e8d9a0" />
      <spotLight position={[0, -2, 5]}  intensity={0.8} angle={0.6}  penumbra={1.0} color="#ffffff" />
      <pointLight position={[0, 3, -3]} intensity={0.6} color="#c9a84c" />

      {SCENTS.map((scent, i) => (
        <Float
          key={scent.id}
          speed={1.4}
          rotationIntensity={0.06}
          floatIntensity={0.18}
          floatingRange={[-0.08, 0.08]}
        >
          <SquareBottle scent={scent} visible={i === activeIndex} />
        </Float>
      ))}
    </>
  )
}

// ── Main section ──────────────────────────────────────────
const BottleCarousel = memo(function BottleCarousel() {
  const sectionRef   = useRef()
  const [activeIndex, setActiveIndex] = useState(0)
  const stateRef     = useRef({ progress: 0, target: 0, activeIndex: 0 })
  const labelRefs    = useRef([])
  const progressRef  = useRef()

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Animate first label in on mount
    setTimeout(() => {
      if (labelRefs.current[0]) {
        gsap.fromTo(labelRefs.current[0],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }
        )
      }
    }, 300)

    const onScroll = () => {
      const rect  = section.getBoundingClientRect()
      const total = section.offsetHeight - window.innerHeight
      stateRef.current.target = Math.max(0, Math.min(1, -rect.top / total))
    }

    const removeTick = addTick(() => {
      const s = stateRef.current
      s.progress += (s.target - s.progress) * 0.05

      // Progress bar
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${s.progress})`
      }

      // 3 bottles, split progress into thirds
      // 0–0.33 = Noir, 0.33–0.66 = Or, 0.66–1.0 = Blanc
      const idx = Math.min(2, Math.floor(s.progress * 3))
      if (idx !== s.activeIndex) {
        const prev = s.activeIndex
        s.activeIndex = idx
        setActiveIndex(idx)

        // Crossfade labels
        if (labelRefs.current[prev]) {
          gsap.to(labelRefs.current[prev], { opacity: 0, y: -16, duration: 0.4, ease: 'power2.in' })
        }
        if (labelRefs.current[idx]) {
          gsap.fromTo(labelRefs.current[idx],
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 }
          )
        }
      }
    })

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      removeTick()
    }
  }, [])

  return (
    <div
      ref={sectionRef}
      data-world="noir"
      style={{ position: 'relative', height: '350vh', background: '#080808' }}
    >
      <div style={{
        position: 'sticky', top: 0, height: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>

        {/* ── 3D Canvas ── */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <Canvas
            camera={{ position: [0, 0.3, 4.8], fov: 38, near: 0.1, far: 50 }}
            gl={{ antialias: true, powerPreference: 'high-performance', stencil: false }}
            dpr={Math.min(window.devicePixelRatio, 2)}
            style={{ width: '100%', height: '100%' }}
          >
            <Scene activeIndex={activeIndex} />
          </Canvas>
        </div>

        {/* ── Vignette ── */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
          background: 'radial-gradient(ellipse at center, transparent 35%, rgba(8,8,8,0.65) 100%)',
        }} />

        {/* ── Top label ── */}
        <div style={{
          position: 'absolute', top: 48, left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: "'Tenor Sans',sans-serif",
          fontSize: 10, letterSpacing: '0.38em',
          color: '#2a2318', textTransform: 'uppercase',
          zIndex: 10, whiteSpace: 'nowrap',
        }}>
          Les Parfums · Scroll to discover
        </div>

        {/* ── Bottle info labels — one per scent, crossfaded ── */}
        {SCENTS.map((scent, i) => (
          <div
            key={scent.id}
            ref={el => labelRefs.current[i] = el}
            style={{
              position: 'absolute', bottom: 80, left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center', pointerEvents: 'none',
              zIndex: 10, opacity: 0, minWidth: 320,
            }}
          >
            <div style={{
              fontFamily: "'Tenor Sans',sans-serif",
              fontSize: 10, letterSpacing: '0.38em',
              color: '#2a2318', textTransform: 'uppercase', marginBottom: 16,
            }}>
              {scent.number} / 03
            </div>
            <div style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontStyle: 'italic', fontWeight: 300,
              fontSize: 'clamp(42px,6vw,76px)',
              letterSpacing: '0.12em', lineHeight: 1,
              color: scent.accent, marginBottom: 12,
            }}>
              {scent.name}
            </div>
            <div style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontStyle: 'italic', fontSize: 15,
              color: '#4a3d26', letterSpacing: '0.06em', marginBottom: 20,
            }}>
              {scent.tagline}
            </div>
            <div style={{ width: 32, height: 0.5, background: '#2a2318', margin: '0 auto 16px' }} />
            <div style={{
              fontFamily: "'Tenor Sans',sans-serif",
              fontSize: 9, letterSpacing: '0.28em',
              color: '#4a3d26', textTransform: 'uppercase',
            }}>
              {scent.desc}
            </div>
          </div>
        ))}

        {/* ── Step indicators — left side ── */}
        <div style={{
          position: 'absolute', left: 48, top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex', flexDirection: 'column', gap: 20, zIndex: 10,
        }}>
          {SCENTS.map((s, i) => (
            <div key={s.id} style={{
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{
                width: i === activeIndex ? 24 : 8,
                height: 0.5,
                background: i === activeIndex ? '#c9a84c' : '#2a2318',
                transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
              }} />
              <div style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontStyle: 'italic', fontSize: 13,
                letterSpacing: '0.1em',
                color: i === activeIndex ? '#c9a84c' : '#2a2318',
                transition: 'color 0.5s ease',
              }}>
                {s.name}
              </div>
            </div>
          ))}
        </div>

        {/* ── Progress bar ── */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 1, background: '#1a1510', zIndex: 10,
        }}>
          <div ref={progressRef} style={{
            height: '100%',
            background: 'linear-gradient(to right, transparent, #c9a84c)',
            transformOrigin: 'left', transform: 'scaleX(0)',
            willChange: 'transform',
          }} />
        </div>
      </div>
    </div>
  )
})

export default BottleCarousel
