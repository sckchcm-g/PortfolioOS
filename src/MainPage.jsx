import React, { useEffect, useRef, useState } from 'react'
import Terminal from './components/Terminal/Terminal'
import Preview from './components/Preview/Preview'

function MainPage() {
  const [selected, setSelected] = useState(null)
  const [animating, setAnimating] = useState(false)
  const [previewExpanded, setPreviewExpanded] = useState(false)
  const [repos, setRepos] = useState([])
  const bgRef = useRef(null)

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

  // For mobile: toggle preview expand/collapse
  const handlePreviewHeaderClick = () => {
    if (window.innerWidth <= 700) {
      setPreviewExpanded((v) => !v)
    }
  }

  return (
    <div className="mainpage-bg" ref={bgRef}>
      <div className="green-spotlight" />
      <div className="main-layout">
        <Terminal
          animating={animating}
          onSuggestion={(val) => {
            setAnimating(true)
            setSelected(val)
            setTimeout(() => setAnimating(false), 1200)
          }}
          selected={selected}
          onReposFetched={setRepos}
        />
        <div className={`preview-panel${previewExpanded ? ' expanded' : ''}`}>
          <div className="preview-header" onClick={handlePreviewHeaderClick}>
            Preview
          </div>
          <div className="preview-body">
            <Preview selected={selected} animating={animating} repos={repos} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage
