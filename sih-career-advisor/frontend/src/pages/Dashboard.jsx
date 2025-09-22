import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../lib/api'

export default function Dashboard() {
  const [data, setData] = useState(null)
  const studentId = localStorage.getItem('studentId')

  useEffect(() => {
    async function fetchData() {
      if (!studentId) return
      const { data } = await api.get(`/dashboard/${studentId}`)
      setData(data)
    }
    fetchData()
  }, [studentId])

  if (!studentId) {
    return <div className="p-6">No studentId. Go to <Link className="text-blue-600" to="/">Onboarding</Link>.</div>
  }

  return (
    <div className="p-6 space-y-6">
      <div className="rounded-2xl bg-white border p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-blue-100 grid place-items-center text-2xl">👤</div>
          <div>
            <div className="text-xl font-semibold text-gray-900">Welcome back</div>
            <div className="text-gray-700">{data?.welcome || 'Your personalized career dashboard'}</div>
          </div>
        </div>
        <div className="mt-4">
          <div className="text-sm text-gray-600">Career Readiness</div>
          <div className="w-full bg-gray-100 rounded-full h-2 mt-1">
            <div className="bg-blue-600 h-2 rounded-full" style={{width:'65%'}} />
          </div>
        </div>
        <div className="mt-4 flex gap-2 flex-wrap">
          <button className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-50">Edit Profile</button>
          <button className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-50">View Roadmap</button>
          <button className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-50">Career Roadmap</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Panel title="Courses Recommended" items={["Python DS","DBMS Basics"]} icons={["🐍","🗄️"]} />
        <Panel title="Colleges Recommended" items={["Stanford MS CS","IIT Bombay M.Tech"]} icons={["🎓","🏛️"]} />
        <Panel title="Internships Available" items={["Web Dev @XYZ","Data Intern"]} icons={["🖥️","🔎"]} />
        <Panel title="Jobs Available" items={["SDE Intern @Amazon","Analyst @TCS"]} icons={["💼","👤"]} />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Skills />
        <Roadmap />
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        <QuickButton to="/app/mentor" label="Ask a Senior" icon="💬" />
        <QuickButton to="/app/chat" label="Peer Forum" icon="⭐" />
        <QuickButton to="/app/interview" label="Success Stories" icon="🏆" />
      </div>
    </div>
  )
}

function Card({ title, to, icon, color }) {
  return (
    <Link to={to} className="group border rounded-2xl p-4 bg-white shadow hover:shadow-md transition text-center">
      <div className={`mx-auto mb-3 w-12 h-12 rounded-xl text-2xl grid place-items-center text-white bg-gradient-to-br ${color}`}>{icon}</div>
      <div className="font-medium text-gray-800 group-hover:text-blue-700">{title}</div>
    </Link>
  )
}

function Panel({ title, items, icons }) {
  return (
    <div className="border rounded-2xl p-5 bg-white shadow-sm">
      <div className="font-semibold text-gray-800 mb-3">{title}</div>
      <ul className="space-y-2">
        {items.map((t, i) => (
          <li key={i} className="flex items-center gap-3 text-gray-700">
            <span className="text-xl">{icons[i]}</span>
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Skills() {
  const skills = [
    { name: 'Python', pct: 80, color: 'bg-blue-600' },
    { name: 'SQL', pct: 50, color: 'bg-emerald-600' },
    { name: 'Communication', pct: 30, color: 'bg-amber-600' },
    { name: 'Leadership', pct: 60, color: 'bg-indigo-600' },
  ]
  return (
    <div className="border rounded-2xl p-5 bg-white shadow-sm">
      <div className="font-semibold text-gray-800 mb-3">Skills Progress</div>
      <div className="space-y-3">
        {skills.map(s => (
          <div key={s.name}>
            <div className="flex justify-between text-sm text-gray-700 mb-1"><span>{s.name}</span><span>{s.pct}%</span></div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className={`h-2 rounded-full ${s.color}`} style={{width:`${s.pct}%`}} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Roadmap() {
  const items = [
    { label: 'Internship', status: 'done' },
    { label: 'Certification Pending', status: 'warn' },
    { label: 'GRE Prep', status: 'todo' },
    { label: 'University Shortlist', status: 'todo' },
  ]
  const dot = (s) => s==='done' ? 'text-emerald-600' : s==='warn' ? 'text-red-500' : 'text-gray-400'
  return (
    <div className="border rounded-2xl p-5 bg-white shadow-sm">
      <div className="font-semibold text-gray-800 mb-3">Roadmap Tracker</div>
      <ul className="space-y-2">
        {items.map(i => (
          <li key={i.label} className="flex items-center gap-3 text-gray-700">
            <span className={`text-xl ${dot(i.status)}`}>•</span>
            <span>{i.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function QuickButton({ to, label, icon }) {
  return (
    <Link to={to} className="border rounded-xl p-3 bg-white shadow-sm hover:shadow transition flex items-center justify-center gap-2">
      <span>{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  )
}


