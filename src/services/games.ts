import config from '@/config/config'
import { COOKIES } from '@/types/enums'
import { Game } from '@/types/game'
import { QueryReponse } from '@/types/query'
import axios from 'axios'
import { cookies } from 'next/headers'
import { postWithToken } from './util'

export const getLiveGames = async () => {
  const token = cookies().get(COOKIES.ServerToken)?.value
  if (!token) return []

  const response = await axios.post<QueryReponse<'getLiveGames', Game[]>>(config('fuDiscServerUri'), {
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

export const getGame = async (gameId: string) => {
  return postWithToken<'getGame', Game>(`
    query GetGame($gameId: ID!) {
      getGame(gameId: $gameId) {
        id
        course
        par
        layout
        pars
        scorecards {
          user {
            name
          }
          scores
          total
          plusminus
          hc
          hcPlusminus
          beers
        }
    }
  }
  `, { gameId })
}