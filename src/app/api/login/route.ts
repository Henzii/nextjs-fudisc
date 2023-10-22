import axios from "axios"
import { NextRequest, NextResponse } from "next/server"
import jwt from 'jsonwebtoken'
import config from '@/config.json'
import { revalidatePath } from "next/cache"
import { COOKIES } from "@/types/enums"

const errorResponse = NextResponse.json({ message: 'Wrong username or password' }, { status: 401 })

export const POST = async (request: NextRequest) => {
  const { user, password } = await request.json()

  try {
    const fuDiscResponse = await axios.post(config.fuDiscServerAddress, {
      query: `
      mutation Mutation($user: String!, $password: String!) {
          login(user: $user, password: $password)
      }
    `,
      variables: {
        user,
        password
      }
    })

    const token = fuDiscResponse.data?.data?.login
    if (!token) return errorResponse;

    const loginToken = jwt.sign({ user }, process.env.TOKEN_KEY ?? '')

    const response = new NextResponse()
    response.cookies.set(COOKIES.ServerToken, token)
    response.cookies.set(COOKIES.LoginToken, loginToken)

    return response

  } catch (e) {
    console.log(e)
    return errorResponse
  }
}
