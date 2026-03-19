import { useEffect, useRef, memo } from 'react'
import { addTick } from '../hooks/useTick'

const Cursor = memo(function Cursor() {
  const ring     = useRef()
  const dot      = useRef()
  const pos      = useRef({ x: -100, y: -100 })
  const smoothed = useRef({ x: -100, y: -100 })
  const hovering = useRef(false)

  useEffect(() => {
    const lerp = (a, b, t) => a + (b - a) * t

    const onMove = (e) => {
      pos.current.x = e.clientX
      pos.current.y = e.clientY
    }
    const onEnter = () => { hovering.current = true }
    const onLeave = () => { hovering.current = false }

    // Delegate hover detection — no per-element listeners
    const onOver = (e) => {
      hovering.current = !!e.target.closest('a, button, [data-hover]')
    }

    const removeTick = addTick(() => {
      smoothed.current.x = lerp(smoothed.current.x, pos.current.x, 0.12)
      smoothed.current.y = lerp(smoothed.current.y, pos.current.y, 0.12)

      const size   = hovering.current ? 56 : 36
      const offset = size / 2

      if (ring.current) {
        ring.current.style.transform  = `translate3d(${smoothed.current.x - offset}px,${smoothed.current.y - offset}px,0)`
        ring.current.style.width      = `${size}px`
        ring.current.style.height     = `${size}px`
        ring.current.style.background = hovering.current ? 'rgba(201,168,76,0.08)' : 'transparent'
      }
      if (dot.current) {
        dot.current.style.transform = `translate3d(${pos.current.x - 2}px,${pos.current.y - 2}px,0)`
      }
    })

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      removeTick()
    }
  }, [])

  return (
    <>
      <div ref={ring} style={{
        position: 'fixed', top: 0, left: 0, zIndex: 9999,
        border: '0.5px solid #c9a84c', borderRadius: '50%',
        pointerEvents: 'none', willChange: 'transform, width, height',
        transition: 'width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1), background 0.3s ease',
        mixBlendMode: 'difference',
      }} />
      <div ref={dot} style={{
        position: 'fixed', top: 0, left: 0, zIndex: 9999,
        width: 4, height: 4, borderRadius: '50%',
        background: '#c9a84c', pointerEvents: 'none',
        willChange: 'transform',
      }} />
    </>
  )
})

export default Cursor
