/* eslint-disable no-unused-vars */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Signup from './pages/signup.jsx'
import Login from './pages/login.jsx'
import SummaryPage from './pages/summary.jsx'
import LectureList from './pages/lectures.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LectureList />
  </StrictMode>,
)
