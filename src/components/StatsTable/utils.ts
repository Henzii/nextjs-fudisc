import { ResultFields } from "@/types/enums";
import { Game, Scorecard } from "@/types/game";

const getTotalIncludeingHC = (sc: Scorecard) =>
    sc.total - sc.hc - sc.bHc

const getPlusMinusIncludingHC = (sc: Scorecard) =>
    sc.plusminus - sc.hc - sc.bHc

const rankScorecards = (scorecards: Scorecard[]) => {
    const ranks: number[] = []
    for (let i = 0; i < scorecards.length; i++) {
        const score = getTotalIncludeingHC(scorecards[i])
        if (i > 0 && getTotalIncludeingHC(scorecards[i - 1]) == score) {
            ranks.push(ranks[i - 1])
        } else ranks.push(i + 1)
    }

    return ranks
}

export const getUniquePlayerNames = (games: Game[]) =>
    games.reduce((list: string[], game) => {
        const namesInGame = game.scorecards.map(sc => sc.user.name)
        const newNames = namesInGame.filter(name => !list.includes(name))
        return [...list, ...newNames]
    }, [])

export const getResultForPlayer = (game: Game, player: string, resultField: ResultFields) => {
    const userScorecard = game.scorecards.find(sc => sc.user.name === player)
    if (!userScorecard) return null

    if (resultField === ResultFields.Rank || resultField === ResultFields.Points) {
        const sortedCards = game.scorecards.toSorted((a, b) => {
            return getTotalIncludeingHC(a) - getTotalIncludeingHC(b)
        })
        const scorecardRanks = rankScorecards(sortedCards)

        const position = scorecardRanks[sortedCards.indexOf(userScorecard)]

        return resultField === ResultFields.Rank ? position : Math.max(6 - position, 0)

    } else if (resultField === ResultFields.HCPlusMinus) {
        return getPlusMinusIncludingHC(userScorecard)
    }



    return userScorecard[resultField]
}
