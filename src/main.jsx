import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Journal from './pages/Journal.jsx'
import Resources from './pages/Resources.jsx'
import Profile from './pages/Profile.jsx'
import Toolkit from './pages/Toolkit.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/toolkit" element={<Toolkit />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </StrictMode>,
)
