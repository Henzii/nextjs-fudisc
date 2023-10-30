import config from '@/config.json'
import { COOKIES } from '@/types/enums'
import { Game } from '@/types/game'
import { QueryReponse } from '@/types/query'
import axios from 'axios'
import { cookies } from 'next/headers'

export const getLiveGames = async () => {
  const token = cookies().get(COOKIES.ServerToken)?.value
  if (!token) return []

  const response = await axios.post<QueryReponse<'getLiveGames', Game[]>>(config.fuDiscServerAddress, {
    query: `
      query Query {
        getLiveGames {
          id
          course
          layout
          scorecards {
            user {
              name
            }
          }
          startTime
        }
      }
      `
  }, {
    headers: {
      Authorization: `bearer ${token}`
    }
  })
  return response.data.data?.getLiveGames ?? []
}