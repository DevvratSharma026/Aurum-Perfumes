import './styles/global.css'
import { useRef, lazy, Suspense, memo } from 'react'
import { Canvas }          from '@react-three/fiber'
import { useLenis }        from './hooks/useLenis'
import { useScrollWorld }  from './hooks/useScrollWorld'
import FluidMesh           from './components/FluidMesh'
import Cursor              from './components/Cursor'
import Nav                 from './components/Nav'
import Hero                from './components/Hero'

const ScentPanels = lazy(() => import('./components/ScentPanels'))
const VideoRitual    = lazy(() => import('./components/VideoRitual'))
const Ritual         = lazy(() => import('./components/Ritual'))
const Footer         = lazy(() => import('./components/Footer'))

const MemoNav = memo(Nav)

export default function App() {
  const uniformsRef = useRef(null)

  useLenis()
  useScrollWorld(uniformsRef)

  return (
    <>
      {/* Fixed fluid canvas */}
      <div style={{
        position: 'fixed', top: 0, left: 0,
        width: '100vw', height: '100vh',
        zIndex: 0, pointerEvents: 'none',
      }}>
        <Canvas
          camera={{ position: [0, 0, 1], fov: 90, near: 0.01, far: 10 }}
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
            stencil: false,
            depth: false,
          }}
          style={{ width: '100vw', height: '100vh', display: 'block' }}
          dpr={Math.min(window.devicePixelRatio, 2)}
          frameloop="always"
          resize={{ scroll: false, debounce: { scroll: 50, resize: 0 } }}
        >
          <FluidMesh ref={uniformsRef} />
        </Canvas>
      </div>

      {/* Page content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Cursor />
        <MemoNav />
        <main>
          <Hero />
          <Suspense fallback={null}>
            <ScentPanels />
            <VideoRitual />
            <Ritual />
            <Footer />
          </Suspense>
        </main>
      </div>
    </>
  )
}
