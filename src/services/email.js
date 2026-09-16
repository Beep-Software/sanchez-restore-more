import axios from "axios"
import { checkEmailContent } from "./contentModeration"
import { notificationService } from "./notifications"

//class
export class EmailService {
    constructor() {
        this.instance = axios.create({
            baseURL: 'https://api.beepsoftware.com/api/email' // Needs to use /api - Not sure why yet
        })
    }

    async createEmail({ to, subject, body }) {
        const { flagged } = checkEmailContent({ subject, body })
        if (flagged) {
            notificationService.error('Your message was not sent because it appears to contain inappropriate content. Please revise and try again.')
            throw new Error('Email content flagged as inappropriate')
        }

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