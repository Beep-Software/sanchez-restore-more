import { Link } from 'react-router-dom'
import { useSeoMeta } from '../../hooks/useSeoMeta'

export default function NotFoundPage() {
  useSeoMeta({
    title: 'Page Not Found',
    description: 'The page you requested could not be found.',
    path: '/404',
    noindex: true,
  })

  return (
    <main>
      <section className="page-hero">
        <span className="section-eyebrow">Error 404</span>
        <h1>Page Not Found</h1>
        <p>
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <Link className="btn btn-primary" to="/" style={{ display: 'inline-flex', marginTop: '24px' }}>
          Back to Home
        </Link>
      </section>
    </main>
  )
}
