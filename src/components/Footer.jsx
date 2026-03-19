import { memo } from 'react'
const Footer = memo(function Footer() {
  return (
    <footer style={{
      background: '#080808',
      borderTop: '0.5px solid #1e1a12',
      padding: '80px 48px 48px',
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 48, marginBottom: 80 }}>
        {/* Brand */}
        <div>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: 28,
            letterSpacing: '0.45em',
            color: '#c9a84c',
            marginBottom: 16,
          }}>AURUM</div>
          <div style={{
            fontFamily: "'Tenor Sans', sans-serif",
            fontSize: 10,
            letterSpacing: '0.2em',
            color: '#2a2318',
            textTransform: 'uppercase',
            lineHeight: 2,
          }}>
            Maison de Parfum<br />
            Est. MMXXV
          </div>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {['Les Parfums', 'Le Rituel', 'La Maison', 'Atelier'].map(l => (
            <span key={l} style={{
              fontFamily: "'Tenor Sans', sans-serif",
              fontSize: 10,
              letterSpacing: '0.22em',
              color: '#4a3d26',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}>{l}</span>
          ))}
        </div>

        {/* Tagline */}
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: 16,
            color: '#2a2318',
            letterSpacing: '0.04em',
            lineHeight: 1.7,
          }}>
            A maison of three rituals.<br />Each bottle, a passage.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '0.5px solid #1a1510',
        paddingTop: 32,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{
          fontFamily: "'Tenor Sans', sans-serif",
          fontSize: 9,
          letterSpacing: '0.2em',
          color: '#2a2318',
          textTransform: 'uppercase',
        }}>
          © MMXXV Aurum. All rights reserved.
        </div>
        <div style={{
          fontFamily: "'Tenor Sans', sans-serif",
          fontSize: 9,
          letterSpacing: '0.2em',
          color: '#2a2318',
          textTransform: 'uppercase',
        }}>
          Crafted with ritual
        </div>
      </div>
    </footer>
  )
})
export default Footer
