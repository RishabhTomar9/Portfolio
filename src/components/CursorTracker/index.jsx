import { useEffect, useRef } from 'react'
import './index.css'

const GHOST_COUNT = 6

const CursorTracker = () => {
  const cursorRef = useRef(null)
  const cursorDotRef = useRef(null)
  const ghostRefs = useRef(Array.from({ length: GHOST_COUNT }, () => ({ el: null, x: 0, y: 0 })))
  const ghostsInitializedRef = useRef(false)

  useEffect(() => {
    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    const ghosts = ghostRefs.current

    if (!cursor || !cursorDot) return

    let targetX = 0
    let targetY = 0
    let ringX = null
    let ringY = null
    let dotX = null
    let dotY = null
    let lastRingX = null
    let lastRingY = null
    let magnetCenter = { x: null, y: null }
    let rafId

    const moveCursor = (e) => {
      targetX = e.clientX
      targetY = e.clientY
      if (ringX === null || ringY === null) {
        ringX = targetX
        ringY = targetY
      }
      if (dotX === null || dotY === null) {
        dotX = targetX
        dotY = targetY
      }
    }

    const addHoverEffect = () => {
      cursor.classList.add('cursor-hover')
      cursorDot.classList.add('cursor-dot-hover')
    }

    const removeHoverEffect = () => {
      cursor.classList.remove('cursor-hover')
      cursorDot.classList.remove('cursor-dot-hover')
    }

    const handleMouseDown = () => {
      cursor.classList.add('cursor-click')
      cursorDot.classList.add('cursor-dot-click')
    }

    const handleMouseUp = () => {
      cursor.classList.remove('cursor-click')
      cursorDot.classList.remove('cursor-dot-click')
    }

    const lerp = (start, end, t) => start + (end - start) * t

    const clamp = (v, min, max) => Math.max(min, Math.min(max, v))

    const animate = () => {
      // compute magnetic offset for ring only
      let ringTargetX = targetX
      let ringTargetY = targetY
      if (magnetCenter.x !== null && magnetCenter.y !== null) {
        const mx = magnetCenter.x - targetX
        const my = magnetCenter.y - targetY
        const md = Math.hypot(mx, my)
        if (md > 0.0001) {
          const offset = clamp(md * 0.12, 0, 12)
          ringTargetX += (mx / md) * offset
          ringTargetY += (my / md) * offset
        }
      }

      // smooth follow for main ring and dot (slightly slower for smoother feel)
      ringX = lerp(ringX, ringTargetX, 0.15)
      ringY = lerp(ringY, ringTargetY, 0.15)
      dotX = lerp(dotX, targetX, 0.22)
      dotY = lerp(dotY, targetY, 0.22)

      // update transforms
      cursor.style.transform = `translate(${ringX}px, ${ringY}px)`
      cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`

      // velocity -> angle and trail length
      if (lastRingX !== null && lastRingY !== null) {
        const dx = ringX - lastRingX
        const dy = ringY - lastRingY
        const speed = Math.hypot(dx, dy)
        const angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI
        const trailLen = clamp(speed * 40, 20, 80)
        cursor.style.setProperty('--angle', `${angleDeg}deg`)
        cursor.style.setProperty('--trail-length', `${trailLen}px`)
      }
      lastRingX = ringX
      lastRingY = ringY

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
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, select, [role="button"], .project-card, .about-card, .skill-card'
    )
    const hoverHandlers = []
    interactiveElements.forEach((el) => {
      const onEnter = (e) => {
        addHoverEffect()
        const rect = el.getBoundingClientRect()
        magnetCenter = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
      }
      const onLeave = () => {
        removeHoverEffect()
        magnetCenter = { x: null, y: null }
      }
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
      hoverHandlers.push({ el, onEnter, onLeave })
    })

    rafId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      hoverHandlers.forEach(({ el, onEnter, onLeave }) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
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
      <div ref={cursorRef} className="cursor-tracker" />
      <div ref={cursorDotRef} className="cursor-dot" />
    </>
  )
}

export default CursorTracker

