import { useState } from 'react'
import api from '../lib/api'

export default function Chatbot() {
  const [message, setMessage] = useState('')
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const studentId = localStorage.getItem('studentId')
  const quick = ['Roadmap for higher studies','Suggest internships','Help with resume points','DSA resources']

  const send = async (e) => {
    e.preventDefault()
    if (!message) return
    setLoading(true)
    try {
      const { data } = await api.post('/chat/message', { studentId, message })
      setHistory(h => [...h, { user: message, bot: data.reply }])
      setMessage('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Chatbot</h1>
      <div className="border rounded-2xl p-4 bg-white h-[50vh] md:h-[60vh] overflow-auto space-y-3">
        {history.map((m, i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-end">
              <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-blue-600 text-white px-4 py-2 shadow">{m.user}</div>
            </div>
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-gray-100 text-gray-900 px-4 py-2 shadow">{m.bot}</div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-sm bg-gray-100 text-gray-900 px-4 py-2 shadow inline-flex items-center gap-2">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {quick.map((q) => (
          <button key={q} onClick={()=>setMessage(q)} className="text-sm border rounded-full px-3 py-1 bg-white hover:bg-gray-50">{q}</button>
        ))}
      </div>
      <form onSubmit={send} className="flex gap-2">
        <input className="flex-1 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" value={message} onChange={e=>setMessage(e.target.value)} placeholder="Type a message" />
        <button disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-lg transition">Send</button>
      </form>
    </div>
  )
}


