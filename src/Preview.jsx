import React from 'react'

function Preview({ selected, animating }) {
  return (
    <div className="preview-panel">
      <div className="preview-header">Preview</div>
      <div className="preview-body">
        {selected === "experience" && !animating && <div>Experience data here...</div>}
        {selected === "repos" && !animating && <div>GitHub repos data here...</div>}
        {selected === "contribution" && !animating && <div>GitHub contribution data here...</div>}
        {!selected && <div>Choose a suggestion to preview info.</div>}
      </div>
    </div>
  )
}

export default Preview
