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
  const [messageIndex, setMessageIndex] = useState(0)
  const loaderRef = useRef(null)

  useEffect(() => {
    let count = 0
    const interval = setInterval(() => {
      count += 1

      if (count % 10 === 0 && messageIndex < loadingMessages.length - 1) {
        setMessageIndex(prevIndex => prevIndex + 1)
      }

      if (count >= 100) {
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
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="loader-container" ref={loaderRef}>
      <div className="loader-content">
        <p className="loader-message">{loadingMessages[messageIndex]}</p>
      </div>
    </div>
  )
}

export default Loader
