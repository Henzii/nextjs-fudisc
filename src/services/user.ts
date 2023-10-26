import { COOKIES } from "@/types/enums"
import axios from "axios"
import { cookies } from "next/headers"
import config from '@/config.json'
import { User } from "@/types/user"
import { QueryReponse } from "@/types/query"

export const getUserInfo = async () => {
    const cookieStore = cookies()
    const token = cookieStore.get(COOKIES.ServerToken)?.value

    if (!token) throw new Error('Whoopsie, something went wrong')
    const response = await axios.post<QueryReponse<'getMe', User>>(config.fuDiscServerAddress, {
        query: `
            query GetMe {
                getMe {
                groupName
                name
                email
                }
            }`,
    }, {
        headers: {
            Authorization: `bearer ${token}`
        }
    })
    return response.data.data.getMe

}

export const getUserToken = async (user: string, password: string) => {
    try {
        const fuDiscResponse = await axios.post<QueryReponse<'login', string>>(config.fuDiscServerAddress, {
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

        return fuDiscResponse.data?.data?.login
    } catch {
        return null
    }
}
