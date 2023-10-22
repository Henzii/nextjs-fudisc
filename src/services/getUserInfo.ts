import { COOKIES } from "@/types/enums"
import axios from "axios"
import { cookies } from "next/headers"
import config from '@/config.json'
import { User } from "@/types/user"


type GetMeReponse = {
    data: {
        getMe: User
    }
}

export const getUserInfo = async () => {
    const cookieStore = cookies()
    const token = cookieStore.get(COOKIES.ServerToken)?.value

    if (!token) throw new Error('Whoopsie, something went wrong')

    const response = await axios.post<GetMeReponse>(config.fuDiscServerAddress, {
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