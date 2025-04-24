import React, { useState } from 'react'

const suggestions = [
  { label: 'experience', value: 'experience' },
  { label: 'github repos', value: 'repos' },
  { label: 'github contribution', value: 'contribution' },
]

function Terminal({ animating, onSuggestion, selected }) {
  const [terminalInput, setTerminalInput] = useState("")

  return (
    <div className="terminal-panel">
      <div className="terminal-header">Terminal</div>
      <div className="terminal-body">
        <div style={{ marginBottom: 12 }}>
          hello this is saksham
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
        {animating && <div className="terminal-anim">$ Hacking...</div>}
      </div>
    </div>
  )
}

export default Terminal
