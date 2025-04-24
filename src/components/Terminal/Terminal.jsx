import { useEffect, useState } from 'react'
import './Terminal.css'

const asciiArt = `
  ██░ ██ ▓█████  ██▓     ██▓     ▒█████
  ▓██░ ██▒▓█   ▀ ▓██▒    ▓██▒    ▒██▒  ██▒
  ▒██▀▀██░▒███   ▒██░    ▒██░    ▒██░  ██▒
  ░▓█ ░██ ▒▓█  ▄ ▒██░    ▒██░    ▒██   ██░
  ░▓█▒░██▓░▒████▒░██████▒░██████▒░ ████▓▒░
`;

const suggestions = [
  { label: 'experience', value: 'experience' },
  { label: 'github repos', value: 'repos' },
  { label: 'github contribution', value: 'contribution' },
]

function Terminal({ animating, onSuggestion, selected, onReposFetched }) {
  const [terminalInput, setTerminalInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [showData, setShowData] = useState(false)
  const [artAnim, setArtAnim] = useState(false)

  useEffect(() => {
    if (animating) {
      setLoading(true)
      setArtAnim(true)
      setShowData(false)
      setTimeout(() => {
        setLoading(false)
        setArtAnim(false)
        setShowData(true)
      }, 1200)
    }
  }, [animating])

  // Fetch GitHub repos when 'repos' is selected and data is shown
  useEffect(() => {
    if (selected === 'repos' && showData && onReposFetched) {
      fetch('https://api.github.com/users/sckchcm-g/repos')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            onReposFetched(data)
          }
        })
    }
  }, [selected, showData, onReposFetched])

  return (
    <div className="terminal-panel">
      <div className="terminal-header">Terminal</div>
      <div className="terminal-body">
        <pre className={`terminal-ascii-art${artAnim ? ' anim' : ''}`}>{asciiArt}</pre>
        <div className="terminal-greeting">
          hello user, browse data about saksham here
        </div>
        <div className="terminal-input-row">
          <span>&gt; </span>
          <input
            className="terminal-input"
            value={terminalInput}
            onChange={e => setTerminalInput(e.target.value)}
            placeholder="Type or select..."
            disabled={animating}
            autoFocus
          />
        </div>
        <div className="terminal-suggestions">
          {suggestions.map(s => (
            <button
              key={s.value}
              className="terminal-suggestion-btn"
              onClick={() => onSuggestion(s.value)}
              disabled={animating}
            >
              {s.label}
            </button>
          ))}
        </div>
        {loading && <div className="terminal-anim">Loading data...</div>}
        {showData && <div className="terminal-anim">Data found.</div>}
      </div>
    </div>
  )
}

export default Terminal
