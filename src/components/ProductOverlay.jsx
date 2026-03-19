import { useEffect, useRef, memo, useState } from 'react'
import gsap from 'gsap'

const PRODUCTS = {
  noir: {
    name: 'Noir',
    subtitle: 'Eau de Parfum',
    tagline: 'The unnamed hour',
    description: 'A descent into the darkest corners of the olfactory world. Noir is not a scent — it is a state of being. Reserved for those who understand that true luxury exists in the spaces others dare not enter.',
    price: '₹12,500',
    volume: '100ml',
    bottleImg: '/images/noir-bottle.png',
    accent: '#888888',
    gold: '#c9a84c',
    bg: '#080808',
    qualities: [
      { label: 'Longevity', value: 'Exceptional', detail: '12–16 hours' },
      { label: 'Sillage', value: 'Intense', detail: 'Leaves a trail' },
      { label: 'Concentration', value: 'EDP 22%', detail: 'Above industry standard' },
      { label: 'Season', value: 'Autumn · Winter', detail: 'Cold weather ritual' },
    ],
    pyramid: {
      top:    ['Black Pepper', 'Bergamot'],
      heart:  ['Oud', 'Black Amber', 'Sacred Resin'],
      base:   ['Smoke', 'Vetiver', 'Musk'],
    },
  },
  or: {
    name: 'Or',
    subtitle: 'Eau de Parfum',
    tagline: 'The illuminated self',
    description: 'Warmth is not comfort. It is the memory of fire. Or captures the precise moment when saffron dissolves into rose — fleeting, irreversible, and worth every drop.',
    price: '₹14,000',
    volume: '100ml',
    bottleImg: '/images/or-bottle.png',
    accent: '#c9a84c',
    gold: '#e8c06a',
    bg: '#0c0800',
    qualities: [
      { label: 'Longevity', value: 'Outstanding', detail: '10–14 hours' },
      { label: 'Sillage', value: 'Moderate', detail: 'Intimate projection' },
      { label: 'Concentration', value: 'EDP 20%', detail: 'Rich and full-bodied' },
      { label: 'Season', value: 'Spring · Autumn', detail: 'Transitional ritual' },
    ],
    pyramid: {
      top:    ['Saffron', 'Pink Pepper'],
      heart:  ['Rose Absolute', 'Warm Amber', 'Incense'],
      base:   ['Sandalwood', 'Vanilla', 'Patchouli'],
    },
  },
  blanc: {
    name: 'Blanc',
    subtitle: 'Eau de Parfum',
    tagline: 'The space before thought',
    description: 'The quietest scent. The loudest presence. Blanc is the pause between words — iris and white musk rendered so precisely they feel like memory rather than fragrance.',
    price: '₹11,000',
    volume: '100ml',
    bottleImg: '/images/blanc-bottle.png',
    accent: '#e8e0cc',
    gold: '#e8e0cc',
    bg: '#0a0908',
    qualities: [
      { label: 'Longevity', value: 'Moderate', detail: '6–10 hours' },
      { label: 'Sillage', value: 'Subtle', detail: 'A whisper' },
      { label: 'Concentration', value: 'EDP 18%', detail: 'Refined and delicate' },
      { label: 'Season', value: 'Spring · Summer', detail: 'Daylight ritual' },
    ],
    pyramid: {
      top:    ['Iris', 'Aldehydes'],
      heart:  ['White Musk', 'Jasmine', 'Neroli'],
      base:   ['Vetiver', 'Cool Patchouli', 'Cedar'],
    },
  },
}

const ProductOverlay = memo(function ProductOverlay({ scentId, onClose }) {
  const overlayRef  = useRef()
  const contentRef  = useRef()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const product = PRODUCTS[scentId]

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    gsap.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' }
    )
    gsap.fromTo(contentRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.1 }
    )

    const onKey = (e) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [])

  const handleClose = () => {
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.3, ease: 'power2.in',
      onComplete: onClose,
    })
  }

  const handleAddToCart = () => {
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  if (!product) return null

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) handleClose() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(4,4,4,0.96)',
        backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
        overflowY: 'auto',
      }}
    >
      <div
        ref={contentRef}
        style={{
          width: '100%', maxWidth: 1100,
          background: product.bg,
          border: '0.5px solid #1e1a12',
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          minHeight: 600,
        }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute', top: 24, right: 24, zIndex: 10,
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: "'Tenor Sans',sans-serif",
            fontSize: 9, letterSpacing: '0.32em',
            color: '#4a3d26', textTransform: 'uppercase',
            padding: '8px 0',
            transition: 'color 0.3s',
          }}
          onMouseEnter={e => e.target.style.color = '#c9a84c'}
          onMouseLeave={e => e.target.style.color = '#4a3d26'}
        >
          Close ✕
        </button>

        {/* ── Left — bottle image ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '60px 40px',
          background: `radial-gradient(ellipse at center, ${product.accent}0a 0%, transparent 70%)`,
          borderRight: '0.5px solid #1e1a12',
        }}>
          <img
            src={product.bottleImg}
            alt={product.name}
            style={{
              maxHeight: '60vh', maxWidth: '100%',
              objectFit: 'contain',
              filter: `drop-shadow(0 30px 60px rgba(0,0,0,0.9)) drop-shadow(0 0 30px ${product.accent}15)`,
            }}
          />
        </div>

        {/* ── Right — product info ── */}
        <div style={{
          padding: '56px 52px',
          display: 'flex', flexDirection: 'column',
          overflowY: 'auto', maxHeight: '90vh',
        }}>
          {/* Header */}
          <div style={{
            fontFamily: "'Tenor Sans',sans-serif",
            fontSize: 9, letterSpacing: '0.32em',
            color: '#2a2318', textTransform: 'uppercase', marginBottom: 16,
          }}>
            AURUM · {product.subtitle}
          </div>

          <h2 style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontWeight: 300,
            fontSize: 'clamp(48px,6vw,80px)',
            letterSpacing: '0.1em', lineHeight: 1,
            color: product.accent, marginBottom: 8,
          }}>
            {product.name}
          </h2>

          <div style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontStyle: 'italic', fontSize: 15,
            color: '#4a3d26', letterSpacing: '0.06em', marginBottom: 28,
          }}>
            {product.tagline}
          </div>

          <div style={{ width: 32, height: 0.5, background: '#2a2318', marginBottom: 28 }} />

          <p style={{
            fontFamily: "'Tenor Sans',sans-serif",
            fontSize: 12, color: '#6b5c3e',
            letterSpacing: '0.08em', lineHeight: 2,
            marginBottom: 36,
          }}>
            {product.description}
          </p>

          {/* ── Qualities grid ── */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: 1, background: '#1a1510',
            border: '0.5px solid #1a1510',
            marginBottom: 36,
          }}>
            {product.qualities.map(q => (
              <div key={q.label} style={{
                background: product.bg,
                padding: '16px 20px',
              }}>
                <div style={{
                  fontFamily: "'Tenor Sans',sans-serif",
                  fontSize: 8, letterSpacing: '0.28em',
                  color: '#2a2318', textTransform: 'uppercase', marginBottom: 6,
                }}>
                  {q.label}
                </div>
                <div style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontStyle: 'italic', fontSize: 16,
                  color: product.accent, marginBottom: 2,
                }}>
                  {q.value}
                </div>
                <div style={{
                  fontFamily: "'Tenor Sans',sans-serif",
                  fontSize: 9, color: '#4a3d26', letterSpacing: '0.1em',
                }}>
                  {q.detail}
                </div>
              </div>
            ))}
          </div>

          {/* ── Fragrance pyramid ── */}
          <div style={{ marginBottom: 36 }}>
            <div style={{
              fontFamily: "'Tenor Sans',sans-serif",
              fontSize: 9, letterSpacing: '0.28em',
              color: '#2a2318', textTransform: 'uppercase', marginBottom: 20,
            }}>
              Fragrance Pyramid
            </div>
            {[
              { tier: 'Top Notes',   notes: product.pyramid.top },
              { tier: 'Heart Notes', notes: product.pyramid.heart },
              { tier: 'Base Notes',  notes: product.pyramid.base },
            ].map(({ tier, notes }) => (
              <div key={tier} style={{
                display: 'flex', alignItems: 'baseline',
                gap: 20, marginBottom: 14,
                borderBottom: '0.5px solid #141410', paddingBottom: 14,
              }}>
                <div style={{
                  fontFamily: "'Tenor Sans',sans-serif",
                  fontSize: 8, letterSpacing: '0.22em',
                  color: '#2a2318', textTransform: 'uppercase',
                  minWidth: 80,
                }}>
                  {tier}
                </div>
                <div style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontStyle: 'italic', fontSize: 14,
                  color: '#6b5c3e', letterSpacing: '0.06em',
                }}>
                  {notes.join(' · ')}
                </div>
              </div>
            ))}
          </div>

          {/* ── Price + actions ── */}
          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', marginBottom: 24,
          }}>
            <div>
              <div style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontWeight: 300, fontSize: 36,
                color: '#c9a84c', letterSpacing: '0.04em',
              }}>
                {product.price}
              </div>
              <div style={{
                fontFamily: "'Tenor Sans',sans-serif",
                fontSize: 9, color: '#2a2318',
                letterSpacing: '0.2em', textTransform: 'uppercase',
              }}>
                {product.volume} · Free shipping
              </div>
            </div>

            {/* Qty selector */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 16,
              border: '0.5px solid #1e1a12', padding: '8px 16px',
            }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#4a3d26', fontSize: 16, lineHeight: 1,
                fontFamily: "'Cormorant Garamond',serif",
              }}>−</button>
              <span style={{
                fontFamily: "'Tenor Sans',sans-serif",
                fontSize: 12, color: '#c9a84c', minWidth: 16, textAlign: 'center',
              }}>{qty}</span>
              <button onClick={() => setQty(q => q + 1)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#4a3d26', fontSize: 16, lineHeight: 1,
                fontFamily: "'Cormorant Garamond',serif",
              }}>+</button>
            </div>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            style={{
              width: '100%', padding: '16px',
              background: added ? 'rgba(201,168,76,0.12)' : 'transparent',
              border: `0.5px solid ${added ? '#c9a84c' : '#4a3d26'}`,
              cursor: 'pointer',
              fontFamily: "'Tenor Sans',sans-serif",
              fontSize: 10, letterSpacing: '0.32em',
              color: '#c9a84c', textTransform: 'uppercase',
              transition: 'all 0.4s ease',
            }}
            onMouseEnter={e => { if (!added) { e.currentTarget.style.borderColor = '#c9a84c'; e.currentTarget.style.background = 'rgba(201,168,76,0.06)' }}}
            onMouseLeave={e => { if (!added) { e.currentTarget.style.borderColor = '#4a3d26'; e.currentTarget.style.background = 'transparent' }}}
          >
            {added ? '✓ Added to Ritual' : `Add to Cart — ${product.price}`}
          </button>
        </div>
      </div>
    </div>
  )
})

export default ProductOverlay
