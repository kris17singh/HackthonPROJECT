import { useState } from 'react'
import api from '../lib/api'

export default function MockInterview() {
  const studentId = localStorage.getItem('studentId')
  const [topic, setTopic] = useState('')
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(false)

  const simulate = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await api.post('/interview/simulate', { studentId, topic })
      setQuestions(data.questions || [])
    } finally {
      setLoading(false)
    }
  }

  if (!studentId) return <div className="p-6">No studentId.</div>

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Mock Interview</h1>
      <form onSubmit={simulate} className="flex gap-2">
        <input className="flex-1 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="Topic (optional)" value={topic} onChange={e=>setTopic(e.target.value)} />
        <button disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-lg transition">{loading ? 'Loading...' : 'Simulate'}</button>
      </form>
      <ol className="list-decimal pl-6 space-y-2">
        {questions.map((q, i) => <li key={i}>{q}</li>)}
      </ol>
    </div>
  )
}


