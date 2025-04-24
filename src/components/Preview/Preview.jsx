import { useState } from 'react'
import './Preview.css'

const PAGE_SIZE = 5

function Preview({ selected, animating, repos }) {
  const [page, setPage] = useState(1)

  // Reset page when selection changes
  if (selected !== 'repos' && page !== 1) setPage(1)

  if (selected === 'repos' && !animating) {
    if (!repos || repos.length === 0) {
      return (
        <div className="preview-panel-content">
          <div>No repositories found or loading...</div>
        </div>
      )
    }
    const totalPages = Math.ceil(repos.length / PAGE_SIZE)
    const pagedRepos = repos.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
    return (
      <div className="preview-panel-content">
        <h2 className="preview-title">GitHub Repositories</h2>
        <ul className="repo-list">
          {pagedRepos.map(repo => (
            <li key={repo.id} className="repo-item">
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="repo-link">
                <span className="repo-name">{repo.name}</span>
              </a>
              {repo.description && <div className="repo-desc">{repo.description}</div>}
              <div className="repo-meta">
                <span>⭐ {repo.stargazers_count}</span>
                <span>🍴 {repo.forks_count}</span>
                {repo.language && <span>📝 {repo.language}</span>}
                {repo.license && repo.license.spdx_id !== 'NOASSERTION' && <span>📄 {repo.license.spdx_id}</span>}
                <span>🕒 Updated: {new Date(repo.updated_at).toLocaleDateString()}</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="pagination-bar">
          <button className="pagination-btn" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>&lt;</button>
          <span className="pagination-info">Page {page} of {totalPages}</span>
          <button className="pagination-btn" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>&gt;</button>
        </div>
      </div>
    )
  }
  if (selected === 'experience' && !animating) {
    return <div className="preview-panel-content">Experience data here...</div>
  }
  if (selected === 'contribution' && !animating) {
    return <div className="preview-panel-content">GitHub contribution data here...</div>
  }
  return <div className="preview-panel-content">Choose a suggestion to preview info.</div>
}

export default Preview
