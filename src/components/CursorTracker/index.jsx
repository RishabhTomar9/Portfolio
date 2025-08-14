import { useEffect, useRef } from 'react'
import './index.css'

const GHOST_COUNT = 6
const LANGUAGES = [
    'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'Express',
    'MongoDB', 'Firebase', 'Python', 'SQL', 'C++', 'Java', 'Tailwind', 'Next.js',
    'Redux', 'GraphQL', 'Sass', 'Bootstrap', 'Django', 'Flask', 'Kotlin',
    'Swift', 'PHP', 'Go'
  ];
  

const CursorTracker = () => {
  const cursorDotRef = useRef(null)
  const ghostRefs = useRef(Array.from({ length: GHOST_COUNT }, () => ({ el: null, x: 0, y: 0 })))
  const ghostsInitializedRef = useRef(false)
  const particlesContainerRef = useRef(null)
  const lastSpawnTimeRef = useRef(0)

  useEffect(() => {
    const cursorDot = cursorDotRef.current
    const ghosts = ghostRefs.current

    if (!cursorDot) return

    // create particles container
    const container = document.createElement('div')
    container.className = 'cursor-particles-container'
    document.body.appendChild(container)
    particlesContainerRef.current = container

    let targetX = 0
    let targetY = 0
    let dotX = null
    let dotY = null
    let rafId

    const lerp = (start, end, t) => start + (end - start) * t

    const spawnParticle = (x, y) => {
      const now = performance.now()
      // throttle spawns to avoid too many elements on rapid moves
      if (now - lastSpawnTimeRef.current < 40) return
      lastSpawnTimeRef.current = now

      const el = document.createElement('span')
      el.className = 'cursor-particle'
      el.textContent = LANGUAGES[Math.floor(Math.random() * LANGUAGES.length)]
      const xOffset = (Math.random() * 60 - 30).toFixed(0) + 'px'
      el.style.setProperty('--xOffset', xOffset)
      el.style.left = x + 'px'
      el.style.top = y + 'px'
      // random slight size variation
      el.style.fontSize = (12 + Math.random() * 6) + 'px'
      // random color tint
      const hues = [200, 210, 190, 220, 195]
      el.style.color = `hsl(${hues[Math.floor(Math.random() * hues.length)]} 90% 60%)`

      el.addEventListener('animationend', () => {
        el.remove()
      })
      container.appendChild(el)
    }

    const moveCursor = (e) => {
      targetX = e.clientX
      targetY = e.clientY
      if (dotX === null || dotY === null) {
        dotX = targetX
        dotY = targetY
      }
      spawnParticle(targetX, targetY)
    }

    const animate = () => {
      // smooth follow for dot
      dotX = lerp(dotX, targetX, 0.22)
      dotY = lerp(dotY, targetY, 0.22)
      cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`

      // init ghost positions on first animation frame after first mouse move
      if (!ghostsInitializedRef.current && targetX && targetY) {
        ghosts.forEach((g) => {
          g.x = targetX
          g.y = targetY
        })
        ghostsInitializedRef.current = true
      }

      // update ghosts with increasing lag
      ghosts.forEach((g, i) => {
        const el = g.el
        if (!el) return
        const t = 0.10 - i * 0.014 // decreasing speed for later ghosts
        g.x = lerp(g.x, targetX, Math.max(0.035, t))
        g.y = lerp(g.y, targetY, Math.max(0.035, t))
        el.style.transform = `translate(${g.x}px, ${g.y}px)`
      })

      rafId = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', moveCursor)

    rafId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove', moveCursor)
      if (particlesContainerRef.current) {
        particlesContainerRef.current.remove()
        particlesContainerRef.current = null
      }
    }
  }, [])

  return (
    <>
      {Array.from({ length: GHOST_COUNT }).map((_, i) => (
        <div
          key={i}
          className="cursor-ghost"
          ref={(el) => {
            ghostRefs.current[i].el = el
          }}
          style={{ opacity: 0.08 + i * 0.02 }}
        />
      ))}
      <div ref={cursorDotRef} className="cursor-dot" />
    </>
  )
}

export default CursorTracker
