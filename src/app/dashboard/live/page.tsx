import { getLiveGames } from "@/services/games"
import { format, fromUnixTime } from "date-fns"
import Link from "next/link"

const LivePage = async () => {
  const liveGames = await getLiveGames()


  return (
    <div>
      <h1 className="text-3xl font-bold mb-5">Now live</h1>
      <table className="w-full" cellPadding={4} cellSpacing={0}>
        <thead>
          <tr>
            <td>Started</td>
            <td>Course</td>
            <td>Players</td>
          </tr>
        </thead>
        <tbody>
          {liveGames.map(game => {
            const startTime = format(fromUnixTime(game.startTime / 1000), 'dd.MM.yyyy hh:mm')
            return (
              <Link key={game.id} href={`/dashboard/live/${game.id}`} legacyBehavior>
                <tr className="hover:shadow-lg hover:cursor-pointer rounded border-2">
                  <td>{startTime}</td>
                  <td>{game.course} / {game.layout}</td>
                  <td>{game.scorecards.map(sc => sc.user.name).join(', ')}</td>
                </tr>
              </Link>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default LivePage