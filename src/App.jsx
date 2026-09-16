import { Suspense, lazy, useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './components/pages/HomePage'
import NotificationManager from './components/NotificationManager'
import './App.css'

// Code-split everything but the homepage so the first visit only downloads what it
// needs to render — admin/estimate/portfolio pages load on demand.
const ServicesPage = lazy(() => import('./components/pages/ServicesPage'))
const PortfolioPage = lazy(() => import('./components/pages/PortfolioPage'))
const EstimatePage = lazy(() => import('./components/pages/EstimatePage'))
const AdminLoginPage = lazy(() => import('./components/pages/AdminLoginPage'))
const AdminPage = lazy(() => import('./components/pages/AdminPage'))
const NotFoundPage = lazy(() => import('./components/pages/NotFoundPage'))

export default function App() {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [animState, setAnimState] = useState('idle') // 'idle' | 'out' | 'in'

  // Adjust state during render (not in an effect) when the route changes — this is the
  // pattern React recommends for deriving state from a prop/value change.
  if (location.pathname !== displayLocation.pathname && animState === 'idle') {
    setAnimState('out')
  }

  useEffect(() => {
    if (animState !== 'out') return undefined
    const outTimer = setTimeout(() => {
      setDisplayLocation(location)
      window.scrollTo(0, 0)
      setAnimState('in')
    }, 280)
    return () => clearTimeout(outTimer)
  }, [animState, location])

  useEffect(() => {
    if (animState !== 'in') return undefined
    const inTimer = setTimeout(() => setAnimState('idle'), 400)
    return () => clearTimeout(inTimer)
  }, [animState])

  return (
    <div className="app">
      <NotificationManager />
      <Header />
      <div
        className={[
          'page-body',
          animState === 'out' ? 'page-exit' : '',
          animState === 'in' ? 'page-enter' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <Suspense fallback={null}>
          <Routes location={displayLocation}>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/estimate" element={<EstimatePage />} />
            <Route path="/admin-login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </div>
  )
}
