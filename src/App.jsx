import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import ICView from './views/ICView.jsx'
import ManagerView from './views/ManagerView.jsx'

function Nav() {
  const base = {
    padding: '9px 22px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'all 0.15s ease',
    fontFamily: "'Inter', sans-serif",
    letterSpacing: '0.01em',
  }
  const active = {
    ...base,
    background: '#2563eb',
    color: '#fff',
  }
  const inactive = {
    ...base,
    background: 'transparent',
    color: '#6b7280',
  }

  return (
    <header style={{
      borderBottom: '1px solid #111827',
      padding: '0 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '60px',
      background: '#080c14',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '28px', height: '28px', borderRadius: '7px',
          background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '14px',
        }}>⚡</div>
        <span style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: '800',
          fontSize: '17px',
          color: '#f9fafb',
          letterSpacing: '-0.01em',
        }}>DevPulse</span>
      </div>

      <nav style={{ display: 'flex', gap: '4px', background: '#0f1623', padding: '4px', borderRadius: '10px', border: '1px solid #1f2937' }}>
        <NavLink to="/" end style={({ isActive }) => isActive ? active : inactive}>
          Developer View
        </NavLink>
        <NavLink to="/manager" style={({ isActive }) => isActive ? active : inactive}>
          Manager View
        </NavLink>
      </nav>

      <div style={{ fontSize: '11px', color: '#374151', fontFamily: 'monospace' }}>
        MVP v1.0
      </div>
    </header>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <main style={{ paddingTop: '40px' }}>
        <Routes>
          <Route path="/" element={<ICView />} />
          <Route path="/manager" element={<ManagerView />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
