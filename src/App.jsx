import { useEffect, useState } from 'react'

function App() {
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('checking')
  const [error, setError] = useState('')
  const [responseTime, setResponseTime] = useState(null)

  useEffect(() => {
    const startTime = performance.now()

    fetch('/api/hello')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`)
        }
        return res.json()
      })
      .then((data) => {
        const endTime = performance.now()

        setMessage(data.message)
        setResponseTime(Math.round(endTime - startTime))
        setStatus('connected')
      })
      .catch((err) => {
        setError(err.message)
        setStatus('error')
      })
  }, [])

  return (
    <div className="app">
      <div className="container">

        {/* Header */}
        <header className="header">
          <div className="logo">3T</div>

          <div>
            <h1>Three-Tier Application</h1>
            <p>Frontend & Backend Connectivity</p>
          </div>
        </header>

        {/* Main Card */}
        <main className="card">

          <div className="card-header">
            <div>
              <h2>Application Status</h2>
              <p>Real-time backend connectivity check</p>
            </div>

            <div className={`status ${status}`}>
              <span className="status-dot"></span>

              {status === 'checking' && 'Checking...'}
              {status === 'connected' && 'Connected'}
              {status === 'error' && 'Disconnected'}
            </div>
          </div>

          {/* Architecture */}
          <div className="architecture">

            <div className="service active">
              <div className="service-icon">⚛</div>
              <h3>Frontend</h3>
              <p>Vite + React</p>
            </div>

            <div className="connection">
              <div className="line"></div>
              <span>API</span>
              <div className="line"></div>
            </div>

            <div className={`service ${status === 'connected' ? 'active' : ''}`}>
              <div className="service-icon">⚙</div>
              <h3>Backend</h3>
              <p>Node + Express</p>
            </div>

          </div>

          {/* Backend Response */}
          <div className="response-box">
            <span className="response-label">BACKEND RESPONSE</span>

            {status === 'checking' && (
              <p className="loading">Connecting to backend...</p>
            )}

            {status === 'connected' && (
              <p className="success-message">
                {message}
              </p>
            )}

            {status === 'error' && (
              <p className="error-message">
                Unable to reach backend: {error}
              </p>
            )}
          </div>

          {/* Details */}
          <div className="details">

            <div className="detail">
              <span>Frontend</span>
              <strong>Vite + React</strong>
            </div>

            <div className="detail">
              <span>Backend</span>
              <strong>Node + Express</strong>
            </div>

            <div className="detail">
              <span>Endpoint</span>
              <strong>/api/hello</strong>
            </div>

            <div className="detail">
              <span>Response Time</span>
              <strong>
                {responseTime !== null ? `${responseTime} ms` : '--'}
              </strong>
            </div>

          </div>

        </main>

        {/* Footer */}
        <footer>
          <span>Three-Tier Demo</span>
          <span>•</span>
          <span>Frontend → Backend</span>
        </footer>

      </div>
    </div>
  )
}

export default App
