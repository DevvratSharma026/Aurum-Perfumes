import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Scoped to a container ref — no global DOM queries
export function useTextReveal(containerRef) {
  useEffect(() => {
    const container = containerRef?.current
    if (!container) return

    const elements  = container.querySelectorAll('[data-reveal]')
    const triggers  = []

    elements.forEach((el) => {
      const words = el.textContent.trim().split(' ')
      el.innerHTML = words.map(w =>
        `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;margin-right:.25em">` +
        `<span class="rev-w" style="display:inline-block;transform:translateY(105%);opacity:0;will-change:transform">${w}</span>` +
        `</span>`
      ).join('')

      const wordEls = el.querySelectorAll('.rev-w')
      const tl = gsap.timeline({ paused: true })
      tl.to(wordEls, { y: 0, opacity: 1, duration: 1.1, ease: 'power4.out', stagger: 0.07 })

      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        onEnter:     () => tl.play(),
        onEnterBack: () => tl.restart(),
      })
      triggers.push(st)
    })

    return () => {
      triggers.forEach(st => st.kill())
    }
  }, [])
}

export function useFadeReveal(containerRef) {
  useEffect(() => {
    const container = containerRef?.current
    if (!container) return

    const elements = container.querySelectorAll('[data-fade]')
    const triggers = []

    elements.forEach((el) => {
      const delay = parseFloat(el.dataset.delay || 0)
      gsap.set(el, { opacity: 0, y: 22, willChange: 'transform, opacity' })

      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        onEnter: () => gsap.to(el, {
          opacity: 1, y: 0, duration: 1.1, delay,
          ease: 'power3.out',
          onComplete: () => { el.style.willChange = 'auto' },
        }),
      })
      triggers.push(st)
    })

    return () => triggers.forEach(st => st.kill())
  }, [])
}
