import React, { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import './index.css'

const loadingMessages = [
  'Initializing Components...',
  'Loading Hero Section...',
  'Fetching Skills...',
  'Preparing Projects...',
  'Rendering Cards...',
  'Optimizing Elements...',
  'Finalizing UI...',
  'Almost There...',
]

const Loader = ({ onFinish }) => {
  const [progress, setProgress] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)
  const loaderRef = useRef(null)
  const barRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + 1

        if (next % 10 === 0 && messageIndex < loadingMessages.length - 1) {
          setMessageIndex(prevIndex => prevIndex + 1)
        }

        if (next >= 100) {
          clearInterval(interval)
          gsap.to(loaderRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
            onComplete: () => {
              onFinish && onFinish()
            },
          })
        }

        return next
      })
    }, 50)

    gsap.to(barRef.current, {
      width: '100%',
      duration: 1.5,
      ease: 'power2.inOut',
    })

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="loader-container" ref={loaderRef}>
      <div className="loader-content">
        <p className="loader-message">{loadingMessages[messageIndex]}</p>
        <div className="loader-progress-bar">
          <div className="loader-bar-fill" ref={barRef}></div>
        </div>
        <p className="loader-percentage">{progress}%</p>
      </div>
    </div>
  )
}

export default Loader
