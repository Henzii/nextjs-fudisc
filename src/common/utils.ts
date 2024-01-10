import { COOKIES } from "@/types/enums"
import { cookies } from "next/headers"
import jwt from 'jsonwebtoken'
import { AccountType, User } from "@/types/user"


export const isAdmin = () => {
    const cookieStore = cookies()
    const token = cookieStore.get(COOKIES.LoginToken)?.value

    if (!token) return false;

    try {
        const payload = jwt.verify(token, process.env.TOKEN_KEY as string) as User
        return [AccountType.ADMIN, AccountType.GOD].includes(payload.accountType)
    } catch {
        return false;
    }

}