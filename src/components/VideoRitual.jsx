import { useEffect, useRef, memo } from 'react'
import gsap from 'gsap'

const VIDEO_SRC = '/videos/aurum_pour.mp4'

const VideoRitual = memo(function VideoRitual() {
  const sectionRef  = useRef()
  const videoRef    = useRef()
  const line1Ref    = useRef()
  const line2Ref    = useRef()
  const labelRef    = useRef()
  const progressRef = useRef()
  const rafRef      = useRef()
  const stateRef    = useRef({ progress: 0, target: 0, revealed: false })

  useEffect(() => {
    const section = sectionRef.current
    const video   = videoRef.current
    if (!section) return

    // ── IntersectionObserver — fires on even 1px visibility ──
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !stateRef.current.revealed) {
            stateRef.current.revealed = true

            // Immediately trigger text + label animation
            gsap.to(labelRef.current, {
              opacity: 1, y: 0,
              duration: 1.0, ease: 'power3.out',
            })
            gsap.to(line1Ref.current, {
              opacity: 1, y: 0,
              duration: 1.3, ease: 'power4.out', delay: 0.18,
            })
            gsap.to(line2Ref.current, {
              opacity: 1, y: 0,
              duration: 1.3, ease: 'power4.out', delay: 0.36,
            })

            // Start video playback from beginning
            if (video) {
              video.currentTime = 0
              video.play().catch(() => {})
            }

            // Once revealed, no need to observe anymore
            observer.disconnect()
          }
        })
      },
      { threshold: 0 } // 0 = even 1px triggers it
    )

    observer.observe(section)

    // ── Scroll driver — scrubs progress bar only ──────────
    const onScroll = () => {
      const rect   = section.getBoundingClientRect()
      const total  = section.offsetHeight - window.innerHeight
      stateRef.current.target = Math.max(0, Math.min(1, -rect.top / total))
    }

    const tick = () => {
      const s = stateRef.current
      s.progress += (s.target - s.progress) * 0.06

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${s.progress})`
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    // Set initial hidden state
    gsap.set([labelRef.current, line1Ref.current, line2Ref.current], {
      opacity: 0, y: 32,
    })

    if (video) {
      video.pause()
      video.currentTime = 0
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafRef.current)
      if (video) video.pause()
    }
  }, [])

  return (
    <div ref={sectionRef} style={{ position: 'relative', height: '100vh', background: '#000' }}>

      <div style={{
        position: 'sticky', top: 0,
        height: '100vh', width: '100%',
        overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#000',
      }}>

        {/* Video */}
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          muted playsInline preload="auto"
          loop
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            willChange: 'transform',
          }}
        />

        {/* Vignette */}
        <div style={{
          position:'absolute', inset:0, zIndex:2, pointerEvents:'none',
          background:'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.0) 30%, rgba(0,0,0,0.0) 70%, rgba(0,0,0,0.75) 100%)',
        }}/>

        {/* Label */}
        <div ref={labelRef} style={{
          position:'absolute', top:52, left:'50%',
          transform:'translateX(-50%)',
          fontFamily:"'Tenor Sans',sans-serif",
          fontSize:10, letterSpacing:'0.38em',
          color:'#4a3d26', textTransform:'uppercase',
          zIndex:4, opacity:0, whiteSpace:'nowrap',
          willChange:'transform, opacity',
        }}>
          Le Rituel · The Pour
        </div>

        {/* Copy */}
        <div style={{ position:'relative', zIndex:4, textAlign:'center', padding:'0 24px', pointerEvents:'none' }}>
          <p ref={line1Ref} style={{
            fontFamily:"'Cormorant Garamond',serif",
            fontStyle:'italic', fontWeight:300,
            fontSize:'clamp(28px,4.5vw,58px)',
            color:'#e8e0cc', letterSpacing:'0.04em',
            lineHeight:1.3, marginBottom:24, opacity:0,
            willChange:'transform, opacity',
          }}>
            Each drop is a decision.
          </p>
          <p ref={line2Ref} style={{
            fontFamily:"'Cormorant Garamond',serif",
            fontStyle:'italic', fontWeight:300,
            fontSize:'clamp(18px,2.8vw,36px)',
            color:'#8a6f3a', letterSpacing:'0.06em',
            lineHeight:1.5, opacity:0,
            willChange:'transform, opacity',
          }}>
            Not applied. Performed.
          </p>
        </div>

        {/* Progress bar */}
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:1, background:'#1a1510', zIndex:4 }}>
          <div ref={progressRef} style={{
            height:'100%',
            background:'linear-gradient(to right, transparent, #c9a84c)',
            transformOrigin:'left', transform:'scaleX(0)',
            willChange:'transform',
          }}/>
        </div>

        {/* Corner hint */}
        <div style={{
          position:'absolute', bottom:48, right:48, zIndex:4,
          fontFamily:"'Tenor Sans',sans-serif",
          fontSize:9, letterSpacing:'0.28em',
          color:'#2a2318', textTransform:'uppercase',
        }}>
          Scroll to witness
        </div>
      </div>
    </div>
  )
})

export default VideoRitual
