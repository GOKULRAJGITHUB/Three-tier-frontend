import { useState, useEffect } from 'react'

function App() {
  const [message, setMessage] = useState('Loading...')
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/hello')
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`)
        return res.json()
      })
      .then((data) => setMessage(data.message))
      .catch((err) => setError(err.message))
  }, [])

  return (
    <div style={{ fontFamily: 'sans-serif', textAlign: 'center', marginTop: '4rem' }}>
      <h1>React-node-docker-Demo</h1>
      <p>Frontend (Vite + React) talking to Backend (Node + Express)</p>
      {error ? (
        <p style={{ color: 'red' }}>Error reaching backend: {error}</p>
      ) : (
        <p>Backend says: <strong>{message}</strong></p>
      )}
    </div>
  )
}

export default App
