import { useRef, useEffect } from 'react'
import { addTick } from './useTick'

export function useSmoothMouse() {
  const mouse    = useRef({ x: 0.5, y: 0.5 })
  const smoothed = useRef({ x: 0.5, y: 0.5 })
  const strength = useRef(0)

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = e.clientX / window.innerWidth
      mouse.current.y = 1.0 - e.clientY / window.innerHeight
      strength.current = Math.min(strength.current + 0.35, 1.0)
    }

    const removeTick = addTick(() => {
      const lerp = (a, b, t) => a + (b - a) * t
      smoothed.current.x = lerp(smoothed.current.x, mouse.current.x, 0.06)
      smoothed.current.y = lerp(smoothed.current.y, mouse.current.y, 0.06)
      strength.current   = lerp(strength.current, 0, 0.04)
    })

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      removeTick()
    }
  }, [])

  return { smoothed, strength }
}
