import React, { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import './index.css'

const loadingMessages = [
  'Booting Dev Environment...',
  'Initializing Portfolio Engine...',
  'Compiling Skill Modules...',
  'Deploying Project Showcase...',
  'Activating UI Components...',
  'Wiring Interactive Elements...',
  'Optimizing Visual Interface...',
  'Launching Developer Console...',
]

const Loader = ({ onFinish }) => {
  const [messageIndex, setMessageIndex] = useState(0)
  const loaderRef = useRef(null)
  const messageRef = useRef(null)

  useEffect(() => {
    let currentIndex = 0

    const showNextMessage = () => {
      if (currentIndex < loadingMessages.length) {
        // Fade out
        gsap.to(messageRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: 'power1.out',
          onComplete: () => {
            // Change message
            setMessageIndex(currentIndex)
            // Fade in
            gsap.fromTo(
              messageRef.current,
              { opacity: 0 },
              {
                opacity: 1,
                duration: 0.4,
                ease: 'power1.inOut',
              }
            )
            currentIndex++
            setTimeout(showNextMessage, 250)
          },
        })
      } else {
        // Fade out loader
        gsap.to(loaderRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: () => {
            if (onFinish) onFinish()
          },
        })
      }
    }

    showNextMessage()
  }, [onFinish])

  return (
    <div className="loader-container" ref={loaderRef}>
      <div className="loader-content">
        <p className="loader-message" ref={messageRef}>
          {loadingMessages[messageIndex]}
        </p>
      </div>
    </div>
  )
}

export default Loader
