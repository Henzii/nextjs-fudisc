"use server"

import { getUserToken } from "@/services/user"
import { loginWithToken } from "./utils"


export const handleLogin = async (_prevState: any, formData: FormData) => {
    const user = formData.get('user')?.toString()
    const password = formData.get('password')?.toString()

    if (!user || !password) return

    const token = await getUserToken(user, password)

    if (!token) {
        return {
            error: true
        }
    }

    await loginWithToken(token)

}