import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import conf from './config/config'
import { TokenPayload } from './types/user'
import { COOKIES } from './types/enums'
import { SignJWT } from 'jose'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const token = request.nextUrl.searchParams.get('token')
    if (token) {
        try {
            const uri = conf('fuDiscServerUri')
            const res = await fetch(uri, {
                method: 'POST',
                body: JSON.stringify({
                    query: `query GetMe {
                    getMe {
                    accountType
                    groupName
                    name
                    id
                    }
                }`}),
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `bearer ${token}`
                }
            })
            const userInfo = (await res.json()).data?.getMe

            if (!userInfo) return NextResponse.next()

            const payload: TokenPayload = {
                name: userInfo.name,
                id: userInfo.id,
                accountType: userInfo.accountType,
                groupName: userInfo.groupName
            }

            const loginToken = await new SignJWT(payload)
                .setProtectedHeader({ alg: "HS256" })
                .sign(new TextEncoder().encode(process.env.TOKEN_KEY))

            const response = NextResponse.redirect(new URL('/', request.url))
            response.cookies.set(COOKIES.ServerToken, token)
            response.cookies.set(COOKIES.LoginToken, loginToken)

            return response;
        } catch (e) {
            return NextResponse.next()
        }
    }
    return NextResponse.next()
}

export const config = {
    matcher: '/login/:path*',
}