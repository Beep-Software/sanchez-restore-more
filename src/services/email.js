import axios from "axios"

//class
export class EmailService {
    constructor() {
        this.instance = axios.create({
            baseURL: 'https://api.beepsoftware.com/api/email' // Needs to use /api - Not sure why yet
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