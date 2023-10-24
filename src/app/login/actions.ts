"use server"

import { getUserToken } from "@/services/user"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { COOKIES } from "@/types/enums"
import jwt from 'jsonwebtoken'

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

    const loginToken = jwt.sign({ user }, process.env.TOKEN_KEY ?? '')

    const cookieJar = cookies()

    cookieJar.set(COOKIES.ServerToken, token)
    cookieJar.set(COOKIES.LoginToken, loginToken)

    redirect('/dashboard')
}