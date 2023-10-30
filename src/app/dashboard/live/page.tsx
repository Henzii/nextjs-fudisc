import { getLiveGames } from "@/services/games"
import { format, fromUnixTime } from "date-fns"

const LivePage = async () => {
    const liveGames = await getLiveGames()

    return (
        <div>
            <h1 className="text-3xl font-bold mb-5">Now live</h1>
            <table className="min-w-[70%] text-left">
                <thead>
                    <tr>
                        <th>Started</th>
                        <th>Course</th>
                        <th>Players</th>
                    </tr>
                </thead>
                <tbody>
                    {liveGames.map(game => {
                        const startTime = format(fromUnixTime(game.startTime / 1000), 'dd.MM.yy HH:mm')
                        return (
                            <tr key={game.id}>
                                <td>{startTime}</td>
                                <td>{game.course} {game.layout}</td>
                                <td>{game.scorecards.map(sc => sc.user.name).join(', ')}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default LivePage