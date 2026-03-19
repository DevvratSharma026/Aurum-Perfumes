import { useState, useEffect, memo } from 'react'

const Nav = memo(function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '24px 48px',
      background: scrolled ? 'rgba(8,8,8,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '0.5px solid #1e1a12' : 'none',
      transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)',
    }}>
      {/* Wordmark */}
      <div
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontWeight: 300, fontSize: 20,
          letterSpacing: '0.45em', color: '#c9a84c',
          cursor: 'pointer',
        }}
      >
        AURUM
      </div>

      {/* Single nav link */}
      <div style={{ display: 'flex', gap: 48 }}>
        <span
          data-hover
          onClick={() => scrollTo('scent-panels')}
          style={{
            fontFamily: "'Tenor Sans',sans-serif",
            fontSize: 10, letterSpacing: '0.28em',
            color: '#6b5c3e', textTransform: 'uppercase',
            cursor: 'pointer', transition: 'color 0.4s ease',
          }}
          onMouseEnter={e => e.target.style.color = '#c9a84c'}
          onMouseLeave={e => e.target.style.color = '#6b5c3e'}
        >
          Les Parfums
        </span>
      </div>

      {/* CTA */}
      <div
        data-hover
        onClick={() => scrollTo('scent-panels')}
        style={{
          fontFamily: "'Tenor Sans',sans-serif",
          fontSize: 9, letterSpacing: '0.32em',
          color: '#c9a84c', textTransform: 'uppercase',
          border: '0.5px solid #4a3d26',
          padding: '9px 22px', cursor: 'pointer',
          transition: 'border-color 0.4s, background 0.4s',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = '#c9a84c'; e.currentTarget.style.background = 'rgba(201,168,76,0.06)' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = '#4a3d26'; e.currentTarget.style.background = 'transparent' }}
      >
        Discover
      </div>
    </nav>
  )
})

export default Nav
