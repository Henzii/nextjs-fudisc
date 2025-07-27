import config from "@/config/config"
import { COOKIES } from "@/types/enums"
import { QueryReponse } from "@/types/query"
import axios from "axios"
import { cookies } from "next/headers"

type Variables = Record<string, number | string | undefined | string[]>

export const postWithToken = async <QueryName extends string, QueryReturn>(query: string, variables?: Variables) => {
    const token = cookies().get(COOKIES.ServerToken)?.value
    if (!token) return null

    return (await axios.post<QueryReponse<QueryName, QueryReturn>>(config('fuDiscServerUri'), {
        query,
        variables
    }, {
        headers: {
            Authorization: `bearer ${token}`
        }
    })).data
}
