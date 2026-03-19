import { memo } from 'react'
const Ritual = memo(function Ritual() {
  return (
    <section style={{
      background: '#080808',
      borderTop: '0.5px solid #1e1a12',
      padding: '120px 0',
    }}>
      {/* Eyebrow */}
      <div style={{ textAlign: 'center', marginBottom: 80 }}>
        <div style={{
          fontFamily: "'Tenor Sans', sans-serif",
          fontSize: 10,
          letterSpacing: '0.38em',
          color: '#2a2318',
          textTransform: 'uppercase',
          marginBottom: 24,
        }}>
          Le Rituel
        </div>
        <div style={{ width: 1, height: 60, background: 'linear-gradient(to bottom, transparent, #4a3d26, transparent)', margin: '0 auto' }} />
      </div>

      {/* Main quote */}
      <div style={{ maxWidth: 760, margin: '0 auto 100px', padding: '0 48px', textAlign: 'center' }}>
        <blockquote style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(28px, 4vw, 42px)',
          color: '#e8e0cc',
          letterSpacing: '0.04em',
          lineHeight: 1.5,
          marginBottom: 32,
        }}>
          "Each drop carries a fragment of the unseen world. Distilled not from flowers, but from the dark intervals between them."
        </blockquote>
        <div style={{ width: 40, height: 0.5, background: '#4a3d26', margin: '0 auto' }} />
      </div>

      {/* 3-column philosophy */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        maxWidth: 1100,
        margin: '0 auto',
        padding: '0 48px',
        gap: 0,
        borderTop: '0.5px solid #1e1a12',
        borderLeft: '0.5px solid #1e1a12',
      }}>
        {[
          { num: 'I', title: 'The Source', text: 'Every ingredient is sourced from a single provenance. No blending of origins. Each material carries the memory of its soil.' },
          { num: 'II', title: 'The Distillation', text: 'Cold-pressed. Slow-distilled. We do not hurry what cannot be hurried. The finest essences reveal themselves only to patience.' },
          { num: 'III', title: 'The Ritual', text: 'Perfume is not worn. It is performed. Apply to warm skin, to pulse points, to the spaces where blood runs close to the surface.' },
        ].map((col) => (
          <div key={col.num} style={{
            padding: '56px 48px',
            borderRight: '0.5px solid #1e1a12',
            borderBottom: '0.5px solid #1e1a12',
          }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: 11,
              letterSpacing: '0.32em',
              color: '#2a2318',
              marginBottom: 24,
            }}>{col.num}</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: 22,
              color: '#c9a84c',
              letterSpacing: '0.08em',
              marginBottom: 24,
            }}>{col.title}</div>
            <p style={{
              fontFamily: "'Tenor Sans', sans-serif",
              fontSize: 12,
              color: '#4a3d26',
              letterSpacing: '0.1em',
              lineHeight: 2.1,
            }}>{col.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
})
export default Ritual
