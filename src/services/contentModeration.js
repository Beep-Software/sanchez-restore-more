// Profanity / inappropriate-content check run before any outbound email.
// Word list is maintained by the `bad-words` package, not stored in this repo.
import { Filter } from 'bad-words'

const filter = new Filter()

// Basic HTML/script tag check so free-text fields can't be used to inject markup.
const MARKUP_PATTERN = /<\s*\/?\s*[a-z][\s\S]*>/i

export function findInappropriateContent(text) {
    if (!text) return null
    if (filter.isProfane(text)) return 'profanity'
    if (MARKUP_PATTERN.test(text)) return 'markup/script content'
    return null
}

export function checkEmailContent({ subject = '', body = '' }) {
    const match = findInappropriateContent(subject) ?? findInappropriateContent(body)
    return match ? { flagged: true, term: match } : { flagged: false, term: null }
}
