import { useState } from 'react'
import { TruckWrenchIcon } from './Icons'

export default function Header({ currentPage, navigate }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
  ]

  const handleNavigate = (id) => {
    setMenuOpen(false)
    navigate(id)
  }

  return (
    <header className="header">
      <div className="header-inner">
        <button className="logo-btn" onClick={() => handleNavigate('home')}>
          <TruckWrenchIcon size={30} className="logo-icon" />
          <span className="logo-text">Sanchez Restore &amp; More</span>
        </button>

        <nav className="nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-link${currentPage === item.id ? ' active' : ''}`}
              onClick={() => handleNavigate(item.id)}
              aria-current={currentPage === item.id ? 'page' : undefined}
            >
              {item.label}
            </button>
          ))}
          <button
            className={`nav-link nav-cta${currentPage === 'estimate' ? ' active' : ''}`}
            onClick={() => handleNavigate('estimate')}
            aria-current={currentPage === 'estimate' ? 'page' : undefined}
          >
            Get an Estimate
          </button>
        </nav>

        <button
          className={`menu-toggle${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>

      {menuOpen && (
        <nav className="mobile-menu" id="mobile-menu" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`mobile-link${currentPage === item.id ? ' active' : ''}`}
              onClick={() => handleNavigate(item.id)}
              aria-current={currentPage === item.id ? 'page' : undefined}
            >
              {item.label}
            </button>
          ))}
          <button
            className={`mobile-link mobile-cta${currentPage === 'estimate' ? ' active' : ''}`}
            onClick={() => handleNavigate('estimate')}
            aria-current={currentPage === 'estimate' ? 'page' : undefined}
          >
            Get an Estimate
          </button>
        </nav>
      )}
    </header>
  )
}
