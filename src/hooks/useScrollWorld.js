import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const WORLD_COLORS = {
  noir:  { a: [0.031,0.031,0.031], b: [0.102,0.082,0.063], c: [0.788,0.659,0.298] },
  or:    { a: [0.102,0.055,0.0],   b: [0.290,0.180,0.0],   c: [0.910,0.753,0.416] },
  blanc: { a: [0.039,0.035,0.031], b: [0.165,0.141,0.110], c: [0.910,0.878,0.800] },
}

const WORLDS = ['noir', 'or', 'blanc']

function lerp3(a, b, t) {
  return [a[0]+(b[0]-a[0])*t, a[1]+(b[1]-a[1])*t, a[2]+(b[2]-a[2])*t]
}

export function useScrollWorld(uniformsRef, onWorldChange) {
  useEffect(() => {
    // Delay so DOM + Lenis are both ready
    const t = setTimeout(() => {
      const sections = document.querySelectorAll('[data-world]')
      if (!sections.length) return

      sections.forEach((section, i) => {
        const worldId = section.dataset.world
        const colors  = WORLD_COLORS[worldId]
        const prev    = WORLD_COLORS[WORLDS[Math.max(0, i - 1)]]

        ScrollTrigger.create({
          trigger: section,
          start: 'top 70%',
          end: 'top 10%',
          scrub: 1,
          onEnter:     () => onWorldChange?.(worldId),
          onEnterBack: () => onWorldChange?.(worldId),
          onUpdate: (self) => {
            if (!uniformsRef.current) return
            const u = uniformsRef.current
            const t = self.progress
            // Smooth ease
            const e = t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t+2, 2)/2
            u.uColorA.value.setRGB(...lerp3(prev.a, colors.a, e))
            u.uColorB.value.setRGB(...lerp3(prev.b, colors.b, e))
            u.uColorC.value.setRGB(...lerp3(prev.c, colors.c, e))
          },
        })
      })

      ScrollTrigger.refresh()
    }, 400)

    return () => {
      clearTimeout(t)
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])
}
