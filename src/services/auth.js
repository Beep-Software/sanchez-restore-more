import axios from "axios"

const ACCESS_TOKEN_KEY = "admin_auth_token"
const REFRESH_TOKEN_KEY = "admin_refresh_token"
const EXPIRES_AT_KEY = "admin_auth_expires_at"

// Refresh a little before the access token actually expires (backend tokens are
// short-lived — 5 minutes) so in-flight requests don't race an expiring token.
const REFRESH_SKEW_MS = 15_000

export class AuthService {
    constructor() {
        this.instance = axios.create({
            baseURL: "https://auth.beepsoftware.com/auth",
        })
        this.refreshPromise = null
    }

    _storeSession({ access_token, refresh_token, expires_in }) {
        localStorage.setItem(ACCESS_TOKEN_KEY, access_token)
        if (refresh_token) localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token)
        localStorage.setItem(EXPIRES_AT_KEY, String(Date.now() + expires_in * 1000))
    }

    async login({ username, password }) {
        try {
            const response = await this.instance.post("/token", { username, password })
            this._storeSession(response.data)
            return response.data
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    logout() {
        localStorage.removeItem(ACCESS_TOKEN_KEY)
        localStorage.removeItem(REFRESH_TOKEN_KEY)
        localStorage.removeItem(EXPIRES_AT_KEY)
    }

    getToken() {
        return localStorage.getItem(ACCESS_TOKEN_KEY)
    }

    getRefreshToken() {
        return localStorage.getItem(REFRESH_TOKEN_KEY)
    }

    _hasValidAccessToken() {
        const expiresAt = Number(localStorage.getItem(EXPIRES_AT_KEY) ?? 0)
        return Boolean(this.getToken()) && Date.now() < expiresAt - REFRESH_SKEW_MS
    }

    // Cheap, synchronous check for things like route guards / render decisions — true if
    // there's a live access token, or a refresh token that could restore one.
    isAuthenticated() {
        return this._hasValidAccessToken() || Boolean(this.getRefreshToken())
    }

    /**
     * Returns a currently-valid access token, silently refreshing it via the refresh
     * token if the stored one is missing/expired. Resolves to null if the session
     * can't be restored (no refresh token, or it's been revoked/expired too).
     */
    async ensureValidToken() {
        if (this._hasValidAccessToken()) return this.getToken()

        const refreshToken = this.getRefreshToken()
        if (!refreshToken) return null

        // Share one in-flight refresh across concurrent callers instead of firing many.
        if (!this.refreshPromise) {
            this.refreshPromise = this.instance
                .post("/refresh", { refreshToken })
                .then((response) => {
                    this._storeSession(response.data)
                    return this.getToken()
                })
                .catch(() => {
                    this.logout()
                    return null
                })
                .finally(() => {
                    this.refreshPromise = null
                })
        }
        return this.refreshPromise
    }
}
