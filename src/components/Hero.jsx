import { useEffect, useState } from 'react'

function Hero() {
  const [status, setStatus] = useState('')

  useEffect(() => {
    const check = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}`)
        const data = await res.json()
        setStatus(data.message || 'Ready')
      } catch (e) {
        setStatus('Backend offline')
      }
    }
    check()
  }, [])

  return (
    <section className="text-center">
      <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">CampusLink</h1>
      <p className="text-blue-200 max-w-xl mx-auto">
        A private network for college students to connect with professors and companies.
        Ask questions, get mentorship, and land internships.
      </p>
      <p className="text-xs text-blue-300/60 mt-4">{status && `Status: ${status}`}</p>
    </section>
  )
}

export default Hero
