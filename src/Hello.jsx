import React, { useState, useEffect, useRef } from 'react'
import './Hello.css'

const quotes = [
  "Welcome to Saksham's digital space!",
  "Crafting code, creating dreams. — Saksham",
  "Every pixel tells a story. — Saksham",
  "Let's build something amazing together.",
  "Turning ideas into reality, one commit at a time."
]

function Hello({ onLaunch }) {
  const [quoteIdx, setQuoteIdx] = useState(0)
  const [fade, setFade] = useState(true)
  const [shaking, setShaking] = useState(false)
  const [blast, setBlast] = useState(false)
  const bgRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setQuoteIdx((i) => (i + 1) % quotes.length)
        setFade(true)
      }, 600)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      if (bgRef.current) {
        bgRef.current.style.setProperty('--x', `${x}%`)
        bgRef.current.style.setProperty('--y', `${y}%`)
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleLaunch = () => {
    setShaking(true)
    setBlast(true)
    setTimeout(() => {
      setShaking(false)
      onLaunch()
    }, 900)
  }

  return (
    <div className={`hello-bg${shaking ? ' shake' : ''}${blast ? ' blast' : ''}`} ref={bgRef}>
      <div className="green-spotlight" />
      <div className="hello-profile">
        <img
          className="hello-profile-pic"
          src="/profile.jpg"
          alt="Saksham Profile"
        />
        <div className="hello-profile-name">Saksham</div>
      </div>
      <div className={`hello-quote-container${blast ? ' blast-quote' : ''}`}> 
        <div className={`hello-quote${fade ? ' fade-in' : ' fade-out'}`}>{quotes[quoteIdx]}</div>
      </div>
      <button className={`launch-btn hello-launch-btn${blast ? ' blast-btn' : ''}`} onClick={handleLaunch}>
        Launch
      </button>
    </div>
  )
}

export default Hello
