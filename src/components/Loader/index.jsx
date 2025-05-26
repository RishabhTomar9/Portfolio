import React, { useEffect, useState } from 'react'
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

const Loader = () => {
  const [progress, setProgress] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const next = prev + 1
        if (next >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return next
      })
    }, 40)

    const messageInterval = setInterval(() => {
      setMessageIndex(prev =>
        prev < loadingMessages.length - 1 ? prev + 1 : prev
      )
    }, 600)

    return () => {
      clearInterval(progressInterval)
      clearInterval(messageInterval)
    }
  }, [])

  return (
    <div class="loader-container">
<div class="card">
  <div class="loader">
    <p>loading</p>
    <div class="words">
      <span class="word">buttons</span>
      <span class="word">forms</span>
      <span class="word">switches</span>
      <span class="word">cards</span>
      <span class="word">buttons</span>
    </div>
  </div>
</div>
</div>
  )
}

export default Loader
