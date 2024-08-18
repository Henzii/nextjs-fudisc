import config from "@/config/config";
import { ActionState } from "@/types/actions";
import { QueryReponse } from "@/types/query";
import axios from "axios";

export const sendFeedback = async (_prevState: unknown, formData: FormData): Promise<ActionState> => {
    "use server";
    const honeyPot = formData.get('hunajapurkki')?.toString()

    const text = formData.get('message')?.toString()
    const subject = formData.get('subject')?.toString()
    const email = formData.get('email')?.toString()

    if (!text || !subject || !email) {
        return { error: true, message: 'Fill all fields first' }
    }

    if (honeyPot) {
        return {
            error: true,
            message: ':('
        }
    }
    try {
        const response = await axios.post<QueryReponse<'sendFeedback', boolean>>(config('fuDiscServerUri'), {
            query: `
                mutation SendFeedback($subject: String!, $text: String!, $email: String) {
                sendFeedback(subject: $subject, text: $text, email: $email)
                }
            `, variables: { email, subject, text }
        })

        if (!response?.data?.data?.sendFeedback) {
            throw Error()
        }

        return { success: true }
    } catch (e) {
        return { error: true }
    }
}