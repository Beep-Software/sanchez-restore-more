import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logoIcon from '../assets/logo-icon.png'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  const navItems = [
    { id: '/', label: 'Home' },
    { id: '/services', label: 'Services' },
    { id: '/portfolio', label: 'Portfolio' },
  ]

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="header">
      <div className="header-inner">
        <Link className="logo-btn" to="/" onClick={closeMenu}>
          <img src={logoIcon} alt="" width={36} height={36} className="logo-icon" />
          <span className="logo-text">Sanchez Restore &amp; More</span>
        </Link>

        <nav className="nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.id}
              className={`nav-link${pathname === item.id ? ' active' : ''}`}
              to={item.id}
              onClick={closeMenu}
              aria-current={pathname === item.id ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Link
            className={`nav-link nav-cta${pathname === '/estimate' ? ' active' : ''}`}
            to="/estimate"
            onClick={closeMenu}
            aria-current={pathname === '/estimate' ? 'page' : undefined}
          >
            Get an Estimate
          </Link>
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
            <Link
              key={item.id}
              className={`mobile-link${pathname === item.id ? ' active' : ''}`}
              to={item.id}
              onClick={closeMenu}
              aria-current={pathname === item.id ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Link
            className={`mobile-link mobile-cta${pathname === '/estimate' ? ' active' : ''}`}
            to="/estimate"
            onClick={closeMenu}
            aria-current={pathname === '/estimate' ? 'page' : undefined}
          >
            Get an Estimate
          </Link>
        </nav>
      )}
    </header>
  )
}
