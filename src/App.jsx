import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './components/pages/HomePage'
import ServicesPage from './components/pages/ServicesPage'
import PortfolioPage from './components/pages/PortfolioPage'
import EstimatePage from './components/pages/EstimatePage'
import './App.css'

const PAGES = { home: HomePage, services: ServicesPage, portfolio: PortfolioPage, estimate: EstimatePage }

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [displayPage, setDisplayPage] = useState('home')
  const [animState, setAnimState] = useState('idle') // 'idle' | 'out' | 'in'

  const navigate = (to) => {
    if (to === currentPage || animState !== 'idle') return
    setCurrentPage(to)
    setAnimState('out')
    setTimeout(() => {
      setDisplayPage(to)
      setAnimState('in')
      setTimeout(() => setAnimState('idle'), 400)
    }, 280)
  }

  const PageComponent = PAGES[displayPage] ?? HomePage

  return (
    <div className="app">
      <Header currentPage={currentPage} navigate={navigate} />
      <div
        className={[
          'page-body',
          animState === 'out' ? 'page-exit' : '',
          animState === 'in' ? 'page-enter' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <PageComponent navigate={navigate} />
        <Footer />
      </div>
    </div>
  )
}
