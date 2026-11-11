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

export const getLiveGame = async (gameId: string) => {
  console.log(gameId)
  try {
    const response = await axios.post<QueryReponse<'getLiveGame', Game>>(config('fuDiscServerUri'), {
      query: `
      query GetLiveGame($gameId: ID!) {
        getLiveGame(gameId: $gameId) {
          id
          course
          par
          layout
          pars
          startTime
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
      }`,
      variables: { gameId: gameId }
    })
    return response.data;
  } catch (e) {
    return null;
  }
}

type GetGamesResponse = {
  games: Game[]
}

export const getGame = async (gameId: string) => {
  const response = await postWithToken<'getGame', Game | null>(`
    query GetGame($gameId: ID!) {
      getGame(gameId: $gameId) {
        id
        course
        par
        layout
        pars
        startTime
        scorecards {
          user {
            name
          }
          scores
          total
          plusminus
        }
      }
    }
  `, { gameId })

  if (!response) return null
  if (response.errors?.length) {
    throw new Error(response.errors.map(error => error.message).join(", "))
  }

  return response.data.getGame
}

type GetAllGamesResponse = {
  games: Pick<Game, 'id' | 'course' | 'layout' | 'scorecards' | 'startTime'>[]
  hasMore: boolean
  nextOffset: number | null
}

export const getAllGames = async (limit: number, offset: number) => {
  const response = await postWithToken<'getAllGames', GetAllGamesResponse>(`
    query GetAllGames($limit: Int!, $offset: Int!) {
      getAllGames(limit: $limit, offset: $offset) {
        games {
          id
          course
          layout
          startTime
          scorecards {
            user {
              name
            }
          }
        }
        hasMore
        nextOffset
      }
    }
  `, { limit, offset })

  if (!response) return null
  if (response.errors?.length) {
    throw new Error(response.errors.map(error => error.message).join(", "))
  }

  const page = response.data.getAllGames
  if (page.hasMore && (page.nextOffset === null || page.nextOffset <= offset)) {
    throw new Error("getAllGames returned an invalid nextOffset")
  }

  return page
}

export const getGames = async (limit: number) => {
  const response = await postWithToken<'getGames', GetGamesResponse>(`
  query GetGames($limit: Int, $offset: Int) {
    getGames(limit: $limit, offset: $offset) {
      games {
        id
        course
        par
        layout
        pars
        startTime
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
  }
  `, { limit, offset: 0 })
  return response?.data.getGames.games

}