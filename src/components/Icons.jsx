// Inline SVG icons — Heroicons outline, 24 px viewBox

const svg = (paths, size, className) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {paths}
  </svg>
)

/** Wrench + screwdriver — logo mark & maintenance */
export function WrenchScrewdriverIcon({ size = 24, className = '' }) {
  return svg(
    <path d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />,
    size,
    className,
  )
}

/** Paintbrush — paint & body */
export function PaintBrushIcon({ size = 24, className = '' }) {
  return svg(
    <path d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />,
    size,
    className,
  )
}

/** Sparkles — detailing */
export function SparklesIcon({ size = 24, className = '' }) {
  return svg(
    <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />,
    size,
    className,
  )
}

/** Check circle — form success */
export function CheckCircleIcon({ size = 24, className = '' }) {
  return svg(
    <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
    size,
    className,
  )
}

/** Car — automotive restoration logo */
export function TruckWrenchIcon({ size = 24, className = '' }) {
  return svg(
    <>
      {/* Car body */}
      <path d="M4 11h16v4H4z" strokeWidth="1.5" fill="none" />
      {/* Car roof */}
      <path d="M7 11L8 7h8l1 4" strokeWidth="1.5" fill="none" />
      {/* Front window */}
      <path d="M8 8v2.5" strokeWidth="1" opacity="0.5" />
      {/* Rear window */}
      <path d="M14 8v2.5" strokeWidth="1" opacity="0.5" />
      {/* Front bumper */}
      <line x1="3.5" y1="15" x2="4.5" y2="15" strokeWidth="1.5" />
      {/* Rear bumper */}
      <line x1="19.5" y1="15" x2="20.5" y2="15" strokeWidth="1.5" />
      {/* Front wheel */}
      <circle cx="6" cy="16" r="1.3" strokeWidth="1.5" />
      {/* Rear wheel */}
      <circle cx="18" cy="16" r="1.3" strokeWidth="1.5" />
      {/* Wheel hubs */}
      <circle cx="6" cy="16" r="0.4" fill="currentColor" />
      <circle cx="18" cy="16" r="0.4" fill="currentColor" />
    </>,
    size,
    className,
  )
}
