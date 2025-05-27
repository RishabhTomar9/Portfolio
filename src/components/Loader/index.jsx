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
  const messageRef = useRef(null)

  useEffect(() => {
    let currentIndex = 0

    const animateMessage = () => {
      if (currentIndex < loadingMessages.length) {
        gsap.to(messageRef.current, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            setMessageIndex(currentIndex)
            gsap.fromTo(
              messageRef.current,
              { opacity: 0 },
              { opacity: 1, duration: 0.3 }
            )
            currentIndex += 1
            setTimeout(animateMessage, 350) // Wait before showing next message
          },
        })
      } else {
        // Fade out loader after last message
        gsap.to(loaderRef.current, {
          opacity: 0,
          duration: 1,
          ease: 'power2.inOut',
          onComplete: () => {
            if (onFinish) onFinish()
          },
        })
      }
    }

    animateMessage()
  }, [onFinish])

  return (
    <div className="loader-container" ref={loaderRef}>
      <div className="loader-content">
        <p className="loader-message text" ref={messageRef}>
          {loadingMessages[messageIndex]}
        </p>
      </div>
    </div>
  )
}

export default Loader
