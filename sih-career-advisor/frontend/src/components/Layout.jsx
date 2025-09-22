import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

export default function Layout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <nav className="bg-white/90 backdrop-blur border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="font-semibold text-blue-700">BrightPath</Link>
            <button className="md:hidden p-2 border rounded hover:bg-gray-50" onClick={()=>setOpen(o=>!o)} aria-label="Toggle Menu">
              ☰
            </button>
            <div className="hidden md:flex gap-1">
              <NavItem to="/app/dashboard" label="Dashboard" />
              <NavItem to="/app/chat" label="Chatbot" />
              <NavItem to="/app/mentor" label="Mentor" />
              <NavItem to="/app/resume" label="Resume" />
              <NavItem to="/app/interview" label="Interview" />
            </div>
          </div>
        </div>
        {open && (
          <div className="md:hidden px-4 pb-3 flex flex-col gap-2">
            <NavItem to="/app/dashboard" label="Dashboard" onClick={()=>setOpen(false)} />
            <NavItem to="/app/chat" label="Chatbot" onClick={()=>setOpen(false)} />
            <NavItem to="/app/mentor" label="Mentor" onClick={()=>setOpen(false)} />
            <NavItem to="/app/resume" label="Resume" onClick={()=>setOpen(false)} />
            <NavItem to="/app/interview" label="Interview" onClick={()=>setOpen(false)} />
          </div>
        )}
      </nav>

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  )
}

function NavItem({ to, label, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `px-3 py-2 rounded-md hover:bg-gray-100 transition ${isActive ? 'text-blue-700 bg-blue-50' : 'text-gray-700'}`
      }
    >
      {label}
    </NavLink>
  )
}


