import { useState } from 'react'
import api from '../lib/api'

export default function ResumeBuilder() {
  const studentId = localStorage.getItem('studentId')
  const [details, setDetails] = useState('')
  const [resume, setResume] = useState('')
  const [loading, setLoading] = useState(false)

  const generate = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await api.post('/resume/generate', { studentId, details })
      setResume(data.content)
    } finally {
      setLoading(false)
    }
  }

  if (!studentId) return <div className="p-6">No studentId.</div>

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Resume Builder</h1>
      <form onSubmit={generate} className="space-y-3">
        <textarea className="w-full border p-3 rounded-lg h-40 focus:outline-none focus:ring-2 focus:ring-blue-300" value={details} onChange={e=>setDetails(e.target.value)} placeholder="Enter your details" />
        <button disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition">{loading ? 'Generating...' : 'Generate'}</button>
      </form>
      {resume && (
        <div className="border rounded-2xl p-4 bg-white shadow whitespace-pre-wrap">{resume}</div>
      )}
    </div>
  )
}


