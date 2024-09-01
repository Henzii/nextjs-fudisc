import { FC, useMemo } from "react"
import { MappedGames } from "./utils"

type PlayerPoints = {
  totalPoints: number
  games: number
  wins: number
}

type Props = {
  mappedGames: MappedGames
}

const PointsTable: FC<Props> = ({ mappedGames }) => {

  const points = useMemo(() => {
    const pt = new Map<string, PlayerPoints>()
    mappedGames.competitions.forEach(game => {
      game.players.forEach(player => {
        const po = pt.get(player.name) ?? { totalPoints: 0, games: 0, wins: 0 }
        pt.set(player.name, {
          totalPoints: po.totalPoints + player.points,
          games: po.games + 1,
          wins: po.wins + (player.rank === 1 ? 1 : 0)
        })
      })
    })
    return [...pt.entries()].sort((a, b) => b[1].totalPoints - a[1].totalPoints)
  }, [mappedGames])

  return (
    <div className="overflow-x-auto">
      <table className="text-left mt-8 text-sm w-full">
        <thead>
          <tr className="text-bold [&>th]:pr-4 [&>th]:px-2">
            <th></th>
            <th>Name</th>
            <th>Points</th>
            <th>Games</th>
            <th>Wins</th>
            <th>Win %</th>
            <th title="Points per game">PPG</th>
          </tr>
        </thead>
        <tbody className="[&>tr:nth-child(odd)]:bg-gray-100">
          {points.map(([name, playerPoints], index) => (
            <tr key={name} className="[&>td]:p-2">
              <td className="w-12">{index + 1}</td>
              <td className="flex-1 lg:min-w-[10rem] ">{name}</td>
              <td>{playerPoints.totalPoints}</td>
              <td>{playerPoints.games}</td>
              <td>{playerPoints.wins}</td>
              <td>{(playerPoints.wins / playerPoints.games * 100).toFixed(2)}%</td>
              <td>{(playerPoints.totalPoints / playerPoints.games).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PointsTable
