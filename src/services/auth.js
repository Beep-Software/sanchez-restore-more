import axios from "axios"

const TOKEN_KEY = "admin_auth_token"

// TODO: backend not implemented yet — points at the future auth API
export class AuthService {
    constructor() {
        this.instance = axios.create({
            baseURL: "https://auth.beepsoftware.com/auth",
        })
    }

    async login({ username, password }) {
        try {
            const response = await this.instance.post("/token", { username, password })
            const token = response.data?.token
            if (token) localStorage.setItem(TOKEN_KEY, token)
            return response.data
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    logout() {
        localStorage.removeItem(TOKEN_KEY)
    }

    getToken() {
        return localStorage.getItem(TOKEN_KEY)
    }

    isAuthenticated() {
        return Boolean(this.getToken())
    }
}
