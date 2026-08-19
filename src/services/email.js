import axios from "axios"

//class
export class EmailService {
    constructor() {
        this.instance = axios.create({
            baseURL: 'http://localhost:3000/api/email'
        })
    }

    async createEmail({ to, subject, body }) {
        try {
            const response = await this.instance.post('/create', {
                to,
                subject,
                body
            })

            return response.data
        } catch (error) {
            console.error(error)
            throw error
        }
    }
}