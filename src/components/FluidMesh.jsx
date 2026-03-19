import { useRef, useMemo, forwardRef, useImperativeHandle } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useSmoothMouse } from '../hooks/useSmoothMouse'
import vertGlsl from '../shaders/fluid.vert.glsl?raw'
import fragGlsl from '../shaders/fluid.frag.glsl?raw'

const WORLDS = {
  noir:  { a:'#080808', b:'#1a1510', c:'#c9a84c' },
  or:    { a:'#1a0e00', b:'#4a2e00', c:'#e8c06a' },
  blanc: { a:'#0a0908', b:'#2a241c', c:'#e8e0cc' },
}

const FluidMesh = forwardRef(function FluidMesh(_, ref) {
  const mesh   = useRef()
  const { viewport, gl } = useThree()
  const { smoothed, strength } = useSmoothMouse()

  // Uniforms created once, never recreated
  const uniforms = useRef({
    uTime:          { value: 0 },
    uMouse:         { value: new THREE.Vector2(0.5, 0.5) },
    uMouseStrength: { value: 0 },
    uColorA:        { value: new THREE.Color(WORLDS.noir.a) },
    uColorB:        { value: new THREE.Color(WORLDS.noir.b) },
    uColorC:        { value: new THREE.Color(WORLDS.noir.c) },
  })

  // Expose uniforms ref to parent
  useImperativeHandle(ref, () => uniforms.current, [])

  // Visibility culling — pause when tab hidden
  const visible = useRef(true)
  useMemo(() => {
    const onVis = () => { visible.current = !document.hidden }
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  useFrame(({ clock }) => {
    if (!visible.current) return
    const u = uniforms.current
    u.uTime.value          = clock.getElapsedTime()
    u.uMouse.value.x       = smoothed.current.x
    u.uMouse.value.y       = smoothed.current.y
    u.uMouseStrength.value = strength.current
  })

  // Stable material — never recreated
  const material = useMemo(() => new THREE.ShaderMaterial({
    vertexShader:   vertGlsl,
    fragmentShader: fragGlsl,
    uniforms:       uniforms.current,
    depthWrite:     false,
  }), [])

  return (
    <mesh ref={mesh} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <primitive object={material} attach="material" />
    </mesh>
  )
})

export default FluidMesh
