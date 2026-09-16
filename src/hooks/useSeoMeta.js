import { useEffect } from 'react'

const SITE_URL = 'https://sanchezdetail.com'
const SITE_NAME = 'Sanchez Restore & More'

function setMetaByName(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setMetaByProperty(property, content) {
  let el = document.querySelector(`meta[property="${property}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href) {
  let el = document.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Keeps the document title, description, canonical URL and social tags in sync with the
 * active route. This mainly benefits JS-rendering crawlers (Googlebot, LinkedIn, Slack)
 * and the browser tab/history UI — link-preview bots that don't execute JS (Facebook,
 * Twitter/X, iMessage) only ever see the tags baked into index.html at request time, so
 * the defaults there should stay accurate for the homepage.
 *
 * @param {{ title: string, description: string, path?: string, noindex?: boolean }} options
 */
export function useSeoMeta({ title, description, path = '/', noindex = false }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
    const url = `${SITE_URL}${path === '/' ? '' : path}`

    document.title = fullTitle
    if (description) setMetaByName('description', description)
    setMetaByName('robots', noindex ? 'noindex, follow' : 'index, follow')
    setCanonical(url)

    setMetaByProperty('og:title', fullTitle)
    setMetaByProperty('og:url', url)
    if (description) setMetaByProperty('og:description', description)

    setMetaByName('twitter:title', fullTitle)
    setMetaByName('twitter:url', url)
    if (description) setMetaByName('twitter:description', description)
  }, [title, description, path, noindex])
}
