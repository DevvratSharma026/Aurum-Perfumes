// Single unified RAF — all subscribers share one loop
const subscribers = new Map()
let rafId  = null
let lastTime = 0
let idCounter = 0

function loop(time) {
  const delta = Math.min(time - lastTime, 50) // cap at 50ms
  lastTime = time
  subscribers.forEach(fn => fn(time, delta))
  rafId = requestAnimationFrame(loop)
}

export function addTick(fn) {
  const id = ++idCounter
  if (!subscribers.size) {
    lastTime = performance.now()
    rafId = requestAnimationFrame(loop)
  }
  subscribers.set(id, fn)
  return () => {
    subscribers.delete(id)
    if (!subscribers.size && rafId) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
  }
}
