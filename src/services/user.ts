import { COOKIES } from "@/types/enums"
import axios from "axios"
import { cookies } from "next/headers"
import { SearchUserResponse, User } from "@/types/user"
import { QueryReponse } from "@/types/query"
import config from "@/config/config"
import { postWithToken } from "./util"

export const getUserInfo = async (overrideToken?: string) => {
    const cookieStore = cookies()
    const token = overrideToken ?? cookieStore.get(COOKIES.ServerToken)?.value

    if (!token) throw new Error('Whoopsie, something went wrong')
    const response = await axios.post<QueryReponse<'getMe', User>>(config('fuDiscServerUri'), {
        query: `
            query GetMe {
                getMe {
                groupName
                name
                email
                accountType
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

export const searchUser = async (search: string) => {
    try {
        const response = await postWithToken<'searchUser', SearchUserResponse>(`
        query SearchUser($search: String!) {
            searchUser(search: $search) {
                users {
                    name
                    id
                }
                hasMore
            }
        }
        `, { search })
        return response?.data.searchUser
    } catch (e) {
        return null
    }
}

export const getUser = async (userId: string) => {
    try {
        const response = await postWithToken<'getUser', User | null>(`
        query GetUser($userId: ID!) {
            getUser(userId: $userId) {
                name
                id
                groupName
                email
            }
        }
        `, { userId })
        return response?.data.getUser ?? null
    } catch {
        return null
    }
}

type UpdateSettingsArgs = {
    email?: string,
    groupName?: string,
    password?: string,
    userId: string
}
export const updateSettings = async ({ userId, email, groupName, password }: UpdateSettingsArgs) => {
    try {
        const response = await postWithToken<'changeSettings', Pick<User, 'email' | 'groupName'>>(`
        mutation ChangeSettings($email: String, $groupName: String, $password: String, $userId: ID) {
            changeSettings(email: $email, groupName: $groupName, password: $password, userId: $userId) {
                email
                groupName
            }
        }
        `, { userId, email, groupName, password })
        return response?.data.changeSettings
    } catch (e) {
        return null
    }
}
