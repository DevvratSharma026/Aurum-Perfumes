import { useRef, memo } from 'react'
import { useTextReveal, useFadeReveal } from '../hooks/useTextReveal'

const SCENTS = [
  {
    id: 'noir', name: 'Noir', number: '01',
    tagline: 'The unnamed hour',
    desc: 'For those who prefer the dark. Who know that depth has no beginning. A descent into oud, black amber, and the sacred residue of ancient resins.',
    notes: ['Oud', 'Black Amber', 'Sacred Resin', 'Smoke'],
    bg: '#0a0a0a', textAccent: '#888888',
  },
  {
    id: 'or', name: 'Or', number: '02',
    tagline: 'The illuminated self',
    desc: 'Warmth is not comfort. It is the memory of fire. Rose absolute and saffron ignite over a base of warm amber and temple incense.',
    notes: ['Rose Absolute', 'Saffron', 'Warm Amber', 'Incense'],
    bg: '#0c0800', textAccent: '#c9a84c',
  },
  {
    id: 'blanc', name: 'Blanc', number: '03',
    tagline: 'The space before thought',
    desc: 'The quietest scent. The loudest presence. Iris and white musk dissolve into vetiver — a ritual of absence.',
    notes: ['Iris', 'White Musk', 'Vetiver', 'Cool Patchouli'],
    bg: '#0a0908', textAccent: '#e8e0cc',
  },
]

const Scents = memo(function Scents() {
  const containerRef = useRef()
  useTextReveal(containerRef)
  useFadeReveal(containerRef)

  return (
    <section ref={containerRef}>
      {SCENTS.map((scent, i) => (
        <div
          key={scent.id}
          data-world={scent.id}
          style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            minHeight: '100vh', background: scent.bg,
            borderTop: '0.5px solid #1a1510',
          }}
        >
          {/* Text side */}
          <div style={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            padding: '80px 72px', order: i % 2 === 0 ? 0 : 1,
          }}>
            <div data-fade data-delay="0" style={{
              fontFamily: "'Cormorant Garamond',serif", fontWeight: 300,
              fontSize: 11, letterSpacing: '0.38em', color: '#2a2318', marginBottom: 40,
            }}>
              {scent.number} / 03
            </div>

            <h2 data-reveal style={{
              fontFamily: "'Cormorant Garamond',serif", fontWeight: 300,
              fontSize: 'clamp(64px,9vw,112px)', letterSpacing: '0.1em',
              color: scent.textAccent, lineHeight: 1, marginBottom: 16,
            }}>
              {scent.name}
            </h2>

            <div data-fade data-delay="0.15" style={{
              fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic',
              fontSize: 16, color: '#4a3d26', letterSpacing: '0.06em', marginBottom: 36,
            }}>
              {scent.tagline}
            </div>

            <div data-fade data-delay="0.2" style={{ width: 40, height: 0.5, background: '#2a2318', marginBottom: 36 }} />

            <p data-fade data-delay="0.25" style={{
              fontFamily: "'Tenor Sans',sans-serif", fontSize: 13, color: '#6b5c3e',
              letterSpacing: '0.1em', lineHeight: 2, maxWidth: 380, marginBottom: 44,
            }}>
              {scent.desc}
            </p>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 48 }}>
              {scent.notes.map((n, ni) => (
                <span key={n} data-fade data-delay={0.3 + ni * 0.05} style={{
                  fontFamily: "'Tenor Sans',sans-serif", fontSize: 9,
                  letterSpacing: '0.28em', textTransform: 'uppercase',
                  color: '#4a3d26', border: '0.5px solid #1e1a12',
                  padding: '5px 12px', display: 'inline-block',
                }}>
                  {n}
                </span>
              ))}
            </div>

            <div data-fade data-delay="0.5" data-hover style={{
              fontFamily: "'Tenor Sans',sans-serif", fontSize: 10,
              letterSpacing: '0.32em', color: '#c9a84c', textTransform: 'uppercase',
              display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer',
            }}>
              <span style={{ width: 32, height: 0.5, background: '#c9a84c', display: 'inline-block' }} />
              Enter the ritual
            </div>
          </div>

          {/* Visual side — static SVG */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: `radial-gradient(ellipse at center,${scent.textAccent}0a 0%,transparent 65%)`,
            order: i % 2 === 0 ? 1 : 0, position: 'relative', overflow: 'hidden',
          }}>
            <svg data-fade data-delay="0.15" width="180" height="310" viewBox="0 0 200 340" fill="none">
              <rect x="82" y="20" width="36" height="28" rx="2" fill={scent.textAccent} fillOpacity=".1" stroke={scent.textAccent} strokeWidth=".5" strokeOpacity=".3"/>
              <rect x="88" y="48" width="24" height="36" fill={scent.textAccent} fillOpacity=".06" stroke={scent.textAccent} strokeWidth=".5" strokeOpacity=".22"/>
              <path d="M88 84 Q60 100 48 130 L48 280 Q48 300 100 300 Q152 300 152 280 L152 130 Q140 100 112 84 Z" fill={scent.textAccent} fillOpacity=".04" stroke={scent.textAccent} strokeWidth=".5" strokeOpacity=".18"/>
              <line x1="62" y1="190" x2="138" y2="190" stroke={scent.textAccent} strokeWidth=".4" strokeOpacity=".12"/>
              <line x1="62" y1="220" x2="138" y2="220" stroke={scent.textAccent} strokeWidth=".4" strokeOpacity=".12"/>
              <text x="100" y="210" textAnchor="middle" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:10,letterSpacing:6,fill:scent.textAccent,fillOpacity:.35}}>AURUM</text>
            </svg>

            <div data-fade data-delay="0.3" style={{
              position: 'absolute', bottom: 60, right: 48,
              fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic',
              fontSize: 13, color: '#2a2318', letterSpacing: '0.06em',
              lineHeight: 2.4, textAlign: 'right',
            }}>
              {scent.notes.map(n => <div key={n}>{n}</div>)}
            </div>
          </div>
        </div>
      ))}
    </section>
  )
})

export default Scents
