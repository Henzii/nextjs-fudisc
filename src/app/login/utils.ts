"use server"

import { getUserInfo } from "@/services/user"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { COOKIES } from "@/types/enums"
import jwt from 'jsonwebtoken'
import { TokenPayload } from "@/types/user"

export const loginWithToken = async (token: string) => {
    const userInfo = await getUserInfo(token);
    if (!userInfo) return

    const payload: TokenPayload = {
        name: userInfo.name,
        id: userInfo.id,
        accountType: userInfo.accountType,
        groupName: userInfo.groupName
    }

    const loginToken = jwt.sign(payload, process.env.TOKEN_KEY ?? '')

    const cookieJar = cookies()

    cookieJar.set(COOKIES.ServerToken, token)
    cookieJar.set(COOKIES.LoginToken, loginToken)

    redirect('/dashboard')
}