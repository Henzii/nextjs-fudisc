import { COOKIES } from "@/types/enums"
import axios from "axios";
import { cookies } from "next/headers"
import config from '@/config.json'
import { QueryReponse } from "@/types/query";
import { Game } from "@/types/game";

export const getGroupStats = async (filterYear: number, minPlayerCount: number) => {
  const token = cookies().get(COOKIES.ServerToken)?.value;

  if (!token) return null;

  const response = await axios.post<QueryReponse<'getGroupGames', Game[]>>(config.fuDiscServerAddress, {
    query: `
      query Query($minPlayerCount: Int!, $filterYear: Int!) {
        getGroupGames(minPlayerCount: $minPlayerCount, filterYear: $filterYear) {
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
            }
          }
          startTime
        }
      }
    `,
    variables: {
      minPlayerCount,
      filterYear
    }
  }, {
    headers: {
      Authorization: `bearer ${token}`
    },
  })

  if (response.data.errors?.length) {
    response.data.errors.forEach(error => console.log('-=!! Error !!=- -> ', error.message))
  }
  console.log('Fetch')
  return response.data.data?.getGroupGames

}