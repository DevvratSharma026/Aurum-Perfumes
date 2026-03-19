import { useEffect, useRef, memo } from 'react'
import { addTick } from '../hooks/useTick'

// ── Particle smoke cursor trail ───────────────────────────
// Canvas overlay — gold smoke particles spawn on mouse move
// Zero dependencies, pure canvas 2D, unified RAF via useTick

const ParticleCursor = memo(function ParticleCursor() {
  const canvasRef = useRef()
  const particles = useRef([])
  const mouse     = useRef({ x: -200, y: -200 })
  const prevMouse = useRef({ x: -200, y: -200 })
  const velocity  = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    // ── Resize handler ──────────────────────────────────
    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    // ── Mouse tracking ──────────────────────────────────
    const onMove = (e) => {
      prevMouse.current.x = mouse.current.x
      prevMouse.current.y = mouse.current.y
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      velocity.current.x = mouse.current.x - prevMouse.current.x
      velocity.current.y = mouse.current.y - prevMouse.current.y
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    // ── Particle factory ────────────────────────────────
    const spawnParticle = () => {
      const speed  = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2)
      const count  = Math.min(Math.floor(speed * 0.4), 4)

      for (let i = 0; i < count; i++) {
        const angle  = Math.random() * Math.PI * 2
        const spread = Math.random() * 3
        particles.current.push({
          x:    mouse.current.x + (Math.random() - 0.5) * 8,
          y:    mouse.current.y + (Math.random() - 0.5) * 8,
          vx:   Math.cos(angle) * spread * 0.4 - velocity.current.x * 0.04,
          vy:   Math.sin(angle) * spread * 0.4 - velocity.current.y * 0.04 - 0.3,
          life: 1.0,
          decay: 0.018 + Math.random() * 0.022,
          size:  2 + Math.random() * 4,
          // Slight color variation — gold to amber to warm white
          hue:  Math.random() > 0.7 ? 48 : Math.random() > 0.4 ? 38 : 30,
          sat:  60 + Math.random() * 30,
          lit:  55 + Math.random() * 25,
        })
      }
    }

    // ── Main tick ───────────────────────────────────────
    let frameCount = 0
    const removeTick = addTick(() => {
      frameCount++

      // Spawn every other frame for performance
      if (frameCount % 2 === 0) spawnParticle()

      // Clear with slight fade trail
      ctx.fillStyle = 'rgba(8,8,8,0.18)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update + draw particles
      particles.current = particles.current.filter(p => p.life > 0)

      particles.current.forEach(p => {
        // Physics
        p.x   += p.vx
        p.y   += p.vy
        p.vy  -= 0.015        // slight upward drift (smoke rises)
        p.vx  *= 0.97         // air resistance
        p.vy  *= 0.97
        p.size *= 1.015       // expand as it rises
        p.life -= p.decay

        // Draw smoke puff
        const alpha = p.life * p.life * 0.55  // quadratic fade
        const r     = p.size * (2 - p.life)   // grows as it fades

        // Outer soft glow
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 2.5)
        grd.addColorStop(0, `hsla(${p.hue},${p.sat}%,${p.lit}%,${alpha})`)
        grd.addColorStop(0.4, `hsla(${p.hue},${p.sat}%,${p.lit}%,${alpha * 0.4})`)
        grd.addColorStop(1,   `hsla(${p.hue},${p.sat}%,${p.lit}%,0)`)

        ctx.beginPath()
        ctx.arc(p.x, p.y, r * 2.5, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()
      })

      // Cap particle count for performance
      if (particles.current.length > 120) {
        particles.current = particles.current.slice(-120)
      }
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
      removeTick()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw', height: '100vh',
        zIndex: 9998,             // just below cursor ring
        pointerEvents: 'none',
        mixBlendMode: 'screen',   // blends gold smoke beautifully on dark bg
      }}
    />
  )
})

export default ParticleCursor
