import { LogEntry } from "@/types/log"
import { postWithToken } from "./util"

export const getLogs = async () => {
    try {
        const response = await postWithToken<'getLogs', LogEntry[]>(`
        query GetLogs {
            getLogs {
              context
              message
              type
              createdAt
              user {
                name
                id
              }
            }
          }`)
        return response?.data.getLogs
    } catch {
        return null
    }
}