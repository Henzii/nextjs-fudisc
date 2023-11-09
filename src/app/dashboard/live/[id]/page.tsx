import { getGame } from "@/services/games"
import { FC } from "react"

type Props = {
  params: {
    id: string
  }
}
const Page: FC<Props> = async ({ params }) => {

  const gameData = await getGame(params.id)
  const game = gameData?.data.getGame

  if (!game) {
    return (
      <div>
        <h1 className="text-3xl my-4">Not available</h1>
        <p>Game is not available :/</p>
      </div>
    )
  }
  return (
    <div>
      <h1 className="text-3xl m4">{game.course} / {game.layout}</h1>
      <table className="min-w-full text-center">
        <thead>
          <tr>
            <th className="text-left">Player</th>
            {game.pars.map((_par, index) => <th key={index}>{index + 1}</th>)}
            <th>Total</th>
            <th>+/-</th>
            <th>HC</th>
            <th>HC +/-</th>
          </tr>
        </thead>
        <tbody className="[&>tr:nth-child(odd)]:bg-gray-100">
          {game.scorecards.map(sc => (
            <tr key={sc.user.id} className="[&>td]:p-2 rounded">
              <td className="text-left">{sc.user.name}</td>
              {sc.scores.map((score, index) => (
                <td key={`${sc.user.id}-${index}`}>{score}</td>
              ))}
              <td>{sc.total}</td>
              <td>{sc.plusminus}</td>
              <td>{sc.hc}</td>
              <td>{sc.plusminus - sc.hc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Page