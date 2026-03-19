import { useEffect, useRef, memo, useState, lazy, Suspense } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ProductOverlay = lazy(() => import('./ProductOverlay'))

const SCENTS = [
  {
    id: 'noir', name: 'Noir', number: '01',
    tagline: 'The unnamed hour',
    desc: 'For those who prefer the dark. Who know that depth has no beginning. A descent into oud, black amber, and the sacred residue of ancient resins.',
    notes: ['Oud', 'Black Amber', 'Sacred Resin', 'Smoke'],
    bg: '#080808', accent: '#888', gold: '#c9a84c',
    glowColor: 'rgba(201,168,76,0.06)',
    bottleImg: '/images/noir-bottle.png',
  },
  {
    id: 'or', name: 'Or', number: '02',
    tagline: 'The illuminated self',
    desc: 'Warmth is not comfort. It is the memory of fire. Rose absolute and saffron ignite over a base of warm amber and temple incense.',
    notes: ['Rose Absolute', 'Saffron', 'Warm Amber', 'Incense'],
    bg: '#0c0800', accent: '#c9a84c', gold: '#e8c06a',
    glowColor: 'rgba(232,192,106,0.1)',
    bottleImg: '/images/or-bottle.png',
  },
  {
    id: 'blanc', name: 'Blanc', number: '03',
    tagline: 'The space before thought',
    desc: 'The quietest scent. The loudest presence. Iris and white musk dissolve into vetiver — a ritual of absence.',
    notes: ['Iris', 'White Musk', 'Vetiver', 'Cool Patchouli'],
    bg: '#0a0908', accent: '#e8e0cc', gold: '#e8e0cc',
    glowColor: 'rgba(232,224,204,0.07)',
    bottleImg: '/images/blanc-bottle.png',
  },
]

function ScentPanel({ scent, index, onEnterRitual }) {
  const panelRef  = useRef()
  const bottleRef = useRef()
  const textRef   = useRef()
  const triggered = useRef(false)

  useEffect(() => {
    const panel  = panelRef.current
    const bottle = bottleRef.current
    const text   = textRef.current
    if (!panel || !bottle || !text) return

    const isEven = index % 2 === 0
    gsap.set(bottle, { x: isEven ? 80 : -80, opacity: 0, scale: 0.92 })
    gsap.set(text,   { x: isEven ? -40 : 40, opacity: 0 })
    const textChildren = text.querySelectorAll('[data-anim]')
    gsap.set(textChildren, { y: 24, opacity: 0 })

    const st = ScrollTrigger.create({
      trigger: panel,
      start: 'top 75%',
      onEnter: () => {
        if (triggered.current) return
        triggered.current = true
        const tl = gsap.timeline()
        tl.to(bottle, { x: 0, opacity: 1, scale: 1, duration: 1.4, ease: 'power3.out' })
        tl.to(text,   { x: 0, opacity: 1, duration: 1.0, ease: 'power3.out' }, 0.15)
        tl.to(textChildren, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.1 }, 0.35)
      },
    })
    return () => st.kill()
  }, [index])

  const isEven = index % 2 === 0

  return (
    <div
      ref={panelRef}
      data-world={scent.id}
      id={`scent-${scent.id}`}
      style={{
        minHeight: '100vh', display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        background: scent.bg,
        borderTop: '0.5px solid #1a1510',
        overflow: 'hidden',
      }}
    >
      {/* Bottle */}
      <div style={{
        order: isEven ? 1 : 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '60px 48px',
        background: `radial-gradient(ellipse at center, ${scent.glowColor} 0%, transparent 70%)`,
      }}>
        <img
          ref={bottleRef}
          src={scent.bottleImg}
          alt={`${scent.name} perfume bottle`}
          style={{
            maxHeight: '72vh', maxWidth: '100%', width: 'auto',
            objectFit: 'contain',
            filter: `drop-shadow(0 40px 80px rgba(0,0,0,0.9)) drop-shadow(0 0 40px ${scent.glowColor})`,
            willChange: 'transform, opacity',
          }}
        />
      </div>

      {/* Text */}
      <div ref={textRef} style={{
        order: isEven ? 0 : 1,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '80px 72px', opacity: 0,
      }}>
        <div data-anim style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontWeight: 300, fontSize: 11,
          letterSpacing: '0.38em', color: '#2a2318', marginBottom: 40,
        }}>
          {scent.number} / 03
        </div>

        <h2 data-anim style={{
          fontFamily: "'Cormorant Garamond',serif", fontWeight: 300,
          fontSize: 'clamp(64px,9vw,108px)',
          letterSpacing: '0.1em', lineHeight: 1,
          color: scent.accent, marginBottom: 12,
        }}>
          {scent.name}
        </h2>

        <div data-anim style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontStyle: 'italic', fontSize: 16,
          color: '#4a3d26', letterSpacing: '0.06em', marginBottom: 36,
        }}>
          {scent.tagline}
        </div>

        <div data-anim style={{ width: 40, height: 0.5, background: '#2a2318', marginBottom: 36 }} />

        <p data-anim style={{
          fontFamily: "'Tenor Sans',sans-serif",
          fontSize: 13, color: '#6b5c3e',
          letterSpacing: '0.1em', lineHeight: 2,
          maxWidth: 380, marginBottom: 44,
        }}>
          {scent.desc}
        </p>

        <div data-anim style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 48 }}>
          {scent.notes.map(n => (
            <span key={n} style={{
              fontFamily: "'Tenor Sans',sans-serif",
              fontSize: 9, letterSpacing: '0.28em',
              textTransform: 'uppercase', color: '#4a3d26',
              border: '0.5px solid #1e1a12', padding: '5px 12px',
              display: 'inline-block',
            }}>
              {n}
            </span>
          ))}
        </div>

        {/* Enter the ritual — opens overlay */}
        <div
          data-anim data-hover
          onClick={() => onEnterRitual(scent.id)}
          style={{
            fontFamily: "'Tenor Sans',sans-serif",
            fontSize: 10, letterSpacing: '0.32em',
            color: '#c9a84c', textTransform: 'uppercase',
            display: 'flex', alignItems: 'center', gap: 16,
            cursor: 'pointer', width: 'fit-content',
            transition: 'gap 0.4s cubic-bezier(0.16,1,0.3,1)',
          }}
          onMouseEnter={e => { e.currentTarget.style.gap = '24px' }}
          onMouseLeave={e => { e.currentTarget.style.gap = '16px' }}
        >
          <span style={{ width: 32, height: 0.5, background: '#c9a84c', display: 'inline-block', transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1)' }} />
          Enter the ritual
        </div>
      </div>
    </div>
  )
}

const ScentPanels = memo(function ScentPanels() {
  const [activeOverlay, setActiveOverlay] = useState(null)

  return (
    <>
      <section id="scent-panels">
        {SCENTS.map((scent, i) => (
          <ScentPanel
            key={scent.id}
            scent={scent}
            index={i}
            onEnterRitual={setActiveOverlay}
          />
        ))}
      </section>

      {/* Product overlay — lazy loaded */}
      {activeOverlay && (
        <Suspense fallback={null}>
          <ProductOverlay
            scentId={activeOverlay}
            onClose={() => setActiveOverlay(null)}
          />
        </Suspense>
      )}
    </>
  )
})

export default ScentPanels
