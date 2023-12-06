import { COOKIES } from "@/types/enums"
import axios from "axios"
import { cookies } from "next/headers"
import { User } from "@/types/user"
import { QueryReponse } from "@/types/query"
import config from "@/config/config"
import { postWithToken } from "./util"

export const getUserInfo = async () => {
    const cookieStore = cookies()
    const token = cookieStore.get(COOKIES.ServerToken)?.value

    if (!token) throw new Error('Whoopsie, something went wrong')
    const response = await axios.post<QueryReponse<'getMe', User>>(config('fuDiscServerUri'), {
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
        const fuDiscResponse = await axios.post<QueryReponse<'login', string>>(config('fuDiscServerUri'), {
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

export const changeUsername = async (newUsername: string) => {
    try {
        const fuDiscResponse = await postWithToken<'changeUsername', Pick<User, 'name'>>(`
        mutation ChangeUsername($newUsername: String!) {
            changeUsername(newUsername: $newUsername) {
                name
            }
        }`, { newUsername })
        return fuDiscResponse?.data.changeUsername
    } catch {
        return null
    }
}