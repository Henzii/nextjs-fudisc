import { FC, useMemo } from "react"
import { MappedGames } from "./utils"

type Props = {
  mappedGames: MappedGames
}
const PointsTable: FC<Props> = ({ mappedGames }) => {

  const points = useMemo(() => {
    const pt = new Map()
    mappedGames.competitions.forEach(game => {
      game.players.forEach(player => {
        pt.set(player.name, (pt.get(player.name) ?? 0) + player.points)
      })
    })
    return [...pt.entries()].sort((a, b) => b[1] - a[1])
  }, [mappedGames])

  return (
    <table className="text-left mt-8 text-sm w-full lg:w-min">
      <thead>
        <tr className="text-bold [&>th]:pr-4">
          <th>Position</th>
          <th>Name</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody className="[&>tr:nth-child(odd)]:bg-gray-100">
        {points.map(([name, total], index) => (
          <tr key={name} className="[&>td]:p-2">
            <td className="w-12">{index + 1}</td>
            <td className="flex-1 lg:min-w-[20rem] ">{name}</td>
            <td>{total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default PointsTable
