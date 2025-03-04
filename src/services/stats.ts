import { COOKIES } from "@/types/enums"
import { cookies } from "next/headers"
import { Game } from "@/types/game";
import { postWithToken } from "./util";
import jwt from 'jsonwebtoken'
import { SafeUser } from "@/types/user";

type Response = {
  games: Game[],
  hasMore: boolean
}

export const getGroupStats = async (year: string) => {
  const token = cookies().get(COOKIES.ServerToken)?.value;
  const userToken = cookies().get(COOKIES.LoginToken)?.value;

  if (!token || !userToken || !process.env.TOKEN_KEY) return null;

  try {
    const user = jwt.verify(userToken, process.env.TOKEN_KEY) as SafeUser;
    const response = await postWithToken<'getGames', Response>(`
      query GetGamesQuery ($limit: Int, $offset: Int, $from: String, $to: String) {
        getGames(onlyGroupGames: true, limit: $limit, offset: $offset, from: $from, to: $to) {
          games {
            course
            date
            id
            layout
            scorecards {
              hc
              plusminus
              total
              beers
              bHc
              user {
                id
                name
                groupName
              }
            }
            startTime
            bHcMultiplier
          }
        }
      }
    `, { limit: 1000, offset: 0, from: `${year}-01-01`, to: `${year}-12-31` });

    if (response?.errors?.length) {
      response.errors.forEach(error => console.log('-=!! Error !!=- -> ', error.message))
    }

    const games = response?.data.getGames.games ?? []
    const mappedGames = games.map(game => ({
      ...game,
      scorecards: game.scorecards.filter(sc => sc.user.groupName === user.groupName)
    }))

    return mappedGames
  } catch (e) {
    return []
  }
}