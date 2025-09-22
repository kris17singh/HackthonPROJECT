import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Onboarding from './pages/Onboarding.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Chatbot from './pages/Chatbot.jsx'
import Mentor from './pages/Mentor.jsx'
import ResumeBuilder from './pages/ResumeBuilder.jsx'
import MockInterview from './pages/MockInterview.jsx'
import Layout from './components/Layout.jsx'

const router = createBrowserRouter([
  { path: '/', element: <Onboarding /> },
  {
    path: '/app',
    element: <Layout />,
    children: [
      { path: '/app/dashboard', element: <Dashboard /> },
      { path: '/app/chat', element: <Chatbot /> },
      { path: '/app/mentor', element: <Mentor /> },
      { path: '/app/resume', element: <ResumeBuilder /> },
      { path: '/app/interview', element: <MockInterview /> },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)


