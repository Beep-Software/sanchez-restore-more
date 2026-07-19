import { useState } from 'react'
import { CheckCircleIcon } from '../Icons'

const ESTIMATE_EMAIL = 'sanchezrestoremore@gmail.com'

const INITIAL_FORM = {
  name: '',
  email: '',
  phone: '',
  year: '',
  make: '',
  model: '',
  service: '',
  message: '',
}

export default function EstimatePage() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const subject = encodeURIComponent(
      `Estimate Request — ${form.name}${form.year || form.make ? ` (${[form.year, form.make, form.model].filter(Boolean).join(' ')})` : ''}`
    )

    const lines = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone ? `Phone: ${form.phone}` : null,
      '',
      `Vehicle: ${[form.year, form.make, form.model].filter(Boolean).join(' ') || 'Not specified'}`,
      form.service ? `Service needed: ${form.service}` : null,
      '',
      form.message ? `Additional details:\n${form.message}` : null,
    ]
      .filter((l) => l !== null)
      .join('\n')

    window.location.href = `mailto:${ESTIMATE_EMAIL}?subject=${subject}&body=${encodeURIComponent(lines)}`
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <main>
        <section className="page-hero">
          <span className="section-eyebrow">Estimate request</span>
          <h1>Request an Estimate</h1>
          <p>Tell us about your vehicle and we'll get back to you promptly.</p>
        </section>
        <div className="estimate-layout">
          <div className="estimate-layout-inner">
            <div className="estimate-form-card">
              <div className="form-success">
                <CheckCircleIcon size={52} className="success-icon" />
                <h3>Your email client opened!</h3>
                <p>
                  Review your email and hit send — we typically respond within
                  one business day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main>
      <section className="page-hero">
        <span className="section-eyebrow">Estimate request</span>
        <h1>Request an Estimate</h1>
        <p>Tell us about your vehicle and we'll get back to you promptly.</p>
      </section>

      <div className="estimate-layout">
        <div className="estimate-layout-inner">
          {/* Form */}
          <div className="estimate-form-card">
            <h2>Your Information</h2>
            <p>Fill in the details below and we'll prepare a personalised estimate for you.</p>

            <form onSubmit={handleSubmit} noValidate>
              {/* Contact */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(555) 000-0000"
                    value={form.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jane@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="form-divider" />

              {/* Vehicle */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="year">Vehicle Year</label>
                  <input
                    id="year"
                    name="year"
                    type="text"
                    placeholder="2019"
                    value={form.year}
                    onChange={handleChange}
                    maxLength={4}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="make">Make</label>
                  <input
                    id="make"
                    name="make"
                    type="text"
                    placeholder="Toyota"
                    value={form.make}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="model">Model</label>
                <input
                  id="model"
                  name="model"
                  type="text"
                  placeholder="Camry"
                  value={form.model}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="service">Service Needed</label>
                <select
                  id="service"
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                >
                  <option value="">Select a service…</option>
                  <option value="Paint &amp; Body Restoration">Paint &amp; Body Restoration</option>
                  <option value="Detailing">Detailing</option>
                  <option value="Routine Maintenance">Routine Maintenance</option>
                  <option value="Collision Repair">Collision Repair</option>
                  <option value="Other / Not Sure">Other / Not Sure</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Additional Details</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Describe the damage, service requested, or any other details that might be helpful…"
                  value={form.message}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-primary form-submit">
                Send Estimate Request
              </button>

              <p className="form-note">
                This will open your default email app with your details pre-filled.
              </p>
            </form>
          </div>

          {/* Sidebar */}
          <aside className="estimate-sidebar">
            <div className="sidebar-card">
              <h3>Contact Us Directly</h3>
              <a href="tel:+18122670274">(812) 267-0274</a>
              <a href={`mailto:${ESTIMATE_EMAIL}`}>{ESTIMATE_EMAIL}</a>
            </div>

            <div className="sidebar-card">
              <h3>Hours of Operation</h3>
              <ul className="hours-list">
                <li>
                  <span className="day">Mon – Fri</span>
                  <span>8:00 AM – 6:00 PM</span>
                </li>
                <li>
                  <span className="day">Saturday</span>
                  <span>9:00 AM – 2:00 PM</span>
                </li>
                <li>
                  <span className="day">Sunday</span>
                  <span>By appointment</span>
                </li>
              </ul>
            </div>

            <div className="sidebar-card">
              <h3>What to Expect</h3>
              <p>
                We typically respond within one business day. For urgent repairs,
                give us a call directly.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
