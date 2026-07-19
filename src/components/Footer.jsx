import { TruckWrenchIcon } from './Icons'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <h3 className="footer-brand-name"><TruckWrenchIcon size={18} className="footer-brand-icon" /> Sanchez Restore &amp; More</h3>
          <p>
            Locally owned automotive care. Paint, body, detailing, and
            maintenance — done with pride.
          </p>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <a href="tel:+18122670274">(812) 267-0274</a>
          <a href="mailto:sanchezrestoremore@gmail.com">
            sanchezrestoremore@gmail.com
          </a>
          <p>11481 Losson Rd, Pekin, IN 47165</p>
        </div>

        <div className="footer-col">
          <h4>Hours</h4>
          <p>Mon – Fri &nbsp; 8:00 AM – 6:00 PM</p>
          <p>Saturday &nbsp; 9:00 AM – 2:00 PM</p>
          <p>Sunday &nbsp; By appointment</p>
        </div>
      </div>

      <p className="footer-bottom">
        © {year} Sanchez Restore &amp; More. All rights reserved.
      </p>
    </footer>
  )
}
