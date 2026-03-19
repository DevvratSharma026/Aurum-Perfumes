import { Canvas }    from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import FluidMesh     from './FluidMesh'
import { useScrollWorld } from '../hooks/useScrollWorld'

const WORLDS = [
  { id: 'noir',  label: 'Noir',  sub: 'The unnamed hour' },
  { id: 'or',    label: 'Or',    sub: 'The illuminated self' },
  { id: 'blanc', label: 'Blanc', sub: 'The space before thought' },
]

export default function Hero({ uniformsRef }) {
  const [world, setWorld]     = useState('noir')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200)
    return () => clearTimeout(t)
  }, [])

  const fadeIn = (delay) => ({
    opacity:    visible ? 1 : 0,
    transform:  visible ? 'translateY(0)' : 'translateY(18px)',
    transition: `opacity 1.4s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 1.4s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  })

  return (
    <section style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: 'transparent' }}>

      {/* ── Dark overlay ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse at center, transparent 20%, rgba(8,8,8,0.45) 100%)',
        pointerEvents: 'none',
      }} />

      {/* ── Hero copy ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 24px',
        pointerEvents: 'none',
      }}>
        <div style={{ ...fadeIn(0.3), fontFamily: "'Tenor Sans', sans-serif", fontSize: 10, letterSpacing: '0.38em', color: '#4a3d26', textTransform: 'uppercase', marginBottom: 32 }}>
          Maison de Parfum · Est. MMXXV
        </div>
        <h1 style={{
          ...fadeIn(0.5),
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: 'clamp(72px, 14vw, 148px)',
          letterSpacing: '0.38em',
          color: '#c9a84c',
          lineHeight: 1,
          marginBottom: 24,
        }}>
          AURUM
        </h1>
        <p style={{
          ...fadeIn(0.75),
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic', fontWeight: 300,
          fontSize: 'clamp(16px, 2.2vw, 24px)',
          color: '#a09080', letterSpacing: '0.06em',
          marginBottom: 52, maxWidth: 540, lineHeight: 1.5,
        }}>
          Scent is the only sense that bypasses reason.
        </p>
        <div style={{ ...fadeIn(0.9), width: 1, height: 48, background: 'linear-gradient(to bottom, transparent, #4a3d26, transparent)', marginBottom: 48 }} />
        <div style={{ ...fadeIn(1.1), fontFamily: "'Tenor Sans', sans-serif", fontSize: 9, letterSpacing: '0.32em', color: '#4a3d26', textTransform: 'uppercase' }}>
          Scroll to enter
        </div>
      </div>

      {/* ── World switcher ── */}
      <div style={{ position: 'absolute', bottom: 48, left: 48, zIndex: 2, display: 'flex', flexDirection: 'column', gap: 20, ...fadeIn(1.2) }}>
        {WORLDS.map(w => (
          <button key={w.id} onClick={() => {
            setWorld(w.id)
            const el = document.getElementById(`scent-${w.id}`)
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }} style={{
            display: 'flex', alignItems: 'center', gap: 16,
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          }}>
            <div style={{
              width: world === w.id ? 28 : 12, height: 0.5,
              background: world === w.id ? '#c9a84c' : '#4a3d26',
              transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)',
            }} />
            <div style={{ textAlign: 'left' }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic', fontWeight: 300, fontSize: 16,
                letterSpacing: '0.12em',
                color: world === w.id ? '#c9a84c' : '#4a3d26',
                transition: 'color 0.5s ease',
              }}>{w.label}</div>
              {world === w.id && (
                <div style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: 9, letterSpacing: '0.22em', color: '#4a3d26', textTransform: 'uppercase', marginTop: 3 }}>
                  {w.sub}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* ── Side label ── */}
      <div style={{
        position: 'absolute', right: 48, top: '50%', zIndex: 2,
        transform: 'translateY(-50%) rotate(90deg)',
        fontFamily: "'Tenor Sans', sans-serif", fontSize: 9,
        letterSpacing: '0.32em', color: '#2a2318', textTransform: 'uppercase',
        ...fadeIn(1.4),
      }}>
        Three rituals · One essence
      </div>
    </section>
  )
}
