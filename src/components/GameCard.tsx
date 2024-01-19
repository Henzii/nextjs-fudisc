import { Game } from "@/types/game";
import clsx from "clsx";
import { format, fromUnixTime } from "date-fns";
import { FC } from "react";

type Props = {
    game: Game
}
const GameCard: FC<Props> = ({ game }) => {
    const date = fromUnixTime(game.startTime / 1000)
    return (
        <article className="my-4 border rounded-lg shadow-lg px-6 py-2">
            <div className="flex justify-between mb-4">
                <div>
                    <h1 className="text-2xl font-semibold -mb-1">{game.course}</h1>
                    <span className="">{game.layout}</span>
                </div>
                <div>
                    <span className="text-sm">{format(date, "dd.MM.yyyy HH:ii")}</span>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="border-separate border-spacing-1 mb-2" cellPadding={4}>
                    <thead className="font-semibold">
                        <tr>
                            <th className="text-left">Hole</th>
                            {game.pars.map((_par, index) => <th key={index}>{index + 1}</th>)}
                            <th>Total</th>
                            <th>+/-</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {game.scorecards.map((scorecard, index) => {
                            return (
                                <tr key={index} className="table-row">
                                    <td className="text-left w-36 capitalize">{scorecard.user.name}</td>
                                    {scorecard.scores.map((score, index) => {
                                        const pmScore = score - game.pars[index]
                                        return (
                                            <td key={index} className={clsx("rounded-full w-6 h-6", {
                                                ["bg-yellow-200"]: score === 1,
                                                ["bg-cyan-200"]: pmScore <= -2,
                                                ["bg-sky-200"]: pmScore === -1,
                                                ["bg-green-200"]: pmScore === 0,
                                                ["bg-orange-200"]: pmScore === 1,
                                                ["bg-orange-300"]: pmScore === 2,
                                                ["bg-red-300"]: pmScore > 2,
                                            })}>{score}</td>
                                        )
                                    })}
                                    <td>{scorecard.total}</td>
                                    <td>{scorecard.plusminus}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </article>
    )
}

export default GameCard