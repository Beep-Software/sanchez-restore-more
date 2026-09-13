import axios from "axios"
import { AuthService } from "./auth"

const API_ORIGIN = 'https://api.beepsoftware.com' //import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000"
const API_PATH = `${API_ORIGIN}/api/sanchezRestore`

export function normalizeImage(image) {
    const imageUrl = image.url ?? `/api/sanchezRestore/images/${image.id ?? image.image_id}`
    return { ...image, id: String(image.id ?? image.image_id), url: new URL(imageUrl, API_ORIGIN).toString() }
}

export function normalizeProject(project) {
    const images = (project.images ?? []).map(normalizeImage)
    return { ...project, id: String(project.id ?? project.project_id), title: project.title ?? "", category: project.category ?? "Detailing", description: project.description ?? "", images, image: images[0]?.url ?? "" }
}

export class PortfolioAdminService {
    constructor() {
        this.instance = axios.create({
            baseURL: API_PATH,
        })
        this.auth = new AuthService()
    }

    _authHeaders() {
        const token = this.auth.getToken()
        return token ? { Authorization: `Bearer ${token}` } : {}
    }

    async list() {
        try {
            const response = await this.instance.get("/projects", {
                headers: this._authHeaders(),
            })
            return (response.data.projects ?? []).map(normalizeProject)
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async listPublic() {
        const response = await this.instance.get("/projects")
        return (response.data.projects ?? []).map(normalizeProject)
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
            const response = await this.instance.post("/projects", formData, {
                headers: this._authHeaders(),
            })
            return normalizeProject(response.data.project)
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
            const response = await this.instance.put(`/projects/${id}`, formData, {
                headers: this._authHeaders(),
            })
            return normalizeProject(response.data.project)
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async remove(id) {
        try {
            const response = await this.instance.delete(`/projects/${id}`, {
                headers: this._authHeaders(),
            })
            return response.data
        } catch (error) {
            console.error(error)
            throw error
        }
    }
}
