'use server'
import axios from 'axios'
import config from '@/config/config'
import { QueryReponse } from '@/types/query'

export const restoreAccount = async (_: unknown, formData: FormData): Promise<{ error?: boolean; success?: boolean }> => {
    const email = formData.get('email') as string
    if (!email) return { error: true }

    const response = await axios.post<QueryReponse<'restoreAccount', boolean>>(config('fuDiscServerUri'), {
        query: `
            mutation RestoreAccount($email: String!) {
                restoreAccount(email: $email)
            }
        `,
        variables: { email }
    })

    const errors = response.data?.errors
    if (errors?.length) return { error: true }

    return { success: true }
}
