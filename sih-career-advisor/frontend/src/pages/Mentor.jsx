import { useEffect, useState } from 'react'
import api from '../lib/api'

export default function Mentor() {
  const [mentor, setMentor] = useState(null)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [note, setNote] = useState('')
  const [confirm, setConfirm] = useState('')
  const studentId = localStorage.getItem('studentId')

  useEffect(() => {
    async function fetchMatch() {
      if (!studentId) return
      const { data } = await api.get(`/mentor/match/${studentId}`)
      setMentor(data.mentor)
    }
    fetchMatch()
  }, [studentId])

  if (!studentId) return <div className="p-6">No studentId.</div>

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Mentor Match</h1>
      {mentor ? (
        <div className="border rounded-2xl p-6 bg-white shadow space-y-4">
          <div>
            <div className="text-xl font-semibold text-gray-800">{mentor.name}</div>
            <div className="text-gray-600">{mentor.domain} · {mentor.yearsExperience} years</div>
          </div>

          <form onSubmit={async (e)=>{
            e.preventDefault()
            const { data } = await api.post('/mentor/appointment', { studentId, mentorId: mentor.id, date, time, note })
            setConfirm(`✅ ${data.message} on ${date} at ${time}`)
          }} className="grid md:grid-cols-4 gap-3">
            <input type="date" required className="border p-3 rounded-lg" value={date} onChange={e=>setDate(e.target.value)} />
            <input type="time" required className="border p-3 rounded-lg" value={time} onChange={e=>setTime(e.target.value)} />
            <input className="border p-3 rounded-lg md:col-span-1" placeholder="Note (optional)" value={note} onChange={e=>setNote(e.target.value)} />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-lg transition">Book Appointment</button>
          </form>

          {confirm && <div className="rounded-lg bg-emerald-50 text-emerald-700 p-3">{confirm}</div>}
        </div>
      ) : (
        <div className="text-gray-600">Finding mentor...</div>
      )}
    </div>
  )
}


