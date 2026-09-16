import axios from "axios"
import { AuthService } from "./auth"

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? 'https://api.beepsoftware.com/api').replace(/\/$/, '')
const API_ORIGIN = API_BASE_URL.replace(/\/api$/, '')
const API_PATH = `${API_BASE_URL}/sanchezRestore`

export function normalizeImage(image) {
    const imageUrl = image.url ?? `/api/sanchezRestore/images/${image.id ?? image.image_id}`
    return { ...image, id: String(image.id ?? image.image_id), url: new URL(imageUrl, API_ORIGIN).toString() }
}

export function normalizeProject(project) {
    const images = (project.images ?? []).map(normalizeImage)
    return { ...project, id: String(project.id ?? project.project_id), title: project.title ?? "", category: project.category ?? "Detailing", description: project.description ?? "", images, image: images[0]?.url ?? "" }
}

async function encodeFile(file) {
    const buffer = await file.arrayBuffer()
    let binary = ''
    new Uint8Array(buffer).forEach((byte) => { binary += String.fromCharCode(byte) })
    return {
        fileName: file.name,
        mimeType: file.type,
        content: btoa(binary),
    }
}

export class PortfolioAdminService {
    constructor() {
        this.instance = axios.create({
            baseURL: API_PATH,
            timeout: 75000,
        })
        this.auth = new AuthService()
    }

    async _authHeaders() {
        const token = await this.auth.ensureValidToken()
        return token ? { Authorization: `Bearer ${token}` } : {}
    }

    async list() {
        try {
            const response = await this.instance.get("/projects", {
                headers: await this._authHeaders(),
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
        const encodedImages = await Promise.all(images.map(encodeFile))

        try {
            const response = await this.instance.post("/projects", { title, category, description, images: encodedImages }, {
                headers: await this._authHeaders(),
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
        const encodedImages = await Promise.all(images.map(encodeFile))

        try {
            const response = await this.instance.put(`/projects/${id}`, { title, category, description, images: encodedImages, removedImageIds }, {
                headers: await this._authHeaders(),
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
                headers: await this._authHeaders(),
            })
            return response.data
        } catch (error) {
            console.error(error)
            throw error
        }
    }
}
