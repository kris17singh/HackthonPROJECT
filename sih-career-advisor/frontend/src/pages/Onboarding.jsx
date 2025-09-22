import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../lib/api'

export default function Onboarding() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const signup = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await api.post('/auth/signup', { name, email })
      if (data?.studentId) {
        localStorage.setItem('studentId', data.studentId)
        navigate('/app/dashboard')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
        <div className="order-2 md:order-1">
          <form onSubmit={signup} className="bg-white/80 backdrop-blur p-8 rounded-2xl shadow-lg w-full space-y-5 border">
            <div className="space-y-1">
              <h1 className="text-3xl font-semibold text-blue-700">BrightPath</h1>
              <p className="text-gray-600">Sign in to get your personalized roadmap</p>
            </div>
            <div className="grid gap-3">
              <input className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
              <input type="email" className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
            </div>
            <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition">{loading ? 'Loading...' : 'Continue'}</button>
            <p className="text-xs text-gray-500">By continuing you agree to our terms and privacy policy.</p>
          </form>
        </div>
        <div className="order-1 md:order-2 text-center md:text-left">
          <div className="inline-flex items-center justify-center w-28 h-28 rounded-2xl bg-white shadow mb-6">🎓</div>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">Plan your path with mentors, skills and mock interviews</h2>
          <p className="mt-3 text-gray-600">Get course and college recommendations, track your skills, and practice interviews.</p>
          <ul className="mt-6 space-y-2 text-gray-700">
            <li>• Smart course, college and job suggestions</li>
            <li>• Resume builder and interview simulator</li>
            <li>• Mentor matching and progress tracking</li>
          </ul>
        </div>
      </div>
    </div>
  )
}


