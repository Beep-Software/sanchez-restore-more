import { TruckWrenchIcon } from './Icons'

export default function Header({ currentPage, navigate }) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
  ]

  return (
    <header className="header">
      <div className="header-inner">
        <button className="logo-btn" onClick={() => navigate('home')}>
          <TruckWrenchIcon size={30} className="logo-icon" />
          <span className="logo-text">Sanchez Restore &amp; More</span>
        </button>

        <nav className="nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-link${currentPage === item.id ? ' active' : ''}`}
              onClick={() => navigate(item.id)}
              aria-current={currentPage === item.id ? 'page' : undefined}
            >
              {item.label}
            </button>
          ))}
          <button
            className={`nav-link nav-cta${currentPage === 'estimate' ? ' active' : ''}`}
            onClick={() => navigate('estimate')}
            aria-current={currentPage === 'estimate' ? 'page' : undefined}
          >
            Get an Estimate
          </button>
        </nav>
      </div>
    </header>
  )
}
