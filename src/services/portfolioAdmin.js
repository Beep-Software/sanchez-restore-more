import axios from "axios"
import { AuthService } from "./auth"

// TODO: backend not implemented yet — routes will persist images to a mounted
// file system and title/description/category to SQL Server
export class PortfolioAdminService {
    constructor() {
        this.instance = axios.create({
            baseURL: "/api/portfolio",
        })
        this.auth = new AuthService()
    }

    _authHeaders() {
        const token = this.auth.getToken()
        return token ? { Authorization: `Bearer ${token}` } : {}
    }

    async list() {
        try {
            const response = await this.instance.get("/", {
                headers: this._authHeaders(),
            })
            return response.data
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    /**
     * @param {{ title: string, category: string, description: string, images: File[] }} project
     */
    async create({ title, category, description, images }) {
        const formData = new FormData()
        formData.append("title", title)
        formData.append("category", category)
        formData.append("description", description)
        images.forEach((file) => formData.append("images", file))

        try {
            const response = await this.instance.post("/", formData, {
                headers: { ...this._authHeaders(), "Content-Type": "multipart/form-data" },
            })
            return response.data
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    /**
     * @param {string|number} id
     * @param {{ title: string, category: string, description: string, images: File[], removedImageIds?: string[] }} project
     */
    async update(id, { title, category, description, images, removedImageIds = [] }) {
        const formData = new FormData()
        formData.append("title", title)
        formData.append("category", category)
        formData.append("description", description)
        images.forEach((file) => formData.append("images", file))
        removedImageIds.forEach((imageId) => formData.append("removedImageIds", imageId))

        try {
            const response = await this.instance.put(`/${id}`, formData, {
                headers: { ...this._authHeaders(), "Content-Type": "multipart/form-data" },
            })
            return response.data
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async remove(id) {
        try {
            const response = await this.instance.delete(`/${id}`, {
                headers: this._authHeaders(),
            })
            return response.data
        } catch (error) {
            console.error(error)
            throw error
        }
    }
}
