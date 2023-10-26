import { ResultFields } from "@/types/enums";
import { Game } from "@/types/game";

export const getUniquePlayerNames = (games: Game[]) =>
    games.reduce((list: string[], game) => {
        const namesInGame = game.scorecards.map(sc => sc.user.name)
        const newNames = namesInGame.filter(name => !list.includes(name))
        return [...list, ...newNames]
    }, [])

export const getResultForPlayer = (game: Game, player: string, resultField: ResultFields) => {
    const userScorecard = game.scorecards.find(sc => sc.user.name === player)

    if (!userScorecard) return null

    return userScorecard[resultField]
}