import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { FC, ReactNode } from "react"
import jwt from 'jsonwebtoken'
import { COOKIES } from "@/types/enums"

type Props = {
    children: ReactNode
    withNoAuth?: ReactNode
}
const WithToken: FC<Props> = ({ children, withNoAuth }) => {
    const cookieStore = cookies()
    const loginToken = cookieStore.get(COOKIES.LoginToken)?.value

    try {
        jwt.verify(loginToken as string, process.env.TOKEN_KEY as string)
        return children
    } catch {
        if (withNoAuth) {
            return withNoAuth
        }
        return redirect('/login')
    }

}

export default WithToken