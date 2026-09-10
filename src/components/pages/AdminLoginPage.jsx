import { useState } from 'react'
import { ErrorCircleIcon } from '../Icons'
import { AuthService } from '../../services/auth'

export default function AdminLoginPage({ navigate }) {
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isSubmitting) return

    setError(false)
    setIsSubmitting(true)

    const authService = new AuthService()
    try {
      await authService.login(form)
      navigate('admin')
    } catch {
      setError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main>
      <section className="page-hero">
        <span className="section-eyebrow">Staff Access</span>
        <h1>Admin Login</h1>
        <p>Sign in to manage the portfolio showcase.</p>
      </section>

      <div className="estimate-layout">
        <div className="admin-login-layout">
          <div className="estimate-form-card">
            <h2>Sign In</h2>
            <p>Enter your admin credentials to continue.</p>

            {error && (
              <div className="admin-login-error" role="alert">
                <ErrorCircleIcon size={20} />
                <span>Invalid credentials, or the server is unavailable. Please try again.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate aria-busy={isSubmitting}>
              <fieldset className="form-fieldset" disabled={isSubmitting}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="admin"
                    value={form.username}
                    onChange={handleChange}
                    required
                    autoComplete="username"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
                  />
                </div>

                <button type="submit" className="btn btn-primary form-submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Signing In…' : 'Sign In'}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
