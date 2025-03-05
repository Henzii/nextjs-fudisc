import { Game, Scorecard } from "@/types/game";

const getTotalIncludeingHC = (sc: Scorecard, bHcMultiplier: number, prohibition: boolean) =>
    sc.total - sc.hc - sc.bHc * bHcMultiplier * (prohibition ? 0 : 1)

const getPlusMinusIncludingHC = (sc: Scorecard, bHcMultiplier: number, prohibition: boolean) =>
    sc.plusminus - sc.hc - sc.bHc * bHcMultiplier * (prohibition ? 0 : 1)

const rankScorecards = (scorecards: Scorecard[], bHcMultiplier: number, prohibition: boolean) => {
    const ranks: number[] = []
    for (let i = 0; i < scorecards.length; i++) {
        const score = getTotalIncludeingHC(scorecards[i], bHcMultiplier, prohibition)
        if (i > 0 && getTotalIncludeingHC(scorecards[i - 1], bHcMultiplier, prohibition) == score) {
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

export type MappedPlayer = {
    name: string,
    total: number,
    plusminus: number,
    hc: number,
    rank: number,
    points: number,
    beers: number,
    hcPlusminus: number
}
export type MappedGames = {
    playerNames: string[],
    competitions: {
        startTime: Game['startTime'],
        course: string,
        id: string,
        players: MappedPlayer[]
        bHcMultiplier: number
    }[]
}

export const getResultForPlayer = (playerName: string, field: keyof Omit<MappedPlayer, 'name'>, mappedPlayers: MappedPlayer[]) =>
    mappedPlayers.find(player => player.name === playerName)?.[field] ?? ''

export const parseGames = (games: Game[], prohibition: boolean): MappedGames => {
    const playerNames = getUniquePlayerNames(games)
    const competitions = games.map(game => {
        const sortedScorecards = [...game.scorecards].sort((a, b) => getTotalIncludeingHC(a, game.bHcMultiplier, prohibition) - getTotalIncludeingHC(b, game.bHcMultiplier, prohibition))
        const scorecardRanks = rankScorecards(sortedScorecards, game.bHcMultiplier, prohibition)
        const players = sortedScorecards.map((scorecard, index) => {
            return {
                name: scorecard.user.name,
                total: scorecard.total,
                plusminus: scorecard.plusminus,
                hc: scorecard.hc,
                rank: scorecardRanks[index],
                points: Math.max(6 - scorecardRanks[index], 0),
                beers: scorecard.beers,
                hcPlusminus: getPlusMinusIncludingHC(scorecard, game.bHcMultiplier, prohibition),
            }
        })
        return {
            id: game.id,
            startTime: game.startTime,
            course: game.course,
            bHcMultiplier: game.bHcMultiplier,
            players,
        }
    })

    return { playerNames, competitions }
}