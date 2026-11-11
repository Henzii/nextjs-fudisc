import { getAllGames, getLiveGames } from "@/services/games"
import { format, fromUnixTime } from "date-fns"
import Link from "next/link"

const PAGE_SIZE = 50

type Props = {
    searchParams: {
        offset?: string
    }
}

const SpyGamesPage = async ({ searchParams }: Props) => {
    const requestedOffset = Number(searchParams.offset ?? 0)
    const offset = Number.isSafeInteger(requestedOffset) && requestedOffset >= 0
        ? requestedOffset
        : 0
    const page = await getAllGames(PAGE_SIZE, offset)

    if (!page) {
        return (
            <section>
                <h1 className="text-3xl font-bold mb-6">Spy Games</h1>
                <p>Failed to fetch games.</p>
            </section>
        )
    }

    const liveGames = await getLiveGames()
    const liveGameIds = new Set(liveGames.map(game => game.id))

    return (
        <section>
            <h1 className="text-3xl font-bold mb-6">Spy Games</h1>
            <div className="overflow-x-auto">
                <table className="w-full text-left" cellPadding={8}>
                    <thead>
                        <tr>
                            <th>Timestamp</th>
                            <th>Course</th>
                            <th>Layout</th>
                            <th>Players</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {page.games.map(game => {
                            const gameHref = `/dashboard/admin/spy-games/${encodeURIComponent(game.id)}`
                            return (
                                <tr key={game.id} className="hover:bg-gray-100">
                                    <td className="p-0">
                                        <Link href={gameHref} className="block p-2">
                                            {format(fromUnixTime(game.startTime / 1000), "dd.MM.yyyy HH:mm")}
                                        </Link>
                                    </td>
                                    <td className="p-0">
                                        <Link href={gameHref} className="block p-2 font-semibold hover:underline">
                                            {game.course}
                                        </Link>
                                    </td>
                                    <td className="p-0">
                                        <Link href={gameHref} className="block p-2">{game.layout}</Link>
                                    </td>
                                    <td className="p-0">
                                        <Link href={gameHref} className="block p-2">
                                            {game.scorecards.map(scorecard => scorecard.user?.name).join(", ") || "No players"}
                                        </Link>
                                    </td>
                                    <td className="p-0">
                                        <Link href={gameHref} className="block p-2">
                                            {liveGameIds.has(game.id) ? "Open" : "Closed"}
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <nav className="mt-4 flex gap-4" aria-label="Game pages">
                {offset > 0 && (
                    <Link
                        href={`/dashboard/admin/spy-games?offset=${Math.max(0, offset - PAGE_SIZE)}`}
                        className="text-blue-500 hover:underline"
                    >
                        Previous
                    </Link>
                )}
                {page.hasMore && page.nextOffset !== null && (
                    <Link
                        href={`/dashboard/admin/spy-games?offset=${page.nextOffset}`}
                        className="text-blue-500 hover:underline"
                    >
                        Next
                    </Link>
                )}
            </nav>
        </section>
    )
}

export default SpyGamesPage
